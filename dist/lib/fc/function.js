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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcFunction = exports.isCustomContainerRuntime = void 0;
var static_1 = require("../static");
var _ = __importStar(require("lodash"));
var acr_1 = require("../resource/acr");
var path_1 = __importDefault(require("path"));
var ignore_1 = require("../ignore");
var zip_1 = require("../zip");
var fse = __importStar(require("fs-extra"));
var profile_1 = require("../profile");
var fc_deploy_1 = __importDefault(require("./fc-deploy"));
var fc_sync_1 = __importDefault(require("../component/fc-sync"));
var core = __importStar(require("@serverless-devs/core"));
var os_1 = __importDefault(require("os"));
var env_1 = require("../env");
var deep_object_diff_1 = require("deep-object-diff");
var prompt_1 = require("../utils/prompt");
var stdout_formatter_1 = __importDefault(require("../component/stdout-formatter"));
var file_1 = require("../utils/file");
var oss_1 = require("../resource/oss");
function isCustomContainerRuntime(runtime) {
    return runtime === 'custom-container';
}
exports.isCustomContainerRuntime = isCustomContainerRuntime;
var FcFunction = /** @class */ (function (_super) {
    __extends(FcFunction, _super);
    function FcFunction(functionConf, serviceName, serverlessProfile, region, credentials, curPath, args) {
        var _this = _super.call(this, functionConf, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceName = serviceName;
        _this.name = functionConf === null || functionConf === void 0 ? void 0 : functionConf.name;
        return _this;
    }
    FcFunction.prototype.initLocal = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateConfig();
                        return [4 /*yield*/, this.initLocalConfig(assumeYes)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.getCodeUriWithBuildPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseDir, buildBasePath, buildCodeUri;
            return __generator(this, function (_a) {
                baseDir = path_1.default.dirname(this.curPath);
                buildBasePath = path_1.default.join(baseDir, FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX);
                buildCodeUri = path_1.default.join(buildBasePath, this.serviceName, this.name);
                if (!fse.pathExistsSync(buildBasePath) || fse.lstatSync(buildBasePath).isFile() || isCustomContainerRuntime(this.localConfig.runtime) || !fse.pathExistsSync(buildCodeUri) || fse.lstatSync(buildCodeUri).isFile()) {
                    return [2 /*return*/, {
                            codeUri: this.localConfig.codeUri,
                            isBuild: false,
                        }];
                }
                this.logger.info("Fc detects that you have run build command for function: " + this.name + ".");
                this.logger.info(stdout_formatter_1.default.stdoutFormatter.using('codeUri', buildCodeUri));
                return [2 /*return*/, {
                        codeUri: buildCodeUri,
                        isBuild: true,
                    }];
            });
        });
    };
    FcFunction.prototype.initLocalConfig = function (assumeYes) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, codeUri, isBuild, resolvedEnvs, message, details, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.existOnline) {
                            Object.assign(this.localConfig, {
                                import: true,
                                protect: false,
                            });
                        }
                        return [4 /*yield*/, this.getCodeUriWithBuildPath()];
                    case 1:
                        _a = _c.sent(), codeUri = _a.codeUri, isBuild = _a.isBuild;
                        if (!isBuild) return [3 /*break*/, 4];
                        this.originalCodeUri = this.localConfig.codeUri;
                        this.localConfig.codeUri = codeUri;
                        resolvedEnvs = env_1.addEnv(this.localConfig.environmentVariables);
                        message = 'Fc want to add/append some content to your origin environment variables for finding dependencies generated by build command. \nDo you agree with the behavior?';
                        details = deep_object_diff_1.detailedDiff(this.localConfig.environmentVariables, resolvedEnvs);
                        _b = assumeYes;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, prompt_1.promptForConfirmOrDetails(message, details)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_b) {
                            if (assumeYes) {
                                this.logger.info('Fc add/append some content to your origin environment variables for finding dependencies generated by build command.');
                                this.logger.log(JSON.stringify(resolvedEnvs, null, '  '), 'yellow');
                            }
                            this.localConfig.environmentVariables = resolvedEnvs;
                        }
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.syncRemoteCode = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var profileOfFcSync, fcSync, fcSyncComponentInputs, fcSyncComponentIns, syncRes, codeUri;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // 基于 fc-sync 获取函数代码
                    return [4 /*yield*/, fse.ensureDir(FcFunction.DEFAULT_SYNC_CODE_PATH, 511)];
                    case 1:
                        // 基于 fc-sync 获取函数代码
                        _b.sent();
                        profileOfFcSync = profile_1.replaceProjectName(this.serverlessProfile, ((_a = this.serverlessProfile) === null || _a === void 0 ? void 0 : _a.project.projectName) + "-fc-sync-project");
                        fcSync = new fc_sync_1.default(this.serviceName, profileOfFcSync, this.region, this.credentials, this.curPath, '--type code -f', this.name, null, FcFunction.DEFAULT_SYNC_CODE_PATH);
                        return [4 /*yield*/, fcSync.genComponentInputs('fc-sync')];
                    case 2:
                        fcSyncComponentInputs = _b.sent();
                        return [4 /*yield*/, core.load('devsapp/fc-sync')];
                    case 3:
                        fcSyncComponentIns = _b.sent();
                        return [4 /*yield*/, fcSyncComponentIns.sync(fcSyncComponentInputs)];
                    case 4:
                        syncRes = _b.sent();
                        codeUri = syncRes === null || syncRes === void 0 ? void 0 : syncRes.codeFiles[this.name];
                        this.logger.debug("sync code of function " + this.serviceName + ":" + this.name + " to " + codeUri);
                        return [2 /*return*/, codeUri];
                }
            });
        });
    };
    FcFunction.prototype.genStateID = function () {
        return this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.name;
    };
    FcFunction.prototype.validateConfig = function () {
        var _a, _b, _c, _d, _e;
        if (!_.isNil((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) && !_.isNil((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not both exist in function config.');
        }
        if (_.isEmpty((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.customContainerConfig) && _.isNil((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri) && _.isNil((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.ossKey)) {
            throw new Error('\'codeUri\' and \'ossKey\' can not be empty in function config at the same time.');
        }
    };
    FcFunction.prototype.makeFunctionConfig = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        if (this.useRemote) {
            return this.remoteConfig;
        }
        if (_.isEmpty(this.localConfig)) {
            return undefined;
        }
        var resolvedFunctionConf = {
            name: this.name,
            description: ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.description) || static_1.FUNCTION_CONF_DEFAULT.description,
            handler: ((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.handler) || static_1.FUNCTION_CONF_DEFAULT.handler,
            memorySize: ((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.memorySize) || static_1.FUNCTION_CONF_DEFAULT.memorySize,
            timeout: ((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.timeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            instanceConcurrency: ((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.instanceConcurrency) || static_1.FUNCTION_CONF_DEFAULT.instanceConcurrency,
            instanceType: ((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.instanceType) || static_1.FUNCTION_CONF_DEFAULT.instanceType,
            runtime: ((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime,
            instanceLifecycleConfig: (_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.instanceLifecycleConfig,
            asyncConfiguration: (_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.asyncConfiguration,
            layers: (_k = this.localConfig) === null || _k === void 0 ? void 0 : _k.layers,
        };
        if (!_.isNil((_l = this.localConfig) === null || _l === void 0 ? void 0 : _l.initializer)) {
            Object.assign(resolvedFunctionConf, {
                initializer: (_m = this.localConfig) === null || _m === void 0 ? void 0 : _m.initializer,
                initializationTimeout: ((_o = this.localConfig) === null || _o === void 0 ? void 0 : _o.initializationTimeout) || static_1.FUNCTION_CONF_DEFAULT.timeout,
            });
        }
        if (!_.isEmpty((_p = this.localConfig) === null || _p === void 0 ? void 0 : _p.environmentVariables)) {
            Object.assign(resolvedFunctionConf, {
                environmentVariables: (_q = this.localConfig) === null || _q === void 0 ? void 0 : _q.environmentVariables,
            });
        }
        if (isCustomContainerRuntime((_r = this.localConfig) === null || _r === void 0 ? void 0 : _r.runtime)) {
            Object.assign(resolvedFunctionConf, {
                handler: ((_s = this.localConfig) === null || _s === void 0 ? void 0 : _s.handler) || 'not-used',
                caPort: ((_t = this.localConfig) === null || _t === void 0 ? void 0 : _t.caPort) || static_1.FUNCTION_CONF_DEFAULT.caPort,
                customContainerConfig: (_u = this.localConfig) === null || _u === void 0 ? void 0 : _u.customContainerConfig,
            });
        }
        else if (!_.isNil((_v = this.localConfig) === null || _v === void 0 ? void 0 : _v.ossBucket) && !_.isNil((_w = this.localConfig) === null || _w === void 0 ? void 0 : _w.ossKey)) {
            Object.assign(resolvedFunctionConf, {
                ossBucket: (_x = this.localConfig) === null || _x === void 0 ? void 0 : _x.ossBucket,
                ossKey: (_y = this.localConfig) === null || _y === void 0 ? void 0 : _y.ossKey,
            });
        }
        else if (_.isNil((_z = this.localConfig) === null || _z === void 0 ? void 0 : _z.ossBucket) && _.isNil((_0 = this.localConfig) === null || _0 === void 0 ? void 0 : _0.ossKey)) {
            // 本地代码，codeUri 必填
            Object.assign(resolvedFunctionConf, {
                codeUri: (_1 = this.localConfig) === null || _1 === void 0 ? void 0 : _1.codeUri,
            });
        }
        if (this.existOnline) {
            Object.assign(resolvedFunctionConf, {
                import: true,
                protect: false,
            });
        }
        this.logger.debug('make function done');
        return resolvedFunctionConf;
    };
    FcFunction.prototype.generateCodeIngore = function (baseDir) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var codeUri, runtime, absCodeUri, absBaseDir, relative;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        codeUri = ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        runtime = ((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.runtime) || static_1.FUNCTION_CONF_DEFAULT.runtime;
                        absCodeUri = path_1.default.resolve(baseDir, codeUri);
                        absBaseDir = path_1.default.resolve(baseDir);
                        relative = path_1.default.relative(absBaseDir, absCodeUri);
                        if (codeUri.startsWith('..') || relative.startsWith('..')) {
                            this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('.fcignore', "not supported for the codeUri: " + codeUri));
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, ignore_1.isIgnored(baseDir, runtime, this.originalCodeUri)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcFunction.prototype.zipCode = function (baseDir) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var codeAbsPath, codeUri, zipFileSizeInBytes, _b, codeignore, zipPath;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        codeUri = ((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.codeUri) || static_1.FUNCTION_CONF_DEFAULT.codeUri;
                        if (!codeUri) return [3 /*break*/, 4];
                        codeAbsPath = path_1.default.resolve(baseDir, codeUri);
                        if (!(codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, file_1.getFileSize(codeUri)];
                    case 1:
                        zipFileSizeInBytes = _c.sent();
                        _b = {
                            filePath: codeAbsPath,
                            fileSizeInBytes: zipFileSizeInBytes
                        };
                        return [4 /*yield*/, file_1.getFileHash(codeUri)];
                    case 2: return [2 /*return*/, (_b.fileHash = _c.sent(),
                            _b)];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        codeAbsPath = path_1.default.resolve(baseDir, './');
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this.generateCodeIngore(baseDir)];
                    case 6:
                        codeignore = _c.sent();
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        return [4 /*yield*/, fse.ensureDir(static_1.FC_CODE_CACHE_DIR)];
                    case 7:
                        // await detectLibrary(codeAbsPath, runtime, baseDir, functionName, '\t');
                        _c.sent();
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.name + ".zip");
                        return [4 /*yield*/, zip_1.pack(codeAbsPath, codeignore, zipPath)];
                    case 8: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    FcFunction.prototype.removeZipCode = function (codeZipPath) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var e_1, e_2;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(this.useRemote && !isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime))) return [3 /*break*/, 5];
                        this.logger.debug("removing zip code: " + codeZipPath + " downloaded from remote.");
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 2:
                        _g.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _g.sent();
                        this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('remove sync code', "path: " + codeZipPath + ", error: " + e_1.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                    case 5:
                        if (!(!isCustomContainerRuntime((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.runtime) && ((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.codeUri))) return [3 /*break*/, 9];
                        if (!(!((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri.endsWith('.zip')) && !((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.codeUri.endsWith('.jar')) && !((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.codeUri.endsWith('.war')))) return [3 /*break*/, 9];
                        if (!!_.isNil(codeZipPath)) return [3 /*break*/, 9];
                        this.logger.debug("removing zip code: " + codeZipPath);
                        _g.label = 6;
                    case 6:
                        _g.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, fse.unlink(codeZipPath)];
                    case 7:
                        _g.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _g.sent();
                        this.logger.warn(stdout_formatter_1.default.stdoutFormatter.warn('remove zipped code', "path: " + codeZipPath + ", error: " + e_2.message));
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FcFunction.prototype.packRemoteCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var syncedCodePath, zipPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.syncRemoteCode()];
                    case 1:
                        syncedCodePath = _a.sent();
                        return [4 /*yield*/, fse.ensureDir(static_1.FC_CODE_CACHE_DIR)];
                    case 2:
                        _a.sent();
                        zipPath = path_1.default.join(static_1.FC_CODE_CACHE_DIR, this.credentials.AccountID + "-" + this.region + "-" + this.serviceName + "-" + this.name + "-remote.zip");
                        return [4 /*yield*/, zip_1.pack(syncedCodePath, null, zipPath)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcFunction.prototype.makeFunctionCode = function (baseDir, pushRegistry) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var alicloudAcr, zippedCode, zipCodeFilePath, zipCodeFileSize, zipCodeFileHash, alicloudOss, defaultObjectName, uploadVm, e_3;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        this.logger.debug('waiting for making function code.');
                        if (!(isCustomContainerRuntime((_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.runtime) && !_.isNil(pushRegistry))) return [3 /*break*/, 3];
                        if (!!this.useRemote) return [3 /*break*/, 2];
                        alicloudAcr = new acr_1.AlicloudAcr(pushRegistry, this.serverlessProfile, this.credentials, this.region);
                        return [4 /*yield*/, alicloudAcr.pushImage((_b = this.localConfig) === null || _b === void 0 ? void 0 : _b.customContainerConfig.image)];
                    case 1:
                        _k.sent();
                        _k.label = 2;
                    case 2: return [2 /*return*/, {}];
                    case 3:
                        if (!!isCustomContainerRuntime((_c = this.localConfig) === null || _c === void 0 ? void 0 : _c.runtime)) return [3 /*break*/, 12];
                        // zip
                        this.logger.debug("waiting for packaging function: " + this.name + " code...");
                        zippedCode = void 0;
                        if (!this.useRemote) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.packRemoteCode()];
                    case 4:
                        // TODO: remote code not upload when use remote
                        zippedCode = _k.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!((_d = this.localConfig) === null || _d === void 0 ? void 0 : _d.codeUri)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.zipCode(baseDir)];
                    case 6:
                        zippedCode = _k.sent();
                        _k.label = 7;
                    case 7:
                        zipCodeFilePath = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.filePath;
                        zipCodeFileSize = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.fileSizeInBytes;
                        zipCodeFileHash = zippedCode === null || zippedCode === void 0 ? void 0 : zippedCode.fileHash;
                        this.logger.debug("zipped code path: " + zipCodeFilePath + ", zipped code size: " + zipCodeFileSize);
                        if (zipCodeFileSize > FcFunction.MAX_CODE_SIZE_WITH_OSS) {
                            // >100M
                            throw new Error("Size of zipped code: " + zipCodeFilePath + " is greater than code size: 100M.You can use:\n1. layers: https://help.aliyun.com/document_detail/193057.html\n2. custom container: https://help.aliyun.com/document_detail/179368.html");
                        }
                        if (zipCodeFileSize <= FcFunction.MAX_CODE_SIZE_WITH_CODEURI) {
                            // <= 50M
                            return [2 /*return*/, { codeZipPath: zipCodeFilePath }];
                        }
                        // 50M < zipCodeFileSize <= 100M
                        this.logger.info("Size of zipped code: " + zipCodeFilePath + " is between (50M, 100M], fc will upload code to oss.");
                        if (!((_e = this.localConfig) === null || _e === void 0 ? void 0 : _e.ossBucket)) {
                            throw new Error('Please provide ossBucket attribute under function property when code size is between (50M, 100M].');
                        }
                        alicloudOss = new oss_1.AlicloudOss((_f = this.localConfig) === null || _f === void 0 ? void 0 : _f.ossBucket, this.credentials, this.region);
                        return [4 /*yield*/, alicloudOss.isBucketExists()];
                    case 8:
                        if (!(_k.sent())) {
                            throw new Error('Please provide existed ossBucket under your account when code size is between (50M, 100M].');
                        }
                        defaultObjectName = "fcComponentGeneratedDir/" + this.serviceName + "-" + this.name + "-" + zipCodeFileHash.substring(0, 5);
                        uploadVm = core.spinner("Uploading zipped code: " + zipCodeFilePath + " to oss://" + ((_g = this.localConfig) === null || _g === void 0 ? void 0 : _g.ossBucket) + "/" + defaultObjectName);
                        _k.label = 9;
                    case 9:
                        _k.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, alicloudOss.putFileToOss(zipCodeFilePath, defaultObjectName)];
                    case 10:
                        _k.sent();
                        uploadVm.succeed("Upload zipped code: " + zipCodeFilePath + " to oss://" + ((_h = this.localConfig) === null || _h === void 0 ? void 0 : _h.ossBucket) + "/" + defaultObjectName + " success.");
                        return [2 /*return*/, {
                                codeZipPath: zipCodeFilePath,
                                codeOssObject: defaultObjectName,
                            }];
                    case 11:
                        e_3 = _k.sent();
                        uploadVm.fail("Upload zipped code: " + zipCodeFilePath + " to oss://" + ((_j = this.localConfig) === null || _j === void 0 ? void 0 : _j.ossBucket) + "/" + defaultObjectName + " failed.");
                        throw e_3;
                    case 12: return [2 /*return*/, {}];
                }
            });
        });
    };
    FcFunction.prototype.makeFunction = function (baseDir, type, pushRegistry) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var resolvedFunctionConf, _d, codeZipPath, codeOssObject;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (_.isEmpty(this.localConfig) && _.isEmpty(this.remoteConfig)) {
                            this.statefulConfig = null;
                            return [2 /*return*/, null];
                        }
                        resolvedFunctionConf = this.makeFunctionConfig();
                        if (!(type !== 'config')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.makeFunctionCode(baseDir, pushRegistry)];
                    case 1:
                        _d = _e.sent(), codeZipPath = _d.codeZipPath, codeOssObject = _d.codeOssObject;
                        if (!_.isNil(codeOssObject)) {
                            Object.assign(resolvedFunctionConf, {
                                ossKey: codeOssObject,
                                ossBucket: (_a = this.localConfig) === null || _a === void 0 ? void 0 : _a.ossBucket,
                            });
                        }
                        else if (!_.isNil(codeZipPath)) {
                            Object.assign(resolvedFunctionConf, {
                                codeUri: codeZipPath,
                            });
                        }
                        _e.label = 2;
                    case 2:
                        this.statefulConfig = _.cloneDeep(resolvedFunctionConf);
                        this.upgradeStatefulConfig();
                        // 环境变量中的 true 需要转换为字符串
                        if (!_.isEmpty((_b = this.statefulConfig) === null || _b === void 0 ? void 0 : _b.environmentVariables)) {
                            Object.keys((_c = this.statefulConfig) === null || _c === void 0 ? void 0 : _c.environmentVariables).forEach(function (key) {
                                var _a, _b, _c;
                                if (_.isBoolean((_a = _this.statefulConfig) === null || _a === void 0 ? void 0 : _a.environmentVariables[key])) {
                                    // @ts-ignore
                                    (_b = _this.statefulConfig) === null || _b === void 0 ? void 0 : _b.environmentVariables[key] = _.toString((_c = _this.statefulConfig) === null || _c === void 0 ? void 0 : _c.environmentVariables[key]);
                                }
                            });
                        }
                        return [2 /*return*/, resolvedFunctionConf];
                }
            });
        });
    };
    FcFunction.DEFAULT_BUILD_ARTIFACTS_PATH_SUFFIX = path_1.default.join('.s', 'build', 'artifacts');
    FcFunction.DEFAULT_SYNC_CODE_PATH = path_1.default.join(os_1.default.homedir(), '.s', 'cache', 'fc-deploy', 'remote-code');
    FcFunction.MAX_CODE_SIZE_WITH_OSS = !isNaN(parseInt(process.env.FC_CODE_SIZE_WITH_OSS, 10)) ? parseInt(process.env.FC_CODE_SIZE_WITH_OSS, 10) : 104857600; // 100M
    FcFunction.MAX_CODE_SIZE_WITH_CODEURI = !isNaN(parseInt(process.env.FC_CODE_SIZE_WITH_CODEURI, 10)) ? parseInt(process.env.FC_CODE_SIZE_WITH_CODEURI, 10) : 52428800; // 50M
    return FcFunction;
}(fc_deploy_1.default));
exports.FcFunction = FcFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2ZjL2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFFO0FBQ3JFLHdDQUE0QjtBQUM1Qix1Q0FBOEM7QUFDOUMsOENBQXdCO0FBQ3hCLG9DQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsNENBQWdDO0FBQ2hDLHNDQUFpRjtBQUNqRiwwREFBbUM7QUFDbkMsaUVBQTBDO0FBQzFDLDBEQUE4QztBQUM5QywwQ0FBb0I7QUFDcEIsOEJBQWdDO0FBQ2hDLHFEQUFnRDtBQUNoRCwwQ0FBNEQ7QUFDNUQsbUZBQTREO0FBQzVELHNDQUF5RDtBQUN6RCx1Q0FBOEM7QUE0RDlDLFNBQWdCLHdCQUF3QixDQUFDLE9BQWU7SUFDdEQsT0FBTyxPQUFPLEtBQUssa0JBQWtCLENBQUM7QUFDeEMsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFBZ0MsOEJBQXdCO0lBU3RELG9CQUFZLFlBQTRCLEVBQUUsV0FBbUIsRUFBRSxpQkFBb0MsRUFBRSxNQUFjLEVBQUUsV0FBeUIsRUFBRSxPQUFnQixFQUFFLElBQWE7UUFBL0ssWUFDRSxrQkFBTSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBRzNFO1FBRkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsS0FBSSxDQUFDLElBQUksR0FBRyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsSUFBSSxDQUFDOztJQUNqQyxDQUFDO0lBQ0ssOEJBQVMsR0FBZixVQUFnQixTQUFtQjs7Ozs7d0JBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIscUJBQU0sSUFBSSxDQUFDLGVB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