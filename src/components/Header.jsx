import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { DataSourceContext } from '../context/DataSourceContext'

const HeaderContainer = styled.header`
  min-width: 1024px;
  width: 100%;
  padding: 0 30px;
  height: 80px;
  background-color: var(--secondaryColor);
  position: fixed;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 100;

  & img{
    height: 45px;
  }

  & nav{
    width: calc(100% - 246px);
    display: flex;
    justify-content: space-around;

    & a{
      color: white;
      font-size: 18px;
      font-weight: 500;
    }
  }
`

const Toggle = styled.div`
  width: 190px;
  height: 91px;
  position: absolute;
  top: 0px;
  right: 60px;
  opacity: 0;
  transition: all 200ms ease;

  &:hover{
    opacity: 1;
  }

  & button{
    padding: 0;
    display: flex;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    border: 4px solid white;
    background-color: white;
    border-radius: 5px;

    & .toggle{
        width: calc(50% - 4px);
        height: calc(100% - 4px);
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(74,184,255,.1);
        border: 2px solid #4AB8FF;
        border-radius: 5px;
        z-index: 10;
        transition: all 200ms ease;
    }
    
    &.api{

      & .toggle{
        left: 70px;
        background-color: rgba(255,0,0,.1);
        border: 2px solid #FF0000;
      }

      & .toggle-item:nth-child(3){
        color: #FF0000;
      }
    }

    &.mock{

      & .toggle-item:nth-child(2){
        color: #4AB8FF;
      }
    }

    & .toggle-item{
      width: 70px;
      padding: 10px 0;
      margin: 0;
      display: grid;
      place-content: center;
      z-index: 20;
      color: #282d30;
      transition: all 200ms ease;
    }
  }
`

export default function Header() {

  const [dataSourceToggle, setDataSourceToggle] = useState('api')
  const { toggleApiSource, toggleMockSource } = useContext(DataSourceContext)

  function toggleDataSourceButton() {
    if(dataSourceToggle === 'api') {
      setDataSourceToggle('mock')
      toggleMockSource()
    } else {
      setDataSourceToggle('api')
      toggleApiSource()
    }
  }

  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <Link to='/'>Accueil</Link>
        <Link to='user'>Profil</Link>
        <Link to='settings'>Réglages</Link>
        <Link to='community'>Communauté</Link>
      </nav>
      <Toggle>
        <button onClick={() => toggleDataSourceButton()} className={dataSourceToggle === 'api' ? 'api' : 'mock'}>
          <div className='toggle'></div>
          <div className='toggle-item'>Mock</div>
          <div className='toggle-item'>API</div>
        </button>
      </Toggle>
    </HeaderContainer>
  )
}