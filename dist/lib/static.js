"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_HELP_INFO = exports.DEPLOY_HELP_INFO = exports.COMPONENT_HELP_INFO = exports.DESCRIPTION = exports.FC_NAS_SERVICE_PREFIX = exports.FC_CODE_CACHE_DIR = exports.FC_BASE_CACHE_DIR = exports.SUPPORTED_REMOVE_ARGS = exports.FUNCTION_CONF_DEFAULT = void 0;
var os = __importStar(require("os"));
var path = __importStar(require("path"));
exports.FUNCTION_CONF_DEFAULT = {
    description: 'This is default function description by fc-deploy component',
    runtime: 'nodejs10',
    handler: 'index.handler',
    memorySize: 128,
    timeout: 3,
    caPort: 9000,
    instanceConcurrency: 1,
    instanceType: 'e1',
    codeUri: './',
};
exports.SUPPORTED_REMOVE_ARGS = ['service', 'function', 'trigger', 'domain'];
exports.FC_BASE_CACHE_DIR = path.join(os.homedir(), '.s/cache/fc-base');
exports.FC_CODE_CACHE_DIR = path.join(exports.FC_BASE_CACHE_DIR, 'code');
exports.FC_NAS_SERVICE_PREFIX = '_FC_NAS_';
exports.DESCRIPTION = 'generated by fc-deploy component';
exports.COMPONENT_HELP_INFO = [
    {
        header: 'fc-deploy component',
        content: 'You can use the component to deploy/remove your alicloud function computer resources.',
    },
    {
        header: 'Synopsis',
        content: '$ fc-deploy <command> <options>',
    },
    {
        header: 'Command List',
        content: [
            { name: 'help', summary: 'Display help information.' },
            { name: 'deploy', summary: 'Deploy alicloud function computer resources.' },
            { name: 'remove', summary: 'Remove alicloud function computer resources.' },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'assumeYes',
                description: 'Assume that the answer to any question which would be asked is yes.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            '$ fc-deploy {bold deploy} {bold --assumeYes}',
            '$ fc-deploy {bold remove} {underline service}',
            '$ fc-deploy {bold help}',
        ],
    },
];
exports.DEPLOY_HELP_INFO = [
    {
        header: 'Remove resources',
        content: 'Deploy resources',
    },
    {
        header: 'Usage',
        content: '$ fc-deploy deploy',
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'assumeYes',
                description: 'Assume that the answer to any question which would be asked is yes.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
];
exports.REMOVE_HELP_INFO = [
    {
        header: 'Remove resources',
        content: 'Specify RESOURCE to remove it and resource belonging to it.\n' +
            'If service is specified, service and its functions should be removed.\n' +
            'If function is specified, function and its triggers should be removed.\n' +
            'If trigger is specified, you can specify the trigger name to remove the specific trigger or remove all triggers without name.\n' +
            'If domain is specified, you can specify the domain name to remove the specific domain or remove all domains without name.',
    },
    {
        header: 'Usage',
        content: '$ fc-deploy remove <RESOURCE> <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'name',
                description: 'Resource name to be removed, only for trigger/domain resource.',
                alias: '-n',
                type: String,
            },
            {
                name: 'help',
                description: 'Help for rm.',
                alias: 'h',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: [
            {
                name: 'assumeYes',
                description: 'Assume that the answer to any question which would be asked is yes.',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Examples',
        content: [
            '$ remove {bold remove} {underline service}',
            '$ remove {bold remove} {underline function}',
            '$ remove {bold remove} {underline trigger} [{bold --name} {underline name}]',
            '$ remove {bold remove} {underline domain} [{bold --name} {underline name}]',
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9zdGF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF5QjtBQUN6Qix5Q0FBNkI7QUFFaEIsUUFBQSxxQkFBcUIsR0FBRztJQUNuQyxXQUFXLEVBQUUsNkRBQTZEO0lBQzFFLE9BQU8sRUFBRSxVQUFVO0lBQ25CLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLFVBQVUsRUFBRSxHQUFHO0lBQ2YsT0FBTyxFQUFFLENBQUM7SUFDVixNQUFNLEVBQUUsSUFBSTtJQUNaLG1CQUFtQixFQUFFLENBQUM7SUFDdEIsWUFBWSxFQUFFLElBQUk7SUFDbEIsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRVcsUUFBQSxxQkFBcUIsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JFLFFBQUEsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUNoRSxRQUFBLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDekQsUUFBQSxxQkFBcUIsR0FBRyxVQUFVLENBQUM7QUFDbkMsUUFBQSxXQUFXLEdBQUcsa0NBQWtDLENBQUM7QUFFakQsUUFBQSxtQkFBbUIsR0FBRztJQUNqQztRQUNFLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLHVGQUF1RjtLQUNqRztJQUNEO1FBQ0UsTUFBTSxFQUFFLFVBQVU7UUFDbEIsT0FBTyxFQUFFLGlDQUFpQztLQUMzQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTtZQUN0RCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLDhDQUE4QyxFQUFFO1lBQzNFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsOENBQThDLEVBQUU7U0FDNUU7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsV0FBVyxFQUFFLHFFQUFxRTtnQkFDbEYsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZDtTQUNGO0tBQ0Y7SUFDRDtRQUNFLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE9BQU8sRUFBRTtZQUNQLDhDQUE4QztZQUM5QywrQ0FBK0M7WUFDL0MseUJBQXlCO1NBQzFCO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxnQkFBZ0IsR0FBRztJQUM5QjtRQUNFLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLGtCQUFrQjtLQUM1QjtJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsb0JBQW9CO0tBQzlCO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHO0lBQzlCO1FBQ0UsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUsK0RBQStEO1lBQzVFLHlFQUF5RTtZQUN6RSwwRUFBMEU7WUFDMUUsaUlBQWlJO1lBQ2pJLDJIQUEySDtLQUN4SDtJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUseUNBQXlDO0tBQ25EO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsZ0VBQWdFO2dCQUM3RSxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsTUFBTTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxPQUFPO2FBQ2Q7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNkO1NBQ0Y7S0FDRjtJQUNEO1FBQ0UsTUFBTSxFQUFFLFVBQVU7UUFDbEIsT0FBTyxFQUFFO1lBQ1AsNENBQTRDO1lBQzVDLDZDQUE2QztZQUM3Qyw2RUFBNkU7WUFDN0UsNEVBQTRFO1NBQzdFO0tBQ0Y7Q0FDRixDQUFDIn0=