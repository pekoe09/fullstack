import React from 'react'
import Otsikko from './otsikko'

const Kurssi = ({ kurssi }) =>
  <div>
    <Otsikko teksti={kurssi.nimi} />
    <Sisalto kurssi={kurssi} />
    <Yhteensa kurssi={kurssi} />
  </div>

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

export default Kurssi