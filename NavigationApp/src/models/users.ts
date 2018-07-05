// ======= api/users/:id

export interface Iuser {
  id: number,
  name: string,
  photo: string,
  events: Ievents[],
  items: Iitems[],
  notes: Inotes[]
}

export interface Inotes {
  eventId: number
  note: string
  timestamp: string
}

export interface Ievents {
  id: number,
  name: string,
  datetime: string,
  photo: any,
  creator: boolean,
}

export interface Iitems {
  id: number,
  name: string,
  quantity: string,
  completed: boolean,
  itemEventId: number,
}
