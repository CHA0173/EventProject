import * as Knex from "knex";


export default class TemplateService {
    
    constructor(private knex: Knex) {
        this.knex = knex
    }

    getAll() {
        return this.knex("todo as td")
            .select("td.id as td_id", "td.type", "td.package", "items.name as items_name", "items.quantity")
            .join("items", "items.todo_id", "td.id")
            .where("td.template", true)
    }
}