import options from "./api_key.js";


let Movie = document.getElementById("movies");
let info = document.querySelectorAll(".info");
let rightArrow = document.getElementById("right");
let leftArrow = document.getElementById("left");
let layer = document.getElementById("layer");

var i = 0;
let offset;
let Time = 100;

let isFinished = true;
let start = true;

//Refreshing on title click
function autoRefresh() {
    window.location = window.location.href;
}
//Navigation bar on mobile
let btn = document.getElementById("drop")
let form = document.getElementById("form");
let isDown = false;
btn.onclick = () => {
    console.log("True")
    form.classList.toggle("show")
}





//Movie fetching
let movieName;
let movies;
let index = 100;
let founded_results = document.getElementById("res").innerHTML
let pageCount = 2;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.toggle("show");
    let search = document.querySelector("input");
    movieName = search.value;
    search.value = ""
   

    let isAnime = false;
    let r = 0;
    Movie.innerHTML = `<main class="info" id="start">
            <section id="desc">
            <div>
                <h1>SEMO</h1>
                <h3>A movie searcher website</h3>
            </div>
            <p>This is just a simple project i've been working on on my free time, It's nothing mush but I hope you like it.
                I used <a href="https://www.themoviedb.org" target="_blank">TMDB</a> (The movie database) API in order to make this website in pure html css and javascript.
            </p>
            </section>
        </main>`
    index = 100;
    for (let j = 1; j < pageCount; j++) {
        movies = fetch(`https://api.themoviedb.org/3/search/multi?query=${movieName}&include_adult=false&language=en-US&page=${j}&sort_by=popularity.desc`, options)
            .then(res => res.json())

            .then(res => {
                console.log(res.results);
                const m = res.results.filter(item => item.media_type == 'movie');
                const t = res.results.filter(item => item.media_type == 'tv');




                t.forEach(element => {
                    const posterPath = element.poster_path;
                    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                    let title = element.name;
                    let releaseDate = element.first_air_date;
                    let summary = element.overview;
                    for (let k = 0; k < element.genre_ids.length; k++) {
                        if (element.genre_ids[k] == 16) {
                            isAnime = true;
                            break;
                        }
                        else {
                            isAnime = false;
                        }

                    }
                    if (isAnime || (element.vote_average > 3 && element.popularity > 2.2)) {
                        document.getElementById("res").innerHTML = ++r;
                        let movie =
                            `<main class="info" style="z-index:${index--}">
                                <img src=${imageUrl} class="movie-poster">
                                <section id="desc">
                                <div>
                                    <h1>${title}</h1>
                                    <h3>${releaseDate}</h3>
                                </div>
                                <p>${summary}</p>
                                </section>
                            </main>`;
                        Movie.innerHTML += movie;
                    }

                })

                m.forEach(element => {
                    const posterPath = element.poster_path;
                    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                    let title = element.title;
                    let releaseDate = element.release_date;
                    let summary = element.overview;
                    for (let k = 0; k < element.genre_ids.length; k++) {
                        if (element.genre_ids[k] == 16) {
                            isAnime = true;
                            break;
                        } else {
                            isAnime = false;
                        }

                    }

                    if (isAnime || (element.vote_average > 3 && element.popularity > 2.2)) {
                        document.getElementById("res").innerHTML = ++r;
                        let movie =
                            `<main class="info" style="z-index:${index--}">
                                <img src=${imageUrl} class="movie-poster">
                                <section id="desc">
                                <div>
                                    <h1>${title}</h1>
                                    <h3>${releaseDate}</h3>
                                </div>
                                <p>${summary}</p>
                                </section>
                            </main>`;
                        Movie.innerHTML += movie;
                    }

                })

            })
            .catch(error => console.error(error))
    }
    i = 1;

})


//Right and left arrow functions
rightArrow.onmousedown = () => {


    if (Math.abs(i) < Movie.children.length - 1 && isFinished) {
        console.log("i: ", i)

        offset = 100;
        isFinished = false;
        setTimeout(() => {
            Movie.children[i - 1].style.left = `${offset}vw`;
        }, Time)
        i++;
        isFinished = true;
    }
}

leftArrow.onmousedown = () => {

    if (Math.abs(i) > 0 && isFinished) {
        isFinished = false;
        offset = 0;
        setTimeout(() => {

            Movie.children[i].style.left = `${offset}rem`;
            console.log("Left")


        }, Time)
        isFinished = true;
        i--;
    }

}





