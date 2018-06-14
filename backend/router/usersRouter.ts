import * as express from 'express';
import UserService from '../service/usersService';

export default class UserRouter{
  private userService: UserService;

  constructor(userService: UserService){
      this.userService = userService;
  }

  router(){
      let router = express.Router();
      router.get("/",this.getUser.bind(this));
      return router;
  }

  getUser(req: express.Request, res: express.Response) {
      return this.userService.list(req.params.id)
              .then((data) => {
                  res.json(data)
              })
              .catch((err: express.Errback) => {
                  res.status(500).json(err)
              });
  }




}