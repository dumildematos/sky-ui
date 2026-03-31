// libs/shared/utils/src/lib/glass-chart.ts
import * as d3 from "d3";

export const renderSkyChart = (
  container: HTMLElement,
  data: any[],
  theme: string,
) => {
  const width = container.clientWidth;
  const height = 120;
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 10]);

  const area = d3
    .area()
    .x((_, i) => x(i))
    .y0(height)
    .y1((d) => y(d))
    .curve(d3.curveBasis);

  // Theme-aware gradient
  const color = theme === "midnight" ? "#38bdf8" : "#0ea5e9";

  svg
    .append("path")
    .datum(data)
    .attr("fill", color)
    .attr("fill-opacity", 0.2) // Translucent fill
    .attr("d", area);

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .line()
        .x((_, i) => x(i))
        .y((d) => y(d))
        .curve(d3.curveBasis),
    );
};
