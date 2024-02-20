//Références: https://www.freecodecamp.org/news/javascript-get-request-tutorial/

const axios = require('axios');

// fetch request
fetch("https://jsonplaceholder.typicode.com/posts/6")
    .then((response) => response.json())
    .then((json) => console.log(json));
    
// axios request
axios.get("https://jsonplaceholder.typicode.com/posts/6")
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));

   
const web = fetch("https://www.centris.ca/fr/plex~a-vendre~trois-rivieres?view=Thumbnail");
console.log(web);


