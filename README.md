# barChart

barChart is a tool to chart data. With it, you can categorize data in a bar chart using only HTML, CSS, JavaScript and jQuery. You can customize the bar chart with in many ways, but this is optional. This project was built for an assignment at [Lighthouse Labs](https://lighthouselabs.ca/).

![barChart Screenshot](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/barChart.png)

## Getting Started

First, clone this repository into the root of your project:
```
git clone https://github.com/fiveache/barChart.git
```

Then add the `barChart.css` stylesheet to the head of the page you wish to display barChart. The stylesheet is found in the `dist` folder:
```
<link rel="stylesheet" type="text/css" href="barChart/dist/barChart.css">
```

Then add the `barChart.js` javascript file to the head of the page you wish to display barChart. The javascript file is found in the `dist` folder:
```
<script src="barChart/dist/barChart.js"></script>
```

In the body of your HTML, create an empty `<div>` element where you would like the bar chart to be rendered. Assign this it a `class` or `id` that you will use when calling barChart.
```
<div class="barChart"></div>
```
Optionally, you can give this div a width and height in your site's main css file to define the chart's dimensions. barChart will render within the dimensions of this div. If no dimensions are specified, it will assign a default width and height.

## Prerequisites

This project requires jQuery. To install jQuery to your site visit [https://jquery.com/](https://jquery.com/).

## Installing

In your site's main javascript file, call the function `drawBarChart()`. `drawBarChart()` takes 2 arguments, and one optional argument:
```
drawBarChart(data, [options], element);
```

### data Parameter
The parameter `data` is mandatory and must be of type Array. The data of the array must be structured as such:
```
const data = [
  [
    ["Label1", 45],
    ["Label2", 54],
    ["Label3", 22],
    ["Label4", 37]
  ]
];
```
Optionally, You can pass in more than one data set to the `data` parameter by structuring the data as such:
```
const data = [
  [
    ["Data1Label1", 45],
    ["Data1Label2", 54],
    ["Data1Label3", 22],
    ["Data1Label4", 37]
  ],
  [
    ["Data2Label1", 46],
    ["Data2Label2", 53],
    ["Data2Label3", 10],
    ["Data2Label4", 39]
  ],
  [
    ["Data3Label1", 10],
    ["Data3Label2", 50],
    ["Data3Label3", 11]
  ]
];
```
### options Parameter
The `options` parameter is optional. If you wish to use barChart's default options, please omit this parameter. The `options` parameter must be a JavaScript object containing the following customizable key value pairs. All key value pairs are optional:  
``title``: must be of type string. Adds a title to the top of the bar chart.  
``titleFontSize``: must be of type number. Adjusts the title font size.  
``titleFontColour``: must be of type string. Defines the title colour. Can be either a CSS Colour Name or hex value.  
``barColours``: must be of type array. It defines the colours of the bars. It is a single array listing colour in the order you wish to assign to the data sets (i.e. the first dataset will be assigned a the first colour of the array, the second dataset will be assigned the second colour in the array, etc.). For example, defining `barColours` as `["magenta", "cyan", "aquamarine"]` will produce a bar chart as such:
![barChart Colours Screenshot](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/barChartColours.png)
``labelColour``: must be of type string. Defines the label colour. Can be either a CSS Colour Name or hex value.  
``barSpacing``: must be of type number. It defines the number of pixels between each bar in the bar chart. For example, a barChart with `20` `barSpacing` will look as such:
![barChart With 20 barSpacing](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/barChart20px.png)
``fontSize``: must be of type number. Adjusts the font size of labels in the bar chart.  
``positionOfValues``: must be of type string with either values of `top`, `bottom`, or `center`. Adjusts the position of number labels o the bars in the chart.  
For example, a `positionOfValues` of `top` will look as such:
![positionOfValues With value of top](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/top.png)
A `positionOfValues` of `bottom` will look as such:
![positionOfValues With value of bottokm](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/bottom.png)
A `positionOfValues` of `center` will look as such:
![positionOfValues With value of center](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/center.png)
``tickFactor``: must be of type number. It defines the factor by which the values on the left of the bar chart increments. For example, a `tickFactor` of `2` will look as such:
![tickFactor with value of 2](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/tick2.png)
a `tickFactor` of `5` will look as such:
![tickFactor with value of 5](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/tick5.png)
``sortMethod``: must be of type string with either values of `ascending` or `descending`. It defines the sort order of the bars. For example, a `sortMethod` with a value of `descending` will look as such:
![sortMethod with a value of descending](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/descending.png)
a `sortMethod` with a value of `ascending` will look as such:
![sortMethod with a value of ascending](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/ascending.png)
an undefined `sortMethod` will default to:
![sortMethod not defined](https://raw.githubusercontent.com/fiveache/barChart/master/docs/screenshots/nosort.png)

  
The options object should be structured as such:  
```
const options = {
  "title": "Foo",
  "titleFontSize": "16",
  "titleFontColour": "black",
  "barColours": ["blue", "red", "orange"],
  "labelColour": "black",
  "barSpacing": 4,
  "fontSize": 10,
  "positionOfValues": "bottom",
  "tickFactor": 5,
  "sortMethod": "ascending"
};
```
### element Parameter
The `element` parameter is mandatory and should either be a DOM element represented as a string value or jQuery element that the chart will get rendered into. In referencing the `div` you created in previous steps, you can either pass in a jQuery object as such: ``$(".barChart")`` or you can pass in the value as a string: ``".barChart"``.


### Example

```
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
  "barSpacing": 4,
  "fontSize": 10,
  "positionOfValues": "bottom",
  "tickFactor": 5,
  "sortMethod": "ascending"
};

const element = '.chart';

drawBarChart(data, options, element);
```

## Author

* **David Lacho** - *Initial work* - [David Lacho](https://github.com/fiveache)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

* Lighthouse Labs
* [Purple Booth](https://github.com/PurpleBooth) for help with writing documentation

## Resources Used (Requirement for Lighthouse Labs)
* https://www.w3schools.com/css/css_positioning.asp
* https://www.quackit.com/css/codes/patterns/css_background_stripes.cfm
* https://uigradients.com/
* https://stackoverflow.com/questions/5223/length-of-a-javascript-object
* https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
* https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
* https://api.jquery.com/
* https://stackoverflow.com/questions/42943820/cannot-read-property-replace-of-undefined-in-jquery
* https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
* https://css-tricks.com/stripes-css/
* https://eslint.org/docs/user-guide/configuring
* https://github.com/lighthouse-labs/eslint-config-lighthouselabs
* https://stackoverflow.com/questions/1853223/check-if-object-is-a-jquery-object
* https://www.w3schools.com/js/js_object_properties.asp
* https://www.webdesignerdepot.com/2014/05/8-simple-css3-transitions-that-will-wow-your-users/
* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
* https://stackoverflow.com/questions/39583327/javascript-sort-array-of-arrays-by-second-element-in-each-inner-array
* https://www.mathworks.com/matlabcentral/answers/151806-matching-value-to-corresponding-variable-via-string-name
* https://help.github.com/articles/basic-writing-and-formatting-syntax/
* https://en.wikipedia.org/wiki/Bar_chart
* https://stackoverflow.com/questions/24575680/new-lines-inside-paragraph-in-readme-md
* https://codeburst.io/parameters-arguments-in-javascript-eb1d8bd0ef04
