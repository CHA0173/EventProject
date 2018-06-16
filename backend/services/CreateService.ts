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

    saveNewEvent(data: any, user: any) {
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
                .then(todoid => {
                    console.log("todoid", todoid)
                    todoid.map((idata: any) => {
                        todo_id: idata.id
                    })
                    let parsedItems: any[] = [];

                    for (let i in data.itemsArray) {
                        parsedItems.push({
                            name: data.itemsArray[i].items_name,
                            quantity: data.itemsArray[i].quantity
                        })
                    }
                    console.log(parsedItems)
                    return trx("items")
                        .insert(parsedItems)

                });

        })


    }


}

//ADD EVENTS_USERS USER RELATION WHERE CREATOR IS TRUE
// select "toDo".id as "toDo_id", "toDo".type,items.name as items_name, items.quantity from "toDo" inner join items on items."toDo_id" = "toDo".id where "toDo".template = true