
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



import { IdDocument } from '../IdDocument/IdDocument.document'
import { Account } from '../../Documents/Examples/Account/Account.document'
import { Evento } from '../../Documents/Examples/Evento/Evento.document'
import { Registrazione } from '../../Documents/Examples/Registrazione/Registrazione.document'
import { Titolo } from '../../Documents/Examples/Titolo/Titolo.document'
import { RequestError } from '../../Services/Router/Router'





export const Structure: any = {
    IdDocument,
    Account,
    Evento,
    Registrazione,
    Titolo
}

export class DynamicClass {

    constructor(className: string, opts?: any) {
        if (Structure[className] === undefined || Structure[className] === null) {
            throw new RequestError(`Documento inesistente`, 404);
        }
        else{
            return new Structure[className](opts);
        }

  
    }

    

}