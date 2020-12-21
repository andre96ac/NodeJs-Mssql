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
exports.Registrazione = void 0;
var IdDocument_document_1 = require("../../Library/IdDocument/IdDocument.document");
var Registrazione = /** @class */ (function (_super) {
    __extends(Registrazione, _super);
    function Registrazione(onlyInstance) {
        if (onlyInstance === void 0) { onlyInstance = false; }
        var _this = _super.call(this) || this;
        if (!onlyInstance) {
            _this.nome = '';
            _this.cognome = '';
            _this.idTitolo = '';
        }
        _this.descriptor.className = 'Registrazione';
        return _this;
    }
    return Registrazione;
}(IdDocument_document_1.IdDocument));
exports.Registrazione = Registrazione;
//# sourceMappingURL=Registrazione.document.js.map