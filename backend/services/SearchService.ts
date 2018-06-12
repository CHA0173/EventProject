import * as Knex from 'knex'




export default class SearchService{
    private knex: Knex;
    constructor(knex: Knex) {
        this.knex = knex;
    }
    
    result(name?: string, datetime?:any, type?: string) {
       //Current iteration does not allow for results to consider multiple parameters at once
        if(name != undefined) {
           return  this.knex("events")
            .select("name", "events.id as events_id")
            .from("events")
            .where("name", "~*", name)
        } else if (datetime != undefined) {
            return this.knex("events")
            .select("name", "events_id as events.id")
            .from("events")
            .where("datetime::date", "=", `${datetime}::date`)
        } else if (type != undefined) {
            let subquery1 = this.knex
            .select("events_id")
            .from("toDo")
            .where("type", type)
            
            return this.knex("events")
            .select("name", "events.id as events_id")
            .from("events")
            .where("events.id", "in", subquery1)
        } else {
            return
        }

    }
}