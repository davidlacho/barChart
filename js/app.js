$(document).ready(() => {

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
    "labelColour": "red",
    "barSpacing": 5,
    "BarAxes": "x",
    "fontSize": 16,
    "fontColour": "white",
    "positionOfValues": "top"
  };

  const sampleElement = $('.chart');

  drawBarChart(sampleData, sampleOptions, sampleElement);

});
