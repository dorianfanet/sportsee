import styled from "styled-components"
import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import * as d3 from 'd3'

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
`

export default function UserPerformance({ data }) {

  const ref = useRef(null)

  const [divWidth, setWidth] = useState(0);
  const [divHeight, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  useEffect(() => {

    if(data) {
      if(data[0].kind === 'Cardio') {
        data.splice(0, 0, data.splice(5, 1)[0])
      }

      // set the dimensions and margins of the graph
      const margin = {top: 0, right: 0, bottom: 0, left: 0};
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

      // scale
      let radialScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, height / 3.5])

      // get maximum value
      let dataMax = Math.max(...data.map((e) => e.value))

      // generate fake values for ticks
      let ticksData = []
      for(let i = 0; i < 5; i++) {
          let ticksDataEach = []
          for(let j = 0; j < data.length; j++) {
              ticksDataEach = [...ticksDataEach, {value: (dataMax * 0.2) * (i + 1)}]
          }
          ticksData = [...ticksData, ticksDataEach]
      }

      // return coordinates of a point, given angle and value
      function angleToCoordinate(angle, value){
          let x = Math.cos(angle) * radialScale(value);
          let y = Math.sin(angle) * radialScale(value);
          return {"x": width / 2 + x, "y": height / 2 - y};
      }

      // generate array of coordinates when given data
      function getPathCoordinates(dataset){
          let coordinates = [];
          for (let i = 5; i < 6; i++){
              let angle = (Math.PI / 2) + (2 * Math.PI * i / dataset.length);
              let pdata = (dataset[i].value * 100 / dataMax) / 10
              coordinates.push(angleToCoordinate(angle, pdata));
          }
          for (let j = 0; j < dataset.length; j++){
              let angle = (Math.PI / 2) + (2 * Math.PI * j / dataset.length);
              let pdata = (dataset[j].value * 100 / dataMax) / 10
              coordinates.push(angleToCoordinate(angle, pdata));
          }
          return coordinates;
      }

      let line = d3.line()
          .x(d => d.x)
          .y(d => d.y);

      // generate ticks
      svg.append('g')
      .selectAll('path')
      .data(ticksData)
      .join('g')
      .each(function(d, i) {
          d3.select(this)
          .append("path")
          .datum(getPathCoordinates(ticksData[i]))
          .attr("d", line)
          .attr("fill", 'none')
          .attr('stroke-width', 1)
          .attr("stroke", 'white')
          .classed('spider-ticks', true);
      })

      const textContainer = svg.append('g')
      
      // append text
      for (var i = 0; i < data.length; i++) {
          let angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
          let label_coordinate = angleToCoordinate(angle, 11);
      
          //draw axis label
          textContainer.append("text")
            .attr("x", label_coordinate.x)
            .attr("y", label_coordinate.y)
            .attr("fill", "white")
            .attr('font-size', 8)
            .attr('font-family', 'Roboto')
            .attr('font-weight', '500')
            .text(data[i].kind);
      }

      textContainer.selectAll('text:nth-child(3n-2)')
        .attr('text-anchor', 'middle')

      textContainer.select('text:nth-child(4)')
        .attr('transform', 'translate(0, 5)')

      textContainer.select('text:nth-child(2)')
        .attr('text-anchor', 'end')

      textContainer.select('text:nth-child(3)')
        .attr('text-anchor', 'end')

      //draw the path element
      svg.append("path")
          .datum(getPathCoordinates(data))
          .attr("d",line)
          .attr("fill", '#FF0101')
          .attr("opacity", 0.7);
    
    }

  })

  return(
    <Container ref={ref}></Container>
  )
}