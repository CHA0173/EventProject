import * as Knex from "knex";
// import { Promise as BlueBirdPromise } from "bluebird";
// import * as path from "path";

export default class SignUpService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  addUser(data: any) {
    console.log("data",data)
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
