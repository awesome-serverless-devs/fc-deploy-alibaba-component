import { IInputsBase, ICredentials, ServerlessProfile, replaceProjectName } from '../profile';
import * as _ from 'lodash';
import { TriggerConfig } from './trigger';
import { isAutoConfig } from '../definition';
import * as core from '@serverless-devs/core';
import { DomainComponent } from '../component/domain';
import * as fse from 'fs-extra';
import StdoutFormatter from '../component/stdout-formatter';

export interface CustomDomainConfig {
  domainName: string;
  protocol: 'HTTP' | 'HTTP,HTTPS';
  routeConfigs: RouteConfig[];
  certConfig?: CertConfig;
}

function instanceOfCustomDomainConfig(data: any): data is CustomDomainConfig {
  return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}

interface RouteConfig {
  path: string;
  serviceName?: string;
  functionName?: string;
  qualifier?: string;
  methods?: string[];
}

interface CertConfig {
  certName: string;
  certificate: string;
  privateKey: string;
}

export class FcCustomDomain extends IInputsBase {
  customDomainConf: CustomDomainConfig;
  readonly serviceName: string;
  readonly functionName: string;
  readonly hasHttpTrigger: boolean;
  readonly httpMethods?: string[];
  readonly stateId: string;
  isDomainNameAuto: boolean;

  constructor(customDomainConf: CustomDomainConfig, serviceName: string, functionName: string, triggerConfs: TriggerConfig[], serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string) {
    super(serverlessProfile, region, credentials, curPath);
    this.customDomainConf = customDomainConf;
    this.serviceName = serviceName;
    this.functionName = functionName;
    this.hasHttpTrigger = false;
    this.isDomainNameAuto = isAutoConfig(this.customDomainConf.domainName);
    if (this.isDomainNameAuto) {
      this.stateId = `${credentials.AccountID}-${region}-${serviceName}-${functionName}-customDomain-auto`;
    }
    if (!_.isEmpty(triggerConfs)) {
      for (const trigger of triggerConfs) {
        if (trigger.type === 'http') {
          this.hasHttpTrigger = true;
          // @ts-ignore
          this.httpMethods = trigger.config.methods;
          break;
        }
      }
    }
  }

  async initLocal(): Promise<void> {
    this.validateConfig();
    await this.initLocalConfig();
  }

  validateConfig(): void {
    if (_.isEmpty(this.customDomainConf)) { return; }
    if (!this.hasHttpTrigger) {
      throw new Error('There should be http trigger when custom domain exists');
    }
    if (this.customDomainConf.protocol.toLocaleLowerCase().indexOf('https')) {
      if (Object.prototype.hasOwnProperty.call(this.customDomainConf, 'certConfig')) {
        throw new Error('Must config "CertConfig" for CustomDomain when using "HTTP,HTTPS" protocol\nYou can refer to https://help.aliyun.com/document_detail/90759.html?spm=a2c4g.11186623.6.665.446a1bae462uKK for help');
      }
    }
    if (!instanceOfCustomDomainConfig(this.customDomainConf)) {
      let lackedAttr;
      if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'domainName')) {
        lackedAttr = 'domainName';
      } else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'protocol')) {
        lackedAttr = 'protocol';
      } else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'routeConfigs')) {
        lackedAttr = 'routeConfigs';
      }
      throw new Error(`Lack of ${lackedAttr} in custom domain: \n${JSON.stringify(this.customDomainConf, null, '  ')}`);
    }
  }

  async initLocalConfig(): Promise<void> {
    if (_.isEmpty(this.customDomainConf)) { return; }
    let state;
    try {
      state = await core.getState(this.stateId);
    } catch (e) {
      if (e.message !== 'The current file does not exist') {
        throw e;
      }
    }
    this.logger.debug(`state of key: ${this.stateId}`);
    if (_.isEmpty(state)) { return; }
    if (this.isDomainNameAuto) { this.customDomainConf.domainName = state.domainName; }
  }

  async setStatedCustomDomainConf(resolvedCustomDomainConf: CustomDomainConfig): Promise<void> {
    if (this.isDomainNameAuto) {
      this.logger.debug('set resolved custom domain config into state.');
      await core.setState(this.stateId, resolvedCustomDomainConf);
    }
  }

  async delStatedCustomDomainConf(): Promise<void> {
    const state = await core.getState(this.stateId);
    if (_.isEmpty(state)) { return; }
    await core.setState(this.stateId, {});
  }

  async getStatedCustomDomainConf(): Promise<string> {
    const state = await core.getState(this.stateId);
    if (_.isEmpty(state)) { return ''; }
    return state.domainName;
  }


  async makeCustomDomain(args: string): Promise<CustomDomainConfig> {
    const resolvedCustomDomainConf: CustomDomainConfig = _.cloneDeep(this.customDomainConf);
    if (!_.isEmpty(this.customDomainConf.certConfig)) {
      const { privateKey } = this.customDomainConf.certConfig;
      const { certificate } = this.customDomainConf.certConfig;

      if (privateKey && privateKey.endsWith('.pem')) {
        resolvedCustomDomainConf.certConfig.privateKey = await fse.readFile(privateKey, 'utf-8');
      }
      if (certificate && certificate.endsWith('.pem')) {
        resolvedCustomDomainConf.certConfig.certificate = await fse.readFile(certificate, 'utf-8');
      }
    }
    delete resolvedCustomDomainConf.routeConfigs;

    const resolvedRouteConfigs: RouteConfig[] = [];
    for (const routeConfig of this.customDomainConf.routeConfigs) {
      if (!Object.prototype.hasOwnProperty.call(routeConfig, 'serviceName')) {
        Object.assign(routeConfig, {
          serviceName: this.serviceName,
        });
      }
      if (!Object.prototype.hasOwnProperty.call(routeConfig, 'functionName')) {
        Object.assign(routeConfig, {
          functionName: this.functionName,
        });
      }
      if (!Object.prototype.hasOwnProperty.call(routeConfig, 'methods')) {
        this.logger.debug(`set default methods: ${this.httpMethods} for domain: ${this.customDomainConf.domainName}`);
        Object.assign(routeConfig, {
          methods: this.httpMethods,
        });
      }
      resolvedRouteConfigs.push(routeConfig);
    }
    Object.assign(resolvedCustomDomainConf, {
      routeConfigs: resolvedRouteConfigs,
    });

    if (this.isDomainNameAuto) {
      let generatedDomain = await this.getStatedCustomDomainConf();
      if (_.isEmpty(generatedDomain)) {
        // generate domain via domain component
        this.logger.debug('Auto domain name');
        this.logger.info(StdoutFormatter.stdoutFormatter.using('customDomain: auto', 'fc will try to generate related custom domain resources automatically'));
        const profileOfDomain: ServerlessProfile = replaceProjectName(this.serverlessProfile, `${this.serverlessProfile?.project.projectName}-domain-project`);
        const domainComponent = new DomainComponent(profileOfDomain, this.serviceName, this.functionName, this.region, this.credentials, this.curPath);
        const domainComponentInputs = domainComponent.genComponentInputs('domain', args);
        const domainComponentIns = await core.load('devsapp/domain');
        generatedDomain = await domainComponentIns.get(domainComponentInputs);
      }
      this.logger.info(`Generated auto custom domain: ${generatedDomain}`);
      Object.assign(resolvedCustomDomainConf, {
        domainName: generatedDomain,
      });
    }

    return resolvedCustomDomainConf;
  }
}
