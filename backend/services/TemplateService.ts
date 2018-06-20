import * as Knex from "knex";


export default class TemplateService {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex
    }

    //COMPLETE
    getTemplate() {
        console.log("entered getTemplate")
        return this.knex("todo as td")
            .select("td.id as td_id", "td.type", "td.package", "items.name as items_name", "items.quantity")
            .join("items", "items.todo_id", "td.id")
            .where("td.template", true)
            .then(todoArray => {
                console.log("completed query")
                todoArray.map((data: any) => { data.td_id, data.type, data.package, data.items_name, data.items_category })
                return todoArray
            })
    }
}