$(document).ready(() => {

  // const sampleData = {
  //   "Play Sports": 45,
  //   "Talk on Phone": 53,
  //   "Visit With Friends": 11,
  //   "Earn Money": 50,
  //   "Chat Online": 10,
  //   "School Clubs": 22,
  //   "Watch TV": 37
  // };

  const sampleData = [
    ["Play Sports", 45],
    ["Talk on Phone", 53],
    ["Visit With Friends", 11],
    ["Earn Money", 50],
    ["Chat Online", 10],
    ["School Clubs", 22],
    ["Watch TV", 37]
  ];

  const sampleOptions = {
    "title": "Sample Data",
    "titleFontSize": 16,
    "titleFontColour": "black",
    "barColour": "blue",
    "labelColour": "grey",
    "barSpacing": 10,
    "BarAxes": "x",
    "fontSize": 8,
    "fontColour": "white",
    "positionOfValues": "top",
    "tickFactor": 2
  };

  const sampleElement = $('.chart');

  drawBarChart(sampleData, sampleOptions, sampleElement);

});
