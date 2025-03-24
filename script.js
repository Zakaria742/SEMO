import options from "./api_key.js";

fetch(`https://api.example.com?key=${apiKey}`);

let Movie = document.getElementById("movies");
let rightArrow = document.getElementById("right");
let leftArrow = document.getElementById("left");
let siteTitle = document.getElementById("site-title")

var i = 0;
let offset;
let Time = 100;

let isFinished = true;

//Refreshing on title click
function autoRefresh() {
    window.location = window.location.href;
    return;
}
siteTitle.addEventListener("click", autoRefresh);

//Navigation bar on mobile
let btn = document.getElementById("drop")
let form = document.getElementById("form");
btn.onclick = () => {
    form.classList.toggle("show")
}





//Movie fetching
let movieName;

let index = 100;
let founded_results = document.getElementById("res").innerHTML
let pageCount = 4;
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
            <p>This is just a simple project i've been working on on my free time, It's nothing much but I hope you like it.
                I used <a href="https://www.themoviedb.org" target="_blank">TMDB</a> (The movie database) API in order to make this website in pure html, css and javascript.<span>You can click on the left and right side of the screen </span>to traverse the results after searching.
            </p>
            </section>
        </main>`
    index = 100;
    let resultsFound = false;
    for (let j = 1; j < pageCount; j++) {
        let movies = fetch(`https://api.themoviedb.org/3/search/multi?query=${movieName}&include_adult=false&language=en-US&page=${j}&sort_by=popularity.asc`, options)
            .then(res => res.json())

            .then(res => {
                console.log(res.results)
                if(res.results.length > 0){
                    resultsFound = true;
                }
                if (res.results.length == 0 && !resultsFound) {
                    resultsFound = false;
                    Movie.innerHTML = `<main class="info" id="start" style="scale:0.6;">
            <section id="desc">
            <div>
                <img src="./images/exclamation-triangle-solid.png" alt="Error">
                <h1>Movie or TV series not found</h1>
            </div>
            <p style=" text-align: center;">Please make sure you entered the correct name</p>
            </section>
        </main>`
                }
                const m = res.results.filter(item => item.media_type == 'movie');
                const t = res.results.filter(item => item.media_type == 'tv');




                t.forEach(element => {
                    const posterPath = element.poster_path;
                    let imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                    let scale = "1";
                    if (posterPath == null) {
                        imageUrl = "./images/ban-solid.png"
                        scale = "0.07";
                    }
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
                                <img src=${imageUrl} class="movie-poster" style="scale:${scale}">
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
                    let imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
                    let scale = "1";
                    if (posterPath == null) {
                        imageUrl = "./images/ban-solid.png"
                        scale = "0.07"
                    }
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
                                <img src=${imageUrl} class="movie-poster" style="scale:${scale};">
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





