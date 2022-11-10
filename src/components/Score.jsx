import * as d3 from 'd3'
import styled from 'styled-components'
import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Container = styled.div`
  height: 100%;
  width: 100%;
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
    top: 20px;
    left: 20px;
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: #20253A;
  }

  & .caption{
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    font-size: 10px;
    color: #74798C;
    transform: translate(-50%, calc(-50% + 23px));
    z-index: 100;
  }
`

/**
 * Score component is used to generate score chart using d3
 * @param {number} data - Object containing score data of current user
 */
export default function Score({ data }) {

  const ref = useRef(null)

  const [divWidth, setWidth] = useState(0);
  const [divHeight, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  useEffect(() => {

    if(divHeight && divWidth) {
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
        .attr("transform", `translate(${width / 2}, ${height / 2 + 10})`);

      // inner circle
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', height / 2.7 - 8)
        .attr('fill', 'white')

      const arcLine = d3.arc()
        .innerRadius(height / 2.7)
        .outerRadius(height / 2.7 - 8)
        .cornerRadius(20)
        .startAngle(0)
        .endAngle(data * (Math.PI * 2) / 100)

      svg.append('path')
        .attr('d', arcLine)
        .attr('fill', '#FF0000')

      svg.append('text')
        .datum(data)
        .attr('text-anchor', 'middle')
        .attr('fill', '#282D30')
        .attr('font-weight', 'bold')
        .attr('font-size', '22px')
        .attr('transform', 'translate(0, -5)')
        .text((d) => d + '%')
    }
  })

  return (
    <Container ref={ref}>
      <p className='title'>Score</p>
      <span className='caption'>de votre <br/> objectif</span>
    </Container>
  )
}

Score.propTypes = {
  data: PropTypes.number
}