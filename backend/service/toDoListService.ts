import * as Knex from "knex";


export default class ToDoListService {
  private knex : Knex;
  
  constructor(knex: Knex) {
    this.knex = knex
  }

  list(){
    return this.knex('toDo')
  }

  update(){
    return this.knex("toDo")
  }
}