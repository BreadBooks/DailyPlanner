var today = new Date();
var currentHour = today.getHours();
var currentDate = (today.getMonth()+1)+'/'+ today.getDate()+'/'+today.getFullYear();
$(document).ready(function () {
    var today = new Date();
    var currentHour = today.getHours();
    $("#currentDay").append(currentDate);

});