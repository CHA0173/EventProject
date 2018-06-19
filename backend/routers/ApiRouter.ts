import * as express from 'express';
import AuthRouter   from './AuthRouter';
import UserRouter   from './UserRouter';
import UserService  from '../services/UserService';
import SearchRouter   from './SearchRouter';
import SearchService  from '../services/SearchService';
import EventRouter from './eventRouter';
import EventService from '../services/eventService'


/**
 * API Routes
 * -------------------------
 * Handle requests from /api
 */

export default class ApiRouter {

    // private jwtAuth:any
    private userService: UserService;
    private searchService: SearchService;
    private searchRouter: SearchRouter;
    private eventService: EventService;
    private eventRouter: EventRouter;
    
    constructor(jwtAuth:any, userService: UserService, searchService: SearchService) {
        // this.jwtAuth = jwtAuth;
        this.userService = userService;
        this.searchService = searchService;
        this.searchRouter = this.searchRouter;
        this.eventService= this.eventService;
        this.eventRouter= this.eventRouter;
    }

    getRouter() {
        const router = express.Router();
        const authRouter = new AuthRouter();
        const userRouter = new UserRouter(this.userService);
        const searchRouter = new SearchRouter(this.searchService);
        const eventRouter = new EventRouter(this.eventService);

        router.use("/auth", authRouter.getRouter());//returns with jwt token
        router.use("/users", /*this.jwtAuth.authenticate(),*/ userRouter.getRouter());//grabs user's profile
        router.use("/search", /*this.jwtAuth.authenticate(),*/ searchRouter.getRouter());//grabs search results
        router.use("/event",eventRouter.router());
        return router;
    }
}