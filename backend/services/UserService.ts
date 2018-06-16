import * as Knex from 'knex';

export default class UserService {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex
    }

    getProfile(userid: number) {

        console.log("userid", userid)
        // console.log( this.knex("items")
        // .select("items.name as item_name, items.id as item_id, items.quantity, items.completed, events.name as event_name, events.id as event_id")
        // .join("toDo", "toDo.id", "items.toDo_id")
        // .join("events", "events.id", "toDo.events_id")
        // .where("items.users_id", userid).toSQL())
        return this.knex("events")//select all users events
            .select("events.id as events_id", "events.name as events_name", "events.datetime", "events.photo")
            .join("events_users", "events_users.events_id", "events.id")
            .join("users", "events_users.users_id", "users.id")
            .where("users.id", userid)
            .andWhere("events.isactive", true)
            .then(eventArray => {
                eventArray.map((data: any) => { data.events_id, data.events_name, data.datetime, data.photo })

                return this.knex("items")
                    .select("items.name as items_name", "items.id as items_id", "items.quantity", "items.completed", "events.id as events_id", "events.name as events_name")
                    .join("toDo", "toDo.id", "items.toDo_id")
                    .join("events", "events.id", "toDo.events_id")
                    .where("items.users_id", userid)
                    .andWhere("items.isactive", true)
                    .then(itemArray => {
                        itemArray.map((data: any) => { data.items_name, data.items_id, data.quantity, data.completed, data.events_id, data.events_name });
                        console.log("itemArray Before", itemArray)
                        return this.knex("users")
                            .select("users.id as users_id", "users.name as users_name", "users.photo")
                            .where("users.id", userid)
                            .andWhere("users.isactive", true)
                            .then((usersArray: any) => {
                                // console.log("usersArray", usersArray)
                                let result: any = {
                                    user_id: usersArray[0].users_id,
                                    user_name: usersArray[0].users_name,
                                    user_photo: usersArray[0].photo,
                                    itemArray,
                                    eventArray
                                }
                                console.log(result)
                                return result
                            })
                    })
            })
    }


    

    findByEmail(email: string, password: string) {
        return this.knex('users')
            .select('id')
            .first()
            .where("email", email)
            .andWhere("password", password)
    }
}

// return this.knex("users").select("users.id as users_id", "users.name as user_name", "events.id as events_id", "events.name as event_name")
// .join("users", "users.id", "events_users.users_id")
// .join("events", "events.id", "events_users.events_id")
// .where("users.email", email)
// .then(profileArray => {
//     return this.knex("items")
//     .select(
//         "items", "quantity"
//     )
//     .join("items", "items.users_id")
// })