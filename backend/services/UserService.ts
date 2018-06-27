import * as Knex from 'knex';
import { default as joinjs } from 'join-js';

export default class UserService {
  private resultMaps: Array<Object>;




  constructor(private knex: Knex) {
    this.knex = knex;
    this.resultMaps = [
      {
        mapId: "userEventsMap",
        idProperty: "id",
        properties: ["name", "photo"],
        collections: [
          { name: "events", mapId: "eventsMap", columnPrefix: "events_" },
          { name: "items", mapId: "itemsMap", columnPrefix: "items_" }
        ]
      },
      {
        mapId: "eventsMap",
        idProperty: "id",
        properties: ["name", "datetime", "photo"],
      },
      {
        mapId: "itemsMap",
        idProperty: "id",
        properties: ["name", "quantity", "completed", "itemEventId"]
      }
    ];
  }

  getById(userId: number) {
    return this.knex("users").where("users.id", userId);
  }

  getEventsById(userid: any) {
    console.log("userid", userid)
    const self = this
    return (
      this.knex("users")
        .select(
          "users.id           as user_id",
          "users.name         as user_name",
          "users.photo        as user_photo",
          "events.id          as events_id",
          "events.name        as events_name",
          "events.datetime    as events_datetime",
          "events.photo       as events_photo",
          "items.id           as items_id",
          "items.name         as items_name",
          "items.quantity     as items_quantity",
          "items.completed    as items_completed",
          "eItem.id           as items_itemEventId"
        )
         .leftJoin("events_users", "events_users.users_id", "users.id")
        .leftJoin("events", function() {
          this.on("events.id", "events_users.events_id").andOn(
            "events.isactive",self.knex.raw(true));
        })
          .leftJoin("items", function() {
          this.on("items.users_id", "users.id")
          .andOn("items.isactive", self.knex.raw(true));
        })
          .leftJoin("todo", function() {
          this.on("todo.id", "items.todo_id")
          .andOn("todo.isactive", self.knex.raw(true));
        })
         .leftJoin("events as eItem", function() {
          this.on("todo.events_id", "eItem.id")
          .andOn("todo.isactive", self.knex.raw(true));
        })
        .where("users.id", userid)
        .then(result => {
          return joinjs.mapOne(
            result,
            this.resultMaps,
            "userEventsMap",
            "user_");
        })
        .catch(err => {
          console.log(err);
        })
    );
  }

  getByEmail(email: string, password: string) {
    return this.knex("users")
      .select("id")
      .first()
      .where("email", email)
      .andWhere("password", password)
      .then(value => {
        return value;
      })

  }

  async updateById(body:any) {
    return this.knex.transaction(async (trx) => {
        try {
          await trx("users")
          .where("users.id", body.userid)
          .update({
            photo: body.photo
          })
          return true;
        }
        catch (e) {
          return false;
        }
      })
    }
    
}
