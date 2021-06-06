const axios = require('axios');
  
  export function fetchMovies(q) {
    return new Promise((resolve) =>
    {
      axios.get(`https://proficient.ninja/archie/imdb.php?q=${q}`).then(result => {
        resolve({ data: result.data });
      })

    }
    
    );
    
  }