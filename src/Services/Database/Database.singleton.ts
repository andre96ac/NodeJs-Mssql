//############## SERVIZIO DI COLLEGAMENTO AL DB ###################




import * as database from 'mssql'
export class DatabaseService{

    //##########################region parametri di connessione al DB Mssql ##########################
    private configParams : database.config = {

        server: '', //server name here
        user: '', //DB account username here
        password: '', //DB account psw here
        database: '', //DB name here
    };
    //#endregion


    
    private static _instance: DatabaseService;

    public static get instance(){
        if (!this._instance){
            this._instance = new DatabaseService();
        }
        return this._instance;
    }

    
    private _connect(){

        return new Promise<database.ConnectionPool>((resolve, reject) => {
            console.info('Collegamento al DB... ' + this.configParams.database)
            let connessione = new database.ConnectionPool(this.configParams, error => {
                if (error){
                    console.log('Errore qui');
                    console.log(error);
                    reject(error);

                }
            })
            console.log(this.configParams);
            connessione.connect()
                .then((connessione) => {
            
                        console.info('Collegamento al DB effettuato');
                        resolve(connessione);
                } )
                .catch(error => {
                    console.log('Errore di connessione');
                    console.log (error);
                    reject(error);
                })
               
        })
    }


    /**
     * Esegue una query sul db
     * ############# ATTENZIONE! utilizzare solo stringhe parametrizzate per prevenire sql injecion #############
     * @param strQuery la stringa TEMPLATE (es: SELECT @colonna FROM @tabella ) secondo specifiche Mssql
     * @param queryParams l'oggetto contenente i parametri (es: {colonna: 'nome', tabella: 'utente'})
     */
    private _query(strQuery:string, queryParams:QueryParam | QueryParam[]){
        return new Promise<database.IResult<any>> ((resolve, reject) => {
            this._connect()
                .then((connessione) => {

                    //creo una richiesta
                    const richiesta = new database.PreparedStatement(connessione);
                    
                    let finalParams = new Object();

                    //controllo se ho uno o più parametri
                    if (queryParams){
                        if (!Array.isArray(queryParams)){

                            //ho un solo elemento
                            richiesta.input(queryParams.columName, queryParams.columType);
                            finalParams[queryParams.columName]  = queryParams.value;

                        }
                        else{
                            if(queryParams.length>0){

                                //abbiamo un array di condizioni e non è vuoto
                                queryParams.forEach(elem => {
                                    //aggiungo ogni elemento alla richiesta ed ai paramentri finali
                                    richiesta.input(elem.columName, elem.columType);
                                    finalParams[elem.columName]  = elem.value;

                                })
                            }
                        }
                    }

                    //ora che ho tutto posso preparare e poi eseguire la richiesta
                    richiesta.prepare(strQuery, error => {
                        if (error){

                            //c'è stato un errore con la query parametrizzata
                            console.error('Errore con la stringa interpolata');
                            console.error(error);
                            reject(error);
                        }
                        else{
                            //posso eseguire la richiesta
                            richiesta.execute(finalParams)
                            .then(result => {

                                richiesta.unprepare()
                                .then(() => {
                                    console.log('Query effettuata con successo');
                                    console.log(result);
                                    resolve(result);
                                })
                                .catch(error => {
                                    console.error('Errore nel rilascio della richiesta');
                                    console.error(error);
                                    reject(error);
                                })
                            })
                            .catch(error => {
                                console.error('Errore nella query: ');
                                console.error(error);
                                reject(error);
                                
                            })
                        }
                    })
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    /**
     * Effettua una select 
     * @param colums colonna o colonne da chiedere al db (default *)
     * @param table Tabella su cui eseguire la select
     * @param conditions condizione o array di condizioni where (opzionale)
     */
    select(table: string, colums?:string | string[], conditions?: SelectCondition | SelectCondition[]){
        return new Promise<database.IResult<any>>((resolve, reject) => {
            
            //questo è il template della query
            let myQuery: string ;
            myQuery = 'SELECT ';

            //se non mi danno le colonne, presumo siano tutte
            if (!colums){
                colums = '*';
            }
            if(!Array.isArray(colums)){
                //Abbiamo una singolo parametro colonna
                myQuery += colums;
            }
            else{
                //abbiamo un array
                if (colums.length > 0){
                    //l'array non è vuoto, aggiungo il primo elemento
                    myQuery += (colums[0]);

                    //se ci sono altri elementi oltre al primo, li aggiungo separati da virgole
                    for (let i = 1;  i < colums.length; i++){
                        myQuery += (',' + ' ' + colums[i]);
                    }
                }
            }

            //TODO Da capire come fare la join
            myQuery += ` FROM ${table}`;
            
            if (conditions){
                //ci sono delle condizioni

                if (!Array.isArray(conditions)){

                    //c'è solo una condizione

                    //aggiungo alla query il where
                    myQuery += ` WHERE ${conditions.columName} = @${conditions.columName}`;
                }
                else{
                    if (conditions.length>0){

                        //abbiamo un array di condizioni
                        //inserisco la prima
                        myQuery += ` WHERE ${conditions[0].columName} = @${conditions[0].columName}`;
                        
                        if (conditions.length>=1){
                            //abbiamo più di una condizione
                            
                            for (let i = 1; i < conditions.length; i++){

                                //aggiungo tutte le altre condizioni con l'AND
                                myQuery += ` AND ${conditions[i].columName} = @${conditions[i].columName}`;
                            }
                         }
                    }
                }
            }

            //ora abbiamo la query da interpolare pronta, posso chiamare il metodo _query

            this._query(myQuery, conditions)
            .then (result => {
                resolve (result);
            })
            .catch (error => {
                reject (error);
            })
        })
    }

    /**
     * Crea una nuova riga nella tabella specificata, e vi inserisce i valori passati
     * @param table La tabella in cui inserire i valori
     * @param values L'array di valori da inserire 
     */
    insert(table: string,  values: InsertValue[]){

        return new Promise ((resolve, reject) => {

            
            if (values && values.length != 0){
                
                let myQuery: string = `INSERT INTO ${table} (`;
                let myQueryValues: string =`VALUES (`

                myQuery += values[0].columName
                //abbiamo i parametri, aggiungo il primo
                myQueryValues += `@${values[0].columName}`;
    
                //se abbiamo altri parametri li aggiungo
                for(let i=1; i<values.length; i++){
                    myQuery += `, ${values[i].columName}`
                    myQueryValues += `, @${values[i].columName}`;
                }
                
                myQueryValues += ')'
                //alla fine aggiungo la )
                myQuery += ') ';
                myQuery += myQueryValues;

                //abbiamo tutto, possiamo fare la query
                this._query(myQuery, values)
                .then(result => {
                    console.log(result);
                    resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    reject();
                })
            }
        })
    }

    /**
     * Esegue un aggiornamento sulla riga/e di una tabella
     * @param table La tabella su cui effettuare la update
     * @param values l'array di valori da modificare all'interno di una riga
     * @param conditions L'array di condizioni per individuare la riga/e da modificare
     */
    update(table: string, values:UpdateValue[], conditions:SelectCondition[] ){
        return new Promise ((resolve, reject) => {
            if (table && values && conditions && values.length > 0 && conditions.length > 0){
                //abbiamo tutti i parametri necessari
                let finalQueryParams : QueryParam[] = [];
                let finalQueryParam : QueryParam;

                //sistemo il primo parametro e la prima condizione
                let strUpdate = `UPDATE ${table}`;
                let strSet = `SET ${values[0].columName} = @value${values[0].columName}`;
                let strWhere = `WHERE ${conditions[0].columName} = @condition${conditions[0].columName}`;
                let finalString = '';

                finalQueryParam = new QueryParam(`value${values[0].columName}`, values[0].value);
                finalQueryParams.push(finalQueryParam);
                finalQueryParam = new QueryParam(`condition${conditions[0].columName}`, conditions[0].value);
                finalQueryParams.push(finalQueryParam);

                //se presenti, sistemo gli altri valori
                for (let i = 1; i < values.length; i++){

                    strSet += `, ${values[i].columName} = @value${values[i].columName}`

                    finalQueryParam = new QueryParam(`value${values[i].columName}`, values[i].value);
                    finalQueryParams.push(finalQueryParam);
                }
                //se presenti, sistemo le altre condizioni
                for (let i = 1; i < conditions.length; i++){

                    strWhere += ` AND ${conditions[i].columName} = @condition${conditions[i].columName}`

                    finalQueryParam = new QueryParam(`condition${conditions[i].columName}`, conditions[i].value);
                    finalQueryParams.push(finalQueryParam);
                }

                //finisco di sistemare le stringhe e le unisco
                finalString = strUpdate + ' ' + strSet + ' ' + strWhere;

                //ora che ho tutto, posso fare la query

                this._query(finalString, finalQueryParams)
                .then(result => {
                    console.log(result);
                    resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    reject();
                })

                   
            }
        })
    }

    createGuid(){  
        function S4() {  
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
        }  
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
    }

};




//#region classi accessorie (parametri)
export class QueryParam{

    private _columType: database.ISqlTypeFactoryWithNoParams;
    private _columName: string
    private _value: any;

    /**
     * 
     * @param columName Il nome della colonna
     * @param value Il valore della colonna
     */
    constructor(columName: string, value: number | boolean | string){
        if (typeof value == "number"){
            this._columType = database.Numeric;
        }
        else if (typeof value == "boolean"){
            this._columType = database.Bit;
        }
        else if (typeof value == "string" ){
            this._columType = database.VarChar;
        }

        this._columName = columName;
        this._value = value;
    }

    get value(){
        return this._value;
    }
    get columName(){
        return this._columName;
    }
    get columType(){
        return this._columType;
    }
}

export class SelectCondition extends QueryParam{

    constructor(columName: string, value: number | boolean | string){
        super(columName, value);
    }
}

export class InsertValue extends QueryParam{
    constructor(columName: string, value: number | boolean | string){
        super(columName, value);
    }
}

export class UpdateValue extends QueryParam{
    constructor(columName: string, value: number | boolean | string){
        super(columName, value);
    }
}

//#endregion

