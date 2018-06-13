export default (fakeData) => {
  return fetch(`https://dummyimage.com/600x400/000000/fff.png&text=fake+img`)
      .then(response => Promise.all([response, response.json()]))
}