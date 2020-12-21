//########### ESEMPIO D'USO ####################


import { IdDocument } from "../../Library/IdDocument/IdDocument.document";

export class Titolo extends IdDocument{
    nome: string;

    constructor(){
        super();
        this.nome = '';


        this.descriptor.className = 'Titolo'
    }


}