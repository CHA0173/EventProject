import * as express from 'express'
import UpcomingService from '../services/UpcomingService';

export default class UserRouter {
    private upcomingService: UpcomingService;

    constructor(upcomingService: UpcomingService) {
        this.upcomingService = upcomingService;
    }

    getRouter() {
        let router = express.Router();
        router.get("/", this.get.bind(this));//binds call to current class
        return router;//passes data back to front
    }

    get(req: express.Request, res: express.Response) {//checks if user's access token matches with the one in 
    // req.query.user
        return this.upcomingService.myEvents(req.query.userid)//cannot read property myEvents of undefined
            .then((data) => {//passes data back to getRouter
                res.json(data)
            })
            .catch((err: express.Errback) => {
                res.status(500).json(err)
            });
    }
}

