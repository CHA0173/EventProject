import * as Knex from "knex";
// import * as path from "path";
// import * as fs from "fs-extra";

import { Promise as BlueBirdPromise } from "bluebird";
import { default as joinjs } from 'join-js';

export default class EventService {
  private resultMaps: Array<Object>;
  private resultMaps2: Array<Object>;

  constructor(private knex: Knex) {
    this.knex = knex;
    this.resultMaps = [
      {
        mapId: 'eventMap',
        idProperty: 'id',
        properties: ['name', 'description', 'datetime', 'photo', 'address', 'private_event', 'deposit', 'creator'],
        collections: [
          // { name: 'events_users', mapId: 'events_usersMap', columnPrefix: 'events_users_' },
          { name: 'todo', mapId: 'todoMap', columnPrefix: 'todo_' },
          { name: 'attendees', mapId: 'attendeesMap', columnPrefix: 'attendees_' },
          { name: 'discussion', mapId: 'discussionMap', columnPrefix: 'discussion_' }
        ]
      },
      {
        mapId: 'todoMap',
        idProperty: 'id',
        // properties: ['type'],
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
        properties: ['name', 'photo', 'creator']
      },
      {
        mapId: 'discussionMap',
        idProperty: 'id',
        properties: ['name', 'comment']
      }
    ]

    this.resultMaps2 = [
      {
        mapId: 'parentMap',
        properties: ['name'],
        collections: [{ name: 'events', mapId: 'eventsMap', columnPrefix: 'event_' }]
      },
      {
        mapId: 'eventsMap',
        idProperty: 'id',
        properties: ['name', 'description', 'datetime', 'photo', 'address', 'private_event', 'deposit'],
        collections: [
          // { name: 'events_users', mapId: 'events_usersMap', columnPrefix: 'events_users_' },
          { name: 'todo', mapId: 'todoMap', columnPrefix: 'todo_' },
          { name: 'attendees', mapId: 'attendeesMap', columnPrefix: 'attendees_' },
          { name: 'discussion', mapId: 'discussionMap', columnPrefix: 'discussion_' }
        ]
      },
      {
        mapId: 'todoMap',
        idProperty: 'id',
        // properties: ['type'],
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
        properties: ['name', 'photo', 'creator']
      },
      {
        mapId: 'discussionMap',
        idProperty: 'id',
        properties: ['name', 'comment']
      }
    ]
  }

  // writeFile(eventid: number, name: string, body: Express.Multer.File, trx: Knex) {
  //   const imagePath = path.join(__dirname, `../public/images/${name}`);
  //   fs.outputFile(imagePath, body.buffer)
  //   return trx("events").where("events.id", eventid).update({ photo: name })
  // }

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

  eventName(eventid: number) {
    return this.knex("events")
      .select("name")
      .first()
      .where("id", eventid)
      .returning("name")
  }

  inviter(userid: number) {
    return this.knex("users")
      .select("name")
      .first()
      .where("id", userid)
      .returning("name")
  }

  async invite(userid: any, event_id: any, body: any) {
    console.log("userid", userid, "event_id", event_id, "body", body)
    return this.knex.transaction(async (trx) => {

      try {
        const eventName = await this.eventName(event_id)
        const inviter = await this.inviter(userid.id)
        let inviteNote = `You've been invited to ${eventName.name} by ${inviter.name}!`
        // console.log("eventName", eventName, "inviter", inviter)
        // console.log(inviteNote) 
        await trx("notifications")
          .insert({
            note: inviteNote,
            events_id: event_id,
            users_id: body.invite_id, //CREATE INVITATION,
            isactive: true
          })

        return true
      } catch (e) {
        console.log(e)
        return false
      }
    })
  }

