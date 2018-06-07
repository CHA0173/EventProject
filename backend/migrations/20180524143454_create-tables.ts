import * as Knex from "knex";

exports.up = (knex: Knex) => {
    return knex.schema.createTable('users', (users) => {
        users.increments();
        users.string("email").notNullable().unique();
        users.string("name").notNullable().unique();
        users.string("password");
        users.boolean("isactive");
    }).then(() => {

        return knex.schema.createTable("events", (events) => {
            events.increments();
            events.string("name").notNullable();
            events.string("description").notNullable();
            events.timestamp("dateTime").notNullable();
            events.string('address').notNullable();
            events.specificType('location', 'POINT');
            events.boolean("private");
            events.decimal("deposit");
            events.boolean("isactive");
        })
    }).then(() => {

        return knex.schema.createTable("categories", (categories) => {
            categories.increments();
            categories.string("category");
            categories.boolean("isactive");
        })
    }).then(() => {

        return knex.schema.createTable("items", (items) => {
            items.increments();
            items.string("name").notNullable();
            items.integer("quantity");
            items.integer("categories_id").unsigned();
            items.foreign("categories_id");
            items.integer("users_id").unsigned();
            items.foreign("users_id").references("users.id");
            items.boolean("isactive");

        })
    }).then(() => {

        return knex.schema.createTable("toDo", (todo) => {
            todo.increments();
            todo.integer("events_id").unsigned();
            todo.foreign("events_id").references("events.id");
            todo.integer("items_id").unsigned();
            todo.foreign("items_id").references("items.id");
            todo.string('type');
            todo.timestamps(false, true);
            todo.boolean("template");
            todo.boolean("isactive");
        })
    }).then(() => {
        return knex.schema.createTable("events_users", (eventsUsers) => {
            eventsUsers.increments();
            eventsUsers.integer("users_id").unsigned();
            eventsUsers.foreign("users_id").references("users.id");
            eventsUsers.integer("events_id").unsigned();
            eventsUsers.foreign("events_id").references("events.id");
            eventsUsers.boolean("creator");
            eventsUsers.boolean("isactive");
            eventsUsers.json("discussion"); /* ^^^^^^^JSON DISCUSSION OBJECT^^^^^^^^^ */
        })
    })
}

exports.down = (knex: Knex) => {
    return knex.schema.dropTable('events_users')
        .then(() => knex.schema.dropTable('toDo'))
        .then(() => knex.schema.dropTable('items'))
        .then(() => knex.schema.dropTable('categories'))
        .then(() => knex.schema.dropTable('events'))
        .then(() => knex.schema.dropTable('users'));

}


// ^^^^^^^^JSON DISCUSSION OBJECT CREATION^^^^^^^^^^
// class JsonArrayTest extends Model {
//     static get tableName() {
//         return 'capstone'
//     }

//     static get jsonSchema() {
//         return {
//             type: 'object',
//             properties: {
//                 discussion: {
//                     user: 'user',
//                     comment: 'comment'
//                 }
//             }
//         }
//     }
// }