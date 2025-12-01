const API_URL = "http://localhost:3000/api/cartelera";

const titleEl = document.getElementById("movie-title");
const posterEl = document.getElementById("movie-poster");
const originalTitleEl = document.getElementById("original-title");
const directorEl = document.getElementById("director");
const repartoEl = document.getElementById("reparto");
const synopsisEl = document.getElementById("synopsis");
const showtimesListEl = document.getElementById("showtimes-list");


const selectedMovieId = localStorage.getItem("selectedMovieId");

if (!selectedMovieId) {

  if (titleEl) titleEl.textContent = "Película no seleccionada";
  if (showtimesListEl) {
    showtimesListEl.innerHTML = `
      <p style="color:white;">Vuelve a la cartelera y elige una película.</p>
    `;
  }
} else {
  cargarPelicula(selectedMovieId);
}


async function cargarPelicula(movieId) {
  try {
    const moviesDataRaw = localStorage.getItem("moviesData");
    let movie = null;

    if (moviesDataRaw) {
      const moviesData = JSON.parse(moviesDataRaw);
      movie = moviesData.find(m => m.id === movieId);
    }

    if (!movie) {
      const resp = await fetch(`${API_URL}/${movieId}`);
      if (!resp.ok) {
        throw new Error("No se pudo obtener la película desde el API");
      }
      movie = await resp.json();
    }

    renderMovieDetail(movie);

    localStorage.setItem("selectedMovieData", JSON.stringify({
      id: movie.id,
      titulo: movie.titulo,
      poster: movie.poster,
      tituloOriginal: movie.tituloOriginal,
      director: movie.director
    }));

  } catch (error) {
    console.error("Error cargando película:", error);
    if (titleEl) titleEl.textContent = "Error al cargar la película";
    if (showtimesListEl) {
      showtimesListEl.innerHTML = `
        <p style="color:white;">Intenta nuevamente desde la cartelera.</p>
      `;
    }
  }
}

function renderMovieDetail(movie) {

  if (titleEl) titleEl.textContent = movie.titulo || "Sin título";

  if (posterEl && movie.poster) {
    posterEl.src = movie.poster;
    posterEl.alt = `Póster de ${movie.titulo}`;
  }

  if (originalTitleEl) {
    originalTitleEl.textContent = movie.tituloOriginal || movie.titulo || "";
  }
  if (directorEl) {
    directorEl.textContent = movie.director || "Desconocido";
  }
  if (repartoEl) {
    repartoEl.textContent = movie.reparto || "No disponible";
  }
  if (synopsisEl) {
    synopsisEl.textContent = movie.sinopsis || "Sinopsis no disponible.";
  }

  renderShowtimes(movie);
}

function renderShowtimes(movie) {
  if (!showtimesListEl) return;

  showtimesListEl.innerHTML = "";

  if (!movie.funciones || movie.funciones.length === 0) {
    showtimesListEl.innerHTML = `
      <p style="color:white;">No hay funciones disponibles para hoy.</p>
    `;
    return;
  }

  movie.funciones.forEach(funcion => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = funcion.hora;
    btn.dataset.showtimeId = funcion.id;

    btn.addEventListener("click", () => {
      localStorage.setItem("selectedShowtime", JSON.stringify({
        id: funcion.id,
        hora: funcion.hora,
        precio: funcion.precio,
        asientosOcupados: funcion.asientosOcupados || []
      }));

   
      window.location.href = "selection-seat.html";
    });

    showtimesListEl.appendChild(btn);
  });
}
