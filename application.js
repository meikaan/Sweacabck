// TODO: Replace with your project's config object. You can find this
// by navigating to your project's console overview page
// (https://console.firebase.google.com/project/your-project-id/overview)
// and clicking "Add Firebase to your web app"
  var config = {
    apiKey: "AIzaSyBAo2ikrt0ngAgK9GsoZUs2j4JA9_ftWDs",
    authDomain: "sweaca-nursery.firebaseapp.com",
    databaseURL: "https://sweaca-nursery.firebaseio.com",
    projectId: "sweaca-nursery",
    storageBucket: "sweaca-nursery.appspot.com",
    messagingSenderId: "1018808263607"
  };

// Initialize your Firebase app
firebase.initializeApp(config);

// Reference to the users object in your Firebase database
var users = firebase.database().ref("users");

// Save a new user to the database, using the input in the form
var submitUser = function () {

  // Get input values from each of the form elements
  var username = $("#userName").val();
  var email = $("#userEmail").val();
  var link = $("#userLink").val();

  // Push a new user to the database using those values
  users.push({
    "username": username,
    "email": email,
    "link": link
  });
};

// Get the single most recent user from the database and
// update the table with its values. This is called every time the child_added
// event is triggered on the users Firebase reference, which means
// that this will update EVEN IF you don't refresh the page. Magic.
users.limitToLast(1).on('child_added', function(childSnapshot) {
  // Get the user data from the most recent snapshot of data
  // added to the users list in Firebase
  user = childSnapshot.val();

  // Update the HTML to display the user text
  $("#title").html(user.title)
  $("#presenter").html(user.presenter)
  $("#link").html(user.link)

  // Make the link actually work and direct to the URL provided
  $("#link").attr("href", user.link)
});

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
$(window).load(function () {

  // Find the HTML element with the id userForm, and when the submit
  // event is triggered on that element, call submitUser.
  $("#userForm").submit(submitUser);

});