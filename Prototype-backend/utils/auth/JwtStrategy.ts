import * as passport    from 'passport'
import * as PassportJWT from 'passport-jwt';
import config           from '../../config';
import UserService      from '../../services/UserService';


export default (userService: UserService) => {
    const strategy = new PassportJWT.Strategy({
      secretOrKey     : config.jwtSecret,
      jwtFromRequest  : PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => { 
        const user = await userService.getById(payload.id);
        return (user) ? done(null, {id: user.id}) : done(new Error("User not found"), null);
    });


    passport.use(strategy);

 
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user, done) => {
        return done(null, user);
    });


    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", config.jwtSession)
    };
    
}
