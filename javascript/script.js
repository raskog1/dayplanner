let startDay = 6;
let endDay = 18;
let appointments = [];

// Populates current date at top of the planner
$("#currentDay").text((moment().format("dddd")) + ", " + (moment().format("MMM Do YYYY")));

// Populates scheduling page with all elements
$(document).ready(function () {

    // Add all timeblock divs with included assignments/buttons
    for (i = startDay; i < endDay; i++) {

        // Create column to display times throughout the day
        let timeBlock = $("<div>").addClass("row");
        $(".container").append(timeBlock);

        let timeStamp = $("<div>").addClass("col-1 hour");

        // Time display formatting
        if (i > 12) {
            timeStamp.text((i - 12) + "pm");
        } else if (i == 12) {
            timeStamp.text("12pm");
        } else {
            timeStamp.text(i + "am");
        }

        // Create a text input column
        let textBox = $("<textarea>").addClass("col-10 time-block").attr("id", i);

        // Color code the text boxes
        if (i == currentHour()) {
            textBox.addClass("present").removeClass("past future");
        } else if (i > currentHour()) {
            textBox.addClass("future").removeClass("past present");
        } else {
            textBox.addClass("past").removeClass("present future");
        }

        // Create a save button column
        let saveBtn = $("<div>").addClass("col-1 saveBtn");

        $(timeBlock).append(timeStamp, textBox, saveBtn);

        // Create a save icon within the button
        let saveIcon = $("<i>");
        saveIcon.addClass("far fa-save fa-2x saveIcon").attr("id", i);
        $(saveBtn).append(saveIcon);
    }

    // Identifies row in which save was clicked, writes to local storage
    $(".saveIcon").on("click", function () {

        let saveLocation = $(this).attr("id");
        let saveText = document.getElementById(saveLocation).value;

        if (saveText == "") {
        } else {
            let userContent = {
                location: saveLocation,
                content: saveText
            }

            // Cleans array of multiple entries for one location
            for (i = 0; i < appointments.length; i++) {
                if (userContent.location == appointments[i].location) {
                    appointments.splice(i, 1);
                }
            }

            appointments.push(userContent);
            localStorage.setItem("appointments", JSON.stringify(appointments));
        }
        console.log(appointments);
    });

    // Pulls appointments array from local storage and repopulates the page
    if (window.localStorage.length == 0) {
    } else {
        appointments = JSON.parse(localStorage.getItem("appointments"));
        for (i = 0; i < appointments.length; i++) {
            let spotMe = appointments[i].location;
            let populateAppt = document.getElementById(spotMe);
            populateAppt.value = appointments[i].content;
        }
        console.log(appointments);
    }
});

// Get the current hour
function currentHour() {
    let date = new Date();
    let hour = date.getHours();
    return hour;
}


