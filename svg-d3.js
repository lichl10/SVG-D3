d3.csv("./cities.csv", d3.autoType).then(data=>{
	const cities = filterCities(data);
    //console.log('cities',cities);
    d3.select('.city-count').text(`Number of Cities: ${cities.length}`);
    drawCircle(cities);
})

d3.csv("./buildings.csv", d3.autoType).then(data=>{
    const buildings = data.sort((a,b)=>b.height_ft-a.height_ft);
    //console.log('cities',buildings);
    drawRect(buildings);
    
})

function filterCities(data) {
    data = data.filter(d => d.eu === true);
    return data;
}

function drawCircle(data) {
    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr('cx', d=>d.x)
        .attr('cy', d=>d.y)
        .attr('fill','lightblue')
        .attr('r', d=>{
            let ppl = d.population;
            let rad;
            (ppl<1000000)? rad = 4:rad = 8;
            return rad;
        });
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr('x', d=>d.x)
        .attr('y', d=>d.y)
        .attr('text-anchor', 'middle')
        .filter(d => d.population >= 1000000)
        .attr('font-size', 11)
        .attr('dy', -15)
        .text(d=>d.city);
    return svg;
}

function drawRect(data) {
    const width = 500;
    const height = 500;
    const svg = d3.select('.bar')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('class', 'bar')
        .attr('x', 180)
        .attr('y', (datum,index) => 10 + index * 30)
        .attr("width", d=>d.height_px)
        .attr("height", 25)
        .attr('fill','orange')
        .on("click", function(event, d) {
            d3.select(".building-name")
                .text(d.building);
            d3.select(".height")
                .text(d.height_ft + " ft");
            d3.select(".city")
                .text(d.city);
            d3.select(".country")
                .text(d.country);
            d3.select(".floors")
                .text(d.floors);
            d3.select(".completed")
                .text(d.completed);
            let img = './img/' + d.image;
            d3.select(".image")
                .attr('src',img)
                .attr('width', 225)
                .attr('height',300);
            
        });
    svg.selectAll("text.name")
        .data(data)
        .enter()
        .append("text")
        .attr('class','name')
        .attr('x', 10)
        .attr('y', (datum,index) => 26 + index * 30)
        .attr('text-anchor', 'start')
        .attr('font-size', 10)
        .text(d=>d.building);

    svg.selectAll("text.height")
        .data(data)
        .enter()
        .append("text")
        .attr('class','barHeight')
        .attr('x', (datum)=> 170+datum.height_px)
        .attr('y', (datum,index) => 26 + index * 30)
        .style('text-anchor', 'end')
        .attr('font-size', 10)
        .attr('fill', 'white')
        .text(d=>d.height_ft + " ft");
    return svg;
}


