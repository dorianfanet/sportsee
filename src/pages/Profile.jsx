import { useParams } from "react-router-dom"
import styled from "styled-components"
import DailyActivity from "../components/DailyActivity"
import { USER_MAIN_DATA } from "../data/data"

const Container = styled.section`
  margin: 150px 90px 0 220px;
  display: inline-block;
  max-width: calc(100% - 310px);
  width: 100%;

  & h1{
    margin: 0;
    font-size: 48px;
    font-weight: 500;

    & span{
      color: var(--mainColor);
    }
  }

  & h2{
    font-size: 18px;
    font-weight: 400;
    margin: 25px 0;
  }
`

const Section = styled.section`
margin-bottom: 30px;
  width: 100%;
  height: 600px;
  display: grid;
  grid-template-columns: 75% 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 30px;

  & .charts{
    width: 100%;
    height: 100%;
    background-color: var(--backgroundGrey);
  }

  & .small-charts{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    & div{
      background-color: lightcyan;
      width: 100%;
      height: 100%;
    }
  }

  & aside{
    background-color: lightcoral;
    height: 100%;
    grid-column: 2;
    grid-row: 1 / 3;
  }
`

export default function Profile() {

  const { id } = useParams()
  const idParam = parseInt(id)

  const user = USER_MAIN_DATA.find(e => e.id === idParam)

  return(
    <Container>
      <h1>Bonjour <span>{user.userInfos.firstName}</span></h1>
      <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
      <Section>
        <div className="charts">
          <DailyActivity />
        </div>
        <div className="small-charts">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <aside></aside>
      </Section>
    </Container>
  )
}