// export default (fakeData) => {
//   return fetch(`https://dummyimage.com/600x400/000000/fff.png&text=fake+img`)
//       .then(response => Promise.all([response, response.json()]))
// }

//Events for SearchPage
const fakedata = [{
  id: 1,
  name: 'Event 1',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E1'
}, {
  id: 2,
  name: 'Event 2',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E2'
}, {
  id: 3,
  name: 'Event 3',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E3'
}, {
  id: 4,
  name: 'Event 4',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E4'
}, {
  id: 5,
  name: 'Event 5',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E5'
}, {
  id: 6,
  name: 'Event 6',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E6'
}, {
  id: 7,
  name: 'Event 7',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E7'
}, {
  id: 8,
  name: 'Event 8',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E8'
}, {
  id: 9,
  name: 'Event 9',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E9'
}, {
  id: 10,
  name: 'Event 10',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E10'
}, {
  id: 11,
  name: 'Event 11',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E11'
}, {
  id: 12,
  name: 'Event 12',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E12'
}, {
  id: 13,
  name: 'Event 13',
  img: 'https://dummyimage.com/600x400/000000/fff.png&text=E13'
}]

const event = {
  name: 'Boat Party',
  image: require('../img/boatparty.jpg'),
  description: 'Wanna meet some sexy ladies this weekend? Join and bring enough cash!',
  location: 'sai kung',
  price: 'HKD300',
  todo: {
    food: [{
      name: 'cake',
      quantity: '2'
    }, {
      name: 'apple',
      quantity: '3'
    }],
    drink: [{
      name: 'water',
      quantity: '12'
    }, {
      name: 'coke',
      quantity: '5'
    }]
  }
}


// Profile ToDoItem fakedata
const TodoData = [{
  id: 1,
  item: 'Coke',
  quality: 12,
  eventname: 'Even 1',
  isActive: true
}, {
  id: 2,
  item: 'Coke',
  quality: 12,
  eventname: 'Even 1',
  isActive: true
}, {
  id: 3,
  item: 'Coke',
  quality: 12,
  eventname: 'Even 1',
  isActive: false
}, {
  id: 4,
  item: 'Coke',
  quality: 102,
  eventname: 'Even 2',
  isActive: false
}, {
  id: 5,
  item: 'Coke',
  quality: 102,
  eventname: 'Even 2',
  isActive: false
}, {
  id: 6,
  item: 'Coke',
  quality: 12,
  eventname: 'Even 1',
  isActive: true
}, {
  id: 7,
  item: 'Coke',
  quality: 102,
  eventname: 'Even 1',
  isActive: false
}, {
  id: 8,
  item: 'Coke',
  quality: 102,
  eventname: 'Even 2',
  isActive: false
}, {
  id: 9,
  item: 'Coke',
  quality: 102,
  eventname: 'Even 2',
  isActive: false
},]



export { fakedata, event, TodoData };


export const fakeEvent1 = {
  "id": 1,
  "name": "Alex’s birthday boat",
  "description": "Alex is getting old!",
  "datetime": "2018 - 07 - 20T01: 00: 00.000Z",
  "photo": null,
  "address": "Saikung Pier 1",
  "private": true,
  "deposit": "100.00",
  "todo": [
    {
      "id": 1,
      "type": "boat party",
      "items": [
        {
          "id": 1,
          "name": "champagne bottles",
          "quantity": 5,
          "completed": null
        },
        {
          "id": 2,
          "name": "birthday cake",
          "quantity": 10,
          "completed": null
        },
        {
          "id": 3,
          "name": "portable speakers",
          "quantity": 1,
          "completed": null
        },
        {
          "id": 4,
          "name": "poker set",
          "quantity": 1,
          "completed": null
        }
      ]
    }
  ],
  "attendees": [
    {
      "id": 1,
      "name": "Alex",
      "photo": null
    }
  ]
}