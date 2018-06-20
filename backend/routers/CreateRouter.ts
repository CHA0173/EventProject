import * as express from 'express';
import TemplateService from '../services/TemplateService';



export default class CreateRouter {
    private templateService: TemplateService;

    constructor(templateService: TemplateService) {
        this.templateService = templateService;
        
    }
    getRouter() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        return router;
    }
    get(req: express.Request, res: express.Response) {
        return this.templateService.getTemplate()
            .then((data) => {
                res.json(data)
            })
            .catch((err: express.Errback) => {
                res.status(500).json(err)
            })
    }

}