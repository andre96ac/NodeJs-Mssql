"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var IdDocument_document_1 = require("../../Library/IdDocument/IdDocument.document");
var Router_1 = require("../../Services/Router/Router");
var Account = /** @class */ (function (_super) {
    __extends(Account, _super);
    function Account(onlyInstance) {
        if (onlyInstance === void 0) { onlyInstance = false; }
        var _this = _super.call(this) || this;
        if (!onlyInstance) {
            _this.username = '';
            _this.psw = '';
            _this.shaPsw = '';
        }
        _this.descriptor.className = 'Account';
        _this.descriptor.enabledForWebApi = true;
        _this.descriptor.enabledMethodsForPost = ['methodProva'];
        return _this;
    }
    Account.prototype.methodProva = function () {
        var result = new Router_1.PostResult();
        result.code = 200;
        result.message = 'ok';
        console.log('Metodo eseguito correttamente');
        return result;
    };
    return Account;
}(IdDocument_document_1.IdDocument));
exports.Account = Account;
//# sourceMappingURL=Account.document.js.map