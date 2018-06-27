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
        properties: ['name', 'quantity', 'completed']
      },
      {
        mapId: 'attendeesMap',
        idProperty: 'id',
        properties: ['name', 'photo']
      }
    ]
  }


  //Not updating the other items todo and events_users isactive to FALSE
  async remove(eventid: number, userid: number) {
    return this.knex.transaction(async (trx) => {
      try{
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

          const items =  await trx("items")
                          .select("items.id")
                          .join("todo", "todo.id", "items.todo_id")
                          .join("events", "todo.events_id", "events.id")
                          .where("events.id", eventid);

          await BlueBirdPromise.map(items, (item: {id: number}) => {
              return trx("items")
              .where("id", item.id)
              .update("isactive", false);
          })

          await trx("events_users")
              .where("events_users.events_id", eventid)
              .where("events_users.users_id", userid)
              .update("isactive", false);
          
              //is true in response to creator?
          return true;
        } else {
          return true;
          // console.log("wrong way")
          // this.knex("events_users")
          //   .where("events_id", eventid)
          //   .andWhere("users_id", userid)
          //   .update("isactive", false)
          //   .then((nothingmore) => {
          //     return nothingmore
          //   })
        }
      } catch(e) {
        return false;
      }
    });
  }

  async create(data: any, file: Express.Multer.File) {
    //why does async need to be called twice?
     return this.knex.transaction(async (trx) => {
       try{
        const eventid = await trx("events")
                              .insert({
                                name: data.events_name,
                                description: data.description,
                                datetime: data.datetime,
                                address: data.address,
                                private: true,
                                deposit: data.deposit,
                                isactive: true
                              }).returning("id");

            //if eventid exists and if eventid array's length is >0?????
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
              isactive: true
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

          if (file) {
            await this.writeFile(eventid[0], file.originalname, file, trx);
          }
          return eventid[0];
        }
        //why return -1? because its different from all the id's?
        return -1;
      } catch(e) {
        return -1;
      }
    })
  }

  writeFile(eventid: number, name: string, body: Express.Multer.File, trx) {
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

  async update(body: any) {
    return this.knex.transaction(async (trx) => {
      try {
        const eventUpdateResult = await trx("events")
          .where("events.id", body.event.id)
          .update({
            name:         body.event.name,
            description:  body.event.description,
            datetime:     body.event.datetime,
            address:      body.event.address,
            private:      body.event.private,
            deposit:      body.event.deposit
          })
        //why use if to confirm update changes?
        if (eventUpdateResult) {
          //awaits all mappings and updates to finish
          await BlueBirdPromise.map(body.items, 
            (item: {
              id: number,  name: string, 
              quantity: number,  user_id: number, 
              isactive: boolean, completed: boolean
            }) => {
            return trx("items")
                  .where("id", item.id)
                  .update({
                    name:       item.name,
                    quantity:   item.quantity,
                    users_id:   item.user_id,
                    isactive:   item.isactive,
                    completed:  item.completed
                  })
          })

          const attended = await this.isAttended(body.event.id, body.userid)
          if (!attended) {
            await trx("events_users")
                  .insert({
                    users_id: body.userid,
                    events_id: body.event.id,
                    creator: false,
                    isactive: true
                  })
          }
          return true
        }
        return false
      } catch(err) {
        return false
      }
    });
  }
  
  getUpcomingByUserId(userid: string) {
    return this.knex("events")
          .select("events.id as events_id", "events.name as events_name", "events.datetime", "events.photo")
          .join("events_users", "events_users.events_id", "events.id")
          .join("users", "events_users.users_id", "users.id")
          .where("users.id", userid)
          .andWhere("events.isactive", true)
  }

  getById(eid: number) {
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
        "items.completed    as items_completed",
        
        "users.id           as attendees_id",
        "users.name         as attendees_name",
        "users.photo        as attendees_photo"
      )
      .join("todo", "todo.events_id", "events.id")
      .join("items", "items.todo_id", "todo.id")
      .join("events_users", "events_users.events_id", "events.id")
      // .join("users", "items.users_id", "users.id")
      .join("users", "events_users.users_id", "users.id")
      .where("events.id", eid)
      .andWhere("events.isactive", true)
      .andWhere("items.isactive", true)
      .then(result => {
        return (result && result.length > 0) ? joinjs.mapOne(result, this.resultMaps, 'eventMap', 'event_') : {};
      })
  }

  getByName(name: string) {
    return this.knex("events")
      .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
      .where("name", "ilike", `%${name}%`)
      .andWhere("events.isactive", true);
  }
}
