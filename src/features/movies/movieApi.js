const axios = require('axios');

function fetchMovies(q) {
    return new Promise((resolve) => {
        axios.get(`https://proficient.ninja/archimedes/imdb.php?q=${q}`).then(result => {
            resolve({ data: result.data });
        })
    });
}

function fetchNZB(q) {
    return new Promise((resolve) => {
        axios.get(`https://proficient.ninja/archimedes/nzb.php?q=${q}`).then(result => {
            resolve({ data: result.data });
        })
    });
}

function startNZB(url) {
    return new Promise((resolve) => {
        axios.post(`http://localhost:4500/start`, {nzb : {url : url}}).then(result => {
            resolve({ data: result.data });
        })
    });
}

export { fetchMovies, fetchNZB, startNZB }