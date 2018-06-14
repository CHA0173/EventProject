import * as express from "express";
// import * as path from "path";
import * as bodyParser from "body-parser";
// import * as jwt from 'jwt-simple';
// import axios from 'axios';  
import * as dotenv from 'dotenv';
import * as Knex  from 'knex';
//  

import * as Knexfile from './knexfile';

import UserService from "./service/usersService";
import UserRouter from "./router/usersRouter";

import EventService from "./service/eventService";
import EventRouter from "./router/eventRouter";





dotenv.config();

const app = express();

const PORT = process.env.PORT || '3030';
const NODE_ENV = process.env.NODE_ENV || 'development';
const knex = Knex(Knexfile[NODE_ENV]);

const userService = new UserService(knex);  
const userRouter = new UserRouter(userService);

const eventService = new EventService(knex);
const eventRouter = new EventRouter(eventService);

// const toDoListService = new ToDoListService(knex);
// const toDoListRouter = new ToDoListRouter(toDoListService);

// const attendeesService = new AttendeesService(knex);
// const attendeesRouter = new AttendeesRouter(attendeesService);

app.use(bodyParser.json());
app.use('/api/users/events',eventRouter.router()); 
app.use('/api/users', userRouter.router())




app.listen(PORT, () => {
  console.log(`server start in ${PORT}`);
} )