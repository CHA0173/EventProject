import * as Knex from "knex";

export default class UserService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  list(id: number) {
    return this.knex("users")
      .where("users.id", id)
      .select("name","photo");
  }

  findByEmail(email: string) {
    return this.knex("users")
      .first()
      .where("email", "=", email);
  }

}
