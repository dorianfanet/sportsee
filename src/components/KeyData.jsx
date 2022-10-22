import caloriesIcon from '../assets/calories.svg'
import proteinsIcon from '../assets/proteins.svg'
import carbsIcon from '../assets/carbs.svg'
import lipidsIcon from '../assets/lipids.svg'
import { USER_MAIN_DATA } from "../data/data"
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.li`
  height: 124px;
  background-color: #FBFBFB;
  border-radius: 5px;
  display: flex;
  align-items: center;

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

export default function KeyData({ type }) {

  const { id } = useParams()
  const idParam = parseInt(id)

  const user = USER_MAIN_DATA.find(e => e.id === idParam)

  const keyDataTypes = [
    {
      'type': 'calorieCount',
      'name': 'Calories',
      'icon': caloriesIcon,
      'dataPath': user.keyData.calorieCount,
      'unit': 'kCal'
    },
    {
      'type': 'proteinCount',
      'name': 'Protéines',
      'icon': proteinsIcon,
      'dataPath': user.keyData.proteinCount,
      'unit': 'g'
    },
    {
      'type': 'carbohydrateCount',
      'name': 'Glucides',
      'icon': carbsIcon,
      'dataPath': user.keyData.carbohydrateCount,
      'unit': 'g'
    },
    {
      'type': 'lipidCount',
      'name': 'Lipides',
      'icon': lipidsIcon,
      'dataPath': user.keyData.lipidCount,
      'unit': 'g'
    }
  ]

  const keyDataType = keyDataTypes.find(e => e.type === type)

  return (
    <Container>
      <figure className={keyDataType.type}>
        <img src={keyDataType.icon} alt="" />
      </figure>
      <div>
        <p>{keyDataType.dataPath} {keyDataType.unit}</p>
        <span>{keyDataType.name}</span>
      </div>
    </Container>
  )
}