  //Completed
  async remove(user: any, eventid: number) {
    console.log("eventid", eventid, "userid", user.id)
    return this.knex.transaction(async (trx) => {
      try {
        const creator = await this.isCreator(eventid, user.id);
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
          // console.log("todo.id", toDo.id)
          await trx("todo")
            .where("id", toDo.id)
            .update("isactive", false);

          const items = await trx("items")
            .select("items.id")
            .join("todo", "todo.id", "items.todo_id")
            .join("events", "todo.events_id", "events.id")
            .where("todo.id", toDo.id);

          await BlueBirdPromise.map(items, (item: { id: number }) => {
            return trx("items")
              .where("id", item.id)
              .update("isactive", false);
          })

          await trx("events_users")
            .where("events_users.events_id", eventid)
            .andWhere("events_users.users_id", user.id)
            .update("isactive", false);

          return true;
        } else {
          // console.log("User is NOT the CREATOR")
          await trx("events_users")
            .where("events_id", eventid)
            .andWhere("users_id", user.id)
            .update("isactive", false);
          
          return true;
        }
      } catch (e) {
        console.log(e)
        return false;
      }
    });
  }

  //Completed
  async create(user: any, data: any) {

    // console.log("entered create")
    // console.log("data", data)
    return this.knex.transaction(async (trx) => {
      try {
        // console.log("")
        const eventid = await trx("events")
          .insert({
            name: data.event_name,
            description: data.description || null,
            datetime: data.datetime,
            photo: data.photo || null,//can insert base64 of photo here directly, no need to use multer/file buffer
            address: data.address,
            private_event: data.private_event || false,
            deposit: data.deposit || null,
            isactive: true
          }).returning("id");

          const listExist = data.items
          // console.log("eventid", eventid, "listExist", listExist)
        if (listExist && listExist.length > 0) {
          const toDoId = await trx("todo")
            .insert({
              events_id: eventid[0],
              isactive: true
            }).returning("id");

          const items = data.items.map((item: any) => {
            return {
              name: item.Name,
              quantity: item.Quantity,
              todo_id: toDoId[0],
              isactive: true,
              completed: false
            }
          });

          await trx("items").insert(items).returning("id");

          await trx("events_users")
            .insert({
              users_id: user.id,
              events_id: eventid[0],
              creator: true,
              isactive: true
            }).returning("events_id");


          return eventid[0];
        }
        return eventid[0];

      } catch (e) {
        console.log(e)
        return -1;

      }
    })
  }


  //Completed
  async update(body: any) {
    return this.knex.transaction(async (trx) => {
      try {
        //update event info data
        // const eventUpdateResult = 
        await trx("events")
          .where("events.id", body.event.id)
          .update({
            name: body.event.name,
            description: body.event.description,
            datetime: body.event.datetime,
            photo: body.event.photo,
            address: body.event.address,
            private_event: body.event.private,
            deposit: body.event.deposit
          })
        //why use if to confirm update changes?
        // if (eventUpdateResult) {
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
                // console.log(err);
              })
          })
        return true
        // }
        // return false
      } catch (err) {
        return false
      }
    });
  }

  //Completed
  joinEvent(user: any, body: any) {
    // console.log("body", body)
    console.log("userid", user)
    return this.knex.transaction(async (trx) => {
      try {
        await trx("events_users")
          .insert({
            users_id: user.id,
            events_id: body.event_Id,
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
        "events.private_event     as event_private",
        "events.deposit     as event_deposit",

        "events_users.creator as attendees_creator",

        "todo.id            as todo_id",

        "items.id           as items_id",
        "items.name         as items_name",
        "items.quantity     as items_quantity",
        "items.users_id      as items_user_id",
        "itemusers.name     as items_user_name",
        "items.completed    as items_completed",

        "users.id           as attendees_id",
        "users.name         as attendees_name",
        "users.photo        as attendees_photo",
        // "events_users.paid_deposit as attendees_pay_dep", 

        "discussion.id      as discussion_id",
        "discussionusers.name as discussion_name",
        "discussion.comment  as discussion_comment",
      // "discussion.timestamps as discussion_timestamp"

    )
      .leftJoin("todo", "todo.events_id", "events.id")
      .leftJoin("items", "items.todo_id", "todo.id")
      .leftJoin("events_users", "events_users.events_id", "events.id")
      .leftJoin("discussion", "discussion.events_id", "events.id")
      .leftJoin("users as discussionusers", "discussion.users_id", "discussionusers.id")
      .leftJoin("users as itemusers", "items.users_id", "itemusers.id")
      .leftJoin("users", "events_users.users_id", "users.id")
      .where("events.id", eid)
      .andWhere("events_users.isactive", true)
      // .whereIn('events.id',this.knex.select('events_id').from('events_users'))
      // .andWhere("events_users.creator",true)
      .andWhere("events.isactive", true)
      .andWhere("items.isactive", true)
      // .andWhere("discussion.isactive", true)
      .then(result => {
        // console.log(joinjs.mapOne(result, this.resultMaps, 'eventMap', 'event_'))
        return (result && result.length > 0) ? joinjs.mapOne(result, this.resultMaps, 'eventMap', 'event_') : {};
      })
  }



  //Completed
  getByName(name: string) {
    // console.log("search parameter:", name)
    return this.knex("events")
      .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
      .where("events.name", "ilike", `%${name}%`)
      .andWhere("events.isactive", true);

  }

  //Completed
  getAll() {

    return this.knex("events")
      .select(
        "events.id           as parent_name",
        "events.id          as event_id",
        "events.name        as event_name",
        "events.description as event_description",
        "events.datetime    as event_datetime",
        "events.photo       as event_photo",
        "events.address     as event_address",
        "events.private_event     as event_private",
        "events.deposit     as event_deposit",

        "events_users.creator as attendees_creator",

        "todo.id            as todo_id",

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
      .leftJoin("todo", "todo.events_id", "events.id")
      .leftJoin("items", "items.todo_id", "todo.id")
      .leftJoin("events_users", "events_users.events_id", "events.id")
      .leftJoin("discussion", "discussion.events_id", "events.id")
      .leftJoin("users as discussionusers", "discussion.users_id", "discussionusers.id")
      .leftJoin("users as itemusers", "items.users_id", "itemusers.id")
      .leftJoin("users", "events_users.users_id", "users.id")
      // .where("events.id", eid)
      // .whereIn('events.id',this.knex.select('events_id').from('events_users'))
      // .andWhere("events_users.creator",true)
      .andWhere("events.isactive", true)
      // .andWhere("items.isactive", true)
      // .andWhere("discussion.isactive", true)
      .then(result => {
        // console.log(joinjs.mapOne(result, this.resultMaps, 'eventMap', 'event_'))
        return (result && result.length > 0) ? joinjs.mapOne(result, this.resultMaps2, 'parentMap', 'parent_') : {};
      })
  }

  addComment(user: any, body: any) {
    // console.log("body", body)
    return this.knex.transaction(async (trx) => {
      try {
        await trx("discussion")
          .insert({
            users_id: user.id,
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
