const movie = JSON.parse(localStorage.getItem("selectedMovieData") || "null");
const showtime = JSON.parse(localStorage.getItem("selectedShowtime") || "null");
const seatData = JSON.parse(localStorage.getItem("selectedSeatsData") || "null");
const checkoutUser = JSON.parse(localStorage.getItem("checkoutUserData") || "null");


const movieTitleEl = document.getElementById("movie-title");
const moviePosterEl = document.getElementById("movie-poster");
const showtimeEl = document.getElementById("showtime");
const seatsEl = document.getElementById("seats");
const totalEl = document.getElementById("total");
const backHomeBtn = document.getElementById("back-home");

function verificarDatos() {
  if (!movie || !showtime || !seatData) {
    alert("Faltan datos de la compra. Volviendo al inicio.");
    window.location.href = "movies.html";
  }
}
verificarDatos();


if (moviePosterEl) moviePosterEl.src = movie.poster;
if (movieTitleEl) movieTitleEl.textContent = movie.titulo;
if (showtimeEl) showtimeEl.textContent = `Hoy - ${showtime.hora}`;
if (seatsEl) seatsEl.textContent = seatData.seats.join(", ");
if (totalEl) totalEl.textContent = `$${seatData.total.toFixed(2)}`;


if (checkoutUser && checkoutUser.name) {
  const h1 = document.querySelector("h1");
  if (h1) {
    h1.textContent = `¡Gracias por tu compra, ${checkoutUser.name}!`;
  }
}

if (backHomeBtn) {
  backHomeBtn.addEventListener("click", () => {

    localStorage.removeItem("selectedMovieId");
    localStorage.removeItem("selectedMovieData");
    localStorage.removeItem("selectedShowtime");
    localStorage.removeItem("selectedSeatsData");

    window.location.href = "movies.html";
  });
}
