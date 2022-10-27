import { useParams } from "react-router-dom"
import styled from "styled-components"
import AverageSessions from "../components/AverageSessions"
import DailyActivity from "../components/DailyActivity"
import KeyData from '../components/KeyData'
import UserPerformance from '../components/UserPerformance'
import Score from '../components/Score'
import { USER_AVERAGE_SESSIONS, USER_MAIN_DATA } from "../services/mockedData"
import { USER_ACTIVITY } from "../services/mockedData"
import { USER_PERFORMANCE } from "../services/mockedData"
import userData from '../services/userData'
import { useEffect, useState, useContext } from 'react';
import WatermarkLogo from "../components/WatermarkLogo"
import { DataSourceContext } from "../context/DataSourceContext"

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
  display: grid;
  grid-template-columns: 75% 1fr;
  grid-template-rows: 280px 280px;
  gap: 30px;

  & .charts{
    width: 100%;
    height: 100%;
    background-color: var(--backgroundGrey);
    border-radius: 5px;
  }

  & .small-charts{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    & > div{
      width: 100%;
      height: 100%;
    }
  }

  & aside{
    height: 100%;
    grid-column: 2;
    grid-row: 1 / 3;

    ul{
      margin: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 39px;
    }
  }
`

export default function Profile() {

  const [dataUserInfos, setDataUserInfos] = useState()
  const [dataUserActivity, setDataUserActivity] = useState()
  const [dataUserPerformance, setDataUserPerformance] = useState()
  const [dataUserAverageSessions, setDataUserAverageSessions] = useState()

  const [dataSourceState, setDataSourceState] = useState('mock')

  const { dataSource } = useContext(DataSourceContext)

  console.log(dataSource)

  const {id} = useParams()

  useEffect(() => {
    async function getApiData() {
      console.log('loading api')
      const data = new userData(id)

      const userInfos = await data.getUserInfos()
      const userActivity = await data.getUserActivity()
      const userPerformance = await data.getUserPerformance()
      const userAverageSessions = await data.getUserAverageSessions()
      
      setDataUserInfos(userInfos)
      setDataUserActivity(userActivity)
      setDataUserPerformance(userPerformance)
      setDataUserAverageSessions(userAverageSessions)

      setDataSourceState('api')
    }

    function getMockData() {
      const userInfos = USER_MAIN_DATA.find(e => e.id === parseInt(id))
      const userActivity = USER_ACTIVITY.find(e => e.id === parseInt(id))
      const userPerformance = USER_PERFORMANCE.find(e => e.id === parseInt(id))
      const userAverageSessions = USER_AVERAGE_SESSIONS.find(e => e.id === parseInt(id))

      setDataUserInfos(userInfos)
      setDataUserActivity(userActivity.sessions)
      setDataUserPerformance(userPerformance.data)
      setDataUserAverageSessions(userAverageSessions.sessions)

      setDataSourceState('mock')
    }

    if(dataSource === 'api' && dataSourceState !== 'api') {
      console.log(dataSource, dataSourceState)
      getApiData()
    } else if(dataSource === 'mock') {
      console.log(dataSource, dataSourceState)
      getMockData()
    }
  })

  useEffect(() => {
    console.log(dataUserActivity)
  })

  return (
    <Container>
      {dataUserInfos && (
        <div>
          <h1>Bonjour <span>{dataUserInfos.firstName}</span></h1>
          <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
        </div>
      )}
      
      <Section>
        <div className="charts">
          {dataUserActivity ? (
            <DailyActivity 
              data={dataUserActivity}
            />
          ) : (
            <WatermarkLogo
              type={'dark'}
            />
          )}
        </div>
        <div className="small-charts">
          <div className='chart-container' style={{backgroundColor: '#FF0000'}}>
            {dataUserAverageSessions ? (
              <AverageSessions
                data={dataUserAverageSessions}
              />
            ) : (
              <WatermarkLogo
                type={''}
              />
            )}
          </div>
          <div className='chart-container' style={{backgroundColor: '#282D30'}}>
            {dataUserPerformance ? (
              <UserPerformance
                data={dataUserPerformance}
              />
            ) : (
              <WatermarkLogo
                type={''}
              />
            )}
          </div>
          <div className='chart-container' style={{backgroundColor: 'var(--backgroundGrey)'}}>
            {dataUserInfos ? (
              <Score
                data={dataUserInfos.score}
              />
            ) : (
              <WatermarkLogo
                type={'dark'}
              />
            )}
          </div>
        </div>
        <aside>
          {dataUserInfos ? (
            <ul>
              {dataUserInfos.keyData.map((data) => 
                <KeyData 
                  data={data}
                />
              )}
            </ul>
          ) : (
            <div style={{backgroundColor: 'var(--backgroundGrey)', borderRadius: '5px', height: '100%'}}>
              <WatermarkLogo
                type={'dark'}
              />
            </div>
          )}
        </aside>
      </Section>
    </Container>
  )
}