import * as _ from 'lodash';
import * as core from '@serverless-devs/core';

export class IInputsBase {
  @core.HLogger('FC-DEPLOY') logger: core.ILogger;
  readonly serverlessProfile: ServerlessProfile;
  readonly region: string;
  readonly credentials: ICredentials;
  readonly curPath?: string;
  readonly args?: string;

  constructor(serverlessProfile: ServerlessProfile, region: string, credentials: ICredentials, curPath?: string, args?: string) {
    this.serverlessProfile = serverlessProfile;
    this.region = region;
    this.credentials = credentials;
    if (!_.isNil(curPath)) { this.curPath = curPath; }
    if (!_.isNil(args)) { this.args = args; }
  }
}
export interface ICredentials {
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export function mark(source: string): string {
  if (!source) { return source; }
  const subStr = source.slice(-4);
  return `***********${subStr}`;
}

export interface ServerlessProfile {
  project: {
    component?: string;
    access: string;
    projectName: string;
  };
  appName: string;
}

export function replaceProjectName(originProfile: ServerlessProfile, projectName: string): ServerlessProfile {
  const replacedProfile: ServerlessProfile = _.cloneDeep(originProfile);
  replacedProfile.project.projectName = projectName;
  return replacedProfile;
}

export async function getFcEndpoint(): Promise<string | undefined> {
  const fcDefault = await core.loadComponent('devsapp/fc-default');
  const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
  if (!fcEndpoint) { return undefined; }
  const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
  return (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined;
}
