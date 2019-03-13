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
      var btn = $("<button>");
      btn.attr("data-key", snapshot.key);
      btn.addClass("btn btn-danger delete-btn");
      btn.text("Delete");
      var tr = $("<tr>").append(
          $("<th>").text(snapshot.key).attr("scope", "row"),
          $("<td>").text(snapshot.val().username),
          $("<td>").text(snapshot.val().favMovie),
          $("<td>").html(btn)
      ).attr("id", snapshot.key);
      $("tbody").append(tr);
  });

database.ref("/users").on("child_removed", function(snapshot){
    console.log(snapshot.key);
    console.log(snapshot.val());
    $("#"+snapshot.key).remove();
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

  $(document).on("click", ".delete-btn", function(e){
      e.preventDefault();
      console.log($(this).attr("data-key"));
      var userKey = $(this).attr("data-key");
      // delete the record by key/id
      database.ref("/users").child(userKey).remove();
  });