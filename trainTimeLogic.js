// Initialize Firebase
var config = {
    apiKey: "AIzaSyDEKw09IoohKt3agTL1slkB2I-Dv_rfG7Y",
    authDomain: "train-scheduler-29f9e.firebaseapp.com",
    databaseURL: "https://train-scheduler-29f9e.firebaseio.com",
    projectId: "train-scheduler-29f9e",
    storageBucket: "",
    messagingSenderId: "286120639896"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        train: firstTrain,
        frequency: trainFrequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.train);
    console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainInput").val("");
    $("#frequencyInput").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
    // <------------------------------ediiiiiiiit --------------------------------------->
    // Train Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("HH:mm a");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
        empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case