// Stuff to do still:

// Allow the user to pass multiple values for each bar. Think about how you would need to structure this data compared to a single bar chart. This should also support all the features of the single bar chart, including: Customizable bar colours, per value, Customizable label colours

const drawBarChart = (data, options, element) => {

  // Helper Functions:
  // This function will return a value that is X amount higher than the tallest point (gives whitespace to the chart)
  findHighestPoint = (dataObject1, nearest) => {
    let highestValue = 0;
    for (let key in dataObject1) {
      if (highestValue < dataObject1[key]) {
        highestValue = dataObject1[key];
      }
    }
    return Math.ceil(highestValue / nearest) * nearest;
  };

  dimensions = (renderArea) => {
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

  // Create an object from the data passed in:
  createDataObject = (data) => {
    // data.sort(function(a, b) {
    //   return a[1] - b[1];
    // });
    let newObj = {};
    for (let i = 0; i < data.length; i++) {
      const key = data[i][0];
      const value = data[i][1];
      newObj[key] = value;
    }
    return newObj;
  };
  // Variable Declaration:
  // Let user pass in either a string or jQuery object for where to place chart:
  let renderArea;
  if (element.jquery) {
    renderArea = element;
  } else if (typeof element === 'string') {
    renderArea = $(element);
  } else {
    console.error("barChartIt: Third argument passed to drawBarChart() must be a string or jQuery object.");
  }

  // User customizable options. Default set below:
  let {
    title = "", titleFontSize = "12", titleFontColour = "grey", barColour1 = "blue", barColour2 = "red", labelColour = "black", barSpacing = 5, fontSize = 8, positionOfValues = "center", tickFactor = 5
  } = options;

  const dataObject1 = createDataObject(data[0]);
  const data1HighestBar = findHighestPoint(dataObject1, tickFactor);
  let dataObject2 = {};
  let data2HighestBar = 0;

  if (data[1] !== undefined) {
    dataObject2 = createDataObject(data[1]);
    data2HighestBar = findHighestPoint(dataObject2, tickFactor);
    if (data1HighestBar > data2HighestBar) {
      highestBar = data1HighestBar;
    } else {
      highestBar = data2HighestBar;
    }
  } else {
    highestBar = data1HighestBar;
  }
  // Create an area in the renderArea where the chart will actually be rendered:
  renderArea.append("<!-- barChartIt Rendered Below: --><div class='barChartIt'></div><!-- /.barChartIt -->");

  // Set dimensions of the area:
  let chartHeight = dimensions(renderArea).height;
  let chartWidth = dimensions(renderArea).width;
  $(".barChartIt").width(chartWidth);
  $(".barChartIt").height(chartHeight);


  // Add title:
  $(".barChartIt").append(`<div class='titleArea'>${title}</div>`);
  // Add user defined styling to titleArea:
  $(".titleArea").css({
    "color": titleFontColour,
    "font-size": `${titleFontSize}px`
  });

  // Labeling Values on side of chart:
  // tickFactor determines increments:
  lineWidth = Math.ceil(chartHeight / highestBar * 10);
  labelSpaceBetween = highestBar / tickFactor;
  const eachLinePx = (chartHeight / labelSpaceBetween);

  // Create a div that spans across the width of the chart:
  $(".barChartIt").append("<div class='chartingArea'></div>");
  let labelCounter = highestBar;
  // Append divs for each tick, creating the side labels:
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
  let numberOfBars = Object.keys(dataObject1).length;
  if (dataObject2) {
    numberOfBars += Object.keys(dataObject2).length;
  }
  const numberOfSpaces = numberOfBars - 1;
  const sizeOfBars = (chartWidth - (numberOfSpaces * barSpacing)) / numberOfBars;
  $('.barChartIt').append('<div class="barArea">');
  $('.barChartIt').append('<div class="barLabelArea">');

  // Create the bars and their labels, adding to the posLeft which absolutely position divs
  let posLeft = 0;

  for (let i = 0; i < numberOfBars; i++) {
    let chartingObject;
    let barKey;
    let barValue;
    let dataObjectLength = Object.keys(dataObject1).length;
    let colorOfBar;

    // If there's two charts datasets, we need to account for that adding it into chart:
    if (i < dataObjectLength) {
      barKey = Object.keys(dataObject1)[i];
      barValue = Object.values(dataObject1)[i];
      colorOfBar = barColour1;
    } else {
      barKey = Object.keys(dataObject2)[i - dataObjectLength];
      barValue = Object.values(dataObject2)[i - dataObjectLength];
      colorOfBar = barColour2;
    }

    let barHeight = barValue * chartHeight / highestBar;

    let barHtml = "";
    let barLabelHtml = "";

    barHtml = `<div class="bar-${i} bar"><div class ="bar-${i}-label bar-label">${barValue}</div></div>`;
    barLabelHtml = `<div class='bar-text-label bar-${i}-text-label'>${barKey}</div>`;

    $('.barArea').append(barHtml);
    $('.barLabelArea').append(barLabelHtml);

    // Apply custom user options and calculated dimensions to the bars:
    $(`.bar-${i}`).css({
      "width": sizeOfBars,
      "height": barHeight,
      "left": posLeft,
      "background": colorOfBar
    });

    // Apply custom user options and calculated dimensions to labels:
    $(`.bar-${i}-text-label`).css({
      "width": sizeOfBars,
      "left": posLeft,
      "font-size": fontSize,
      "color": labelColour
    });

    // Apply custom user options to the labels in the bar:
    $(`.bar-${i}-label`).css({
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

    posLeft += sizeOfBars + barSpacing;

  }
  // Close the .barArea div:
  $('.barArea').append("</div>");

};
// End drawBarChart
