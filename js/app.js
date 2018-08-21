$(document).ready(() => {

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
      // NEED TO DO THIS:  Bar height should be dependent on the values of the data: The loop will create a div that will be the actual bar height. (So, for example if the value was 20/100, The height should be 20% of the parent div). it will be 100% of the width.

      barHtml = `${barHtml}
      <div class="bar-container" style="width: ${sizeOfBars}px; left: ${posLeft}px;">
        <div class="bar-${i} bar" style="height: ${barHeight}px; background-color: ${barColour}">
          <div class ="bar-${i}-label">
            ${barKey}: ${barValue}
          </div>
        </div>
      </div>`;

      // I'll have to come up with a way to flip the axes of the chart.

      posLeft = posLeft + sizeOfBars + barSpacing;
    }

    element.html(barHtml);


  };

  const sampleData = {
    "Play Sports": 45,
    "Talk on Phone": 53,
    "Visit With Friends": 20,
    "Earn Money": 44,
    "Chat Online": 69,
    "School Clubs": 22,
    "Watch TV": 37
  };

  const sampleOptions = {
    "barColour": "blue",
    "labelColour": "white",
    "barSpacing": 5,
    "BarAxes": "x"
  };

  const sampleElement = $('.chart');

  drawBarChart(sampleData, sampleOptions, sampleElement);

});
