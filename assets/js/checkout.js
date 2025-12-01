const movie = JSON.parse(localStorage.getItem("selectedMovieData") || "null");
const showtime = JSON.parse(localStorage.getItem("selectedShowtime") || "null");
const seatData = JSON.parse(localStorage.getItem("selectedSeatsData") || "null");

const movieTitleEl = document.getElementById("movie-title");
const showtimeEl = document.getElementById("showtime");
const selectedSeatsEl = document.getElementById("selected-seats");
const ticketsCountEl = document.getElementById("tickets-count");
const totalPriceEl = document.getElementById("total-price");

const form = document.getElementById("checkout-form");

function verificarDatos() {
  if (!movie || !showtime || !seatData) {
    alert("Faltan datos de la compra. Vuelve a la cartelera.");
    window.location.href = "index.html";
  }
}
verificarDatos();


if (movieTitleEl) movieTitleEl.textContent = movie.titulo;
if (showtimeEl) showtimeEl.textContent = `Hoy - ${showtime.hora}`;
if (selectedSeatsEl) selectedSeatsEl.textContent = seatData.seats.join(", ");
if (ticketsCountEl) ticketsCountEl.textContent = seatData.ticketsCount;
if (totalPriceEl) totalPriceEl.textContent = `$${seatData.total.toFixed(2)}`;


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const telefono = form.telefono.value.trim();


  if (name === "") {
    alert("Por favor, ingresa tu nombre completo.");
    return;
  }

  if (email === "") {
    alert("Por favor, ingresa tu correo electrónico.");
    return;
  }

  const userData = {
    name,
    email,
    telefono
  };

  localStorage.setItem("checkoutUserData", JSON.stringify(userData));

  window.location.href = "confirmation-ticket.html";
});
