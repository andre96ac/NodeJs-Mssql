

// Copyright 2020 Andrea Cuppini

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


import { IdDocument } from "../../Library/IdDocument/IdDocument.document";
import { DynamicClass } from "../../Library/Structure/Structure";
import { DatabaseService, SelectCondition } from "../Database/Database.singleton";
import express from 'express';
import { request } from "http";



export class RouterService {
   
    req: express.Request;
    res: express.Response;
    docName: string;

    method: string;

        
    constructor(request: express.Request, response: express.Response){
        this.req = request;
        this.res = response;

        this.docName = this.req.params.document;

    }

    onWebApi(method: Requests){
        
        //GESTORE PRINCIPALE WEBAPI
        try{
            switch(method){
                case Requests.GET: 
                    this._onGet();
    
                break;
                
                case Requests.POST:
                    this._onPost();
                break;
    
                default:
    
                
    
            }

        }
        catch(error){
            this.res.status(error['code']).send(error['message']);
        }


    }



    private _onGet(){

        //qui faccio un doppio passaggio, creo un oggetto generico any, poi lo assegno ad un oggetto specifico idDocument. 
        //ind questo modo evito errori del compilatore
        let genericObj: any = new DynamicClass(this.docName);
        let myDocument: IdDocument = genericObj;
        
        //vediamo se l'oggetto è esposto
        if (myDocument.descriptor.enabledForWebApi){
            
            //creo i parametri per la richiesta
            let myParams: SelectCondition[] = this.prepareSelectConditions();
            
            //recupero la collection
            myDocument.loadCollection(myParams)
            .then(results => {
                //la invio
                this.res.send(results);
            })               
        }
        else{
          
            throw new RequestError(`Documento ${myDocument.className} non esposto`, 403);
            
        }

    }
    
    private prepareSelectConditions(): SelectCondition[]{
        let selectConditions: SelectCondition[] = [];

        let reqParams = this.req.query;

        let arNameProperties: string[] = Object.keys(reqParams);

        arNameProperties.forEach(propertyName => {

            //anche qui faccio un doppio passaggio per evitare errori del compilatore (vedi riga 33-34)
            let propertyValue : any = reqParams[propertyName]
            let selectCondition = new SelectCondition(propertyName, propertyValue);
            selectConditions.push(selectCondition);
        })
        


        return selectConditions;

    }


    private _onPost(){


        //creo il mio documento
        let genericObj: any = new DynamicClass(this.docName);
        let myDocument: IdDocument = genericObj;

        if(myDocument.descriptor.enabledForWebApi){
            
            //se il documento è esposto, controllo il method override
        
    
            let method: string | string[]= this.req.headers['x-html-method-override'];

            //controllo se c'è un metodo
            if (method){

                //controllo che il metodo sia solo uno
                if (!Array.isArray(method))
                {
                    //controllo che il metodo richiesto sia abilitato per le web api
                    if(myDocument.isMethodEnabledForWebApi(method)){

                            //tutto a posto, posso eseguire il metodo
                            let result: PostResult = myDocument[method](this.req.body);

                            this.res.status(result.code).send(result.message);

                    }
                    else{
                        throw new RequestError(`Metodo ${method} non esposto nel documento ${myDocument.className}`, 403);
                        
                    }

                }
                //se ha specificato più di un metodo, non posso fare nulla
                else{
                    throw new RequestError(`Rilevati specificazione di metodo duplicata ${myDocument.className}`, 400);
                }
            }
            //altrimenti vuole fare una post generica
            else{
                throw new RequestError(`Post generica non abilitata nel documento ${myDocument.className}`, 403);
            }
        }
        else{
            //Documento non esposto
            throw new RequestError(`Documento ${myDocument.className} non esposto`, 403);

        }


    }
    
}

export class RequestError extends Error{
    code: number;
    constructor (message: string, errorCode: number){
        super(message);
        this.code = errorCode;
    }
}


export enum Requests {
    'GET', 'POST', 'PUT', 'INSERT', 'DELETE'
}

export class PostResult{
    message: string;
    code: number;
}