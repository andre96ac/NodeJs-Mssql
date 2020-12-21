"use strict";
// Copyright 2020 Andrea Cuppini
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicClass = exports.Structure = void 0;
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
var IdDocument_document_1 = require("../IdDocument/IdDocument.document");
var Account_document_1 = require("../../Documents/Examples/Account/Account.document");
var Evento_document_1 = require("../../Documents/Examples/Evento/Evento.document");
var Registrazione_document_1 = require("../../Documents/Examples/Registrazione/Registrazione.document");
var Titolo_document_1 = require("../../Documents/Examples/Titolo/Titolo.document");
var Router_1 = require("../../Services/Router/Router");
exports.Structure = {
    IdDocument: IdDocument_document_1.IdDocument,
    Account: Account_document_1.Account,
    Evento: Evento_document_1.Evento,
    Registrazione: Registrazione_document_1.Registrazione,
    Titolo: Titolo_document_1.Titolo
};
var DynamicClass = /** @class */ (function () {
    function DynamicClass(className, opts) {
        if (exports.Structure[className] === undefined || exports.Structure[className] === null) {
            throw new Router_1.RequestError("Documento inesistente", 404);
        }
        else {
            return new exports.Structure[className](opts);
        }
    }
    return DynamicClass;
}());
exports.DynamicClass = DynamicClass;
//# sourceMappingURL=Structure.js.map