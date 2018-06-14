import * as Knex from "knex";

export default class AttendeesService {
  private knex : Knex;
  
  constructor(knex: Knex) {
    this.knex = knex
  }
}