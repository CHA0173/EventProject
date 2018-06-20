import * as express from "express";
import EventService from '../services/EventService';
import * as multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ dest: '../public/images', storage: storage });



export default class EventRouter {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  getRouter() {
    let router = express.Router();
    router.get("/", this.getEvent.bind(this));
    router.post("/", upload.single("eventPhoto"), this.postEvent.bind(this))
    router.put("/", this.putEvent.bind(this));
    router.delete("/", this.deleteEvent.bind(this));
    return router;
  }

  getEvent(req: express.Request, res: express.Response) {
    console.log("req.query.eid", req.query.eid);
    return this.eventService.listEvent(req.query.eid, res)//PARAMS DOESNT WORK
      .then((data) => {
        console.log("res", data)
        res.json(data)
      })
      .catch((err: express.Errback) => {
        res.status(500).json(err)
      })
  }

  postEvent(req: express.Request, res: express.Response) {
    return this.eventService.saveNewEvent(req.body, req.query.userid, req.file, res)
      .then((data:any) => {
        res.json(data)
      })
      // .then((pathName: any) => {
        // console.log("res", res)
        // res.redirect(`../events?id=${res}`)//Assuming res is the id of the event
      // })
      .catch((err: express.Errback) => {
        res.status(500).json(err)
      })
  }

  putEvent(req: express.Request, res: express.Response) {
    return this.eventService.update(req.query.eventid, req.query.userid, req.body, res)
      .then((data) => {
        res.json(data)
      })
      .catch((err: express.Errback) => {
        res.status(500).json(err)
      })
  }

  deleteEvent(req: express.Request, res: express.Response) {
    return this.eventService.removeEvent(req.query.eventid, req.query.userid, res)
      .then((data) => {
        res.json(data)
      })
      .catch((err: express.Errback) => {
        res.status(500).json(err)
      })

  }



}