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

     var nextArrival
     var minutesAway

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