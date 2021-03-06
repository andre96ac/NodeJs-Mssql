
// Copyright 2020 Andrea Cuppini

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


//########### ESEMPIO D'USO ####################


import { IdDocument } from "../../../Library/IdDocument/IdDocument.document";

export class Titolo extends IdDocument{
    nome: string;

    constructor(){
        super();
        this.nome = '';


        this.descriptor.className = 'Titolo'
    }


}