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
    ["Tindr", 100]
  ],
  [
    ["Duck Duck Go", 103]
  ]
];


const sampleOptions = {
  "title": "Stuff People Do On Their Time Off",
  "titleFontSize": 16,
  "titleFontColour": "grey",
  "barColour1": "cyan",
  "barColour2": "magenta",
  "barColour3": "purple",
  "labelColour": "black",
  "barSpacing": 5,
  "fontSize": 10,
  "positionOfValues": "top",
  "tickFactor": 5,
  "sortMethod": "ascending"
};

const sampleElement = '.chart';

drawBarChart(sampleData, sampleOptions, sampleElement);
