import * as d3 from 'd3'
import styled from 'styled-components'
import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { USER_MAIN_DATA } from '../data/data'

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--backgroundGrey);
  border-radius: 5px;
  position: relative;

  svg{
    position: absolute;
    z-index: 50;
    pointer-events: none;
    overflow: visible;
  }

  & .title{
    position: absolute;
    top: 25px;
    left: 25px;
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    color: #20253A;
  }

  & .caption{
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    font-size: 16px;
    color: #74798C;
    transform: translate(-50%, calc(-50% + 30px));
    z-index: 100;
  }
`

export default function Score() {

  const {id} = useParams()
  const user = USER_MAIN_DATA.find(e => e.id === parseInt(id))
  const data = user.score

  const percent = data * 100

  const ref = useRef(null)

  const [divWidth, setWidth] = useState(0);
  const [divHeight, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = {top: 0, right: 0, bottom: 0, left: 0};
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
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // inner circle
    svg.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', height / 3.2 - 10)
      .attr('fill', 'white')

    const arcLine = d3.arc()
      .innerRadius(height / 3.2)
      .outerRadius(height / 3.2 - 10)
      .cornerRadius(20)
      .startAngle(0)
      .endAngle(percent * (Math.PI * 2) / 100)

    svg.append('path')
      .attr('d', arcLine)
      .attr('fill', '#FF0000')
      .attr('transform', 'translate(50%, 50%)')

    svg.append('text')
      .datum(percent)
      .attr('text-anchor', 'middle')
      .attr('fill', '#282D30')
      .attr('font-weight', 'bold')
      .attr('font-size', '26px')
      .text((d) => d + '%')

  })

  return (
    <Container ref={ref}>
      <p className='title'>Score</p>
      <span className='caption'>de votre <br/> objectif</span>
    </Container>
  )
}