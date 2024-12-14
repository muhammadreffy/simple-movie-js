const API_KEY = "bbdea0560a8d60780ca3189ab7dcbe64";

let page = 1;

const API_URL = () =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;

const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function updatePage() {
  getMovies(API_URL());
  currentPage.innerHTML = page;

  updateStylePrev();
}

function nextPage() {
  page += 1;
  updatePage();
}

function prevPage() {
  if (page > 1) {
    page -= 1;
    updatePage();
  }
}

function updateStylePrev() {
  if (page === 1) {
    prev.classList.remove("cursor-pointer");
    prev.classList.remove("bg-primary");
    prev.classList.add("bg-primary_hover");
  } else {
    prev.classList.add("cursor-pointer");
    prev.classList.remove("bg-primary_hover");
    prev.classList.add("bg-primary");
  }
}

prev.addEventListener("click", () => {
  prevPage();
});

next.addEventListener("click", () => {
  nextPage();
});

function showMovies(movies) {
  movieElements.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    console.log(movie);

    const movieCard = document.createElement("div");
    movieCard.innerHTML = `
    <img class="rounded-sm object-cover" src="${
      API_IMAGE_URL + poster_path
    }" alt="${title}"/>

    <div>
      <h2 class="mt-3 text-lg font-bold text-primary">${title}</h2>

      <p class="mt-2 text-sm text-gray-400">${overview.substring(0, 100)}...</p>
    </div>
    `;

    movieCard.classList.add("text-white");

    movieElements.appendChild(movieCard);
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchQuery = search.value;

  if (searchQuery !== "") {
    getMovies(API_SEARCH_URL + searchQuery);
  }
});

updatePage();

logo.addEventListener("click", () => {
  location.reload();
});
