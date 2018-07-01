import * as express     from 'express';

import AuthRouter       from './AuthRouter';

import SignUpRouter     from './SignUpRouter';
import SignUpService    from '../services/SignUpService';

import UserRouter       from './UserRouter';
import UserService      from '../services/UserService';


import EventRouter      from './EventRouter';
import EventService     from '../services/EventService';

/**
 * API Routes
 * -------------------------
 * Handle requests from /api
 */
export default class ApiRouter {
    
    constructor(
        private jwtAuth:any,
        private userService: UserService, 
        private eventService: EventService,
        private signupService: SignUpService) {
        
        this.eventService = eventService;
        this.userService = userService;
        this.signupService = signupService;
    }

    getRouter() {
        const router         = express.Router();
        const eventRouter    = new EventRouter(this.eventService)
        const authRouter     = new AuthRouter(this.userService);
        const signupRouter   = new SignUpRouter(this.signupService);
        const userRouter     = new UserRouter(this.userService);

        router.use("/auth", authRouter.getRouter());//returns with jwt token
        router.use("/signup", signupRouter.getRouter());
        router.use("/users", this.jwtAuth.authenticate(), userRouter.getRouter());      //grabs user's profile
        router.use("/events", this.jwtAuth.authenticate(), eventRouter.getRouter());         //grabs user's events
        return router;

        //test script3



    }
}