const drawBarChart = (data, options, element) => {

  // This function will return a value that is X amount higher than the tallest point (gives whitespace to the chart)
  findHighestPoint = (data, nearest) => {
    let highestValue = 0;
    for (let key in data) {
      if (highestValue < data[key]) {
        highestValue = data[key];
      }
    }
    return Math.ceil(highestValue / nearest) * nearest;
  };

  let chartHeight = element.height();
  let chartWidth = element.width();

  if (chartHeight === 0) {
    // If user has not set defaults for the element div's height:
    chartHeight = 250;
    chartWidth = 1000;
    element.height(chartHeight);
    element.width(chartWidth);
  }

  // Set the chart's position as relative:
  element.css("position", "relative");

  // User customizable options. Default set below:
  const {
    barColour = "grey", labelColour = "black", barSpacing = 5, BarAxes = "x"
  } = options;

  const numberOfBars = Object.keys(data).length;
  const numberOfSpaces = numberOfBars - 1;
  const sizeOfBars = (chartWidth - (numberOfSpaces * barSpacing)) / numberOfBars;
  let barHtml = "";

  highestBar = findHighestPoint(data, 5);
  console.log(highestBar);

  let posLeft = 0;
  for (let i = 0; i < numberOfBars; i++) {
    let barKey = Object.keys(data)[i];
    let barValue = Object.values(data)[i];
    let barHeight = barValue * chartHeight / highestBar;

    barHtml = `${barHtml}
      <div class="bar-container" style="width: ${sizeOfBars}px; left: ${posLeft}px;">
        <div class="bar-${i} bar" style="height: ${barHeight}px; background-color: ${barColour}">
          <div class ="bar-${i}-label">
            ${barKey}: ${barValue}
          </div>
        </div>
      </div>`;

    posLeft = posLeft + sizeOfBars + barSpacing;
  }

  element.html(barHtml);

};
