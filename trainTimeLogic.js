  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEKw09IoohKt3agTL1slkB2I-Dv_rfG7Y",
    authDomain: "train-scheduler-29f9e.firebaseapp.com",
    databaseURL: "https://train-scheduler-29f9e.firebaseio.com",
    projectId: "train-scheduler-29f9e",
    storageBucket: "train-scheduler-29f9e.appspot.com",
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
database.ref().on("child_added", function (snapshot, prevChildKey) {

    console.log(snapshot.val());

    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var firstTrain = snapshot.val().train;
    var trainFrequency = snapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);

    // Prettify the train start
    var trainStartPretty = moment.unix(firstTrain).format("HH:mm a");
    var trainTime = moment().diff(moment.unix(firstTrain, "X"), "HH:mm");
    var divided = trainTime / trainFrequency;

    console.log("here is trainTime " + divided);

    var firstTimeConverted = moment(ttime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log("Remainder: " + tRemainder);

    // Minutes Away
    var minutesAway = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train Arrival
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));



    // Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
trainStartPretty + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});
