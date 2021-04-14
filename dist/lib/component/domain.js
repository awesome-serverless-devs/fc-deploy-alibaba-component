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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainComponent = void 0;
var component_1 = require("./component");
var DomainComponent = /** @class */ (function (_super) {
    __extends(DomainComponent, _super);
    function DomainComponent(serverlessProfile, serviceName, functionName, region, credentials, curPath, args) {
        var _this = _super.call(this, serverlessProfile, region, credentials, curPath, args) || this;
        _this.serviceName = serviceName;
        _this.functionName = functionName;
        return _this;
    }
    DomainComponent.prototype.genComponentProp = function () {
        return {
            type: 'fc',
            user: this.credentials.AccountID,
            region: this.region,
            service: this.serviceName,
            function: this.functionName,
        };
    };
    return DomainComponent;
}(component_1.Component));
exports.DomainComponent = DomainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnQvZG9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5Q0FBd0M7QUFFeEM7SUFBcUMsbUNBQVM7SUFJNUMseUJBQVksaUJBQW9DLEVBQUUsV0FBbUIsRUFBRSxZQUFvQixFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUFFLE9BQWdCLEVBQUUsSUFBYTtRQUF2SyxZQUNFLGtCQUFNLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUc3RDtRQUZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOztJQUNuQyxDQUFDO0lBRUQsMENBQWdCLEdBQWhCO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUztZQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWTtTQUM1QixDQUFDO0lBQ0osQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFxQyxxQkFBUyxHQW1CN0M7QUFuQlksMENBQWUifQ==