import * as express from 'express'
import UserService from '../services/UserService';


/**
 * User Routes
 * -------------------------
 * Handle requests from /users
 */
export default class UserRouter {
    constructor(private userService: UserService) {
        this.userService = userService;
    }

    getRouter() {
        let router = express.Router();
        router.get("/:id", this.getById);
        router.post("/:id", this.updatePhoto);
        return router;
    }


    getById = (req: express.Request, res: express.Response) => { 

        return this.userService.getEventsById(req.params.id)
            .then((data) => res.json(data))
            .catch((err: express.Errback) => res.status(500).json(err));
    }

    updatePhoto = (req: express.Request, res: express.Response) => { 
        return this.userService.updateById(req.body)
            .then((data) => res.json(data))
            .catch((err: express.Errback) => res.status(500).json(err));
    }
}