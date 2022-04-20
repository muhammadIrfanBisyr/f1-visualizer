import React, {useEffect}  from 'react';
import * as d3 from 'd3';

export default function LineChartD3(){

    const createGraph = async () => {
        // read from csv and format variables
        const data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv');

        const parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
            d.date = parseTime(d.date);
            d.value = +d.value;
        });

        const margin = { top: 20, right: 20, bottom: 50, left: 70 };
        const width = 960 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        d3.selectAll(".main-line-chart > *").remove(); 

        const svg = d3.select(".main-line-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => { return d.date; }));
        y.domain([0, d3.max(data, (d) => { return d.value; })]);
        svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));
        svg.append("g").call(d3.axisLeft(y));

        const valueLine = d3.line()
                .x((d) => { return x(d.date); })
                .y((d) => { return y(d.value); });

        const path = svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", valueLine)

        const length = path.node().getTotalLength();
        path.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
          .transition()
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .duration(1000)
    }

    useEffect(() => {
        createGraph();
    }, []);

    return (
        <div className='main-line-chart'> 
        </div>
    );
}