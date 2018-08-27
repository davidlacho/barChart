const sampleData = [
  [
    ["Play Sports", 45],
    ["Talk on Phone", 53],
    ["Visit With Friends", 11],
    ["Earn Money", 50],
    ["Chat Online", 10],
    ["School Clubs", 22],
    ["Watch TV", 37]
  ],
  [
    ["Eat Sushi", 45],
    ["Play Switch", 53],
    ["Plan Travel", 70],
    ["Google Celebrities", 50],
    ["Code", 10],
    ["Tindr", 100],
    ["Sleep", 37]
  ]
];


const sampleOptions = {
  "title": "Sample Data",
  "titleFontSize": 16,
  "titleFontColour": "grey",
  "barColour1": "red",
  "barColour2": "blue",
  "labelColour": "black",
  "barSpacing": 5,
  "fontSize": 12,
  "positionOfValues": "bottom",
  "tickFactor": 25
};

const sampleElement = '.chart';

drawBarChart(sampleData, sampleOptions, sampleElement);
