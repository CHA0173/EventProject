import * as Knex from "knex"




export default class SearchService {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }
    result(name: string) {
        //Current iteration does not allow for results to consider multiple parameters at once
        console.log("name", name)
            return this.knex("events")
                .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
                .from("events")
                .where("name", "ilike",  `%${name}%`)
                .andWhere("events.isactive", true)
                .then(eventArray => {
                    console.log("eventArray", eventArray)
                    let eventArrayObject = {};
                    for (let i = 0; i < eventArray.length; i++) {
                        let newElement = {
                            event_id: eventArray[i].events_id,
                            event_name: eventArray[i].name,
                            event_photo: eventArray[i].photo,
                            event_datetime: eventArray[i].datetime
                        }
                        let event_id = eventArray[i].events_id;
                        if (!Array.isArray(eventArrayObject[event_id])) {
                            eventArrayObject[event_id] = [newElement]
                     
                        } else {
                            eventArrayObject[event_id].push(newElement)
                        }      
                    }
                    // console.log("eventArrayObject", eventArrayObject) 
                    return eventArrayObject;
                })
        }
    }

// else if (datetime != undefined) {
//     return this.knex("events")
//         .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
//         .from("events")
//         .where("datetime::date", "=", `${datetime}::date`)
//         .then(eventArray => {
//             let eventArrayObject = {};
//             for (let i = 0; i < eventArray.length; i++) {
//                 let newElement = {
//                     event_id: eventArray[i].events_id,
//                     event_name: eventArray[i].name,
//                     event_photo: eventArray[i].photo,
//                     event_datetime: eventArray[i].datetime
//                 }
//                 let event_id = eventArray[i].events_id;
//                 if (!Array.isArray(eventArrayObject[event_id])) {
//                     eventArrayObject[event_id] = [newElement]
//                 } else {
//                     eventArrayObject[event_id].push(newElement)
//                 }
//             } return eventArrayObject;
//         })
// } else if (type != undefined) {
//     let subquery1 = this.knex
//         .select("events_id")
//         .from("toDo")
//         .where("type", type)
//     return this.knex("events")
//         .select("events.id as events_id", "events.name", "events.photo", "events.datetime")
//         .from("events")
//         .where("events.id", "in", subquery1)
//         .then(eventArray => {
//             let eventArrayObject = {};
//             for (let i = 0; i < eventArray.length; i++) {
//                 let newElement = {
//                     event_id: eventArray[i].events_id,
//                     event_name: eventArray[i].name,
//                     event_photo: eventArray[i].photo,
//                     event_datetime: eventArray[i].datetime
//                 }
//                 let event_id = eventArray[i].events_id;
//                 if (!Array.isArray(eventArrayObject[event_id])) {
//                     eventArrayObject[event_id] = [newElement]
//                 