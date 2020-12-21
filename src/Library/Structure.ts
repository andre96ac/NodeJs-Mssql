import { IdDocument } from './IdDocument/IdDocument.document'
import { Account } from '../Documents/Account/Account.document'
import { Evento } from '../Documents/Evento/Evento.document'
import { Registrazione } from '../Documents/Registrazione/Registrazione.document'
import { Titolo } from '../Documents/Titolo/Titolo.document'
import { RequestError } from '../Services/Router/Router'





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