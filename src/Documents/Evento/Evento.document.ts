
//########### ESEMPIO D'USO ####################


import { IdDocument } from "../../Library/IdDocument/IdDocument.document";

export class Evento extends IdDocument{
    nome: string;
    dataOraInizio: Date;
    dataOraFine: Date;
    idAccount: string;

    constructor(onlyInstance = false){
        super();
        if (!onlyInstance){
            this.nome = '';
            this.dataOraInizio = new Date();
            this.dataOraFine = new Date();
            this.idAccount = '';
        }

        this.descriptor.className = 'Evento'



    }
}