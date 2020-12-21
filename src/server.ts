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






