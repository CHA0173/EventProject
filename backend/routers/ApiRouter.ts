import * as express from 'express';
import * as Knex from "knex";
import AuthRouter   from './AuthRouter';
import UserRouter   from './UserRouter';
import UserService  from '../services/UserService';
import SearchRouter   from './SearchRouter';
import SearchService  from '../services/SearchService';
import UpcomingRouter   from './UpcomingRouter';
import UpcomingService  from '../services/UpcomingService';
import CreateRouter from './CreateRouter';
import CreateService from '../services/CreateService';
import EventRouter from './eventRouter';
import EventService from '../services/eventService';



/**
 * API Routes
 * -------------------------
 * Handle requests from /api
 */

export default class ApiRouter {

    private jwtAuth:any
    private createService: CreateService;
    private createRouter: CreateRouter;
    private userService: UserService;
    private upcomingService: UpcomingService;
    private searchService: SearchService;
    private userRouter: UserRouter;
    private searchRouter: SearchRouter;
    private upcomingRouter: UpcomingRouter;
    private authRouter: AuthRouter;
    private eventRouter: EventRouter; 
    private eventService: EventService;
    public knex:Knex;



    
    constructor(jwtAuth:any, userService: UserService, searchService: SearchService, upcomingService: UpcomingService, createService: CreateService, eventService: EventService, knex:Knex) {
        this.jwtAuth = jwtAuth;
        this.knex = knex;
        this.createRouter = this.createRouter
        this.createService = createService
        this.searchService = searchService
        this.upcomingService = upcomingService
        this.searchService = searchService
        this.userRouter = this.userRouter
        this.userService = userService
        this.searchRouter = this.searchRouter
        this.upcomingRouter = this.upcomingRouter
        this.authRouter = this.authRouter
        this.eventRouter = this.eventRouter
        this.eventService = eventService

    }

    getRouter() {
        const router = express.Router();
        const authRouter = new AuthRouter();
        const userRouter = new UserRouter(this.userService);
        const searchRouter = new SearchRouter(this.searchService)
        const upcomingRouter = new UpcomingRouter(this.upcomingService)
        const createRouter = new CreateRouter(this.createService)
        const eventRouter = new EventRouter(this.eventService)



        router.use("/auth", authRouter.getRouter());//returns with jwt token
        router.use("/myprofile", this.jwtAuth.authenticate(), userRouter.getRouter());//grabs user's profile
        router.use("/search", this.jwtAuth.authenticate(), searchRouter.getRouter());//grabs search results
        router.use("/upcoming", this.jwtAuth.authenticate(), upcomingRouter.getRouter());//grabs user's events
        router.use("/create", this.jwtAuth.authenticate(), createRouter.getRouter());//grabs user's events
        router.use("/event", this.jwtAuth.authenticate(), eventRouter.router());
        return router;

    }
}