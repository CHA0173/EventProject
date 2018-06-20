import * as Knex from "knex";
// var Promise = require("bluebird");
import * as Promise from "bluebird";
import * as path from "path";
import * as fs from "fs-extra";

export default class EventService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  public attendCheck(eventid: number, userid: number) {
    return this.knex("events_users")
      .select("events_users.users_id")
      .where("events_users.events_id", eventid)
      .andWhere("events_users.users_id", userid)
      .andWhere("events_users.isactive", true)
  }

  public creatorCheck(eventid: number) {
    console.log(("creatorCheck"))
    return this.knex("events_users")
      .select("users_id")
      .first()
      .where("creator", true)
      .andWhere("events_id", eventid)
  }

  public writeFile(eventid: number, name: string, body: Express.Multer.File) {
    const imagePath = path.join(__dirname, `../public/images/${name}`);
    fs.outputFile(imagePath, body.buffer)
    console.log("imagePath", imagePath)
    return this.knex("events")
        .where("events.id", eventid)
        .update({photo : imagePath})//FILENAME WONT UPLOAD TO DATABASE ENTRY
};



  //COMPLETE
  listEvent(eid: number, res: any) {
    console.log("eid", eid)
    // console.log("userid", userid)
    return this.knex("events")
      .select(
        "events.id as events_id",
        "events.name as events_name",
        "events.description",
        "events.datetime",
        "events.photo",
        "events.address",
        "events.private",
        "events.deposit",
        "todo.id as todo_id",
        "todo.type as todo_type"
      )
      .join("todo", "todo.events_id", "events.id")
      .where("events.id", eid)
      .andWhere("events.isactive", true)
      .then(eventArray => {
        console.log("eventArray", eventArray)
        console.log("eventArray todoid", eventArray[0])
        return this.knex("items")
          .select(
            "items.id as items_id",
            "items.name as items_name",
            "items.completed",
            "items.quantity",
            "users.id as users_id",
            "users.name as users_name",
        )
          .join("todo", "todo.id", "items.todo_id")
          .join("users", "items.users_id", "users.id")
          .where("items.todo_id", eventArray[0].todo_id)
          .andWhere("items.isactive", true)
          .then((arrayItem: any) => {
            console.log("arrayItem", arrayItem)


            let itemsArray: any[] = []
            for (let i in arrayItem) {
              itemsArray.push({
                items_id: arrayItem[i].items_id,
                items_name: arrayItem[i].items_name,
                items_quantity: arrayItem[i].quantity,
                items_users_id: arrayItem[i].users_id,
                items_users_name: arrayItem[i].users_name,
                items_completed: arrayItem[i].completed,

              })
            }
            console.log("arrayItemObject", itemsArray)
            return this.knex("users")
              .select("users.id as users_id", "users.name as users_name", "users.photo")
              .join("events_users", "events_users.users_id", "users.id")
              .join("events", "events_users.events_id", "events.id")
              .where("events.id", eid) //eventid
              .then((attendeesArray: any[]) => {
                console.log("attendeesArray", attendeesArray)
                let result: any = {
                  event_id: eventArray[0].events_id,
                  event_name: eventArray[0].events_name,
                  event_description: eventArray[0].description,
                  event_datetime: eventArray[0].datetime,
                  event_photo: eventArray[0].photo,
                  event_address: eventArray[0].address,
                  event_private: eventArray[0].private,
                  event_deposit: eventArray[0].deposit,
                  todo_id: eventArray[0].todo_id,
                  todo_type: eventArray[0].todo_type,
                  itemsArray,
                  attendeesArray
                }
                console.log("result", result)
                return result
              })
          })
      })
  }

  //COMPLETE
  update(eventid: number, userid: number, body: any, res: any) {

    return this.knex("events")
      .where("events.id", eventid)
      .update({
        name: body.event_name,
        description: body.event_description,
        datetime: body.event_datetime,
        address: body.event_address,
        private: body.event_private,
        deposit: body.event_deposit
      })
      .then(eventsid => {
        console.log("body.itemsArray", body.itemsArray)
        return Promise.map(body.itemsArray, (item: any) => {

          return this.knex("items")
            .where("id", item.items_id)
            .update({
              name: item.items_name,
              quantity: item.quantity,
              users_id: item.users_id,
              isactive: item.isactive,
              completed: item.completed
            })
        })
          .then((itemsid: any) => {
            return this.attendCheck(eventid, userid)
              .then((eventuser: any) => {
                console.log("eventuser", eventuser)
                if (eventuser[0] == undefined) {
                  return this.knex("events_users")
                    .insert({
                      users_id: userid,
                      events_id: eventid,
                      creator: false,
                      isactive: true
                    })
                } else {
                  return eventuser
                }
              })
          })
      })
      .catch((err: any) => {
        console.log("post err", err);
        res.status(500).json({ status: "failed" })
      })
  }



