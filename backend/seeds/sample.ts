import * as fs from "fs-extra";
import * as Knex from "knex"
import * as path from "path";

exports.seed = (knex: Knex) => {
  // Deletes ALL existing entries
  return knex("events_users").del().then(() => {
    return knex("items").del().then(() => {
      return knex("toDo").del().then(() => {
        return knex("users").del()
          .then(() => {
            // Inserts seed entries
            return knex("users").insert([{
              email: "alex@host.com",
              name: "Alex",
              password: "asdf",
              isactive: true,
            }, {
              email: "peter@peter.com",
              name: "Peter",
              password: "asdf",
              isactive: true,
            }, {
              email: "paul@paul.com",
              name: "Paul",
              password: "asdf",
              isactive: true,
            }, {
              email: "mary@mary.com",
              name: "Mary",
              password: "asdf",
              isactive: true,
            }]);
          })
          .then(() => {
            return knex("events").del()
              .then(() => {
                return knex("events").insert([{
                  isactive: true,
                  address: "Saikung Pier 1",
                  datetime: "2018-07-20 09:00:00",
                  deposit: 100,
                  description: "Alex is getting old!",
                  name: "Alex's birthday boat",
                  private: true
                },
                {
                  address: "Lord Stanley's House",
                  datetime: "2018-09-20 10:00:00",
                  description: "They're tying the knot!",
                  name: "Mary's Wedding",
                  private: true,
                  isactive: true
                }])
              })
          })
      })
        .then(() => {
          let toDolist = fs.readJsonSync(path.join(__dirname, "todolist.json"));
          return knex("toDo").del()
            .then(() => {
              let result: any[] = [];
              toDolist.forEach((item: any) => {
                let event = item.event
                result.push(createList(knex, item, event))
              })
              return Promise.all(result);
            })
        })
        .then(() => {
          let itemList = fs.readJsonSync(path.join(__dirname, "todolistitems.json"));
          return knex("items").del()
            .then(() => {
              let result: any[] = [];
              itemList.forEach((item: any) => {
                let eventType = item.type
                let user = item.user

                result.push(createItem(knex, item, user, eventType))
              });
              return Promise.all(result);
            })
        })
        .then(() => {
          return knex("events_users").insert([{
            users_id: 1,
            isactive: true,
            events_id: 1,
            creator: true
          },
          {
            users_id: 2,
            isactive: true,
            events_id: 2,
            creator: true
          }])

        })
    })
  })
};

const createList = (knex: any, item: any, event: any) => {
  console.log("event", event);
  return knex("events")
    .where("name", event)
    .first()
    .then((eventRecord: any) => {
      return knex("toDo").insert({
        type: item.type,
        template: item.template,
        isactive: item.isactive,
        events_id: eventRecord.id
      })
    })
}




const createItem = (knex: any, item: any, user: any, eventType: any) => {
  console.log("eventType", eventType);

  return knex("users")
    .where("name", user)
    .first()
    .then((user: any) => {
      return knex("toDo")
        .where("type", eventType)
        .first()
        .then((toDo: any) => {
          console.log("toDo", toDo)
          return knex("items").insert({
            name: item.name,
            quantity: item.quantity,
            isactive: item.isactive,
            users_id: user.id,
            toDo_id: toDo.id
          })
        })
    })
}

