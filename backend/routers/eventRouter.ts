import * as express from "express";
import EventService from '../services/EventService';


export default class EventRouter{
  private eventService: EventService;

  constructor(eventService: EventService){
     this.eventService = eventService;
  }

  router(){
    let router = express.Router();
    router.get("/",this.getEvent.bind(this));
    router.put("/",this.putEvent.bind(this));
    return router;
  }

  getEvent(req: express.Request,res:express.Response){
    return this.eventService.list(req.query.userid)
    .then((data) => {
      console.log("res",data)
      res.json(data)
    })
    .catch((err:express.Errback) =>{
      res.status(500).json(err)
    })
  }

  putEvent(req:express.Request,res:express.Response){
    return this.eventService.update(req.query.id,req.body)
    .then((data) => {
      res.json(data)
    })
    .catch((err:express.Errback) => {
      res.status(500).json(err)
    })
  }
}