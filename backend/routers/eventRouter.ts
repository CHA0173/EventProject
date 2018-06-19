import * as express from "express";
import EventService from '../services/EventService';


export default class EventRouter{
  private EventService: EventService;

  constructor(EventService: EventService){
      this.EventService = EventService;
  }

  router(){
    let router = express.Router();
    router.post("/",this.postEvent.bind(this));
    router.get("/:id",this.getEvent.bind(this));
    router.put("/:id",this.putEvent.bind(this));
    return router;
  }

  getEvent(req: express.Request,res:express.Response){
    return this.EventService.list(req.params.id)
    .then((data) => {
      console.log(data)
      res.json(data)
    })
    .catch((err:express.Errback) =>{
      res.status(500).json(err)
    })
  }

  putEvent(req:express.Request,res:express.Response){
    return this.EventService.update(req.params.id,req.body)
    .then((data) => {
      res.json(data)
    })
    .catch((err:express.Errback) => {
      res.status(500).json(err)
    })
  }

  postEvent(req:express.Request,res:express.Response){
    return this.EventService.update

  }

  
}