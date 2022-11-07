import styled from "styled-components"
import AlphaLogo from "../components/AlphaLogo"

const Container = styled.div`
  position: absolute;
  top: 150px;
  left: 220px;
  display: grid;
  place-content: center;
  max-width: calc(100% - 310px);
  width: 100%;
  height: calc(100vh - 300px);
  color: red;

  & div.error-container{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    & span{
      font-size: 94px;
      display: flex;
      
    }

    & span.svg svg{
      height: 86px;
    }
  }

  & h1{
    text-align: center;
  }
`

export default function Error404(){
  return (
    <Container>
      <div className="error-container">
        <span>4</span>
        <span className="svg">
          <AlphaLogo />
        </span>
        <span>4</span>
      </div>
      <h1>Oups... <br/> Cette page ne semble pas exister.</h1>
    </Container>
  )
}