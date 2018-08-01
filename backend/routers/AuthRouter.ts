import * as express from "express";
// import axios from "axios";
import * as jwtSimple from "jwt-simple";

import config from "../config";
import UserService from "../services/UserService";

/**
 * Authenciation Routes
 * -------------------------
 * Handle requests from /auth
 */
export default class AuthRouter {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  getRouter() {
    const router = express.Router();
    router.post("/local", this.localLogin);
    // router.post("/google", this.loginWithGoogle);
    // router.post("/facebook", this.loginWithFacebook);
    return router;
  }
  


  //Completed  
  localLogin = (req: any, res: any) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.sendStatus(401);
    }
    this.userService
      .getByEmail(email, password)
      .then(userId => {
        if (userId) {
          let payload = {
            id: userId.id
          };
          // console.log("payload",payload.id)
          const token = jwtSimple.encode(payload, config.jwtSecret);
          res.json({ token: token });
        }
      })
      .catch(err => res.sendStatus(401));
  };
   
//this is a test
//this is a test
//this is a test

  // loginWithGoogle = async (req: express.Request, res: express.Response) => {//validates access token with google
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
  // loginWithFacebook = async (req: express.Request, res: express.Response) => {//validates access token with facebook
  //     const accessToken = req.body.accessToken;
  //     console.log(accessToken);

  //     if (!accessToken) {
  //         res.sendStatus(401);
  //     }

  //     try {
  //         const authResult = await axios.get(``)//Find facebook OAuth

  //         if (authResult.data.error) {
  //             res.sendStatus(401);
  //         }

  //         const token = jwtSimple.encode({ id: accessToken, info: authResult.data }, config.jwtSecret);
  //         res.json({ token: token });
  //     } catch (err) {
  //         res.sendStatus(401);
  //     }2
  // }
// }

//https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}
}