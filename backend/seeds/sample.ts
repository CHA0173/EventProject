import * as fs from "fs-extra";
import * as Knex from "knex";
import * as path from "path";

//To run on server, run
// ./node_modules/knex/bin/cli.js <knex command>
exports.seed = (knex: Knex) => {
  const userList = fs.readJsonSync(
    path.join(__dirname, "users.json")
  );

  const eventList = fs.readJsonSync(
    path.join(__dirname, "events.json")
  );

  const todolist = fs.readJsonSync(
    path.join(__dirname, "todolist.json")
  );

  const itemList = fs.readJsonSync(
    path.join(__dirname, "todolistitems.json")
  );

  const attendeeList = fs.readJsonSync(
    path.join(__dirname, "usersevents.json")
  );

  const commentList = fs.readJsonSync(
    path.join(__dirname, "comments.json")
  );

  return knex.transaction(async trx => {
    // Insert Users
    await trx("users").insert(userList);

    // Insert Events
    await trx("events").insert(eventList);

    // Insert ToDo
    const toDos = todolist.reduce((result: any[], item: any) => result.concat(createList(trx, item, item.event)), []);
    await Promise.all(toDos);

    // Insert Items
    const items = itemList.reduce((result: any[], item: any, index: number) => {
      if (index % 3 === 0) {
        return result.concat(createItem(trx, item))
      } else {
        return result
      }
    }, []);
    await Promise.all(items);

    // Insert UserEvents
    const userEvents = attendeeList.reduce((result: any[], item: any) => result.concat(createEvent(trx, item)), []);
    await Promise.all(userEvents);

    // Insert Comments
    const comments = commentList.reduce((result: any[], item: any) => result.concat(createDiscussion(trx, item)), []);
    await Promise.all(comments);
  }) 
};

const createDiscussion = (trx: any, item: any) => {
  return trx("discussion").insert({
    users_id: item.users_id,
    events_id: item.events_id,
    isactive: true,
    comment: item.comment
  });
};

const createEvent = async (trx: any, item: any) => {
  const eventRecord = await findEvent(trx, item.event);
  const userRecord = await findUser(trx, item.user);
  return trx("events_users")
          .insert({
            users_id: userRecord.id,
            events_id: eventRecord.id,
            isactive: true,
            creator: item.creator
          })
          .returning("id");
};

const findEvent = (trx: any, eventName: any) => {
  return trx("events")
          .select("id")
          .where("name", eventName)
          .first();
};

const findUser = (trx: any, user: any) => {
  return trx("users")
          .select("id")
          .where("name", user)
          .first();
};

const createList = async (trx: any, item: any, event: any) => {
  const eventRecord = await findEvent(trx, event);
  return trx("todo")
          .insert({
            isactive: item.isactive,
            events_id: eventRecord.id
          })
          .returning("id");
};

const volunteer = (trx: any, user: any) => {
  return trx("users")
          .select("users.id")
          .where("users.name", user)
          .first();
};

const createItem = async (trx: any, item: any) => {
  const todo = await trx("todo")
                      .select("todo.id")
                      .where("events.name", item.event_name)
                      .join("events", "events.id", "todo.events_id")
                      .first();

  if (item.user) {
    const u = await volunteer(trx, item.user);
    if (u) {
      return trx("items").insert({
        name: item.name,
        quantity: item.quantity,
        isactive: true,
        users_id: u.id,
        todo_id: todo.id,
        completed: item.completed
      });
    }
  }
};
      