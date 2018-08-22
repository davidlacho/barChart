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
  let {
    barColour = "grey", labelColour = "black", barSpacing = 5, BarAxes = "x", fontSize = 12, fontColour = "white", positionOfValues = "top"
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

  highestBar = findHighestPoint(data, 5);
  console.log(highestBar);

  let posLeft = 0;
  for (let i = 0; i < numberOfBars; i++) {
    let barKey = Object.keys(data)[i];
    let barValue = Object.values(data)[i];
    let barHeight = barValue * chartHeight / highestBar;

    let barHtml = `<div class="bar-${i} bar"><div class ="bar-${i}-label bar-label">${barKey}: ${barValue}</div></div>`;

    element.append(barHtml);

    $(`.bar-${i}`).css({
      "width": sizeOfBars,
      "height": barHeight,
      "left": posLeft,
      "background-color": barColour
    });

    $(`.bar-${i}-label`).css({
      "font-size": fontSize,
      "color": fontColour,
      [positionOfValues]: positionMargin
    });

    posLeft = posLeft + sizeOfBars + barSpacing;

  }



};
