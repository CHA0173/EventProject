import * as express       from 'express';
import SignUpService      from '../services/SignUpService';






export default class SignUpRouter {
  constructor(private SignUpService: SignUpService) {
      this.SignUpService = SignUpService;
  }

  getRouter() {
      let router = express.Router();
      router.post("/", this.createUser);

      return router;
  }

  createUser = (req: any, res: any) => { 
      return this.SignUpService.addUser(req.body)
          .then((data) => res.json(data))
          .catch((err: express.Errback) => res.status(500).json(err));
  }



}