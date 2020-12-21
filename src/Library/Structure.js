"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicClass = exports.Structure = void 0;
var IdDocument_document_1 = require("./IdDocument/IdDocument.document");
var Account_document_1 = require("../Documents/Account/Account.document");
var Evento_document_1 = require("../Documents/Evento/Evento.document");
var Registrazione_document_1 = require("../Documents/Registrazione/Registrazione.document");
var Titolo_document_1 = require("../Documents/Titolo/Titolo.document");
var Router_1 = require("../Services/Router/Router");
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