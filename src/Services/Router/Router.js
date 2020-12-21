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
exports.PostResult = exports.Requests = exports.RequestError = exports.RouterService = void 0;
var Structure_1 = require("../../Library/Structure/Structure");
var Database_singleton_1 = require("../Database/Database.singleton");
var RouterService = /** @class */ (function () {
    function RouterService(request, response) {
        this.req = request;
        this.res = response;
        this.docName = this.req.params.document;
    }
    RouterService.prototype.onWebApi = function (method) {
        //GESTORE PRINCIPALE WEBAPI
        try {
            switch (method) {
                case Requests.GET:
                    this._onGet();
                    break;
                case Requests.POST:
                    this._onPost();
                    break;
                default:
            }
        }
        catch (error) {
            this.res.status(error['code']).send(error['message']);
        }
    };
    RouterService.prototype._onGet = function () {
        var _this = this;
        //qui faccio un doppio passaggio, creo un oggetto generico any, poi lo assegno ad un oggetto specifico idDocument. 
        //ind questo modo evito errori del compilatore
        var genericObj = new Structure_1.DynamicClass(this.docName);
        var myDocument = genericObj;
        //vediamo se l'oggetto è esposto
        if (myDocument.descriptor.enabledForWebApi) {
            //creo i parametri per la richiesta
            var myParams = this.prepareSelectConditions();
            //recupero la collection
            myDocument.loadCollection(myParams)
                .then(function (results) {
                //la invio
                _this.res.send(results);
            });
        }
        else {
            throw new RequestError("Documento " + myDocument.className + " non esposto", 403);
        }
    };
    RouterService.prototype.prepareSelectConditions = function () {
        var selectConditions = [];
        var reqParams = this.req.query;
        var arNameProperties = Object.keys(reqParams);
        arNameProperties.forEach(function (propertyName) {
            //anche qui faccio un doppio passaggio per evitare errori del compilatore (vedi riga 33-34)
            var propertyValue = reqParams[propertyName];
            var selectCondition = new Database_singleton_1.SelectCondition(propertyName, propertyValue);
            selectConditions.push(selectCondition);
        });
        return selectConditions;
    };
    RouterService.prototype._onPost = function () {
        //creo il mio documento
        var genericObj = new Structure_1.DynamicClass(this.docName);
        var myDocument = genericObj;
        if (myDocument.descriptor.enabledForWebApi) {
            //se il documento è esposto, controllo il method override
            var method = this.req.headers['x-html-method-override'];
            //controllo se c'è un metodo
            if (method) {
                //controllo che il metodo sia solo uno
                if (!Array.isArray(method)) {
                    //controllo che il metodo richiesto sia abilitato per le web api
                    if (myDocument.isMethodEnabledForWebApi(method)) {
                        //tutto a posto, posso eseguire il metodo
                        var result = myDocument[method](this.req.body);
                        this.res.status(result.code).send(result.message);
                    }
                    else {
                        throw new RequestError("Metodo " + method + " non esposto nel documento " + myDocument.className, 403);
                    }
                }
                //se ha specificato più di un metodo, non posso fare nulla
                else {
                    throw new RequestError("Rilevati specificazione di metodo duplicata " + myDocument.className, 400);
                }
            }
            //altrimenti vuole fare una post generica
            else {
                throw new RequestError("Post generica non abilitata nel documento " + myDocument.className, 403);
            }
        }
        else {
            //Documento non esposto
            throw new RequestError("Documento " + myDocument.className + " non esposto", 403);
        }
    };
    return RouterService;
}());
exports.RouterService = RouterService;
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError(message, errorCode) {
        var _this = _super.call(this, message) || this;
        _this.code = errorCode;
        return _this;
    }
    return RequestError;
}(Error));
exports.RequestError = RequestError;
var Requests;
(function (Requests) {
    Requests[Requests["GET"] = 0] = "GET";
    Requests[Requests["POST"] = 1] = "POST";
    Requests[Requests["PUT"] = 2] = "PUT";
    Requests[Requests["INSERT"] = 3] = "INSERT";
    Requests[Requests["DELETE"] = 4] = "DELETE";
})(Requests = exports.Requests || (exports.Requests = {}));
var PostResult = /** @class */ (function () {
    function PostResult() {
    }
    return PostResult;
}());
exports.PostResult = PostResult;
//# sourceMappingURL=Router.js.map