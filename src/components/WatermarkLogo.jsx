import styled from "styled-components"
import PropTypes from 'prop-types'

const SvgContainer = styled.div`
  width: 90%;
  margin: 0 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: .4;

  & svg{
    width: 80px;
  }

  & p{
    font-size: 12px;
    text-align: center;
  }
`

/**
 * 
 * @param {String} type - Defines if watermark has to be dark or light, depending on the color of the parent element
 */
export default function WatermarkLogo({ type }) {
  const elemColor = type === 'dark' ? '#282d30' : '#fff'
  return (
    <SvgContainer>
      <svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.18 68.79">
        <g id="Calque_1-2" data-name="Calque 1">
          <path fill={elemColor} d="M34.09,0C15.26,0,0,15.4,0,34.39c0,8.76,3.25,16.76,8.6,22.83l15.9-18.98,10.94-17.08-6.37-3.25-9.22,8.32c-.82,.83-2.17,.76-3-.15-.82-.83-.75-2.19,.15-3.02l10.19-9.3c.67-.6,1.57-.68,2.4-.3l12.21,6.2c1.27,.98,2.55,2.12,3.67,3.25l4.12,8.09,8.54-5.14c.97-.6,2.32-.3,2.92,.76,.6,.98,.3,2.34-.75,2.95l-10.27,6.2c-.37,.23-.75,.3-1.12,.3-.75,0-1.42-.38-1.8-.98l-4.5-7.11-7.27,11.49,8.02,1.89c.9,.15,1.57,.76,1.95,1.59,.3,.83,.22,1.81-.3,2.57l-9.14,14.59c-.82,1.21-2.4,1.51-3.6,.83-1.35-.76-1.8-2.42-1.05-3.78l7.12-11.26-10.42-2.42-15.22,17.73c5.85,4.75,13.27,7.6,21.36,7.6,18.83,0,34.09-15.4,34.09-34.39S52.92,0,34.09,0Zm14.69,19.58c-3.15,0-5.69-2.57-5.69-5.74s2.55-5.74,5.69-5.74,5.69,2.57,5.69,5.74-2.55,5.74-5.69,5.74Z"/>
        </g>
      </svg>
      <p style={{color: elemColor}}>Une erreur est apparue, essayez de recharger la page</p>
    </SvgContainer>
  )
}

WatermarkLogo.propTypes = {
  type: PropTypes.string
}