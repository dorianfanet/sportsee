import styled from "styled-components"
import { USER_MAIN_DATA } from "../data/mockedData"
import { Link } from 'react-router-dom'

const Container = styled.section`
  margin: 150px 90px 0 220px;
  display: inline-block;
  max-width: calc(100% - 310px);
  width: 100%;

  & ul{
    display: flex;
    gap: 20px;

    & li{
      background-color: #fbfbfb;
      border-radius: 5px;
      transition: all 200ms ease;
      border: 2px solid #fbfbfb;
      cursor: pointer;
      

      & a{
        color: var(--secondaryColor);


        & > div{
          padding: 10px 40px 10px 20px;
        }

        & h2{
          margin: 0;
          color: var(--mainColor);
          font-size: 24px;
        }

        & h3{
          margin: 5px 0;
          font-weight: 400;
          font-size: 18px;
        }

        & p{
          margin: 10px 0 0 0;
          font-size: 16px;
        }
      }

      &:hover{
        border: 2px solid var(--mainColor);
      }
    }
  }
`

export default function SelectProfile() {
  
  const users = USER_MAIN_DATA

  return(
    <Container>
      <ul>
        {users.map((user) => 
          <li
            key={user.id}
          >
            <Link to={`/user/${user.id}`}>
              <div>
                <h2>{user.firstName}</h2>
                <h3>{user.lastName}</h3>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </Container>
  )
}