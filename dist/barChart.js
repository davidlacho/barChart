const drawBarChart = (data, options, element) => {
  // Error Handling:
  try {
    
    if (typeof element !== 'object') {
      throw new Error('The third argument passed in to the drawBarChart requires a jQuery object.');
    }

    // Helper Functions:
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

    // Variable Declaration:
    // User customizable options. Default set below:
    let {
      barColour = "grey",
        labelColour = "black",
        barSpacing = 5,
        BarAxes = "x",
        fontSize = 8,
        fontColour = "white",
        positionOfValues = "top"
    } = options;

    // Create an area in the element where the chart will actually be rendered:
    element.append("<!-- barChartApp Rendered Below: --><div class='barChartApp'></div><!-- /.barChartApp -->");

    // Determine the dimensions of the element:
    let elementHeight = element.height();
    let elementWidth = element.width();

    // If user has not set default dimensions for the element div's:
    if (elementHeight <= 2) {
      elementHeight = 250;
      element.height(elementHeight);
    }

    if (elementWidth <= 2) {
      elementWidth = 500;
      element.width(elementWidth);
    }

    let chartHeight = elementHeight;
    let chartWidth = elementWidth - 25;

    $(".barChartApp").width(chartWidth);

    // Labeling Values on side of chart:
    // labelFactor determines increments:
    const labelFactor = 5;
    highestBar = findHighestPoint(data, labelFactor);
    lineWidth = Math.ceil(chartHeight / highestBar * 10);
    labelSpaceBetween = highestBar / labelFactor;
    const eachLinePx = (chartHeight / labelSpaceBetween);

    // Create a div that spans across the width of the chart:
    $(".barChartApp").append("<div class='chartingArea'></div>");
    let labelCounter = highestBar;
    for (o = 0; labelCounter > 0; o += eachLinePx) {
      $('.chartingArea').append(`<div class="label label-${labelCounter}">${labelCounter}</div>`);
      labelCounter -= labelFactor;
    }

    // Add custom user styles to the side label:
    $(".label").css({
      "height": `${eachLinePx - 1}px`,
      "color": labelColour
    });

    // Calculate the number of bars needed, and the space they will take:
    const numberOfBars = Object.keys(data).length;
    const numberOfSpaces = numberOfBars - 1;
    const sizeOfBars = (chartWidth - (numberOfSpaces * barSpacing)) / numberOfBars;

    // Create the bars, adding to the posLeft which absolutely position divs
    let posLeft = 0;
    for (let i = 0; i < numberOfBars; i++) {
      let barKey = Object.keys(data)[i];
      let barValue = Object.values(data)[i];
      let barHeight = barValue * chartHeight / highestBar;
      let barHtml = `<div class="bar-${i} bar"><div class ="bar-${i}-label bar-label">${barKey}: ${barValue}</div></div>`;

      $('.barChartApp').append(barHtml);

      // Apply custom user options to the bars:
      $(`.bar-${i}`).css({
        "width": sizeOfBars,
        "height": barHeight,
        "left": posLeft,
        "background": barColour
      });

      // If the user defines the position value as center, we need to absolutely position elements differently:
      // positionMargin tells how many px to put from either top/bottom
      let positionMargin = '5px';
      if (positionOfValues === "center") {
        // This "cheats" by actually positioning it at top with 50%.
        positionOfValues = "top";
        positionMargin = '50%';
      }

      // Apply custom user options to the labels:
      $(`.bar-${i}-label`).css({
        "font-size": fontSize,
        "color": fontColour,
        [positionOfValues]: positionMargin
      });

      posLeft += sizeOfBars + barSpacing;
    }

  } catch (err) {
    console.error(err);
  }
};
// End drawBarChart
