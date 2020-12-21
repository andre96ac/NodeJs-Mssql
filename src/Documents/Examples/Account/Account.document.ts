
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