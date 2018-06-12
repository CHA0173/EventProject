import * as express from 'express';
import SearchService from '../services/SearchService';

class ResultRouter {
    private searchService: SearchService;

    constructor(searchService:SearchService) {
        this.searchService = searchService;
    }
    
    router() {
        let router = express.Router();
        router.get("/", this.get.bind(this));
        return router;
    }

    get(req: express.Request,res: express.Response) {
        return this.searchService.result(req.query.name, req.query.dateTime, req.query.type)
            .then((data) => {
                res.json(data)
            })
            .catch((err: express.Errback) => {
                res.status(500).json(err)
            })
    }
}