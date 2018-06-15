import * as express from 'express';
import AuthRouter   from './AuthRouter';
import UserRouter   from './UserRouter';
import UserService  from '../services/UserService';
import SearchRouter   from './SearchRouter';
import SearchService  from '../services/SearchService';


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
    
    constructor(jwtAuth:any, userService: UserService, searchService: SearchService) {
        // this.jwtAuth = jwtAuth;
        this.userService = userService;
        this.searchService = searchService;
        this.searchRouter = this.searchRouter;
    }

    getRouter() {
        const router = express.Router();
        const authRouter = new AuthRouter();
        const userRouter = new UserRouter(this.userService);
        const searchRouter = new SearchRouter(this.searchService)

        router.use("/auth", authRouter.getRouter());//returns with jwt token
        router.use("/users", /*this.jwtAuth.authenticate(),*/ userRouter.getRouter());//grabs user's profile
        router.use("/search", /*this.jwtAuth.authenticate(),*/ searchRouter.getRouter());//grabs search results
        return router;
    }
}