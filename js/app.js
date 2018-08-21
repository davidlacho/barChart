$(document).ready(() => {

  const drawBarChart = (data, options, element) => {
    const chartHeight = element.width();
    const chartWidth = element.height();

    // User customizable options. Default set below:
    const {
      barColour = "grey", labelColour = "black", barSpacing = 5, BarAxes = "x"
    } = options;

    const numberOfBars = Object.keys(data).length;

    // We want the bars to start on the left-ist side and end of the rightest side, with space in between each.
    const numberOfSpaces = numberOfBars - 1;
    const sizeOfBars = (chartWidth - (numberOfSpaces * barSpacing)) / numberOfBars;

    let barHtml  = "";

    // Need for loop here to iterate through objects.
    // Based on the number of bars, it will iterate through the object
    for (let i = 0; i < numberOfBars; i++) {
      barKey = Object.keys(data)[i];
      barValue = Object.values(data)[i];
      barHtml = `${barHtml}
      <div class="bar-container">
        <div class="bar-${i} bar">
          ${barKey}: ${barValue}
        </div>
      </div>`;
      // for each item in the obj, it will pull the key and the value.
      // I'll have to make a string that will concatenate over the loop:
      // It will create a parent div that is the total height of the chart
      // Bar height should be dependent on the values of the data: The loop will create a div that will be the actual bar height. (So, for example if the value was 20/100, The height should be 20% of the parent div). it will be 100% of the width.
      // Bar width should be dependent on the total amount of values passed. Bar spacing (space between bars) is customizable. So we need to calculate the size of the bars.

      // I'll have to come up with a way to flip the axes of the chart.
    }

    console.log(barHtml);


  };

  const sampleData = {
    "Play Sports": 45,
    "Talk on Phone": 53,
    "Visit With Friends": 99,
    "Earn Money": 44,
    "Chat Online": 66,
    "School Clubs": 22,
    "Watch TV": 37
  };

  const sampleOptions = {
    "barColour": "blue",
    "labelColour": "white",
    "barSpacing": "5px",
    "BarAxes": "x"
  };

  const sampleElement = $('.chart');

  drawBarChart(sampleData, sampleOptions, sampleElement);

});
