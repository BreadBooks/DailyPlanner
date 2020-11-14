$(document).ready(function (event) {
    //storage stuff
    const plannerKey = "dailyplanner";
    let planner = {
        
        timeBlocks: [],
        prevSave: ""

    };
// current day & time
    let currentDay = moment().format("[Today's date is] dddd, MMMM Do YYYY, h:mm a");
    $("#currentDay").text(currentDay);
    planner.prevSave = currentDay;
    const plannerSave = localStorage.getItem(plannerKey);

    if (plannerSave) {
        const currentPlanner = JSON.parse(plannerSave);
        if (currentDay === currentPlanner.prevSave)
            planner = currentPlanner;
    }

    let currentHour = moment().hour();

    for (let i = 0; i < 13; i++) {
        let index = i + 7;
        let timeColors;

// Time colors
        if (moment(index).isBefore(currentHour))
            timeColors = "past";
        else if (moment(index).isSame(currentHour))
            timeColors = "present";
        else if (moment(index).isAfter(currentHour))
            timeColors = "future";

        let content = "";
        let textIndex = -1;
// Find text from timeBlock
        if (planner.timeBlocks)
            textIndex = planner.timeBlocks.findIndex(timeBlock => timeBlock.id == index);

        if (textIndex >= 0)
            content = planner.timeBlocks[textIndex].text;
        
        const time = moment(index, ["HH.mm"]).format("hA");
        renderGrid(index, time, timeColors, content);
    
    }
    // Calling clear button AFTER rendering grid content
    clearBtn();

    function renderGrid(i, time, colors, content) {
        const row = $(`<div class="row time-block">`);
            $(row).append(`<div class="col-1">`);
            $(row).append(`<div class="col-1 hour">${time}</div>`);
        
        const input = $(`<textarea class="col-8 ${colors}" id="text-${i}" placeholder="To Do"></textarea>`);
            input.val(content);
            $(row).append(input);
            $(row).append(`<button class="col-1 btn saveBtn fas fa-save" hour="${i}"></button>`);
        $(".container").append(row);
    }
// Clear All Button
    function clearBtn() {
        const row = $(`<div class="row clearBtn justify-content-md-center">`);
            $(row).append(`<div class="col-8 justify-content-md-center">`);
            $(row).append(`<button class="col-6 btn clearBtn btn-danger justify-content-md-center">Clear All</button>`);
        $(".container").append(row);
  }
    $(".clearBtn").on("click", function () {
        localStorage.clear();
        window.location.reload();
    });
// Save Button 
    $(".saveBtn").on("click", function() {
        const hour = $(this).attr("hour");
        const content = $(`#text-${hour}`).val();

        const hourEntry = {
            id: hour,
            text: content
        }
        const findTime = planner.timeBlocks.findIndex(timeBlock => timeBlock.id == hour);

        if (findTime >= 0)
            planner.timeBlocks.filter(findTime, 1);
        planner.timeBlocks.push(hourEntry);
        localStorage.setItem(plannerKey, JSON.stringify(planner));
    });
});