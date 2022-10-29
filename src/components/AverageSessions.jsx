import * as d3 from 'd3'
import { useRef, useState, useLayoutEffect, useEffect } from 'react' 
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--mainColor);
  border-radius: 5px;
  position: relative;

  svg{
    position: absolute;
    z-index: 50;
    pointer-events: none;
    overflow: visible;
  }
`

const Desc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  opacity: 1;
  z-index: 0;
  border-radius: 5px;
  overflow: hidden;

  & .title{
    font-size: 13px;
    font-weight: 500;
    margin: 20px;
    width: 60%;
    opacity: .7;
  }

  & .weekdays{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-radius: 5px;

    div{
      text-align: center;
      height: calc(100% - 40px);
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 20px 0;
      font-size: 12px;
      position: relative;
      opacity: .7;

      &:hover{

        &::after{
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #b500003e;
          z-index: -1;
        }
      }
    }

    & .weekend{
      background-color: #e20000;
    }
  }
`

export default function AverageSessions({ data }) {

  const ref = useRef(null)

  const sessionLengths = data.map((e) => e.sessionLength)

  const highest = Math.max(...sessionLengths);
  const lowest = Math.min(...sessionLengths);

  const [divWidth, setWidth] = useState(0);
  const [divHeight, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  useEffect(() => {

    if(divHeight && divWidth) {
      // set the dimensions and margins of the graph
      const margin = {top: 60, right: 0, bottom: 50, left: 0};
      const width = divWidth - margin.left - margin.right;
      const height = divHeight - margin.top - margin.bottom;

      // append the svg object to the body of the page
      const svgEl = d3.select(ref.current)
      svgEl.selectAll('svg').remove()
      const svg = svgEl
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const linearGradient = svgEl.select('svg')
        .append('defs')
        .append('linearGradient')
        .attr('id', 'linear')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')
      
      linearGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', "rgba(255, 0, 0, 0)")

      linearGradient.append('stop')
        .attr('offset', '5%')
        .attr('stop-color', "#ff5f5f")

      linearGradient.append('stop')
        .attr('offset', '95%')
        .attr('stop-color', "#ffffff")
      linearGradient.append('stop')

        .attr('offset', '100%')
        .attr('stop-color', "rgba(255, 0, 0, 0)")

      const x = d3.scaleLinear()
        .domain([1, 7])
        .range([18, width - 18])

      const y = d3.scaleLinear()
        .domain([lowest * 0.8, highest])
        .range([height, 0])

      svg.append('path')
        .data([data])
        .attr('fill', 'none')
        .attr('stroke', 'url(#linear)')
        .attr('stroke-width', 2)
        .attr('d', d3.line()
          .curve(d3.curveNatural)
          .x(function(d) {return x(d.day)})
          .y(function(d) {return y(d.sessionLength)})
        )

      svg.append('g')
        .selectAll("dot")
        .data(data)
        .join('g')
        .classed('avg-caption', true)
        .attr('opacity', '0')
          .append("circle")
          .attr("cx", function (d) { return x(d.day); } )
          .attr("cy", function (d) { return y(d.sessionLength); } )
          .attr("r", 4)
          .style("fill", "#fff")

      d3.selectAll('g.avg-caption')
        .append("circle")
        .attr("cx", function (d) { return x(d.day); } )
        .attr("cy", function (d) { return y(d.sessionLength); } )
        .attr("r", 10)
        .style("fill", "#ffffff44")

      d3.selectAll('g.avg-caption')
        .append('rect')
        .attr('width', 40)
        .attr('height', 25)
        .attr("x", (function(d) { return x(d.day) }))
        .attr("y", (function(d) { return y(d.sessionLength) }))
        .attr('transform', `translate(10, -35)`)
        .attr('fill', 'white')

      d3.selectAll('g.avg-caption')
        .append('text')
        .attr('font-size', 8)
        .attr("x", (function(d) { return x(d.day) }))
        .attr("y", (function(d) { return y(d.sessionLength) }))
        .style('text-anchor', 'middle')
        .attr('transform', `translate(30, -20)`)
        .text((d, i) => `${d.sessionLength} min`)

      d3.selectAll('div.weekdays div')
      .on('mouseenter', function (d, i) {
        const gridElId = this.getAttribute('id')
        d3.select(`.avg-caption:nth-child(${gridElId})`).transition()
            .duration('200')
            .attr('opacity', '1')})
      .on('mouseout', function (d, i) {
        const gridElId = this.getAttribute('id')
        d3.select(`.avg-caption:nth-child(${gridElId})`).transition()
            .duration('200')
            .attr('opacity', '0')})

    }
  })

  return (
    <Container ref={ref}>
      <Desc>
        <p className='title'>Durée moyenne des sessions</p>
        <div className='weekdays'>
          <div id='1'>L</div>
          <div id='2'>M</div>
          <div id='3'>M</div>
          <div id='4'>J</div>
          <div id='5'>V</div>
          <div id='6' className='weekend'>S</div>
          <div id='7' className='weekend'>D</div>
        </div>
      </Desc>
    </Container>
  )
}