//Not updating the other items todo and events_users isactive to FALSE
  removeEvent(eventid: number, userid: any, res: any) {
    console.log("eventid", eventid)
    console.log("userid", userid)
    return this.creatorCheck(eventid)
      .then((creatorId) => {
        if (creatorId == userid) {
          return this.knex("events")
            .select("events.isactive")
            .first()
            .where("events.id", eventid)
            .update("isactive", false)
            .then((nothing) => {
              return this.knex("todo")
                .select("todo.isactive")
                .first()
                .join("events", "todo.events_id", "events.id")
                .where("events.id", eventid)
                .update("isactive", false)
                .then((nothing2) => {
                  return this.knex("items")
                    .select("items.isactive")
                    .join("todo", "todo.id", "items.todo_id")
                    .join("events", "todo.events_id", "events.id")
                    .where("events.id", eventid)
                    .update("isactive", false)
                    .then((nothing2) => {
                      return this.knex("events_users")
                        .select("events_users.isactive")
                        .join("events", "events_users.events_id", "events.id")
                        .where("events.id", eventid)
                        .update("isactive", false)
                    })
                })
            })
        } else {
          return eventid
            console.log("wrong way")
            this.knex("events_users")
            .where("events_id", eventid)
            .andWhere("users_id", userid)
            .update("isactive", false)
            .then((nothingmore) => {
              return nothingmore
            })
        }
      })

  }

  saveNewEvent(data: any, userid: number, file: Express.Multer.File, res: any) {
    // console.log("file1232", file);
    console.log("userid", userid)
    return this.knex.transaction((trx) => {
        // console.log("fileName", fileName)
        return trx("events")
            .insert({
                name: data.events_name,
                description: data.description,
                datetime: data.datetime,
                address: data.address,
                private: true,
                deposit: data.deposit,
                isactive: true
            })
            .returning("id")
            .then(eventid => {

                eventid.map((idata: any) => {
                    idata.id
                })
                console.log("eventid", eventid)
                return trx("todo")
                    .insert({
                        events_id: eventid[0],
                        type: data.todo_type,
                        isactive: true,
                        template: false
                    })
                    .returning("id")
                    .then(todoid => {

                        todoid.map((tdata: any) => {
                            tdata.id
                        })
                        console.log("todoid", todoid)

                        console.log("itemsArray", JSON.parse(data.itemsArray))

                        let parsedItems: any[] = [];

                        parsedItems = JSON.parse(data.itemsArray).map((e: any) => (
                            {
                                name: e.items_name,
                                quantity: e.quantity,
                                todo_id: todoid[0],
                                isactive: true
                            }
                        ));

                        console.log("parsedItems", parsedItems)
                        return trx("items")
                            .insert(
                                parsedItems
                            )
                            .returning("id")
                            .then((itemid: any) => {
                                return trx("events_users")
                                    .insert({
                                        users_id: userid,
                                        events_id: eventid[0],
                                        creator: true,
                                        isactive: true
                                    })
                                    .returning("events_id")
                                    .then(async (id: Knex.QueryCallback) => {
                                        if (file !== undefined) {
                                            await this.writeFile(eventid[0], file.originalname, file)
                                        }
                                        return itemid
                                    })
                            })
                    })
                    .catch((err: any) => {
                        console.log("post err", err);
                        res.status(500).json({ status: "failed" })
                    })
            })
    })
}

}
