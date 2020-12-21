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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateValue = exports.InsertValue = exports.SelectCondition = exports.QueryParam = exports.DatabaseService = void 0;
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
//############## SERVIZIO DI COLLEGAMENTO AL DB ###################
var database = __importStar(require("mssql"));
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
        //##########################region parametri di connessione al DB Mssql ##########################
        this.configParams = {
            server: '',
            user: '',
            password: '',
            database: '',
        };
    }
    Object.defineProperty(DatabaseService, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new DatabaseService();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    DatabaseService.prototype._connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.info('Collegamento al DB... ' + _this.configParams.database);
            var connessione = new database.ConnectionPool(_this.configParams, function (error) {
                if (error) {
                    console.log('Errore qui');
                    console.log(error);
                    reject(error);
                }
            });
            console.log(_this.configParams);
            connessione.connect()
                .then(function (connessione) {
                console.info('Collegamento al DB effettuato');
                resolve(connessione);
            })
                .catch(function (error) {
                console.log('Errore di connessione');
                console.log(error);
                reject(error);
            });
        });
    };
    /**
     * Esegue una query sul db
     * ############# ATTENZIONE! utilizzare solo stringhe parametrizzate per prevenire sql injecion #############
     * @param strQuery la stringa TEMPLATE (es: SELECT @colonna FROM @tabella ) secondo specifiche Mssql
     * @param queryParams l'oggetto contenente i parametri (es: {colonna: 'nome', tabella: 'utente'})
     */
    DatabaseService.prototype._query = function (strQuery, queryParams) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connect()
                .then(function (connessione) {
                //creo una richiesta
                var richiesta = new database.PreparedStatement(connessione);
                var finalParams = new Object();
                //controllo se ho uno o più parametri
                if (queryParams) {
                    if (!Array.isArray(queryParams)) {
                        //ho un solo elemento
                        richiesta.input(queryParams.columName, queryParams.columType);
                        finalParams[queryParams.columName] = queryParams.value;
                    }
                    else {
                        if (queryParams.length > 0) {
                            //abbiamo un array di condizioni e non è vuoto
                            queryParams.forEach(function (elem) {
                                //aggiungo ogni elemento alla richiesta ed ai paramentri finali
                                richiesta.input(elem.columName, elem.columType);
                                finalParams[elem.columName] = elem.value;
                            });
                        }
                    }
                }
                //ora che ho tutto posso preparare e poi eseguire la richiesta
                richiesta.prepare(strQuery, function (error) {
                    if (error) {
                        //c'è stato un errore con la query parametrizzata
                        console.error('Errore con la stringa interpolata');
                        console.error(error);
                        reject(error);
                    }
                    else {
                        //posso eseguire la richiesta
                        richiesta.execute(finalParams)
                            .then(function (result) {
                            richiesta.unprepare()
                                .then(function () {
                                console.log('Query effettuata con successo');
                                console.log(result);
                                resolve(result);
                            })
                                .catch(function (error) {
                                console.error('Errore nel rilascio della richiesta');
                                console.error(error);
                                reject(error);
                            });
                        })
                            .catch(function (error) {
                            console.error('Errore nella query: ');
                            console.error(error);
                            reject(error);
                        });
                    }
                });
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * Effettua una select
     * @param colums colonna o colonne da chiedere al db (default *)
     * @param table Tabella su cui eseguire la select
     * @param conditions condizione o array di condizioni where (opzionale)
     */
    DatabaseService.prototype.select = function (table, colums, conditions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //questo è il template della query
            var myQuery;
            myQuery = 'SELECT ';
            //se non mi danno le colonne, presumo siano tutte
            if (!colums) {
                colums = '*';
            }
            if (!Array.isArray(colums)) {
                //Abbiamo una singolo parametro colonna
                myQuery += colums;
            }
            else {
                //abbiamo un array
                if (colums.length > 0) {
                    //l'array non è vuoto, aggiungo il primo elemento
                    myQuery += (colums[0]);
                    //se ci sono altri elementi oltre al primo, li aggiungo separati da virgole
                    for (var i = 1; i < colums.length; i++) {
                        myQuery += (',' + ' ' + colums[i]);
                    }
                }
            }
            //TODO Da capire come fare la join
            myQuery += " FROM " + table;
            if (conditions) {
                //ci sono delle condizioni
                if (!Array.isArray(conditions)) {
                    //c'è solo una condizione
                    //aggiungo alla query il where
                    myQuery += " WHERE " + conditions.columName + " = @" + conditions.columName;
                }
                else {
                    if (conditions.length > 0) {
                        //abbiamo un array di condizioni
                        //inserisco la prima
                        myQuery += " WHERE " + conditions[0].columName + " = @" + conditions[0].columName;
                        if (conditions.length >= 1) {
                            //abbiamo più di una condizione
                            for (var i = 1; i < conditions.length; i++) {
                                //aggiungo tutte le altre condizioni con l'AND
                                myQuery += " AND " + conditions[i].columName + " = @" + conditions[i].columName;
                            }
                        }
                    }
                }
            }
            //ora abbiamo la query da interpolare pronta, posso chiamare il metodo _query
            _this._query(myQuery, conditions)
                .then(function (result) {
                resolve(result);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     * Crea una nuova riga nella tabella specificata, e vi inserisce i valori passati
     * @param table La tabella in cui inserire i valori
     * @param values L'array di valori da inserire
     */
    DatabaseService.prototype.insert = function (table, values) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (values && values.length != 0) {
                var myQuery = "INSERT INTO " + table + " (";
                var myQueryValues = "VALUES (";
                myQuery += values[0].columName;
                //abbiamo i parametri, aggiungo il primo
                myQueryValues += "@" + values[0].columName;
                //se abbiamo altri parametri li aggiungo
                for (var i = 1; i < values.length; i++) {
                    myQuery += ", " + values[i].columName;
                    myQueryValues += ", @" + values[i].columName;
                }
                myQueryValues += ')';
                //alla fine aggiungo la )
                myQuery += ') ';
                myQuery += myQueryValues;
                //abbiamo tutto, possiamo fare la query
                _this._query(myQuery, values)
                    .then(function (result) {
                    console.log(result);
                    resolve(result);
                })
                    .catch(function (error) {
                    console.log(error);
                    reject();
                });
            }
        });
    };
    /**
     * Esegue un aggiornamento sulla riga/e di una tabella
     * @param table La tabella su cui effettuare la update
     * @param values l'array di valori da modificare all'interno di una riga
     * @param conditions L'array di condizioni per individuare la riga/e da modificare
     */
    DatabaseService.prototype.update = function (table, values, conditions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (table && values && conditions && values.length > 0 && conditions.length > 0) {
                //abbiamo tutti i parametri necessari
                var finalQueryParams = [];
                var finalQueryParam = void 0;
                //sistemo il primo parametro e la prima condizione
                var strUpdate = "UPDATE " + table;
                var strSet = "SET " + values[0].columName + " = @value" + values[0].columName;
                var strWhere = "WHERE " + conditions[0].columName + " = @condition" + conditions[0].columName;
                var finalString = '';
                finalQueryParam = new QueryParam("value" + values[0].columName, values[0].value);
                finalQueryParams.push(finalQueryParam);
                finalQueryParam = new QueryParam("condition" + conditions[0].columName, conditions[0].value);
                finalQueryParams.push(finalQueryParam);
                //se presenti, sistemo gli altri valori
                for (var i = 1; i < values.length; i++) {
                    strSet += ", " + values[i].columName + " = @value" + values[i].columName;
                    finalQueryParam = new QueryParam("value" + values[i].columName, values[i].value);
                    finalQueryParams.push(finalQueryParam);
                }
                //se presenti, sistemo le altre condizioni
                for (var i = 1; i < conditions.length; i++) {
                    strWhere += " AND " + conditions[i].columName + " = @condition" + conditions[i].columName;
                    finalQueryParam = new QueryParam("condition" + conditions[i].columName, conditions[i].value);
                    finalQueryParams.push(finalQueryParam);
                }
                //finisco di sistemare le stringhe e le unisco
                finalString = strUpdate + ' ' + strSet + ' ' + strWhere;
                //ora che ho tutto, posso fare la query
                _this._query(finalString, finalQueryParams)
                    .then(function (result) {
                    console.log(result);
                    resolve(result);
                })
                    .catch(function (error) {
                    console.log(error);
                    reject();
                });
            }
        });
    };
    DatabaseService.prototype.createGuid = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
