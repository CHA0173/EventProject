import * as fs from 'fs-extra';
import * as Knex from 'knex';
import * as path from 'path';


exports.seed = (knex: Knex) => {
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
}

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