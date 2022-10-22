import * as d3 from 'd3'
import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { USER_ACTIVITY } from '../data/data';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 1;

  svg{
    z-index: 20;
    position: relative;
    pointer-events: none;
  }
`

const Caption = styled.div`
  position: absolute;
  top: 0;
  width: calc(100% - 60px);
  margin: 30px 30px;
  display: flex;
  justify-content: space-between;

  h3{
    margin: 0rem;
    font-size: 15px;
    font-weight: 500;
  }

  .caption{
    display: flex;
    gap: 20px;

    div{
      display: flex;
      align-items: center;
      font-size: 14px;

      span{
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 11px;
      
      &.weight-icon{
        background-color: #282D30
      }

      &.calories-icon{
        background-color: #E60000
      }
    }
    }
  }
`

const Grid = styled.div`
  display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: calc(100% - 180px);
    height: calc(100% - 154px);
    position: absolute;
    top: 100px;
    left: 90px;
    pointer-events: all;
    z-index: 10;

    div{
      background-color: rgba(196, 196, 196, .2);
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: all;
      transition: all 200ms ease;

      &:hover{
        opacity: 1;
      }
    }
`

const days = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi'
]

export default function DailyActivity() {

  const {id} = useParams()
  const user = USER_ACTIVITY.find(e => e.userId === parseInt(id))
  const data = user.sessions

  const formattedDates = data.map((d) => {

    const newDate = new Date(d.day)
    const dayIndex = newDate.getDay()
    const dayName = days[dayIndex]
    const formattedDate = `${dayName} ${newDate.getDate()}`

    return  formattedDate
  })

  const dataMax = Math.max(...data.map(e => e.calories))
  const dataMax2 = Math.max(...data.map(e => e.kilogram))

  const subgroups = ['kilogram', 'calories']

  const ref = useRef(null)

  const [divWidth, setWidth] = useState(0);
  const [divHeight, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  useEffect(() => {

    // set the dimensions and margins of the graph
    const margin = {top: 100, right: 90, bottom: 50, left: 90};
    const width = divWidth - margin.left - margin.right;
    const height = divHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svgEl = d3.select(ref.current)
    svgEl.selectAll('svg').remove()
    const svg = svgEl
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x Axis
    
    const x = d3.scaleBand()
      .domain(data.map(d => d.day))
      .range([0, width])
      .rangeRound([0, width])
      .paddingInner(0.3)

    // Generator
    const xAxisGenerator = d3.axisBottom(x)
      .tickSize(0)
      .tickFormat((d, i) => formattedDates[i])
      
    // xAxis
    const xAxis = svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxisGenerator)
    
    xAxis.select('path')
      .attr('stroke', '#DEDEDE')

    xAxis.selectAll('text')
      .attr('transform', 'translate(0, 20)')
      .attr('fill', '#9B9EAC')
      .attr('font-family', 'Roboto')
      .attr('font-size', '14')

    // y Axis

    const y = d3.scaleLinear()
      .domain([0, dataMax])
      .range([height, 0])
      .nice()

    // Generator
    const yAxisGeneratorRight = d3.axisRight(y)
      .ticks(2)
      .tickSize(- width)

    // yAxis
    const yAxisRight = svg.append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(yAxisGeneratorRight)

    yAxisRight.select('path')
      .attr('stroke-width', '0')

    yAxisRight.selectAll('line')
      .attr('stroke-dasharray', '4')
      .attr('stroke', '#F9BEBE')

    yAxisRight.select(':nth-child(2) line')
      .attr('stroke-width', 0)
    
    yAxisRight.selectAll('text')
      .attr('fill', '#9B9EAC')
      .attr('font-family', 'Roboto')
      .attr('font-size', '14')
      .attr('transform', 'translate(40, 0)')
      .attr('font-weight', '500')

    // y2 Axis

    const y2 = d3.scaleLinear()
      .domain([0, dataMax2])
      .range([height, 0])
      .nice()

    // Generator
    const y2AxisGeneratorLeft = d3.axisLeft(y2)
      .tickValues([0, 45, 90])
      .tickSize(- width)

    // y2Axis
    const y2AxisLeft = svg.append('g')
      .call(y2AxisGeneratorLeft)

    y2AxisLeft.select('path')
      .attr('stroke-width', '0')

    y2AxisLeft.selectAll('line')
      .attr('stroke-dasharray', '4')
      .attr('stroke', '#DEDEDE')

    y2AxisLeft.select(':nth-child(2) line')
      .attr('stroke-width', 0)
    
    y2AxisLeft.selectAll('text')
      .attr('fill', '#9B9EAC')
      .attr('font-family', 'Roboto')
      .attr('font-size', '14')
      .attr('transform', 'translate(-40, 0)')
      .attr('font-weight', '500')

    // xSubgroup
    
    const xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding(0.6)

    const colors = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#282D30', '#E60000'])

    function order(index, value) {
      let newValue = 0;

      if(index === 'kilogram') {
        newValue = y2(value)
      } else {
        newValue = y(value)
      }

      return newValue
    }
    
    svg.append('g')
      .selectAll('g')
      .data(data)
      .join('g')
        .attr('transform', d => `translate(${x(d.day)}, 0)`)
      .selectAll('rect')
      .data(function(d) {return subgroups.map(function(index) { return{index: index, value: d[index]} })})
      .join((enter) => {
        let g = enter


        g.append('rect')
          .attr('x', d => xSubgroup(d.index))
          .attr('y', d => order(d.index, d.value))
          .attr('width', xSubgroup.bandwidth())
          .attr('height', d => height  - order(d.index, d.value))
          .attr('fill', d => colors(d.index))
          .attr('rx', 4)

        g.append('rect')
          .attr('x', d => xSubgroup(d.index))
          .attr('y', height - 10)
          .attr('width', xSubgroup.bandwidth())
          .attr('height', 10)
          .attr('fill', d => colors(d.index))
      })
    
    // add captions
    svg.append('g')
      .selectAll('caption')
      .data(data)
      .join('g')
        .attr('transform', d => `translate(${x(d.day) + 60}, -32)`)
        .attr('opacity', 0)
        .classed('caption', true)

    d3.selectAll('g.caption')
      .append('rect')
      .attr('width', 40)
      .attr('height', 64)
      .attr('fill', '#E60000')

    d3.selectAll('g.caption')
      .data(data)
      .append('text')
      .attr('font-size', 7)
      .attr('fill', '#fff')
      .style('text-anchor', 'middle')
      .text((d, i) => `${d.kilogram} kg`)
      .attr('transform', 'translate(20, 17)')

    d3.selectAll('g.caption')
      .data(data)
      .append('text')
      .attr('font-size', 7)
      .attr('fill', '#fff')
      .style('text-anchor', 'middle')
      .text((d, i) => `${d.calories} kCal`)
      .attr('transform', 'translate(20, 47)')

    d3.selectAll('div.grid div')
    .on('mouseenter', function (d, i) {
      const gridElId = this.getAttribute('id')
      console.log(gridElId)
      d3.select(`.caption:nth-child(${gridElId})`).transition()
          .duration('200')
          .attr('opacity', '1')})
    .on('mouseout', function (d, i) {
      const gridElId = this.getAttribute('id')
      d3.select(`.caption:nth-child(${gridElId})`).transition()
          .duration('200')
          .attr('opacity', '0')})
  })

  return(
    <Container style={{'height': '100%', 'position': 'relative'}} ref={ref}>
      <Caption>
        <h3>Activité quotidienne</h3>
        <div className='caption'>
          <div>
            <span className='weight-icon'></span>
            Poids (kg)
          </div>
          <div>
            <span className='calories-icon'></span>
            Calories brûlées (kCal)
          </div>
        </div>
      </Caption>
      <Grid className='grid'>
        <div id='1'></div>
        <div id='2'></div>
        <div id='3'></div>
        <div id='4'></div>
        <div id='5'></div>
        <div id='6'></div>
        <div id='7'></div>
      </Grid>
    </Container>
  )
}