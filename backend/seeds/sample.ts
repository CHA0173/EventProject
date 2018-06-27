import * as fs from "fs-extra";
import * as Knex from "knex"
import * as path from "path";

exports.seed = (knex: Knex) => {
  // Deletes ALL existing entries
  return knex("events_users").del().then(() => {
    return knex("items").del().then(() => {
      return knex("todo").del().then(() => {
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
            },
            {
              email: "sample@sample.com",
              name: "sample",
              password: "asdf",
              isactive: false,
            }
          ]);
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
                },
                {
                  name: "boat party basic template",
                  description: "basic template",
                  datetime: "2017-01-01 00:00:00",
                  address: "none",
                  private: true,
                  isactive: false
                },
                {
                  name: "boat party deluxe template",
                  description: "deluxe template",
                  datetime: "2017-01-01 00:00:00",
                  address: "none",
                  private: true,
                  isactive: false
                },
                {
                  name: "boat party supreme template",
                  description: "supreme template",
                  datetime: "2017-01-01 00:00:00",
                  address: "none",
                  private: true,
                  isactive: false
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
                let eventPackage = item.package
                let eventType = item.type
                let user = item.user

                result.push(createItem(knex, item, user, eventType, eventPackage))
              });
              return Promise.all(result);

        })
        .then(()=> {
          let attendeeList = fs.readJsonSync(path.join(__dirname, "usersevents.json"));
          let result:any[] = [];   
          attendeeList.forEach((item:any) => {
            let event = item.event
            let user = item.user
            result.push(createEvent(knex, item, user, event))
          })

            return Promise.all(result);
        })
        .then(()=> {
          let attendeeList = fs.readJsonSync(path.join(__dirname, "comments.json"));
          let result:any[] = [];   
          attendeeList.forEach((item:any) => {
            result.push(createDiscussion(knex, item))
          })
            return Promise.all(result);
        })
    })
  })
};

const createDiscussion = (knex:any, item:any) => {
  return knex("discussion")
    .insert({
      users_id: item.users_id,
      events_id: item.events_id,
      isactive:true,
      comment: item.comment
    })
}

const createEvent = (knex: any, item: any, user:any, event: any) => {
  console.log("event", event);
  return knex("events")
    .select("events.id")
    .where("name", event)
    .first()
    .then((eventId:any) => {
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
        type: item.type,
        package: item.package,
        template: item.template,
        isactive: item.isactive,
        events_id: eventRecord.id
      })
    })
}




const createItem = (knex: any, item: any, user: any, eventType: any, eventPackage:any) => {
  console.log("eventType", eventType);

  return knex("users")
    .where("name", user)
    .first()
    .then((user: any) => {
      return knex("todo")
        .where("type", eventType)
        .modify((queryBuilder:any)=> {
          if(eventPackage) {
            queryBuilder.where("package", "like", `%${eventPackage}%`)
          }
        })
         .first()
        .then((todo: any) => {
          console.log("todo", todo)
          return knex("items").insert({
            name: item.name,
            quantity: item.quantity,
            package: item.package,
            isactive: item.isactive,
            users_id: user.id,
            todo_id: todo.id,
            completed: item.completed
          })
        })
    })
}

