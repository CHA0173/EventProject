import * as Knex from "knex";

export default class EventService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  list(id: number) {
    return this.knex("events")
      
      // .join("events_users", "events.id", "events_user.events_id")
      .join("toDo","toDo.events_id","events.id")
      .join("items","items.toDo_id","toDo.id")
      // .join("categories","categories.id","items.category_id")
      .where("events.id", id)
      .select(
        "events.name",
        "events.description",
        "events.dateTime",
        "events.address",
        // "events.location",
        "events.private",
        "events.deposit",
        "toDo.id",
        "toDo.type",
        "toDo.template",
        "toDo.events_id",
        "toDo.items_id",
        "items.id"
        // "items.name",
        // "items.quantity",
        // "items.categories_id",
        // "items.users_id",
        // "items.isactive",
        // "categories.id",
        // "categories.category",
        // // "categories.isactive"
      )
      .then(result => {
        return result;
      });
  }

  update(id: number, group: string) {
    return this.knex("events")
      .update(group)
      .where("events.id", id);
  }

  diactive() {
    return this.knex("events").update("isactive", "false");
  }
}
