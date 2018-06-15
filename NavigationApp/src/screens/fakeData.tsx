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

export { Events };