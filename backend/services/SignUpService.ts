import * as Knex from "knex";


export default class SignUpService {
  constructor(private knex: Knex) {
    this.knex = knex;
  }

  //Completed
  addUser(data: any) {
    console.log("data",data)
    return this.knex("users")
    .insert({
      name: data.name,
      email: data.email,
      password: data.password,
      isactive: true
    })
    .returning('id');
  }
}
