import * as express from 'express';
// import axios from 'axios';
import * as jwtSimple from 'jwt-simple';
import config from '../config';
import * as Knex from 'knex';
import * as Knexfile from '../knexfile';
import UserService from '../services/UserService'


/**
 * API Routes
 * -------------------------
 * Handle requests from /api
 */
const knex = Knex(Knexfile[config.env]); 
const userService = new UserService(knex);

export default class AuthRouter {
    constructor() {
    }
    getRouter() {
        const router = express.Router();
        router.post("/local", this.localLogin.bind(this));
        // router.post("/google", this.loginWithGoogle.bind(this));
        // router.post("/facebook", this.loginWithFacebook.bind(this));
        return router;
    }

    localLogin(req: any, res: any, next: any) {
    console.log("req", req)

        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
        userService.findByEmail(email,password)
        
            .then(
             (result) => {
               try {
                 if (result) {
                   let payload = {
                     id: result.id,
                     email: result.email,
                     password: result.password
                   };
                   console.log("id",result.id)
                   console.log("email",result.email)
                   console.log("password",result.password)
                  //  console.log("payload",payload)
                   const token = jwtSimple.encode(payload, config.jwtSecret);
                  //  console.log("token",token);
                   res.json({ token: token });
                 }
                }
                catch (err) { 
                  res.sendStatus(401);
                }
              }
            )
        }
    }


    // async loginWithGoogle(req: express.Request, res: express.Response) {//validates access token with google
    //     const accessToken = req.body.accessToken;
    //     console.log(accessToken);

    //     if (!accessToken) {
    //         res.sendStatus(401);
    //     }

    //     try {
    //         const authResult = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)

    //         if (authResult.data.console.error) {
    //             res.sendStatus(401);
    //         }

    //         const token = jwtSimple.encode({ id: accessToken, info: authResult.data }, config.jwtSecret);
    //         res.json({ token: token });
    //     } catch (err) {
    //         res.sendStatus(401);
    //     }
    // }
//     async loginWithFacebook(req: express.Request, res: express.Response) {//validates access token with facebook
//         const accessToken = req.body.accessToken;
//         console.log(accessToken);

//         if (!accessToken) {
//             res.sendStatus(401);
//         }

//         try {
//             const authResult = await axios.get(``)//Find facebook OAuth

//             if (authResult.data.error) {
//                 res.sendStatus(401);
//             }

//             const token = jwtSimple.encode({ id: accessToken, info: authResult.data }, config.jwtSecret);
//             res.json({ token: token });  
//         } catch (err) {
//             res.sendStatus(401);
//         }
//     }

}


//https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}