
let Movie = document.getElementById("movies");
let rightArrow = document.getElementById("right");
let leftArrow = document.getElementById("left");
let siteTitle = document.getElementById("site-title");
let loading = document.getElementById("loading");

Movie.style.height = window.innerHeight;

var i = 0;
let offset;
let Time = 100;


let index = 100;

let NbresFound = 0;
//Navigation bar on mobile
let btn = document.getElementById("drop")
let form = document.getElementById("form");
btn.onclick = () => {
    form.classList.toggle("show")
}

//Refreshing on title click
function autoRefresh() {
    window.location = window.location.href;
    return;
}
siteTitle.addEventListener("click", autoRefresh);

//Error handling
function interError(error, errorID) {
    switch (errorID) {
        case -1:
            Movie.innerHTML = `<main class="info" id="error" style="scale:0.6;">
        <section id="desc">
        <div>
            <img src="./images/exclamation-triangle-solid.png" alt="Error">
            <h1>${error}</h1>
        </div>
        <p>Please check your internet connection and refresh the page</p>
        </section>
    </main>`
            break;
        case 0:
            Movie.innerHTML = `<main class="info" id="error" style="scale:0.6;">
        <section id="desc">
        <div>
            <img src="./images/exclamation-triangle-solid.png" alt="Error">
            <h1>${error}</h1>
        </div>
        <p>Please make sure you entered the correct name</p>
        </section>
    </main>`
            break;
        case 1:
            Movie.innerHTML = `<main class="info" id="error" style="scale:0.6;">
            <section id="desc">
            <div>
                <img src="./images/exclamation-triangle-solid.png" alt="Error">
                <h1>${error}</h1>
            </div>
            <p>Search bar field must be filled</p>
            </section>
        </main>`
            break;
    }

}
//Fetching and displaying TV and Movies
async function fetchMulti(movieName, lang, page) {
    try {
        loading.classList.remove("hidden");
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzVjNDc2ZTcwODQ4MmJhZjljMmE4ZWIzMjYzYjdmMSIsIm5iZiI6MTc0MjQ2NjE1NC4xMDIwMDAyLCJzdWIiOiI2N2RiZWM2YThhZjQ1MmYzMGZlOWU3ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HUZQvM3z9Yq7OfHisdS0GZmoacPwNfhEwYGe8kzvlCU'
            }
        };
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${movieName}&include_adult=false&language=${lang}&page=${page}&sort_by=popularity.desc`, options);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }
        const multi = await response.json();
        displayMuli(multi);
    } catch (error) {
        console.error("There was an error fetching.");
        interError(error.message, -1)
    }finally{
        loading.classList.add("hidden");
    }
}


function displayMuli(fetched) {


    let i = 0;
    let isAnime = false;

    let resultsFound = false;
    const MT = fetched.results;
    const m = MT.filter(item => item.media_type == 'movie');
    const t = MT.filter(item => item.media_type == 'tv');

    if (MT.length > 0) {
        resultsFound = true;
    }
    else if (MT.length == 0 && !resultsFound) {
        resultsFound = false;
        interError("Movie or TV series not found", 0);

    }

    if (t.length != 0) {
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
                document.getElementById("res").innerHTML = ++NbresFound;
                let tv =
                    `<main class="info" style="z-index:${index--}">
                                    <img src=${imageUrl} class="movie-poster" style="scale:${scale}" alt=${title}-poster>
                                    <section id="desc">
                                    <div>
                                        <h1 class="mTitle">${title}</h1>
                                        <h3>${releaseDate}</h3>
                                    </div>
                                    <p>${summary}</p>
                                    </section>
                                </main>`;
                Movie.innerHTML += tv;
                i++;
            }

        })
    }

    if (m.length != 0) {
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

            //Is the media anime
            for (let k = 0; k < element.genre_ids.length; k++) {
                if (element.genre_ids[k] == 16) {
                    isAnime = true;
                    break;
                } else {
                    isAnime = false;
                }

            }

            if (isAnime || (element.vote_average > 3 && element.popularity > 2.2)) {
                document.getElementById("res").innerHTML = ++NbresFound;
                let movie =
                    `<main class="info" style="z-index:${index--}">
                                    <img src=${imageUrl} class="movie-poster" style="scale:${scale};" alt=${title}-poster>
                                    <section id="desc">
                                    <div>
                                        <h1 class="mTitle">${title}</h1>
                                        <h3>${releaseDate}</h3>
                                    </div>
                                    <p>${summary}</p>
                                    </section>
                                </main>`;
                Movie.innerHTML += movie;
                i++;
            }

        })

    }




}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    Movie.innerHTML = "";
    form.classList.toggle("show");
    let search = document.getElementById("search-bar");
    let mtName = search.value.trim();
    if (!mtName) {
        interError("Name not found", 1)
    }
    search.value = "";
    const lang = "en-US"
    fetchMulti(mtName, lang, 1);
    NbresFound = 0;
    index = 100;

})

document.addEventListener("DOMContentLoaded", () => {
    loading.classList.add("hidden");
})

//Right and left arrow functions
rightArrow.onclick = () => {

    if (Math.abs(i) < Movie.children.length - 1) {


        offset = 100;
        setTimeout(() => {
            Movie.children[i - 1].style.left = `${offset}vw`;
        }, Time);

        i++;


    }
    

}

leftArrow.onclick = () => {

    if (Math.abs(i) > 0) {
        offset = 0;
        setTimeout(() => {

            Movie.children[i].style.left = `${offset}rem`;

        }, Time)
        i--;
    }

}





