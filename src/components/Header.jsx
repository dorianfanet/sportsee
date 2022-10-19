import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderContainer = styled.header`
  min-width: 1024px;
  width: 100%;
  padding: 0 30px;
  height: 91px;
  background-color: var(--secondaryColor);
  position: fixed;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 100;

  & img{
    height: 57px;
  }

  & nav{
    width: calc(100% - 246px);
    display: flex;
    justify-content: space-around;

    & a{
      color: white;
      font-size: 24px;
      font-weight: 500;
    }
  }
`

export default function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <Link to='/'>Accueil</Link>
        <Link to='profile'>Profil</Link>
        <Link to='settings'>Réglages</Link>
        <Link to='community'>Communauté</Link>
      </nav>
    </HeaderContainer>
  )
}