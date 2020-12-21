"use strict";
// Copyright 2020 Andrea Cuppini
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdDocument = void 0;
// This file is part of Nodejs-Mssql.
// Nodejs-Mssql is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// Nome-Programma is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with Nome-Programma.  If not, see <http://www.gnu.org/licenses/>.
var Descriptor_1 = require("../Descriptor/Descriptor");
var Database_singleton_1 = require("../../Services/Database/Database.singleton");
var IdDocument = /** @class */ (function () {
    function IdDocument(onlyInstance) {
        if (onlyInstance === void 0) { onlyInstance = false; }
        if (!onlyInstance) {
            this.id = Database_singleton_1.DatabaseService.instance.createGuid();
        }
        this.descriptor = new Descriptor_1.Descriptor();
    }
    /**
     * recupera dal db una collection di tipo this
     * @param selectConditions i parametri da inserire nella query
     */
    IdDocument.prototype.loadCollection = function (selectConditions) {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            var lista = [];
            Database_singleton_1.DatabaseService.instance.select(_this_1.descriptor.className, null, selectConditions)
                .then(function (rawLista) {
                //TODO  QUI SI POTREBBE UTILIZZARE UNA SETJSONPROPERTY PER SISTEMARE I VALORI
                lista = rawLista.recordset;
                resolve(lista);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    // /**
    //  * controlla se una key (proprietà o metodo) esiste nella classe
    //  * @param propName il nome della key da controllare
    //  */
    // hasProperty(propName: string): boolean{
    //     let keys = this.pro;
    //     console.log(keys)
    //     return false;
    // }
    IdDocument.prototype.isMethodEnabledForWebApi = function (method) {
        return this.descriptor.enabledMethodsForPost.includes(method);
    };
    Object.defineProperty(IdDocument.prototype, "className", {
        get: function () {
            return this.descriptor.className;
        },
        enumerable: false,
        configurable: true
    });
    return IdDocument;
}());
exports.IdDocument = IdDocument;
//# sourceMappingURL=IdDocument.document.js.map