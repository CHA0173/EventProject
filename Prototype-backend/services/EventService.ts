import * as Knex from "knex";
// import * as multer from 'multer';


export default class EventService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }


  list(userid: number) {
    console.log("list start")
    return this.knex("events")
      .select(
        "events.id as events_id",
        "events.name as events_name",
        "events.description as events_description",
        "events.datetime as events_datetime",
        "events.photo as events_photo",
        "events.address as events_address",
        "events.private as events_private",
        "events.deposit as events_deposit",
        "todo.id as todo_id",
        "todo.type as todo_type"
      )
      // .join("events_users", "events.id", "events_user.events_id")
      .join("todo", "todo.events_id", "events.id")
      .join("items", "items.todo_id", "todo.id")
      .where("events.id", 2)
      .andWhere("events.isactive", true)
      .then(eventArray => {
        // eventArray.map((data: any) => { data.events_id, data.events_name, 
        //   data.description, data.datetime, data.photo, data.address, data.private,
        // data.deposit, data.todo_id, data.todo_type })

        // console.log("eventArray",eventArray)
        // console.log("eventArray todoid", eventArray[0].todo_id)
        return this.knex("items")
          .select(
            "items.id as items_id",
            "items.name as items_name",
            "items.completed",
            "items.quantity",
            "items.users_id"
          )
          .join("todo", "todo.id", "items.todo_id")
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
                return { eventArray: eventArray, arrayItemObject: arrayItemObject};
          })
      })

  }

  // list(id: number) 
  //   return (
  //     this.knex("events")

  //       // .join("events_users", "events.id", "events_user.events_id")
  //       .select(
  //         "events.id as events_id",
  //         "events.name as events_name",
  //         "events.description as events_description",
  //         "events.datetime as events_datatime",
  //         "events.address as events_address",
  //         "events.location as events_location",
  //         "events.private as events_private",
  //         "events.deposit as events_deposit",
  //         "todo.id as todo_id",
  //         "todo.type as todo_type",
  //         // "todo.template",
  //         // "todo.events_id",
  //       )
  //       .join("todo", "todo.events_id", "events.id")
  //       .where("events.id", 2)
  //       .andWhere("events.isactive",true)
  //       .then(eventArray=> {
          
  //         console.log("eventArray",eventArray)
  //         console.log("eventArray todoid", eventArray[0].todo_id)
  //         return this.knex("items")
  //         .select(
  //           "items.id as items_id",
  //           "items.name as items_name",
  //           "items.compeleted as items_compeleted",
  //           "items.quantity as items_quantity",
  //           "items.users_id as items_users_id",
  //         )
  //         .join("todo", "todo.id", "items.todo_id")
  //         .where("items.todo_id",eventArray[0].todo_id)
  //         .andWhere("items.isactive",true)
  //         .then((itemArray:any) => {
  //           console.log("itemArray",itemArray)
  //           let item: any[] = [];
  //           for (let i = 0; i > itemArray.length; i++) {
  //             item.push( {
  //               items_id: itemArray[i].items_id,
  //               items_name: itemArray[i].items.name,
  //               items_quantity: itemArray[i].items_quantity,
  //               items_users_id: itemArray[i].items_users_id,
  //             })
              
  //           }
  //           console.log("item",item);
  //         })
  //       })
  //       .then(result => {
  //         console.log(result);
  //         return result;
  //       })
  //   );
  // }

  update(id: number, group: string) {  
    // return this.knex("events")
    //   .update(
    //   //   .select(
    //   //     "events.description",
    //   //     "events.photo"
    //   // )
    //   )
    //   .where("events.id", id)
    //   .
  return Promise.resolve();
}

  diactive() {
    return this.knex("events").update("isactive", "false");
  }
}
