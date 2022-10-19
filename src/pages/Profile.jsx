import { useParams } from "react-router-dom"
import styled from "styled-components"
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

export default function Profile() {

  const { id } = useParams()
  const idParam = parseInt(id)

  const user = USER_MAIN_DATA.find(e => e.id === idParam)

  return(
    <Container>
      <h1>Bonjour <span>{user.userInfos.firstName}</span></h1>
      <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
    </Container>
  )
}