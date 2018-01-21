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

const Yhteensa = ({ kurssi }) => {
  let tehtaviaYht = 0
  kurssi.osat.forEach(osa => {
    tehtaviaYht += osa.tehtavia
  });
  return <div>yhteensä {tehtaviaYht} tehtävää</div>
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
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
      },
      {
        nimi: 'Redux',
        tehtavia: 7,
        id: 4
      }
    ]
  }

  return (
    <Kurssi kurssi={kurssi} />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)