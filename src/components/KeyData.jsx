import styled from 'styled-components'

const Container = styled.li`
  height: 124px;
  display: flex;
  align-items: center;
  background-color: var(--backgroundGrey);
  border-radius: 5px;

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
      font-size: 16px;
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