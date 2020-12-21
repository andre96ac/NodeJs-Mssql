//########### ESEMPIO D'USO ####################



import { IdDocument } from "../../Library/IdDocument/IdDocument.document";

export class Registrazione extends IdDocument{
    nome: string;
    cognome: string;
    eMail: string;
    idTitolo: string;
    idEvento: string;


    constructor(onlyInstance = false){
        super();
        if (!onlyInstance){
            this.nome = '';
            this.cognome = '';
            this.idTitolo = '';

        }

        this.descriptor.className = 'Registrazione'

    }

    
}

