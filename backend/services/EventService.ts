import * as Knex from "knex";
import * as path from "path";
import * as fs from "fs-extra";
import { Promise as BlueBirdPromise } from "bluebird";
import { default as joinjs } from 'join-js';

export default class EventService {
  private resultMaps: Array<Object>;

  constructor(private knex: Knex) {
    this.knex = knex;
    this.resultMaps = [
      {
        mapId: 'eventMap',
        idProperty: 'id',
        properties: ['name', 'description', 'datetime', 'photo', 'address', 'private', 'deposit'],
        collections: [
          { name: 'todo', mapId: 'todoMap', columnPrefix: 'todo_' },
          { name: 'attendees', mapId: 'attendeesMap', columnPrefix: 'attendees_' },
          { name: 'discussion', mapId: 'discussionMap', columnPrefix: 'discussion_' }
        ]
      },
      {
        mapId: 'todoMap',
        idProperty: 'id',
        properties: ['type'],
        collections: [
          { name: 'items', mapId: 'itemsMap', columnPrefix: 'items_' },
        ]
      },
      {
        mapId: 'itemsMap',
        idProperty: 'id',
        properties: ['id', 'name', 'quantity', 'completed', 'user_id', 'user_name']
      },
      {
        mapId: 'attendeesMap',
        idProperty: 'id',
        properties: ['name', 'photo']
      },
      {
        mapId: 'discussionMap',
        idProperty: 'id',
        properties: ['name', 'comment']
      }
    ]
  }

  writeFile(eventid: number, name: string, body: Express.Multer.File, trx: Knex) {
    const imagePath = path.join(__dirname, `../public/images/${name}`);
    fs.outputFile(imagePath, body.buffer)
    return trx("events").where("events.id", eventid).update({ photo: name })
  }

  isAttended(eventid: number, userid: number) {
    return this.knex("events_users")
      .select("events_users.users_id")
      .first()
      .where("events_users.events_id", eventid)
      .andWhere("events_users.users_id", userid)
      .andWhere("events_users.isactive", true);
  }

  isCreator(eventid: number, userid: number) {
    return this.knex("events_users")
      .select("users_id")
      .first()
      .where("creator", true)
      .andWhere("events_id", eventid)
      .andWhere("users_id", userid)
  }



  //Completed
  async remove(eventid: number, userid: number) {
    return this.knex.transaction(async (trx) => {
      try {
        const creator = await this.isCreator(eventid, userid);
        if (creator) {
          await trx("events")
            .select("events.isactive")
            .where("events.id", eventid)
            .update("isactive", false);

          const toDo = await trx("todo")
            .select("todo.id")
            .join("events", "todo.events_id", "events.id")
            .where("events.id", eventid)
            .first();

          await trx("todo")
            .where("id", toDo.id)
            .update("isactive", false);

          const items = await trx("items")
            .select("items.id")
            .join("todo", "todo.id", "items.todo_id")
            .join("events", "todo.events_id", "events.id")
            .where("events.id", eventid);

          await BlueBirdPromise.map(items, (item: { id: number }) => {
            return trx("items")
              .where("id", item.id)
              .update("isactive", false);
          })

          await trx("events_users")
            .where("events_users.events_id", eventid)
            .where("events_users.users_id", userid)
            .update("isactive", false);

          return true;
        } else {

          console.log("wrong way")
          return trx("events_users")
            .where("events_id", eventid)
            .andWhere("users_id", userid)
            .update("isactive", false)
            .then((nothingmore) => {
              return true
            })

        }
      } catch (e) {
        return false;
      }
    });
  }

  //Completed
  async create(data: any /*,file: Express.Multer.File*/) {
    //why does async need to be called twice?
    return this.knex.transaction(async (trx) => {
      try {
        const eventid = await trx("events")
          .insert({
            name: data.event_name,
            description: data.description,
            datetime: data.datetime,
            photo: data.photo,//can insert base64 of photo here directly, no need to use multer/file buffer
            address: data.address,
            private: true,
            deposit: data.deposit,
            isactive: true
          }).returning("id");

        //if eventid exists and if eventid array's length is >0, meaning not []
        if (eventid && eventid.length > 0) {
          const toDoId = await trx("todo")
            .insert({
              events_id: eventid[0],
              type: data.todo_type,
              isactive: true,
              template: false
            }).returning("id");

          const items = data.items.map((item: any) => {
            return {
              name: item.item_name,
              quantity: item.quantity,
              todo_id: toDoId[0],
              isactive: true,
              completed:false
            }
          });

          await trx("items").insert(items).returning("id");

          await trx("events_users")
            .insert({
              users_id: data.userid,
              events_id: eventid[0],
              creator: true,
              isactive: true
            }).returning("events_id");

          // if (file) {
          //   await this.writeFile(eventid[0], file.originalname, file, trx);
          // }
          return eventid[0];
        }
      
        return eventid[0];
      } catch (e) {
        return -1;
      }
    })
  }


