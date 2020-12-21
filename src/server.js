"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var Router_1 = require("./Services/Router/Router");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
    }
    Server.prototype.execute = function () {
        this.app.get('/api/:document', function (req, res) {
            // richiesta get
            // console.log(req);
            // let documento: string = req.params.document;
            // res.send(documento);
            var router = new Router_1.RouterService(req, res);
            router.onWebApi(Router_1.Requests.GET);
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
        this.app.post('/api/:document', function (req, res) {
            var router = new Router_1.RouterService(req, res);
            router.onWebApi(Router_1.Requests.POST);
        });
        this.app.use(function (req, res) {
            res.status(404).send('Not found');
        });
        this.app.listen(3000, function () {
            console.log('App is listening on port 3000!');
        });
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
server.execute();
//# sourceMappingURL=server.js.map