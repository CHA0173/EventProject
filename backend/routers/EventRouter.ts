import * as express from "express";
import EventService from '../services/EventService';
import * as multer from "multer";
import * as bodyparser from "body-parser";
const storage = multer.memoryStorage()
const upload = multer({ dest: '../public/images', storage: storage });

/**
 * Events Routes
 * -------------------------
 * Handle requests from /events
 */

export default class EventRouter {

  constructor(private eventService: EventService) {
    this.eventService = eventService;

  }

  getRouter() {
    const router = express.Router();
    router.get("/", this.getAll)
    router.get("/search",this.searchByName);
    router.get("/:eventid", this.getById);
    router.post("/:eventid/invite", this.invite)
    router.post("/:eventid/comment", this.comment);
    router.post("/", this.create)
    router.put("/join", this.joinEvent)
    router.put("/:eventid", this.put);
    router.delete("/:eventid", this.delete);
    router.all("/:eventid", this.updateList);
    return router;
  }

  updateList = (req:express.Request, res: express.Response) => {
    return this.eventService.updateList(req.body)
    .then((data) => res.json(data))
    .catch((err:express.Errback) => res.status(500).json(err))
  }

  invite =  (req:express.Request, res:express.Response) => {
    return this.eventService.invite(req.user, req.params.eventid, req.body)
      .then((data) => res.json(data))
    .catch((err: express.Errback) => res.status(500).json(err))
  }
  
  comment = (req:express.Request, res:express.Response) => {
    return this.eventService.addComment(req.user, req.body, req.params.eventid)
      .then((data) => res.json(data))
    .catch((err: express.Errback) => res.status(500).json(err))
  }

  searchByName = (req: express.Request,res: express.Response) => {
    return this.eventService.getByName(req.query.name)
        .then((data) => res.json(data))
        .catch((err: express.Errback) => res.status(500).json(err))
}

  joinEvent = (req:express.Request, res:express.Response) => {
    return this.eventService.joinEvent(req.user, req.body )
      .then((data) => res.json(data))
    .catch((err: express.Errback) => res.status(500).json(err))
  }

  getAll = (req:express.Request, res:express.Response) => {
    return this.eventService.getAll()
      .then((data) => res.json(data))
    .catch((err: express.Errback) => res.status(500).json(err))
  }

  getById = (req: express.Request, res: express.Response) => {
    return this.eventService.getById(req.params.eventid)
      .then((data) => res.json(data))
      .catch((err: express.Errback) => { console.log("err", err); res.status(500).json(err) })
  }


  create = (req: express.Request, res: express.Response) => {
  return this.eventService.create(req.user, req.body)
      .then((data:any) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }

  put = (req: express.Request, res: express.Response) => {
    return this.eventService.update(req.body)
      .then((data) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }

  delete = (req: express.Request, res: express.Response) => {
    return this.eventService.remove(req.user, req.params.eventid)
      .then((data) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }
}