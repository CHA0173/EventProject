// export default (fakeData) => {
//   return fetch(`https://dummyimage.com/600x400/000000/fff.png&text=fake+img`)
//       .then(response => Promise.all([response, response.json()]))
// }
 const Events =  [{
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
    },{
      name: 'coke',
      quantity: '5'
    }]
  }
}

export { Events, event };