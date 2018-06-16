import * as express from 'express';
import AuthRouter   from './AuthRouter';
import UserRouter   from './UserRouter';
import UserService  from '../services/UserService';
import SearchRouter   from './SearchRouter';
import SearchService  from '../services/SearchService';
import UpcomingRouter   from './UpcomingRouter';
import UpcomingService  from '../services/UpcomingService';
import CreateRouter from './CreateRouter';
import CreateService from '../services/CreateService';



/**
 * API Routes
 * -------------------------
 * Handle requests from /api
 */

export default class ApiRouter {
    // private jwtAuth:any
    private createService: CreateService;
    private createRouter: CreateRouter;
    private userService: UserService;
    private upcomingService: UpcomingService;
    private searchService: SearchService;
    private userRouter: UserRouter;
    private searchRouter: SearchRouter;
    private upcomingRouter: UpcomingRouter;
    private authRouter: AuthRouter;

    
    constructor(jwtAuth:any, userService: UserService, searchService: SearchService, upcomingService: UpcomingService, createService: CreateService) {
        // this.jwtAuth = jwtAuth;
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

    }

    getRouter() {
        const router = express.Router();
        const authRouter = new AuthRouter();
        const userRouter = new UserRouter(this.userService);
        const searchRouter = new SearchRouter(this.searchService)
        const upcomingRouter = new UpcomingRouter(this.upcomingService)
        const createRouter = new CreateRouter(this.createService)


        router.use("/auth", authRouter.getRouter());//returns with jwt token
        router.use("/myprofile", /*this.jwtAuth.authenticate(),*/ userRouter.getRouter());//grabs user's profile
        router.use("/search", /*this.jwtAuth.authenticate(),*/ searchRouter.getRouter());//grabs search results
        router.use("/upcoming", /*this.jwtAuth.authenticate(),*/ upcomingRouter.getRouter());//grabs user's events
        router.use("/create", /*this.jwtAuth.authenticate(),*/ createRouter.getRouter());//grabs user's events
        return router;
    }
}