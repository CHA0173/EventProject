import * as express from 'express';
import SearchService from '../services/SearchService';

export default class SearchRouter {
    private searchService: SearchService;

    constructor(searchService:SearchService) {
        this.searchService = searchService;
    }
    
    getRouter() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        return router;
    }

    get(req: express.Request,res: express.Response) {
        return this.searchService.result(req.query.name, res)
            .then((data) => {
                res.json(data)
            })
            .catch((err: express.Errback) => {
                res.status(500).json(err)
            })
    }
}