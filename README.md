## NodeJs-Mssql
Semplice pattern di sviluppo per la creazione rapida di un backend in NodeJs, in grado di interfacciarsi con un DB Mssql e di esporlo tramite WebApi

NodeJs-Mssql rappresenta un esempio di workflow rapido per il setup di un'applicazione backend tramite node.
Tutte le procedure di interazione col database utilizzano la logica dei "PreparedStatements", rendendo l'architettura robusta e immune da eventuali attacchi SqlInjection


### Utilizzo: 

##### Setup:

Dopo aver preparato il DB e aver impostato i parametri di connessione nella classe DatabaseService, sarà possibile semplicemente creando delle classi "modello" ereditate           dalla classe IdDocument che rispecchino le proprietà delle tabelle del Db, ottenere l'accesso alle stesse tramite WebApi. Per definire le limitazioni di ciò che sarà esposto, sarà possibile impostare, per ogni modello, la proprietà "descriptor" ereditata da idDocument.

##### WebApi:

Le chiamate supportate sono di tipo GET e POST:
Le chiamate di tipo GET sono supportate direttamente, è possibile indicare nella query di chiamata i parametri di filtraggio, che verranno correttamente applicati.
Le chiamate di tipo POST generiche non sono attualmente supportate, ma è possibile definire, in ogni modello, dei metodi custom; tali metodi potranno essere richiamati tramite chiamate POST valorizzando, nella richiesta, l'header 'x-html-method-override; verrà dunque eseguito il metodo specificato, e il body della richiesta verrà passato come parametro al metodo custom da eseguire.

##### Interazione con il Database:

Per l'interazione diretta con il db, la classe Database mette a disposizione i metodi SELECT, INSERT E UPDATE che permettono di eseguire query sul db in modo immediato. Qualora i metodi esposti non sino adeguati/sufficienti alle necessità di programmazione, per l'interazione di più basso livello con il DB è possibile utilizzare il metodo \_query, che consente di effettuare query personalizzate sul db, passando una stringa template (come specificato dalla documentazione mssql), e l'oggetto contenente i parametri.



### Esempi di utilizzo:

All'interno della cartella src/Documents/Examples sono presenti quattro esempi di modelli che fanno riferimento ad'altrettante tabelle di un ipotetico DB; di questi, solo Evento e Account sono esposti alle WebApi, tramite l'apposita proprietà 'enabledForWebApi' dell'oggetto descriptor. 
Nel modello Account, è inoltre stato definito un metodo custom 'methodProva' a cui è possibile accedere tramite chiamata POST 
