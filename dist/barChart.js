'use strict';

const drawBarChart = (data, options, element) => {

  // Helper Functions:

  // This function will return a value that is X amount higher than the tallest point (gives whitespace to the chart)
  const findHighestPoint = (data, nearest) => {
    let highestValue = 0;
    for (let i = 0; i < data.length; i++) {
      if (highestValue < data[i][1]) {
        highestValue = data[i][1];
      }
    }
    return Math.ceil(highestValue / nearest) * nearest;
  };

  // This function determines the width and height of the render area, also considering that there needs to be space for labels.
  const dimensions = renderArea => {

    // Determine the dimensions of the renderArea:
    let elementHeight = renderArea.height();
    let elementWidth = renderArea.width();

    // If user has not set default dimensions for the renderArea div's:
    if (elementHeight < 250) {
      console.warn("barChartIt: Consider setting appropriate height for the DOM renderArea that will render the barChartIt. Setting default height of 250px.");
      elementHeight = 250;
      renderArea.height(elementHeight);
    }

    if (elementWidth < 400) {
      console.warn("barChartIt: Consider setting appropriate width for the DOM renderArea that will render the barChartIt. Setting default height of 400px.");
      elementWidth = 400;
      renderArea.width(elementWidth);
    }

    return {
      "height": elementHeight - 50,
      "width": elementWidth - 25
    };

  };

  // This function merges all the data and can sort it. It keeps track of what dataset the data originally comes from:
  const mergeArrays = (data, sortMethod) => {
    let newArr = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        newArr.push([data[i][j][0], data[i][j][1], i]);
      }
    }

    // Sorting (if defined):
    if (sortMethod === "ascending") {
      newArr.sort(function(a, b) {
        return a[1] - b[1];
      });
    } else if (sortMethod === "descending") {
      newArr.sort(function(a, b) {
        return b[1] - a[1];
      });
    }

    return newArr;
  };

  // Variable Declaration:

  // Let custom user options be optional &
  // Let user pass in either a string or jQuery object for where to place chart:
  let renderArea;

  if (options.jquery) {
    renderArea = options;
    console.warn("barChartIt: Consider passing custom user options or empty object as second parameter in drawBarChart.");
  } else if (typeof options === 'string') {
    renderArea = $(options);
    console.warn("barChartIt: Consider passing custom user options or empty object as second parameter in drawBarChart.");
  } else if (element.jquery) {
    renderArea = element;
  } else if (typeof element === 'string') {
    renderArea = $(element);
  } else {
    console.error("barChartIt: Third argument passed to drawBarChart() must be a string or jQuery object.");
  }

  // User customizable options. Default set below:
  const {
    title = "Bar Chart", titleFontSize = "12", titleFontColour = "grey", barColours = ["blue", "red", "green", "yellow", "purple"], labelColour = "black", barSpacing = 5, fontSize = 8, positionOfValues = "center", tickFactor = 5, sortMethod = "none"
  } = options;

  // Merge the data from all arrays (and sort them if defined)... but keep track of original data set (for colouring bars)
  const mergedData = mergeArrays(data, sortMethod);

  // Find the highest point so that calculations on div heights can be done:
  const highestBar = findHighestPoint(mergedData, tickFactor);

  // Set dimensions of the area:
  let chartHeight = dimensions(renderArea).height;
  let chartWidth = dimensions(renderArea).width;

  // Create an area in the renderArea where the chart will actually be rendered:
  renderArea.append("<!-- barChartIt Rendered Below: --><div class='barChartIt'></div><!-- /.barChartIt -->");
  $(".barChartIt").width(chartWidth);
  $(".barChartIt").height(chartHeight);

  // Add title:
  $(".barChartIt").append(`<div class='titleArea'>${title}</div>`);

  // Add user defined styling to titleArea:
  $(".titleArea").css({
    "color": titleFontColour,
    "font-size": `${titleFontSize}px`
  });

  // Labeling Values on side of chart. tickFactor determines increments.
  // This fancy logic calculates how many pixels there are between each tick:
  const eachLinePx = chartHeight / (highestBar / tickFactor);

  // Create a div that spans across the width of the chart:
  $(".barChartIt").append("<div class='chartingArea'></div><!-- /.chartingArea -->");


  // Append divs for each tick, creating the side labels, decrementing labelCounter each time:
  let labelCounter = highestBar;
  for (let o = 0; labelCounter > 0; o += eachLinePx) {
    $('.chartingArea').append(`<div class="label label-${labelCounter}">${labelCounter}</div>`);
    labelCounter -= tickFactor;
  }
  $('.barChartIt').append('<div class="barArea"></div><!-- /.barArea -->');
  $('.barChartIt').append('<div class="barLabelArea"></div><!-- /.barLabelArea -->');

  // Append a label "0" to the bottom of the chart:
  $('.barLabelArea').append(`<div class="label-0">0</div>`);

  // Add custom user styles to the side labels:
  $(".label").css({
    "height": `${eachLinePx - 1}px`,
    "color": labelColour
  });

  $(".label-0").css({
    "color": labelColour
  });

  // Calculate the number of bars needed, and the space they will take:
  const numberOfBars = mergedData.length;
  const numberOfSpaces = numberOfBars - 1;
  const sizeOfBars = (chartWidth - (numberOfSpaces * barSpacing)) / numberOfBars;

  // Create the bars and their labels, adding to the posLeft which absolutely position divs
  let posLeft = 0;

  for (let i = 0; i < numberOfBars; i++) {
    // Grab the data from the merged data aray:
    const barLabel = mergedData[i][0];
    const barValue = mergedData[i][1];
    const barGroup = mergedData[i][2];

    // Figure out the values that affect the styling of the bar:
    const barHeight = barValue * chartHeight / highestBar;
    const barHtml = `<div class="bar-${i} bar"><div class ="bar-${i}-label bar-label">${barValue}</div></div>`;
    const barLabelHtml = `<div class='bar-text-label bar-${i}-text-label'>${barLabel}</div>`;

    $('.barArea').append(barHtml);
    $('.barLabelArea').append(barLabelHtml);

    // Apply custom user options and calculated dimensions to the bars:
    // We need to make sure that there are enough bar colours defined by user:
    if (barColours[barGroup] === undefined) {
      barColours.push("blue", "red", "green", "yellow", "purple");
      console.warn(`barChartIt: User has not defined colors for the bars of any data set beyond #${barGroup}. Consider adding additional colors to the barColours array in options.`);
    }
    const colorOfBar = barColours[barGroup];

    $(`.bar-${i}`).css({
      "width": sizeOfBars,
      "height": barHeight,
      "left": posLeft,
      "background": colorOfBar
    });

    // Apply custom user options to the labels in the bar:
    $(`.bar-${i}-label`).css({
      "font-size": fontSize,
      "color": labelColour
    });

    // Apply custom user options and calculated dimensions to labels:
    $(`.bar-${i}-text-label`).css({
      "width": sizeOfBars,
      "left": posLeft,
      "font-size": fontSize,
      "color": labelColour
    });

    // Determine where the label is positioned in the bar:
    if (positionOfValues === "center") {
      $(`.bar-${i}-label`).css({
        "top": "50%"
      });
    } else {
      $(`.bar-${i}-label`).css({
        [positionOfValues]: "5px"
      });
    }

    // Increment posLeft for next bar's positioning:
    posLeft += sizeOfBars + barSpacing;

  }
  
};
// End drawBarChart