  //Completed
  async update(body: any) {
    return this.knex.transaction(async (trx) => {
      try {
        //update event info data
        const eventUpdateResult = await trx("events")
          .where("events.id", body.event.id)
          .update({
            name:        body.event.name,
            description: body.event.description,
            datetime:    body.event.datetime,
            photo:       body.event.photo,
            address:     body.event.address,
            private:     body.event.private,
            deposit:     body.event.deposit
          })
        //why use if to confirm update changes?
        if (eventUpdateResult) {
          //awaits all mappings and updates to finish
          await BlueBirdPromise.map(body.todo,
            (item: {
              id: number, name: string,
              quantity: number, user_id: number,
              isactive: boolean, completed: boolean
            }) => {
              return trx("items")
                .where("id", item.id)
                .update({
                  name: item.name,
                  quantity: item.quantity,
                  users_id: item.user_id,
                  isactive: item.isactive,
                  completed: item.completed
                })
                .catch(err => {
                  console.log(err);
                })
            })
          return true
        }
        return false
      } catch (err) {
        return false
      }
    });
  }
  
  //Completed
  joinEvent(body: any) {
    console.log("body", body)
    return this.knex.transaction(async (trx) => {
      try {
        await trx("events_users")
          .insert({
            users_id: body.userid,
            events_id: body.eventid,
            creator: false,
            isactive: true
          })
        return true
      } catch (err) {
        return false
      }
    })
  }

  //Completed
  getUpcomingByUserId(userid: number) {
    return this.knex("events")
      .select("events.id as events_id", "events.name as events_name", "events.datetime", "events.photo")
      .join("events_users", "events_users.events_id", "events.id")
      .join("users", "events_users.users_id", "users.id")
      .where("users.id", userid)
      .andWhere("events.isactive", true)
  }

  //Completed
  getById(eid: number) {
    console.log("eid", eid)
    return this.knex("events")
      .select(
        "events.id          as event_id",
        "events.name        as event_name",
        "events.description as event_description",
        "events.datetime    as event_datetime",
        "events.photo       as event_photo",
        "events.address     as event_address",
        "events.private     as event_private",
        "events.deposit     as event_deposit",

        "todo.id            as todo_id",
        "todo.type          as todo_type",

        "items.id           as items_id",
        "items.name         as items_name",
        "items.quantity     as items_quantity",
        "items.users_id      as items_user_id",
        "itemusers.name     as items_user_name", 
        "items.completed    as items_completed",

        "users.id           as attendees_id",
        "users.name         as attendees_name",
        "users.photo        as attendees_photo",

        "discussion.id      as discussion_id",
        "discussionusers.name as discussion_name",
        "discussion.comment  as discussion_comment"

      )
      .join("todo", "todo.events_id", "events.id")
      .join("items", "items.todo_id", "todo.id")
      .join("events_users", "events_users.events_id", "events.id")
      .leftJoin("discussion", "discussion.events_id", "events.id")
      .leftJoin("users as discussionusers", "discussion.users_id", "discussionusers.id")
      .leftJoin("users as itemusers", "items.users_id", "itemusers.id")
      .join("users", "events_users.users_id", "users.id")
      .where("events.id", eid)
      .andWhere("events.isactive", true)
      .andWhere("items.isactive", true)
      .andWhere("discussion.isactive", true)
      .then(result => {
        return (result && result.length > 0) ? joinjs.mapOne(result, this.resultMaps, 'eventMap', 'event_') : {};
      })
  }


  //Completed
  getByName(name: any) {
    console.log("search parameter:", name)
    return this.knex("events")
      .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
      .where("events.name", "ilike", `%${name}%`)
      .andWhere("events.isactive", true);
      
  }

  //Completed
  getAll() {
    return this.knex("events")
      .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
      .where("events.isactive", true);
  }

  addComment(body: any) {
    console.log("body", body)
    return this.knex.transaction(async (trx) => {
      try {
        await trx("discussion")
          .insert({
            users_id: body.userid,
            events_id: body.eventid,
            comment: body.comment,
            isactive: true
          })
        return true
      } catch (err) {
        return false
      }
    })
  }
}
