import * as express     from 'express';

import AuthRouter       from './AuthRouter';

import UserRouter       from './UserRouter';
import UserService      from '../services/UserService';

import SearchRouter     from './SearchRouter';

import TemplateRouter   from './TemplateRouter';
import TemplateService  from '../services/TemplateService';

import EventRouter      from './EventRouter';
import EventService     from '../services/EventService';

/**
 * API Routes
 * -------------------------
 * Handle requests from /api
 */
export default class ApiRouter {
    
    constructor(/* private jwtAuth:any,*/
        private userService: UserService, 
        private templateService: TemplateService, 
        private eventService: EventService) {
        // this.jwtAuth = jwtAuth;
        this.eventService = eventService;
        this.templateService = templateService;
        this.userService = userService;
    }

    getRouter() {
        const router         = express.Router();
        const eventRouter    = new EventRouter(this.eventService)
        const authRouter     = new AuthRouter(this.userService);
        const userRouter     = new UserRouter(this.userService);
        const searchRouter   = new SearchRouter(this.eventService);
        const templateRouter = new TemplateRouter(this.templateService);

        router.use("/auth", authRouter.getRouter());//returns with jwt token
        router.use("/users", /*this.jwtAuth.authenticate(),*/ userRouter.getRouter());      //grabs user's profile
        router.use("/search", /*this.jwtAuth.authenticate(),*/ searchRouter.getRouter());       //grabs search results
        router.use("/events", /*this.jwtAuth.authenticate(),*/ eventRouter.getRouter());         //grabs user's events
        router.use("/templates", /*this.jwtAuth.authenticate(),*/ templateRouter.getRouter());   //grabs user's events
        return router;
    }
}