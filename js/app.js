$(document).ready(() => {

  const drawBarChart = (data, options, element) => {
    console.log(data);
    console.log(options);
    console.log(element);
  };

  const sampleData = {
    "Play Sports": 45,
    "Talk on Phone": 53,
    "Visit With Friends": 99,
    "Earn Money": 44,
    "Chat Online": 66,
    "School Clubs": 22,
    "Watch TV": 37
  };

  const sampleOptions = {
    "Data": "Something"
  };

  const sampleElement = $('.chart');

  drawBarChart(sampleData, sampleOptions, sampleElement);

});
