import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({ kurssi }) =>
  <div>
    <Otsikko teksti={kurssi.nimi} />
    <Sisalto kurssi={kurssi} />
    <Yhteensa kurssi={kurssi} />
  </div>

const Otsikko = ({ teksti }) => <h1>{teksti}</h1>

const Sisalto = ({ kurssi }) =>
  <div>
    {kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
  </div>

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

const Yhteensa = ({ kurssi }) =>
  <div>
    yhteensä {kurssi.osat.reduce(
      function (yhteensa, osa) { return yhteensa + osa.tehtavia },
      0)} tehtävää
  </div>

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Otsikko teksti="Opetusohjelma" />
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)