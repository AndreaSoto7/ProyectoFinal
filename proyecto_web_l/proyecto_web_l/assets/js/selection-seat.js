const movieData = JSON.parse(localStorage.getItem("selectedMovieData") || "null");
const showtimeData = JSON.parse(localStorage.getItem("selectedShowtime") || "null");

const sessionTitleEl = document.querySelector(".session-info h1");
const sessionTimeEl = document.querySelector(".session-info p");
const seatsContainer = document.querySelector(".seat");
const ticketsCountEl = document.getElementById("tickets-count");
const selectedSeatsEl = document.getElementById("selected-seats");
const totalPriceEl = document.getElementById("total-price");
const continueBtn = document.querySelector(".ventana button");

let selectedSeats = [];
let precioEntrada = showtimeData ? showtimeData.precio : 0;
let asientosOcupados = showtimeData ? showtimeData.asientosOcupados || [] : [];



if (movieData && sessionTitleEl) {
  sessionTitleEl.textContent = movieData.titulo;
}

if (showtimeData && sessionTimeEl) {
  sessionTimeEl.textContent = `Hoy - ${showtimeData.hora}`;
}


const seatDivs = seatsContainer ? seatsContainer.querySelectorAll("div") : [];

seatDivs.forEach(seat => {
  const seatCode = seat.dataset.seat; 

  seat.classList.remove("seleccionado", "ocupado");

  if (asientosOcupados.includes(seatCode)) {
    seat.classList.add("ocupado");
    seat.style.pointerEvents = "none"; 
  } else {
    seat.addEventListener("click", () => toggleSeatSelection(seat, seatCode));
  }
});


function toggleSeatSelection(seatElement, seatCode) {
  const isSelected = selectedSeats.includes(seatCode);

  if (isSelected) {
    selectedSeats = selectedSeats.filter(code => code !== seatCode);
    seatElement.classList.remove("seleccionado");
  } else {
    selectedSeats.push(seatCode);
    seatElement.classList.add("seleccionado");
  }

  actualizarResumen();
}


function actualizarResumen() {
  const cantidad = selectedSeats.length;
  const total = cantidad * precioEntrada;

  if (ticketsCountEl) {
    ticketsCountEl.textContent = `Entradas: ${cantidad}`;
  }

  if (selectedSeatsEl) {
    selectedSeatsEl.textContent = selectedSeats.length > 0
      ? selectedSeats.join(", ")
      : "Ningún asiento seleccionado";
  }

  if (totalPriceEl) {
    totalPriceEl.textContent = `$${total.toFixed(2)}`;
  }
}

actualizarResumen();

if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
      alert("Por favor, selecciona al menos un asiento.");
      return;
    }

    const cantidad = selectedSeats.length;
    const total = cantidad * precioEntrada;

    localStorage.setItem(
      "selectedSeatsData",
      JSON.stringify({
        seats: selectedSeats,
        ticketsCount: cantidad,
        total: total
      })
    );

    window.location.href = "checkout.html";
  });
}
