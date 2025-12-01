const API_URL = "http://localhost:3000/api/cartelera";
const movieList = document.getElementById("movie-list");


movieList.innerHTML = `
  <p style="color:white; text-align:center;">Cargando cartelera...</p>
`;

fetch(API_URL)
  .then(response => response.json())
  .then(movies => {

    movieList.innerHTML = "";

    localStorage.setItem("moviesData", JSON.stringify(movies));


    movies.forEach(movie => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <a href="movie-detail.html" class="movie-link" data-id="${movie.id}">
          <img src="${movie.poster}" alt="${movie.titulo}">
          <h2>${movie.titulo}</h2>
        </a>
      `;

      movieList.appendChild(card);
    });

    activarClicksEnPeliculas();
  })
  .catch(error => {
    console.error("Error cargando cartelera:", error);
    movieList.innerHTML = `
      <p style="color:white; text-align:center;">No se pudo cargar la cartelera.</p>
    `;
  });


function activarClicksEnPeliculas() {
  const links = document.querySelectorAll(".movie-link");

  links.forEach(link => {
    link.addEventListener("click", () => {
      const id = link.dataset.id;
      localStorage.setItem("selectedMovieId", id);
    });
  });
}
