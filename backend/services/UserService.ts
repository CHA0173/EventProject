import * as Knex from 'knex';

export default class UserService {
    private knex: Knex;

    constructor(knex:Knex) {
        this.knex = knex
    }

    list(email:string) {
        return this.knex("users").select("users.id as users_id", "users.name as user_name", "events.id as events_id", "events.name as event_name")
        .join("users", "users.id", "events_users.users_id")
        .join("events", "events.id", "events_users.events_id")
        .where("users.email", email)
        // .then(profileArray => {
        //     return this.knex("items")
        //     .select(
        //         "items", "quantity"
        //     )
            // .join("items", "items.users_id")
        // })
    }

    findByEmail(email:string) {
        return this.knex('users').first().where("email", email)
    }
}