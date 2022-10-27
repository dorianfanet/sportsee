import caloriesIcon from '../assets/calories.svg'
import proteinsIcon from '../assets/proteins.svg'
import carbsIcon from '../assets/carbs.svg'
import lipidsIcon from '../assets/lipids.svg'
import { USER_MAIN_DATA } from "../data/data"
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.li`
  height: 124px;
  display: flex;
  align-items: center;
  background-color: var(--backgroundGrey);

  figure{
    width: 60px;
    height: 60px;
    display: grid;
    place-content: center;
    border-radius: 6px;
    margin: 0 25px 0 32px;

    &.calorieCount{
      background-color: rgba(255, 0, 0, .1);
    }

    &.proteinCount{
      background-color: rgba(74, 184, 255, .1);
    }

    &.carbohydrateCount{
      background-color: rgba(249, 206, 35, .1);
    }

    &.lipidCount{
      background-color: rgba(253, 81, 129, .1);
    }
  }

  div{

    p{
      font-size: 20px;
      font-weight: bold;
      margin: 0;
      color: #282D30;
    }

    span{
      font-size: 14px;
      font-weight: 500;
      color: #74798C;
    }
  }
`

export default function KeyData({ data }) {

  const { id } = useParams()
  const idParam = parseInt(id)

  const user = USER_MAIN_DATA.find(e => e.id === idParam)

  return (
    <Container>
      <figure className={data.type}>
        <img src={data.icon} alt="" />
      </figure>
      <div>
        <p>{data.amount.toLocaleString('fr-FR')} {data.unit}</p>
        <span>{data.name}</span>
      </div>
    </Container>
  )
}