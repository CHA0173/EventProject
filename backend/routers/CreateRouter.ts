import * as express from 'express';
import CreateService from '../services/CreateService';
// const app = express()
import * as multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ dest: '../public/images', storage: storage });


export default class CreateRouter {
    private createService: CreateService;

    constructor(createService: CreateService) {
        this.createService = createService;
        
    }
    getRouter() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        router.post("/", upload.single("eventPhoto"),this.add.bind(this));
        return router;
    }
    get(req: express.Request, res: express.Response) {
        return this.createService.getTemplate()
            .then((data) => {
                res.json(data)
            })
            .catch((err: express.Errback) => {
                res.status(500).json(err)
            })
    }
    add(req :express.Request, res: express.Response) {
        return this.createService.saveNewEvent(req.body, 1, req.file, res)
            .then((data:any) => {
                res.json(data)
            })
            .then((pathName:any) => {
                console.log("res", res)
                // res.redirect(`../events?id=${res}`)//Assuming res is the id of the event
            })
            .catch((err: express.Errback) => {
                res.status(500).json(err)
            })
    }

}