;
//#region classi accessorie (parametri)
var QueryParam = /** @class */ (function () {
    /**
     *
     * @param columName Il nome della colonna
     * @param value Il valore della colonna
     */
    function QueryParam(columName, value) {
        if (typeof value == "number") {
            this._columType = database.Numeric;
        }
        else if (typeof value == "boolean") {
            this._columType = database.Bit;
        }
        else if (typeof value == "string") {
            this._columType = database.VarChar;
        }
        this._columName = columName;
        this._value = value;
    }
    Object.defineProperty(QueryParam.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QueryParam.prototype, "columName", {
        get: function () {
            return this._columName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QueryParam.prototype, "columType", {
        get: function () {
            return this._columType;
        },
        enumerable: false,
        configurable: true
    });
    return QueryParam;
}());
exports.QueryParam = QueryParam;
var SelectCondition = /** @class */ (function (_super) {
    __extends(SelectCondition, _super);
    function SelectCondition(columName, value) {
        return _super.call(this, columName, value) || this;
    }
    return SelectCondition;
}(QueryParam));
exports.SelectCondition = SelectCondition;
var InsertValue = /** @class */ (function (_super) {
    __extends(InsertValue, _super);
    function InsertValue(columName, value) {
        return _super.call(this, columName, value) || this;
    }
    return InsertValue;
}(QueryParam));
exports.InsertValue = InsertValue;
var UpdateValue = /** @class */ (function (_super) {
    __extends(UpdateValue, _super);
    function UpdateValue(columName, value) {
        return _super.call(this, columName, value) || this;
    }
    return UpdateValue;
}(QueryParam));
exports.UpdateValue = UpdateValue;
//#endregion
//# sourceMappingURL=Database.singleton.js.map