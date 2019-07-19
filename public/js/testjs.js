var a = 0;

function myFunction(aaa) {
  location.href = 'detail.html' + '?endpoint=' + aaa;
}
$(document).ready(function () {
  var urls = [];
  var url1 = "http://localhost:1337/jobs/";
  var url2 = "http://localhost:1337/seretjobs/";
  urls.push(url1);
  urls.push(url2);
  for (var jj = 0; jj < urls.length; jj++) {
    $.ajax({
        beforeSend: function (xhr) {
          if (typeof localStorage.getItem('token') !== "undefined" && localStorage.getItem('token') !== "" && localStorage.getItem('token') != null) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
          }
        },
        url: urls[jj],
      })
      .done(function (response) {
        for (var i = 0; i < response.length; i++) {
          let widget = '<div class="card" id=' + this.url + response[i].id + ' onclick = "myFunction(this.id);"><div class="card-header ch2">' + '<img src=.' + response[i].picture.url + ' width="300">' + '</div><div class="card-body"><div class="card-title">' + response[i].name + '</div><div class="card-sub-title">' + response[i].datetype + '</div><div class="card-desc">' + response[i].created_at + '</div><div class="card-desc">' + response[i].updated_at + '</div></div></div>';
          $(widget).clone(true, true).appendTo($('#testing'));
        }
      }).fail(function (xhr) {
        if (xhr.status == 401) {
            if (localStorage.getItem('token') !== ""){
          alert("your session expired, log in again to continue in authenticated mode");
          localStorage.setItem('token', "");
        }
          $.ajax(this)
          .done(function (response) {
            for (var i = 0; i < response.length; i++) {
              let widget = '<div class="card" id=' + this.url + response[i].id + ' onclick = "myFunction(this.id);"><div class="card-header ch2">' + '<img src=.' + response[i].picture.url + ' max-width="200">' + '</div><div class="card-body"><div class="card-title">' + response[i].name + '</div><div class="card-sub-title">' + response[i].datetype + '</div><div class="card-desc">' + response[i].created_at + '</div><div class="card-desc">' + response[i].updated_at + '</div></div></div>';
              $(widget).clone(true, true).appendTo($('#testing'));
            }
          });

          return;
        }
      });
  }
  $("#logouttt").click(function (e) {
    localStorage.setItem('token', "");
    window.location.replace("indexwidgets.html");
  });
});
