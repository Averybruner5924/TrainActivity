var config = {
    apiKey: "AIzaSyAC3nKkhBUa4Eg4boAyYXRvRJVWmU-FITI",
    authDomain: "trainactivity-289b4.firebaseapp.com",
    databaseURL: "https://trainactivity-289b4.firebaseio.com",
    projectId: "trainactivity-289b4",
    storageBucket: "",
    messagingSenderId: "411131617770"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var desination = "";
  var startTime = "";
  var frequency = "";

  // Capture Button Click
  $("#add-user").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#train-name").val().trim();
    desination = $("#desination").val().trim();
    startTime = $("#start-time").val().trim();
    frequency = $("#frequency").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      desination: desination,
      startTime: startTime,
      frequency: frequency,
    });

  });

  database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(childSnapshot) {
     // storing the snapshot.val() in a variable for convenience

     var tFrequency = frequency;

     var firstTime = moment.duration(startTime).asMinutes(); 

    // Current Time

    console.log("Time in Hours " + firstTime);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     
     
     var nextArrival = nextArrival;
     var minutesAway = tMinutesTillTrain;

   $("#full-table").append("<tr> " +
       " <td> " + childSnapshot.val().trainName +
       " </td><td> " + childSnapshot.val().desination +
       " </td><td> " + childSnapshot.val().frequency +
       " </td><td> " + nextArrival +
       " </td><td> " + minutesAway + " </tr>");


     // Handle the errors
   }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
   });