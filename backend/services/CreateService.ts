import * as Knex from 'knex';
// const Promise = require("bluebird");

export default class CreateService {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex
    }

    getTemplate() {
        console.log("entered getTemplate")
        return this.knex("toDo as td")
            .select("td.id as td_id", "td.type", "items.name as items_name", "items.quantity")
            .join("items", "items.toDo_id", "td.id")
            .where("td.template", true)
            .then(todoArray => {
                console.log("completed query")
                todoArray.map((data: any) => { data.td_id, data.type, data.items_name, data.items_category })
                return todoArray
            })
    }

    saveNewEvent(data: any, user: any, res: any) {
        // console.log("data.itemsArray", data.itemsArray)
        return this.knex.transaction((trx) => {
            return trx("events")
                .insert({
                    name: data.events_name,
                    description: data.description,
                    datetime: data.datetime,
                    address: data.address,
                    location: data.location,
                    private: true,
                    deposit: data.deposit,
                    isactive: true
                })
                .returning("id")
                .then(eventid => {
                    console.log("eventid", eventid)
                    eventid.map((idata: any) => {
                        idata.id
                    })
                    return trx("toDo")
                        .insert({
                            events_id: eventid[0],
                            type: data.todo_type,
                            isactive: true,
                            template: false
                        })
                        .returning("id")
                        .then((todoid: any) => {
                            console.log("todoid", todoid)
                            todoid.map((tdata: any) => {
                                tdata.id
                            })
                            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ADDING NEW VOLUNTEERS    
                            // let volunteerIds: any[] = [];

                            // for (let i in data.itemsArray) {
                            //     this.knex("users")
                            //         .select("users.id")
                            //         .where("name", data.itemsArray[i].volunteer)
                            //         .then((vId) => {
                            //             console.log("vId", vId)
                            //             volunteerIds.push(
                            //                 vId.id
                            //             )
                            //         })
                            // }
                            // console.log("volunteerIds",volunteerIds)
                            //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ADDING NEW VOLUNTEERS


                            let parsedItems: any[] = [];

                            for (let i in data.itemsArray) {
                                parsedItems.push({
                                    name: data.itemsArray[i].items_name,
                                    quantity: data.itemsArray[i].quantity,
                                    toDo_id: todoid[0],
                                    isactive: true
                                })
                            }
                            console.log("parsedItems", parsedItems)
                            return trx("items")
                                .insert(parsedItems)
                                .returning("id")
                                .then((itemid: any) => {
                                    return trx("events_users")
                                        .insert({
                                            users_id: user,
                                            events_id: eventid[0],
                                            creator: true,
                                            isactive: true
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

//ADD EVENTS_USERS USER RELATION WHERE CREATOR IS TRUE
// select "toDo".id as "toDo_id", "toDo".type,items.name as items_name, items.quantity from "toDo" inner join items on items."toDo_id" = "toDo".id where "toDo".template = true