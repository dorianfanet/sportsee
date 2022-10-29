import icon1 from '../assets/icon1.svg'
import icon2 from '../assets/icon2.svg'
import icon3 from '../assets/icon3.svg'
import icon4 from '../assets/icon4.svg'
import styled from 'styled-components'

const AsideContainer = styled.aside`
  margin: 0;
  width: 100px;
  z-index: -1;
  position: fixed;
  top: 0;
  height: calc(100vh);
  background-color: var(--secondaryColor);
  display: grid;
  place-content: center;

  & ul{
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & li{
      list-style-type: none;
      width: 60px;
      height: 60px;
      background-color: white;
      border-radius: 6px;
      display: grid;
      place-content: center;
      cursor: pointer;
    }
  }

  & p{
    position: absolute;
    color: white;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%) rotate(-90deg);
    font-size: 12px;
    height: 12px;
    white-space: nowrap;
  }
`

export default function Aside() {
  return (
    <AsideContainer>
      <ul>
        <li><img src={icon1} alt="" /></li>
        <li><img src={icon2} alt="" /></li>
        <li><img src={icon3} alt="" /></li>
        <li><img src={icon4} alt="" /></li>
      </ul>
      <p>Copiryght, SportSee 2020</p>
    </AsideContainer>
  )
}