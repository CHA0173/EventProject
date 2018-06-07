import * as fs from "fs-extra";
import * as Knex from 'knex'
import * as path from "path";

exports.seed = (knex: Knex) => {
  // Deletes ALL existing entries
  return knex('items').del().then(() => {
    return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([{
        email: 'host@host.com',
        name: 'host',
        password: 'asdf',
        isactive: true,
      }, {
        email: 'peter@peter.com',
        name: 'peter',
        password: 'asdf',
        isactive: true,
      }, {
        email: 'paul@paul.com',
        name: 'paul',
        password: 'asdf',
        isactive: true,
      }, {
        email: 'mary@mary.com',
        name: 'mary',
        password: 'asdf',
        isactive: true,
      }]);
    })
    .then(() => {
      return knex('events').del()
        .then(() => {
          return knex('events').insert({
            isactive: true,
            address: 'Saikung Pier 1',
            dateTime: '2018-07-20 09:00:00',
            deposit: 100,
            description: 'the more the merrier',
            name: 'junk boat party',
            private: true,
          })
        })
    })
    .then(() => {
      return knex('categories').del()
        .then(() => {
          return knex('categories').insert([
            { category: 'drinks' },
            { category: 'food' },
            { category: 'equipment' },
            { category: 'toys/games' }
          ]);
        })
    })
    .then(() => {
      let itemList = fs.readJsonSync(path.join(__dirname, '../seeds', "todolistitems.json"));
      return knex('items').del()
        .then(() => {
          let result: any[] = [];
          itemList.forEach((item: any) => {
            let user = item.user
            let category = item.category
            result.push(createItem(knex, item, category, user))
          });
          return Promise.all(result);
        })
    })
  })
};



const createItem = (knex: any, item: any, category: any, user: any) => {
  return knex('categories')
      .where("category", category)
      .first()
      .then((categoryRecord: any) => {
          return knex("users")
              .where("name", user)
              .first()
              .then((user: any) => {
                  return knex("items").insert({
                      name: item.name,
                      quantity: item.quantity,
                      isactive: item.isactive,
                      categories_id: categoryRecord.id,
                      users_id: user.id
                  })
              })
      })
}