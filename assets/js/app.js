 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAh3NyH2pmVuD-esw2_Zl2XExy7xdiJOH8",
    authDomain: "fir-extended-session-54c35.firebaseapp.com",
    databaseURL: "https://fir-extended-session-54c35.firebaseio.com",
    projectId: "fir-extended-session-54c35",
    storageBucket: "fir-extended-session-54c35.appspot.com",
    messagingSenderId: "184704892134"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref("/users").on("child_added", function(snapshot){
      console.log(snapshot.key);
      console.log(snapshot.val());
      var tr = $("<tr>").append(
          $("<th>").text(snapshot.key).attr("scope", "row"),
          $("<td>").text(snapshot.val().username),
          $("<td>").text(snapshot.val().favMovie)
      );
      $("tbody").append(tr);
  });

  $("#submit-user").on("submit", function(e){
        e.preventDefault();
        database.ref("/users").push({
            username: $("#user-name").val().trim(),
            favMovie: $("#fav-movie").val().trim()
        });
        $("#user-name").val("")
        $("#fav-movie").val("")
  });