import * as express from "express";
import ToDoListService from "../service/toDoListService";

export default class toDolistRouter{
  private toDoListService: ToDoListService;

  constructor(toDoListService: ToDoListService){
      this.toDoListService = toDoListService;
  }

  router(){
    let router = express.Router();
    router.get("/:id",this.get.bind(this))
    router.put("/:id",this.put.bind(this))
    return router;
  }

  get(req:express.Request,res:express.Response){
    return this.toDoListService.list()
      .then((data) =>{
        res.json(data)
      })
      .catch((err:express.Errback) =>{
        res.status(500).json(err)
      })
  }

  put(req:express.Request,res:express.Response){
    return this.toDoListService.update()
      .then((data) =>{
        res.json(data)
      })
      .catch((err:express.Errback) =>{
        res.status(500).json(err)
      })
  }
}