import * as express from 'express';
import EventService from '../services/EventService';

/**
 * Search Route
 * -------------------------
 * Handle requests from /search
 */
export default class SearchRouter {
    constructor(private eventService:EventService) {
        this.eventService = eventService;
    }
    
    getRouter() {
        const router = express.Router();
        router.get("/", this.get);
        return router;
    }

    get = (req: express.Request,res: express.Response) => {
        return this.eventService.getByName(req.query.name)
            .then((data) => res.json(data))
            .catch((err: express.Errback) => res.status(500).json(err))
    }
}