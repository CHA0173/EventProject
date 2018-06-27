import * as Knex from "knex";
// import { Promise as BlueBirdPromise } from "bluebird";
// import * as path from "path";
// import * as bcrypt from "bcrypt";
// import * as cors from "cors";
// import {hashPassword} from "../bcrypt"



export default class SignUpService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }
  
  addUser(data: any) {
    console.log("data",data)
    // let hash = bcrypt.hashPassword(data.password)
    return this.knex("users")
    .returning('name')
    .insert({
      name: data.name,
      email: data.email,
      password: data.password,
      isactive: true
      });
    }
}
