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
  "titleFontColour": "grey",
  "barColour": "green",
  "labelColour": "black",
  "barSpacing": 5,
  "fontSize": 12,
  "positionOfValues": "center",
  "tickFactor": 5
};

const sampleElement = '.chart';

drawBarChart(sampleData, sampleOptions, sampleElement);
