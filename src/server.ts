

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


import express from 'express';
import {Requests, RouterService} from './Services/Router/Router'


export class Server{
    
    
    
    app: express.Application = express();
    
    

    execute(){
        
        this.app.get('/api/:document', (req, res) => {
                
                // richiesta get

                // console.log(req);
                // let documento: string = req.params.document;
                
                // res.send(documento);

                let router = new RouterService(req, res);

                router.onWebApi(Requests.GET);

               
            //    let valori: InsertValues[] = [];
            //    let valore = new InsertValues('id', 'FKDFKDLIFDSKFDSFD980FD9F9D8S');
            //    valori.push (valore);
            //    valore = new InsertValues('nome', 'Gianculo Vincenzi');
            //    valori.push (valore);
            //    valore = new InsertValues('progressivo', 27);
            //    valori.push (valore);
               
               
            //    DatabaseService.insert('Utente', valori)
            //    .then(() => {
            //        console.log('Inserito!!');
                   
                   
            //     })
            //     .catch(() => {
            //         console.log('Purtroppo c\'è stato un errore');
            //         res.send(400);
            //     })

            // let values =[new UpdateValue('nome', 'Finco')];
            // let conditions=[new SelectCondition('progressivo', 42)];

            // DatabaseService.instance.update('Utente', values, conditions)
            // .then(() => {
                
            //     DatabaseService.instance.select('Utente', ['progressivo', 'nome'])
            //     .then(result => {
            //         res.send(result);
            //      })
            // })
            // .catch(error => {
            //     res.send(400);
            // })
                
        });

        this.app.post('/api/:document', (req, res) => {
            let router = new RouterService(req, res);
            router.onWebApi(Requests.POST)
        })
        

        this.app.use((req, res) => {

            res.status(404).send('Not found');
        })

        this.app.listen(3000,  () => {
        
        
            console.log('App is listening on port 3000!');
        
        });
    }
}

const server: Server = new Server();
server.execute()






