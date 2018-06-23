import * as express from 'express';
import TemplateService from '../services/TemplateService';

/**
 * Template Routes
 * -------------------------
 * Handle requests from /template
 */
export default class TemplateRouter {

    constructor(private templateService: TemplateService) {
        this.templateService = templateService;        
    }

    getRouter() {
        const router = express.Router();
        router.get("/", this.get);
        return router;
    }

    get = (req: express.Request, res: express.Response) => {
        return this.templateService.getAll()
            .then((data) => res.json(data))
            .catch((err: express.Errback) => res.status(500).json(err))
    }
}