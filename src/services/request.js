export default async function request(URL) {
  return await fetch(`${URL}`, {
    "method": "GET",
  })
  .then(response => response.json())
  .then(response => {
    return response.data
  })
  .catch(err => { console.log(err); 
  });
}