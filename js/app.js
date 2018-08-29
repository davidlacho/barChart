const sampleData = [
  [
    ["Play Sports", 45],
    ["Talk on Phone", 54],
    ["School Clubs", 22],
    ["Watch TV", 37]
  ],
  [
    ["Eat Sushi", 46],
    ["Play Switch", 53],
    ["Code", 10],
    ["Tindr", 39]
  ],
  [
    ["Chat Online", 10],
    ["Earn Money", 50],
    ["Visit With Friends", 11]
  ]
];


const sampleOptions = {
  "title": "What People Do On Their Spare Time",
  "titleFontSize": "16",
  "titleFontColour": "cadetblue",
  "barColours": ["cyan", "magenta", "orange"],
  "labelColour": "lightblue",
  "barSpacing": 4,
  "fontSize": 10,
  "positionOfValues": "bottom",
  "tickFactor": 10,
  "sortMethod": "ascending"
};

const sampleElement = '.chart';

drawBarChart(sampleData, sampleOptions, sampleElement);
