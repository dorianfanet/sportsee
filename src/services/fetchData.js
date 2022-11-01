/**
 * Function used to fetch API data
 * @param {String} URL - API endpoint 
 * @returns {Promise}
 */
export default async function fetchData(URL) {
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