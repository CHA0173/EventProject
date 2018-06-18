// export default (fakeData) => {
//   return fetch(`https://dummyimage.com/600x400/000000/fff.png&text=fake+img`)
//       .then(response => Promise.all([response, response.json()]))
// }
const Events = [{
  id: 1,
  name: 'event1',
  img: `https://dummyimage.com/600x400/000000/fff.png&text=fake+img`
},
{
  id: 2,
  name: 'event2',
  img: `https://dummyimage.com/600x400/000000/fff.png&text=fake+img`
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

const junkBoat = {
  templateA: [
    {
      name: 'coke',
      quality: 10
    },
    {
      name: 'apple',
      quality: 6
    },
    {
      name: 'boardgame',
      quality: 1
    }
  ],
  templateB: [
    {
      name: 'wine',
      quality: 10
    },
    {
      name: 'oyster',
      quality: 6
    },
    {
      name: 'switch',
      quality: 1
    }
  ]
}

const birthdayParty = {
  templateA: [
    {
      name: 'coke',
      quality: 10
    },
    {
      name: 'cake',
      quality: 1
    },
    {
      name: 'candle',
      quality: 1
    }
  ],
  templateB: [
    {
      name: 'wine',
      quality: 10
    },
    {
      name: 'pizza',
      quality: 6
    },
    {
      name: 'cake',
      quality: 1
    }
  ]
}


export { Events, event, junkBoat, birthdayParty };