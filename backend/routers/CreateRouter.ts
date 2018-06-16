import * as express from 'express';
import CreateService from '../services/CreateService';

export default class CreateRouter {
    private createService: CreateService;

    constructor(createService: CreateService) {
        this.createService = createService;
    }
    getRouter() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        router.post("/", this.add.bind(this));
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
    add(req :any, res: express.Response) {
        return this.createService.saveNewEvent(req.body, req.user)
            .then((data) => {
                res.json(data)
            })
            .catch((err: express.Errback) => {
                res.status(500).json(err)
            })
    }
}