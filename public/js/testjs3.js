$(document).ready(function () {
  $("#submitbutton").click(function (e) {
    var identifier = $("#email").val();
    var pass = $("#pass").val();
    e.preventDefault();
    $.ajax({
      url: "http://localhost:1337/auth/local",
      type: 'POST',
      data: {
        "identifier": identifier,
        "password": pass
      },
      dataType: 'json',
    }).done(function (response) {
      localStorage.setItem('token', response.jwt);
      window.location.replace("indexwidgets.html");
    }).fail(function (response) {
      alert((response.responseText));
    });
  });
});
