"use strict";
// Copyright 2020 Andrea Cuppini
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
// This file is part of ArduinoAcquario.
// ArduinoAcquario is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// Nome-Programma is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with Nome-Programma.  If not, see <http://www.gnu.org/licenses/>.
//########### ESEMPIO D'USO ####################
var IdDocument_document_1 = require("../../../Library/IdDocument/IdDocument.document");
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