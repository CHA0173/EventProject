import * as express from "express";
import * as multer from "multer";

import EventService from '../services/EventService';
const storage = multer.memoryStorage();
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
    router.get("/upcoming/", this.getUpcoming); 
    router.get("/:id", this.getById);

    router.post("/", upload.single("eventPhoto"), this.post)
    router.put("/", this.put);
    router.delete("/:id", this.delete);
    return router;
  }

  getById = (req: express.Request, res: express.Response) => {
    return this.eventService.getById(req.params.id)
      .then((data) => res.json(data))
      .catch((err: express.Errback) => res.status(500).json(err))
  }

  getUpcoming = (req: express.Request, res: express.Response) => {  // checks if user's access token matches with the one in 
    return this.eventService.getUpcomingByUserId(req.query.userid)    // cannot read property myEvents of undefined
        .then((data) => res.json(data))
        .catch((err: express.Errback) => res.status(500).json(err));
  }

  post = (req: express.Request, res: express.Response) => {
    return this.eventService.create(req.body, req.file)
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