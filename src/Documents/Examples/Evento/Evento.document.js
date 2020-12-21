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
exports.Evento = void 0;
var IdDocument_document_1 = require("../../Library/IdDocument/IdDocument.document");
var Evento = /** @class */ (function (_super) {
    __extends(Evento, _super);
    function Evento(onlyInstance) {
        if (onlyInstance === void 0) { onlyInstance = false; }
        var _this = _super.call(this) || this;
        if (!onlyInstance) {
            _this.nome = '';
            _this.dataOraInizio = new Date();
            _this.dataOraFine = new Date();
            _this.idAccount = '';
        }
        _this.descriptor.className = 'Evento';
        return _this;
    }
    return Evento;
}(IdDocument_document_1.IdDocument));
exports.Evento = Evento;
//# sourceMappingURL=Evento.document.js.map