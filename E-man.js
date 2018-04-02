 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAmyfBh_iUuUqp_QvyBa8IAvgXZJeCUWWI",
    authDomain: "train-scheduler-e7ae0.firebaseapp.com",
    databaseURL: "https://train-scheduler-e7ae0.firebaseio.com",
    projectId: "train-scheduler-e7ae0",
    storageBucket: "train-scheduler-e7ae0.appspot.com",
    messagingSenderId: "22589334577"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $(".submit").on("click", function(event) {
   event.preventDefault();
    var trainName = $("#trainname").val().trim();
    var destination = $("#trainDestination").val().trim();
    var firstTrainTime = $("#traintime").val().trim();
    var frequency = $("#trainFrequency").val().trim();
    console.log(trainName)
    console.log(destination)
    console.log(firstTrainTime)
    console.log(frequency)

    newTrain = {
      name: trainName,
      destination: destination,
      time: firstTrainTime,
      frequency: frequency
    }
    console.log(newTrain)

   database.ref().push(newTrain);

  })

  database.ref().on("child_added", function(snapshot, prevKey) {

    trainName = snapshot.val().name;
    destination = snapshot.val().destination;
    firstTrainTime = snapshot.val().time;
    frequency = snapshot.val().frequency;
    
    var convertedDate = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var newTrainTime = moment(convertedDate).format("HH:mm");
    var current = moment();
    var conversionTwo = moment(newTrainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(conversionTwo), "minutes");
    var remainder = diffTime % frequency;
    var minutesAway = frequency - remainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("h:mm a");
    console.log(nextArrival)



   $(".table>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  })

  //Erik's reload function
  setInterval(function(){
    location.reload();
  }, 6000)


