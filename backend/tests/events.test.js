import EventService from '../services/EventService'
// const EventService = require('../services/EventService.ts')
import * as Knex from 'knex';

describe('Test that yarn test works', () => {
    const eventService = new EventService()
    it('runs as planned', () => {
        const expected = true
        expect(eventService.eventName(1).toEqual(expected))
    })
})