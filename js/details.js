const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const GENRES_API = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const VIDEO_PATH = 'https://api.themoviedb.org/3/movie/'
const VIDEO_KEY = '/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c'

async function getSingleMovie(url) {
    const res = await fetch(url)
    const data = await res.json()

    show(data.results[0]);
}

async function genreToString(url, id){
    const res = await fetch(url)
    const data = await res.json()
    let genreName = "";
    for(var key in data.genres){
        if(data.genres[key]['id']==id){
            genreName=data.genres[key]['name'];
        }
    }
    document.getElementById("genre").innerHTML=genreName;
}

async function getVideo(url,id,key) {
    const res = await fetch(url+id+key)
    const data = await res.json()

    document.getElementById("video").href="https://www.youtube.com/watch?v="+data.results[0]['key']
}

function show(movie){
    const { title, release_date, genre_ids, overview, poster_path, vote_average, id} = movie;
    document.getElementById('title').innerHTML=title;
    document.getElementById("year").innerHTML=release_date.slice(0,4);
    genreToString(GENRES_API, genre_ids[0]);
    document.getElementById("description").innerHTML=truncate(overview, 285, true);
    document.getElementById("rate").innerHTML=vote_average+" / 10";
    document.getElementById("image").src=IMG_PATH + poster_path;
    getVideo(VIDEO_PATH, id, VIDEO_KEY);
}

function showSingleMovie(movie){
    getSingleMovie(SEARCH_API + movie);
}
function truncate( str, n, useWordBoundary ){
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1);
    return (useWordBoundary 
      ? subString.substr(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;";
};
