
// ============== api/events

export interface Ievent {
  id: number,
  name: string,
  description: string,
  datetime: string,
  photo: any,
  address: string,
  private_event: boolean,
  deposit: string,
  todo: Itodo[],
  attendees: Iattendees[],
  discussion: Idiscussion[],
}

export interface Itodo {
  id: number,
  items: Iitems[],
}

export interface Iitems {
  id: number,
  name: string,
  quantity: number,
  completed: boolean,
  user_id: number,
  user_name: string,
}

export interface Iattendees {
  id: number,
  name: string,
  photo: string,
}

export interface Idiscussion {
  id: number,
  name: string,
  comment: string,
}

// ===================================