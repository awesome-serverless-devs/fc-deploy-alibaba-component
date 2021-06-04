"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcCustomDomain = void 0;
var profile_1 = require("../profile");
var _ = __importStar(require("lodash"));
var definition_1 = require("../definition");
var core = __importStar(require("@serverless-devs/core"));
var domain_1 = require("../component/domain");
var fse = __importStar(require("fs-extra"));
function instanceOfCustomDomainConfig(data) {
    return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}
var FcCustomDomain = /** @class */ (function (_super) {
    __extends(FcCustomDomain, _super);
    function FcCustomDomain(customDomainConf, serviceName, functionName, triggerConfs, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.customDomainConf = customDomainConf;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        _this.hasHttpTrigger = false;
        _this.isDomainNameAuto = definition_1.isAutoConfig(_this.customDomainConf.domainName);
        if (!_.isEmpty(triggerConfs)) {
            for (var _i = 0, triggerConfs_1 = triggerConfs; _i < triggerConfs_1.length; _i++) {
                var trigger = triggerConfs_1[_i];
                if (trigger.type === 'http') {
                    _this.hasHttpTrigger = true;
                    // @ts-ignore
                    _this.httpMethods = trigger.config.methods;
                    break;
                }
            }
        }
        return _this;
    }
    FcCustomDomain.prototype.initLocal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initLocalConfig()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.validateConfig = function () {
        if (_.isEmpty(this.customDomainConf)) {
            return;
        }
        if (!this.hasHttpTrigger) {
            throw new Error('There should be http trigger when custom domain exists');
        }
        if (this.customDomainConf.protocol.toLocaleLowerCase().indexOf('https')) {
            if (Object.prototype.hasOwnProperty.call(this.customDomainConf, 'certConfig')) {
                throw new Error('Must config "CertConfig" for CustomDomain when using "HTTP,HTTPS" protocol\nYou can refer to https://help.aliyun.com/document_detail/90759.html?spm=a2c4g.11186623.6.665.446a1bae462uKK for help');
            }
        }
        if (!instanceOfCustomDomainConfig(this.customDomainConf)) {
            var lackedAttr = void 0;
            if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'domainName')) {
                lackedAttr = 'domainName';
            }
            else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'protocol')) {
                lackedAttr = 'protocol';
            }
            else if (!Object.prototype.hasOwnProperty.call(this.customDomainConf, 'routeConfigs')) {
                lackedAttr = 'routeConfigs';
            }
            throw new Error("Lack of " + lackedAttr + " in custom domain: \n" + JSON.stringify(this.customDomainConf, null, '  '));
        }
    };
    FcCustomDomain.prototype.initLocalConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey, state, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (_.isEmpty(this.customDomainConf)) {
                            return [2 /*return*/];
                        }
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.functionName + "-customDomain-auto";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, core.getState(stateKey)];
                    case 2:
                        state = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1.message !== 'The current file does not exist') {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.debug("state of key: " + stateKey);
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        if (this.isDomainNameAuto) {
                            this.customDomainConf.domainName = state.domainName;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.setStatedCustomDomainConf = function (resolvedCustomDomainConf) {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isDomainNameAuto) return [3 /*break*/, 2];
                        this.logger.debug('set resolved custom domain config into state.');
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.functionName + "-customDomain-auto";
                        return [4 /*yield*/, core.setState(stateKey, resolvedCustomDomainConf)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.delStatedCustomDomainConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stateKey, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateKey = this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.functionName + "-customDomain-auto";
                        return [4 /*yield*/, core.getState(stateKey)];
                    case 1:
                        state = _a.sent();
                        if (_.isEmpty(state)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, core.setState(stateKey, {})];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.makeCustomDomain = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var resolvedCustomDomainConf, privateKey, certificate, _b, _c, resolvedRouteConfigs, _i, _d, routeConfig, profileOfDomain, domainComponent, domainComponentInputs, domainComponentIns, generatedDomain;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        resolvedCustomDomainConf = _.cloneDeep(this.customDomainConf);
                        if (!!_.isEmpty(this.customDomainConf.certConfig)) return [3 /*break*/, 4];
                        privateKey = this.customDomainConf.certConfig.privateKey;
                        certificate = this.customDomainConf.certConfig.certificate;
                        if (!(privateKey && privateKey.endsWith('.pem'))) return [3 /*break*/, 2];
                        _b = resolvedCustomDomainConf.certConfig;
                        return [4 /*yield*/, fse.readFile(privateKey, 'utf-8')];
                    case 1:
                        _b.privateKey = _e.sent();
                        _e.label = 2;
                    case 2:
                        if (!(certificate && certificate.endsWith('.pem'))) return [3 /*break*/, 4];
                        _c = resolvedCustomDomainConf.certConfig;
                        return [4 /*yield*/, fse.readFile(certificate, 'utf-8')];
                    case 3:
                        _c.certificate = _e.sent();
                        _e.label = 4;
                    case 4:
                        delete resolvedCustomDomainConf.routeConfigs;
                        resolvedRouteConfigs = [];
                        for (_i = 0, _d = this.customDomainConf.routeConfigs; _i < _d.length; _i++) {
                            routeConfig = _d[_i];
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
                                this.logger.debug("set default methods: " + this.httpMethods + " for domain: " + this.customDomainConf.domainName);
                                Object.assign(routeConfig, {
                                    methods: this.httpMethods,
                                });
                            }
                            resolvedRouteConfigs.push(routeConfig);
                        }
                        Object.assign(resolvedCustomDomainConf, {
                            routeConfigs: resolvedRouteConfigs,
                        });
                        if (!this.isDomainNameAuto) return [3 /*break*/, 7];
                        // generate domain via domain component
                        this.logger.debug('Auto domain name');
                        this.logger.info('Using \'customDomain: auto\', FC-DEPLOY will try to generate related custom domain resources automatically');
                        profileOfDomain = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-domain-project");
                        domainComponent = new domain_1.DomainComponent(profileOfDomain, this.serviceName, this.functionName, this.region, this.credentials, this.curPath, this.args);
                        domainComponentInputs = domainComponent.genComponentInputs('domain');
                        return [4 /*yield*/, core.load('devsapp/domain')];
                    case 5:
                        domainComponentIns = _e.sent();
                        return [4 /*yield*/, domainComponentIns.get(domainComponentInputs)];
                    case 6:
                        generatedDomain = _e.sent();
                        this.logger.info("Generated auto custom domain done: " + generatedDomain);
                        Object.assign(resolvedCustomDomainConf, {
                            domainName: generatedDomain,
                        });
                        _e.label = 7;
                    case 7: return [2 /*return*/, resolvedCustomDomainConf];
                }
            });
        });
    };
    return FcCustomDomain;
}(profile_1.IInputsBase));
exports.FcCustomDomain = FcCustomDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvY3VzdG9tLWRvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5Rix3Q0FBNEI7QUFFNUIsNENBQTZDO0FBQzdDLDBEQUE4QztBQUM5Qyw4Q0FBc0Q7QUFDdEQsNENBQWdDO0FBU2hDLFNBQVMsNEJBQTRCLENBQUMsSUFBUztJQUM3QyxPQUFPLFlBQVksSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxjQUFjLElBQUksSUFBSSxDQUFDO0FBQzlFLENBQUM7QUFnQkQ7SUFBb0Msa0NBQVc7SUFRN0Msd0JBQVksZ0JBQW9DLEVBQUUsV0FBbUIsRUFBRSxZQUFvQixFQUFFLFlBQTZCLEVBQUUsaUJBQW9DLEVBQUUsTUFBYyxFQUFFLFdBQXlCLEVBQUUsT0FBZ0IsRUFBRSxJQUFhO1FBQTVPLFlBQ0Usa0JBQU0saUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBZ0I3RDtRQWZDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixLQUFJLENBQUMsZ0JBQWdCLEdBQUcseUJBQVksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDNUIsS0FBc0IsVUFBWSxFQUFaLDZCQUFZLEVBQVosMEJBQVks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