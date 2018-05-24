
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (users) => {
        users.increments();
        users.string("name");
        users.string("password");
    }).then(() => {

        return knex.schema.createTable("events", (events) => {
            events.increments();
            events.string("name");
            events.string("description");
            events.timestamp("dateTime");
            events.string('address');
            events.specificType('location', 'POINT');
            events.boolean("privatePublic");
            events.decimal("deposit");
            events.boolean("template");
        })
    }).then(() => {

        return knex.schema.createTable("categories", (categories) => {
            categories.increments();
            categories.string("type");
        })
    }).then(() => {

        return knex.schema.createTable("items", (items) => {
            items.increments();
            items.string("name");
            items.smallint("quantity");
            items.foreign("categories_id");
        })
    }).then(() => {

        return knex.schema.createTable("events_users", (eventsUsers) => {
            eventsUsers.increments();
            eventsUsers.smallint("users_id").unsigned();
            eventsUsers.foreign("users_id").references("users.id");
            eventsUsers.smallint("events_id").unsigned();
            eventsUsers.foreign("events_id").references("events.id");
        })
    }).then(() => {

        return knex.schema.createTable("toDo", (todo) => {
            todo.increments();
            todo.smallint("users_id").unsigned();
            todo.foreign("users_id").references("users.id");
            todo.smallint("events_id").unsigned();
            todo.foreign("events_id").references("events.id");
            todo.timestamps(false, true);
        })
    }).then(() => {

        return knex.schema.createTable("toDo_items", (todoItems) => {
            todoItems.increments();
            todoItems.smallint("toDo_id").unsigned();
            todoItems.foreign("toDo_id").references("toDo.id");
            todoItems.smallint("items_id").unsigned();
            todoItems.foreign("items_id").references("items.id");
        })
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('toDo_items')
        .then(() => knex.schema.dropTable('toDo'))
        .then(() => knex.schema.dropTable('events_users'))
        .then(() => knex.schema.dropTable('items'))
        .then(() => knex.schema.dropTable('categories'))
        .then(() => knex.schema.dropTable('events'))
        .then(() => knex.schema.dropTable('users'));

}
