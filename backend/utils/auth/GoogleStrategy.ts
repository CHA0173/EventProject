import * as express from 'express';
import * as passport from 'passport';
import { GoogleStrategy } from 'passport-google-oauth20';
// Import Facebook and Google OAuth apps configs
import  google  from '../../config';


export default ()=>{
  
  // Transform Google profile into user object
  const transformGoogleProfile = (profile) => ({
    name: profile.displayName,
    avatar: profile.image.url,
  });
  
  
  // Register Google Passport strategy
  passport.use(new GoogleStrategy(google,
    async (accessToken, refreshToken, profile, done) => done(null, transformGoogleProfile(profile._json))
  ));
  
  // Serialize user into the sessions
  passport.serializeUser((user, done) => done(null, user));
  
  // Deserialize user from the sessions
  passport.deserializeUser((user, done) => done(null, user));
  
  // Initialize http server
  const app = express();
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

}
  
  
  
  // Set up Google auth routes



