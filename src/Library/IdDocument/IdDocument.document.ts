import { Descriptor } from "../Descriptor";
import { DynamicClass } from "../Structure";
import { DatabaseService, QueryParam, SelectCondition } from "../../Services/Database/Database.singleton";

export class IdDocument{
    id: string;
    descriptor:Descriptor;

    
    constructor(onlyInstance: boolean = false){
        if (!onlyInstance){
            this.id = DatabaseService.instance.createGuid();
        }

        this.descriptor = new Descriptor();

        
    }


    /**
     * recupera dal db una collection di tipo this
     * @param selectConditions i parametri da inserire nella query
     */
    loadCollection(selectConditions?: SelectCondition[]){

        let _this = this;

        return new Promise ((resolve, reject) => {

            let lista:IdDocument[] = [];
    
            DatabaseService.instance.select(this.descriptor.className,null,selectConditions )
            .then((rawLista) => {

                //TODO  QUI SI POTREBBE UTILIZZARE UNA SETJSONPROPERTY PER SISTEMARE I VALORI
                lista = rawLista.recordset;

                resolve (lista);
    
            })
            .catch(error => {
                reject(error);
            })
        })




         
    }


    // /**
    //  * controlla se una key (proprietà o metodo) esiste nella classe
    //  * @param propName il nome della key da controllare
    //  */
    // hasProperty(propName: string): boolean{


    //     let keys = this.pro;
    //     console.log(keys)
    //     return false;

    // }

    isMethodEnabledForWebApi(method: string): boolean{
            return this.descriptor.enabledMethodsForPost.includes(method);
    }

    get className(){
        return this.descriptor.className;
    }

      
}