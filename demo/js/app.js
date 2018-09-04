const data = [
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


const options = {
  "title": "Stuff People Do (barChart Demo)",
  "titleFontSize": "16",
  "titleFontColour": "black",
  "barColours": ["blue", "red", "orange"],
  "labelColour": "black",
  "barSpacing": 5,
  "fontSize": 12,
  "positionOfValues": "bottom",
  "tickFactor": 5,
  "sortMethod": ""
};

const element = '.chart';

drawBarChart(data, options, element);
