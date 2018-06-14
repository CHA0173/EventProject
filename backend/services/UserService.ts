import * as Knex from 'knex';

export default class UserService {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex
    }

    getProfile(userid: any) {
        return this.knex("events_users")
            .select("events_users.events_id")
            .join("users", "events_users.users_id", "users.id")
            .where("users.id", userid)
            .then(eventIdArray => {
                eventIdArray = eventIdArray.map((e: any) => e.events_id)
                return this.knex("events")
                    .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
                    .where("events.id", "in", eventIdArray)
                    .then(eventArray => {
                        let eventArrayObject = {};
                        for (let i = 0; i < eventArray.length; i++) {
                            let newnewElement = {
                                event_id: eventArray[i].events_id,
                                event_name: eventArray[i].name,
                                event_photo: eventArray[i].photo,
                                event_datetime: eventArray[i].datetime
                            }
                            let event_id = eventArray[i].events_id;
                            if (!Array.isArray(eventArrayObject[event_id])) {
                                eventArrayObject[event_id] = [newnewElement]
                            } else {
                                eventArrayObject[event_id].push(newnewElement)
                            }
                        }
                    }).then(eventArrayObject => {
                        console.log(eventArrayObject, eventIdArray)
                        return this.knex("items")
                            .select("items.name as item_name, items.id as item_id, items.quantity, items.completed, events.name as event_name, events.id as event_id")
                            .join("toDo", "toDo.id", "items.toDo_id")
                            .join("events", "events.id", "toDo.events_id")
                            .where("items.user_id", userid)
                            .then(itemArray => {
                                let itemArrayObject = {};
                                for (let i = 0; i < itemArray.length; i++) {
                                    let newElement = {
                                        event_id: itemArray[i].events_id,
                                        event_name: itemArray[i].event_name,
                                        item_name: itemArray[i].item_name,
                                        item_quantity: itemArray[i].quantity,
                                        item_completed: itemArray[i].completed
                                    }
                                    let item_id = itemArray[i].item_id
                                    if (!Array.isArray(itemArrayObject[item_id])) {
                                        itemArrayObject[item_id] = [newElement]
                                    } else {
                                        itemArrayObject[item_id].push(newElement)
                                    }
                                }
                            })
                            .then(itemArrayObject => {
                                return this.knex("users")
                                    .select("users.id as users_id", "users.name as users_name", "users.photo")
                                    .where("users.id", userid)
                                    .then((usersArray: string[]) => {
                                        let result: any = []
                                        result = result.unshift(usersArray[0], usersArray[1], usersArray[2], itemArrayObject)
                                        return result
                                    })
                            })
                    })
            })
    }


    async myEvents(userid: any) {
        return this.knex("events_users")
            .select("events_users.events_id")
            .join("users", "events_users.users_id", "users.id")
            .where("users.id", userid)
            .then(eventIdArray => {
                eventIdArray = eventIdArray.map((e: any) => e.events_id)
                return this.knex("events")
                    .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
                    .where("events.id", "in", eventIdArray)
                    .then(eventArray => {
                        let eventArrayObject = {};
                        for (let i = 0; i < eventArray.length; i++) {
                            let newnewElement = {
                                event_id: eventArray[i].events_id,
                                event_name: eventArray[i].name,
                                event_photo: eventArray[i].photo,
                                event_datetime: eventArray[i].datetime
                            }
                            let event_id = eventArray[i].events_id;
                            if (!Array.isArray(eventArrayObject[event_id])) {
                                eventArrayObject[event_id] = [newnewElement]
                            } else {
                                eventArrayObject[event_id].push(newnewElement)
                            }
                        }
                    })
            })
    }


    async findByEmail(email: string, password: string) {
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