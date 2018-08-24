// THINGS TO DO:
// The title of the bar chart should be able to be set and shown dynamically
// The title of the bar chart should also be customizable:
// Font Size
// Font Colour

const drawBarChart = (data, options, element) => {


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

  dimensions = (element) => {
    // Determine the dimensions of the element:
    let elementHeight = element.height();
    let elementWidth = element.width();

    // If user has not set default dimensions for the element div's:
    if (elementHeight < 250) {
      console.warn("barChartApp: Consider setting appropriate height for the DOM element that will render the barChartApp. Setting default height of 250px.");
      elementHeight = 250;
      element.height(elementHeight);
    }

    if (elementWidth < 400) {
      console.warn("barChartApp: Consider setting appropriate width for the DOM element that will render the barChartApp. Setting default height of 400px.");
      elementWidth = 400;
      element.width(elementWidth);
    }

    return {
      "height": elementHeight - 25,
      "width": elementWidth - 25
    };
  };

  // Variable Declaration:
  // User customizable options. Default set below:
  let {
    title = "", titleFontSize = "12", titleFontColour = "grey", barColour = "grey", labelColour = "black", barSpacing = 5, BarAxes = "x", fontSize = 8, fontColour = "white", positionOfValues = "top", tickFactor = 5
  } = options;

  // Create an area in the element where the chart will actually be rendered:
  element.append("<!-- barChartApp Rendered Below: --><div class='barChartApp'></div><!-- /.barChartApp -->");

  let chartHeight = dimensions(element).height;
  let chartWidth = dimensions(element).width;

  $(".barChartApp").width(chartWidth);
  $(".barChartApp").height(chartHeight);


  // Add title:

  $(".barChartApp").append(`<div class='titleArea' style='color: ${titleFontColour}; font-size: ${titleFontSize}px'>${title}</div>`);


  // Labeling Values on side of chart:
  // tickFactor determines increments:
  highestBar = findHighestPoint(data, tickFactor);
  lineWidth = Math.ceil(chartHeight / highestBar * 10);
  labelSpaceBetween = highestBar / tickFactor;
  const eachLinePx = (chartHeight / labelSpaceBetween);

  // Create a div that spans across the width of the chart:
  $(".barChartApp").append("<div class='chartingArea'></div>");
  let labelCounter = highestBar;
  for (o = 0; labelCounter > 0; o += eachLinePx) {
    $('.chartingArea').append(`<div class="label label-${labelCounter}">${labelCounter}</div>`);
    labelCounter -= tickFactor;
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

  $('.barChartApp').append('<div class="barArea">');
  // Create the bars, adding to the posLeft which absolutely position divs
  let posLeft = 0;
  for (let i = 0; i < numberOfBars; i++) {
    let barKey = Object.keys(data)[i];
    let barValue = Object.values(data)[i];
    let barHeight = barValue * chartHeight / highestBar;
    let barHtml = `<div class="bar-${i} bar"><div class ="bar-${i}-label bar-label">${barKey}: ${barValue}</div></div>`;

    $('.barArea').append(barHtml);

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
  // Close the .barArea div:
  $('.barArea').append("</div>");

};
// End drawBarChart
