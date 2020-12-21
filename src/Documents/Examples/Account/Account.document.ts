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




//########### ESEMPIO D'USO ####################



import { IdDocument } from "../../../Library/IdDocument/IdDocument.document";
import { PostResult } from "../../../Services/Router/Router";

export class Account extends IdDocument{
    username: string;
    psw: string;
    shaPsw: string;

    constructor(onlyInstance: boolean = false){

        
        super();
        if (!onlyInstance){
            this.username = '';
            this.psw = '';
            this.shaPsw = '';
        }

        
        this.descriptor.className = 'Account'

        //abilito la classe per le chiamate webapi
        this.descriptor.enabledForWebApi = true;

        //abilito il metodo methodProva per le chiamate POST
        this.descriptor.enabledMethodsForPost = ['methodProva'];
        
    }

    /**
     * Questo metodo verrà eseguito tramite una chiamata POST alla tabella Account, con header 'x-html-method-override: methodProva'
     */
    methodProva(requestBody){

        let result: PostResult = new PostResult();
        result.code = 200;
        result.message = 'ok';
        console.log(requestBody);
        console.log('Metodo eseguito correttamente');

        return  result;
    }
}