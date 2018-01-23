import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  const osat = props.kurssi.osat
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
    </div>
  )
}
const Yhteensa = (props) => {
  const osat = props.kurssi.osat
  const tehtavia = osat.map(osa => osa.tehtavia).reduce((acc, tehtavia) => acc + tehtavia)
  return (
    <p>yhteensä {tehtavia} tehtävää</p>
  )
}
const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi} />
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi} />
    </div>
  )
}

export default Kurssi
