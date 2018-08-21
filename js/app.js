$(document).ready(() => {

  chartHeight = $('.chart').width();
  chartWidth = $('.chart').height();

  const drawChart = (data) => {
    console.log(data);
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

  drawChart(sampleData);

});
