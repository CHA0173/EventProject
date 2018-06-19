import * as Knex from "knex";

export default class EventService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }


  list(userid: number) {
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
      .where("events.id", 2) //userid
      .andWhere("events.isactive", true)
      .then(eventArray => {
        // eventArray.map((data: any) => { data.events_id, data.events_name, 
        //   data.description, data.datetime, data.photo, data.address, data.private,
        // data.deposit, data.todo_id, data.todo_type })

        console.log("eventArray",eventArray)
        console.log("eventArray todoid", eventArray[0])
        return this.knex("items")
          .select(
            "items.id as items_id",
            "items.name as items_name",
            "items.completed",
            "items.quantity",
            "items.users_id",
            "users.id as users_id",
            "users.name as users_name",
            "users.photo"
          )
          .join("todo", "todo.id", "items.todo_id")
          .join("users", "items.users_id", "users.id")
          .where("items.todo_id", eventArray[0].todo_id)
          .andWhere("items.isactive",true)
          .then((itemArray:any) => {
            console.log("itemArray", itemArray)
    

            let arrayItemObject: any[] = []
            for (let i in itemArray) {
                  arrayItemObject.push({
                    items_id: itemArray[i].items_id,
                    items_name: itemArray[i].items_name,
                    items_quantity: itemArray[i].quantity,
                    items_users_id: itemArray[i].users_id
                  })
                }
                console.log("arrayItemObject", arrayItemObject)
                return this.knex("users")
                .select("users.id as users_id", "users.name as users_name", "users.photo")
                .join("events_users", "events_users.users_id", "users.id")
                .join("events", "events_users.events_id", "events.id")
                .where("events.id", 2) //userid
                  .then((attendeesArray:any[]) => {
                    console.log("attendeesArray",attendeesArray)

                  })
          })
      })

      // .then(result => {
      //   console.log("result", result);
      //   return result;
      // })
  }

  update(id: number, group: string) {
    if (id != undefined) {
    }
    return this.knex("events")
      .update(group)
      .where("events.id", id);
  }

  diactive() {
    return this.knex("events").update("isactive", "false");
  }
}
