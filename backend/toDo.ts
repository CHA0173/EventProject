import * as Knex from 'knex';

exports.seed = (knex: Knex) => {
    return knex('toDo').del()
        .then(() => {
            return knex('events').select('id', 'name')
            .then((data) => {
                return data.reduce((result: any, events: any) => {
                    if (events.name === 'junk boat party') {
                        result.push({events_id: events.id});
                    }
                return result;                    
                }, []);
            })
            .then((data) => {
                return knex('toDo').insert(data);
            })
        })

}