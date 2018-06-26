import * as express from "express";
// import * as multer from "multer";

import EventService from '../services/EventService';
// const storage = multer.memoryStorage();
// const upload = multer({ dest: '../public/images', storage: storage });

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
    router.get("/:userid/upcoming/", this.getUpcoming); 
    router.get("/:id", this.getById);
   
    
    router.post("/:id/comment", this.comment);
    router.post("/", /*upload.single("eventPhoto"),*/ this.post)
    router.put("/:id/join", this.joinEvent)
    router.put("/:id", this.put);
    router.delete("/:id", this.delete);
    return router;
  }

  comment = (req:express.Request, res:express.Response) => {
    return this.eventService.addComment(req.body)
      .then((data) => res.json(data))
    .catch((err: express.Errback) => res.status(500).json(err))
  }

  searchByName = (req: express.Request,res: express.Response) => {
    return this.eventService.getByName(req.query.name)
        .then((data) => res.json(data))
        .catch((err: express.Errback) => res.status(500).json(err))
}

  joinEvent = (req:express.Request, res:express.Response) => {
    return this.eventService.joinEvent(req.body)
      .then((data) => res.json(data))
    .catch((err: express.Errback) => res.status(500).json(err))
  }

  getAll = (req:express.Request, res:express.Response) => {
    return this.eventService.getAll()
      .then((data) => res.json(data))
    .catch((err: express.Errback) => res.status(500).json(err))
  }

  getById = (req: express.Request, res: express.Response) => {
    return this.eventService.getById(req.params.id)
      .then((data) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }

  getUpcoming = (req: express.Request, res: express.Response) => { 
    return this.eventService.getUpcomingByUserId(req.params.userid)    
        .then((data) => res.json(data))
        .catch((err: express.Errback) => res.status(500).json(err));
  }

  post = (req: express.Request, res: express.Response) => {
  return this.eventService.create(req.body /*,req.file*/)
      .then((data:any) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }

  put = (req: express.Request, res: express.Response) => {
    return this.eventService.update(req.body)
      .then((data) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }

  delete = (req: express.Request, res: express.Response) => {
    return this.eventService.remove(req.params.id, req.body.userid)
      .then((data) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }
}