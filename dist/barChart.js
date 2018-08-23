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


  element.append("<div class='barChartApp'></div>");

  const barChartApp = $(".barChartApp");

  let elementHeight = element.height();
  let elementWidth = element.width();

  if (elementHeight <= 2) {
    // If user has not set defaults for the element div's height:
    elementHeight = 250;
    elementWidth = 1000;
    element.height(elementHeight);
    element.width(elementWidth);
  }

  let chartHeight = elementHeight;
  let chartWidth = elementWidth - 25;

  barChartApp.width(chartWidth);

  // Labeling Values on side of chart:
  labelFactor = 5;
  highestBar = findHighestPoint(data, labelFactor);
  lineWidth = Math.ceil(chartHeight / highestBar * 10);
  labelSpaceBetween = highestBar / labelFactor;
  const eachLinePx = (chartHeight / labelSpaceBetween);

  barChartApp.append("<div class='labelArea'></div>");
  let labelCounter = highestBar;
  for (o = 0; labelCounter > 0; o += eachLinePx) {
    $('.labelArea').append(`<div class="sideLabel sideLabel-${labelCounter}">${labelCounter}</div>`);
    labelCounter -= labelFactor;
  }

  $(".sideLabel").height(eachLinePx - 1);

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

  // If the position value is center, we need to absolutely position elements differently:
  let positionMargin = '5px';
  if (positionOfValues === "center") {
    positionOfValues = "top";
    positionMargin = '50%';
  }

  const numberOfBars = Object.keys(data).length;
  const numberOfSpaces = numberOfBars - 1;
  const sizeOfBars = (chartWidth - (numberOfSpaces * barSpacing)) / numberOfBars;

  let posLeft = 0;
  for (let i = 0; i < numberOfBars; i++) {
    let barKey = Object.keys(data)[i];
    let barValue = Object.values(data)[i];
    let barHeight = barValue * chartHeight / highestBar;
    let barHtml = `<div class="bar-${i} bar"><div class ="bar-${i}-label bar-label">${barKey}: ${barValue}</div></div>`;

    $('.barChartApp').append(barHtml);


    $(`.bar-${i}`).css({
      "width": sizeOfBars,
      "height": barHeight,
      "left": posLeft,
      "background": barColour
    });

    $(`.bar-${i}-label`).css({
      "font-size": fontSize,
      "color": fontColour,
      [positionOfValues]: positionMargin
    });

    posLeft = posLeft + sizeOfBars + barSpacing;

  }
};
