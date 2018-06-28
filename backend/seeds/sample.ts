import * as fs from "fs-extra";
import * as Knex from "knex"
import * as path from "path";

//To run on server, run
// ./node_modeules/knex/bin/cli.js <knex command>

exports.seed = (knex: Knex) => {
  // Deletes ALL existing entries
  return knex("events_users").del().then(() => {
    return knex("items").del().then(() => {
      return knex("todo").del().then(() => {
        return knex("users").del()
          .then(() => {
            // Inserts seed entries
            return knex("users").insert([{
              email: "alex@alex.com",
              name: "Alex",
              password: "asdf",
              isactive: true,
            }, {
              email: "brad@brad.com",
              name: "Brad",
              password: "asdf",
              isactive: true,
            }, {
              email: "jacob@jacob.com",
              name: "Jacob",
              password: "asdf",
              isactive: true,
            }, {
              email: "lucas@lucas.com",
              name: "Lucas",
              password: "asdf",
              isactive: true,
            },
            {
              email: "stephen@stephen.com",
              name: "Stephen",
              password: "asdf",
              isactive: true,
            }
            ]);
          })
          .then(() => {
            return knex("events").del()
              .then(() => {
                return knex("events").insert([{
                  name: "Alex's birthday boat",
                  description: "Alex is getting old!",
                  datetime: "2018-07-20 09:00:00",
                  address: "Saikung Pier 1",
                  deposit: 100,
                  isactive: true,
                  private: false
                },
                {
                  name: "Mary's Wedding",
                  address: "Lord Stanley's House",
                  datetime: "2018-09-20 10:00:00",
                  description: "They're tying the knot!",
                  private: false,
                  isactive: true
                },
                {
                  name: "Beach Camp",
                  description: "A 4 hour hike and a night spent underneath the beautiful evening sky!",
                  datetime: "2018-07-01 06:00:00",
                  address: "Big Wave Bay, Saikung",
                  private: false,
                  isactive: true
                },
                {
                  name: "Picnic in Tai Tam",
                  description: "Its a beautiful summer's day, come share food and good times with us!",
                  datetime: "2018-06-10 11:00:00",
                  address: "Tai Tam Country Park",
                  private: false,
                  isactive: false
                },
                {
                  name: "Accelerate Grad Party",
                  description: "Cohort 6's final projects are finally over! Time to drink and be merry!",
                  datetime: "2018-07-06 21:00:00",
                  address: "TAP Room Mong Kok",
                  private: false,
                  isactive: true
                }])
              })
          })
      })
        .then(() => {
          let todolist = fs.readJsonSync(path.join(__dirname, "todolist.json"));

          let result: any[] = [];
          todolist.forEach((item: any) => {
            let event = item.event
            result.push(createList(knex, item, event))
          })
          return Promise.all(result);

        })
        .then(() => {
          let itemList = fs.readJsonSync(path.join(__dirname, "todolistitems.json"));
          let result: any[] = [];
          itemList.forEach((item: any) => {
            // let eventPackage = item.package
            // let eventType = item.type
            let event = item.event_name
            let user = item.user

            result.push(createItem(knex, item, user, event /*eventType, eventPackage*/))
          });
          return Promise.all(result);

        })
        .then(() => {
          let attendeeList = fs.readJsonSync(path.join(__dirname, "usersevents.json"));
          let result: any[] = [];
          attendeeList.forEach((item: any) => {
            let event = item.event
            let user = item.user
            result.push(createEvent(knex, item, user, event))
          })

          return Promise.all(result);
        })
        .then(() => {
          let attendeeList = fs.readJsonSync(path.join(__dirname, "comments.json"));
          let result: any[] = [];
          attendeeList.forEach((item: any) => {
            result.push(createDiscussion(knex, item))
          })
          return Promise.all(result);
        })
    })
  })
};

const createDiscussion = (knex: any, item: any) => {
  return knex("discussion")
    .insert({
      users_id: item.users_id,
      events_id: item.events_id,
      isactive: true,
      comment: item.comment
    })
}

const createEvent = (knex: any, item: any, user: any, event: any) => {
  console.log("event", event);
  return knex("events")
    .select("events.id")
    .where("name", event)
    .first()
    .then((eventId: any) => {
      return knex("users")
        .select("users.id")
        .where("name", user)
        .first()
        .then((userId: any) => {
          return knex("events_users").insert({
            users_id: userId.id,
            events_id: eventId.id,
            isactive: item.isactive,
            creator: item.creator,

          })
        })
    })

}

const createList = (knex: any, item: any, event: any) => {
  console.log("event", event);
  return knex("events")
    .where("name", event)
    .first()
    .then((eventRecord: any) => {
      return knex("todo").insert({
        isactive: item.isactive,
        events_id: eventRecord.id
      })
        .returning("id")
    })
}

const volunteer = (knex: any, user: any) => {
  return knex("users")
    .select("users.id")
    .where("users.name", user)
    .first()
}

const createItem = (knex: any, item: any, user: any, event: any) => {

  return knex("todo")
    .select("todo.id")
    .where("events.name", event)
    .join("events", "events.id", "todo.events_id")
    .first()
    .then((todoId: any) => {
      console.log("todoooo", todoId, "usersssss", user)
      if (user) {
        volunteer(knex, user).then((u: any) => {
          if (u) {
            console.log("todid", todoId, "users2", u);
            return knex("items").insert({
              name: item.name,
              quantity: item.quantity,
              isactive: item.isactive,
              users_id: u.id,
              todo_id: todoId.id,
              completed: item.completed
            })
          }
        })
       } 
      return knex("items").insert({
        name: item.name,
        quantity: item.quantity,
        isactive: item.isactive,
        todo_id: todoId.id,
        completed: item.completed
      })

    })
}

