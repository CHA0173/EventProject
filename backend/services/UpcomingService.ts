import * as Knex from 'knex';

export default class UpcomingService {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex
    }

    myEvents(userid: any) {//^^^^^CANNOT PERFORM QUERY^^^^^^^
        console.log("entered myEvents")
        console.log("userid", userid)
        return this.knex("events")//select all users events
        .select("events.id as events_id", "events.name as events_name", "events.datetime", "events.photo")
        .join("events_users", "events_users.events_id", "events.id")
        .join("users", "events_users.users_id", "users.id")
        .where("users.id", userid)
        .andWhere("events.isactive", true)
            .then(upcomingArray => {
                console.log("eventArray before", upcomingArray)
                upcomingArray.map((data: any) => { data.events_id, data.events_name, data.datetime, data.photo })
                console.log("eventArray after", upcomingArray)
                return upcomingArray
            })
            
    }

}