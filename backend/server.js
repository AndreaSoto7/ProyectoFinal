const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const movies = [
  {
    id: 'telefono-negro-2',
    titulo: 'TELEFONO NEGRO 2',
    poster: 'https://andreasoto7.github.io/ProyectoFinal/assets/img/telefononegro.png',    tituloOriginal: 'The Black Phone 2',
    director: 'Scott Derrickson',
    reparto: 'Ethan Hawke',
    sinopsis:
      'Mientras Finn lucha por sobrellevar su vida después del cautiverio, Gwen comienza a recibir llamadas en sus sueños a través del teléfono negro y visiones de nuevos niños en peligro. Ambos deberán enfrentarse nuevamente al Raptor.',
    funciones: [
      {
        id: 'telnegro2-12',
        hora: '12:00 PM',
        precio: 25,
        asientosOcupados: ['A1', 'B3', 'F5', 'G2']
      },
      {
        id: 'telnegro2-15',
        hora: '3:00 PM',
        precio: 25,
        asientosOcupados: ['C2', 'D4', 'E6']
      },
      {
        id: 'telnegro2-18',
        hora: '6:00 PM',
        precio: 25,
        asientosOcupados: ['A8', 'H1', 'H2']
      }
    ]
  },
  {
    id: 'depredador-tierras-salvajes',
    titulo: 'DEPREDADOR: TIERRAS SALVAJES',
    poster: 'https://andreasoto7.github.io/ProyectoFinal/assets/img/depredador.png',
    tituloOriginal: 'Predator: Savage Lands',
    director: 'Dan Trachtenberg',
    reparto: 'Elle Fanning',
    sinopsis:
      'Un nuevo depredador llega a la Tierra para cazar en una reserva natural aislada, donde un grupo de soldados y científicos queda atrapado.',
    funciones: [
      {
        id: 'depredador-14',
        hora: '2:00 PM',
        precio: 25,
        asientosOcupados: ['B1', 'B2', 'C3']
      },
      {
        id: 'depredador-20',
        hora: '8:00 PM',
        precio: 25,
        asientosOcupados: ['E1', 'E2', 'F3']
      }
    ]
  },
  {
    id: 'a-pesar-de-ti',
    titulo: 'A PESAR DE TI',
    poster: 'https://andreasoto7.github.io/ProyectoFinal/assets/img/apesardeti.png',
    tituloOriginal: 'A Pesar de Ti',
    director: 'Nombre Director',
    reparto: 'Reparto principal',
    sinopsis:
      'Drama romántico sobre dos personas que intentan rehacer su vida luego de una ruptura dolorosa.',
    funciones: [
      { id: 'apesar-16', hora: '4:00 PM', precio: 25, asientosOcupados: ['A3', 'A4'] }
    ]
  },
  {
    id: 'wicked-por-siempre',
    titulo: 'WICKED: POR SIEMPRE',
    poster: 'https://andreasoto7.github.io/ProyectoFinal/assets/img/wicked.png',    tituloOriginal: 'Wicked: Forever',
    director: 'Nombre Director',
    reparto: 'Reparto principal',
    sinopsis:
      'Secuela musical que continúa la historia de las brujas de Oz y sus destinos entrelazados.',
    funciones: [
      { id: 'wicked-19', hora: '7:00 PM', precio: 25, asientosOcupados: ['D5', 'D6'] }
    ]
  },
  {
    id: 'zootopia-2',
    titulo: 'ZOOTOPIA 2',
    poster: 'https://andreasoto7.github.io/ProyectoFinal/assets/img/zootopia.png',
    tituloOriginal: 'Zootopia 2',
    director: 'Nombre Director',
    reparto: 'Reparto principal',
    sinopsis:
      'Judy Hopps y Nick Wilde investigan un nuevo caso que pone en peligro la paz entre depredadores y presas.',
    funciones: [
      { id: 'zoo-11', hora: '11:00 AM', precio: 25, asientosOcupados: ['C1', 'C2'] }
    ]
  },
  {
    id: 'ilusionistas-3',
    titulo: 'ILUSIONISTAS 3',
    poster: 'https://andreasoto7.github.io/ProyectoFinal/assets/img/ilusionistas.png',
    tituloOriginal: 'Now You See Me 3',
    director: 'Nombre Director',
    reparto: 'Reparto principal',
    sinopsis:
      'Los jinetes vuelven para su truco más ambicioso, enfrentándose a un nuevo enemigo internacional.',
    funciones: [
      { id: 'ilus-21', hora: '9:00 PM', precio: 25, asientosOcupados: ['F1', 'F2', 'F3'] }
    ]
  }
];


app.get('/', (req, res) => {
  res.send('API de Cartelera funcionando');
});

app.get('/api/cartelera', (req, res) => {
  res.json(movies);
});

app.get('/api/cartelera/:id', (req, res) => {
  const pelicula = movies.find((m) => m.id === req.params.id);
  if (!pelicula) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }
  res.json(pelicula);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
