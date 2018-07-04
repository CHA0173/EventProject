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
          { name: "items", mapId: "itemsMap", columnPrefix: "items_" },
          { name: "notes", mapId: "notesMap", columnPrefix: "notes_" }
        ]
      },
      {
        mapId: "eventsMap",
        idProperty: "id",
        properties: ["name", "datetime", "photo", "creator"],
      },
      {
        mapId: "itemsMap",
        idProperty: "id",
        properties: ["name", "quantity", "completed", "itemEventId"]
      },
      {
        mapId: "notesMap",
        idProperty: "id",
        properties: ["note", "timestamp", "events_id"]
      }
    ];
  }

  getById(userId: number) {
    return this.knex("users").where("users.id", userId);
  }

  getEventsById(user: any) {
    // console.log("userid", user.id)
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
          "events_users.creator as events_creator", 
          "items.id           as items_id",
          "items.name         as items_name",
          "items.quantity     as items_quantity",
          "items.completed    as items_completed",
          "eItem.id           as items_itemEventId",
          "notes.note as notes_note",
          "notes.events_id as notes_events_id",
          "notes.created_at as notes_timestamp",
        ) 
         .leftJoin("events_users", 
         function() {
          this.on("events_users.users_id", "users.id").andOn(
            "events_users.isactive",self.knex.raw(true));
        })
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
        .leftJoin("notifications as notes", function() {           //GET NOTIFICATIONS by UserID
          this.on("notes.users_id", "users.id")
        })
        .where("users.id", user.id)
        .then(result => {
          // console.log("result", result)

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

  getAllUsers() {
    return this.knex("users")
      .select("id", "name", "photo")
  }


  async updateById(user:any, body:any) {
    return this.knex.transaction(async (trx) => {
        try {
          await trx("users")
          .where("users.id", user.id)
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
