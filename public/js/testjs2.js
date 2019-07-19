$(document).ready(function () {
    //    var testpassed = localStorage.getItem("storageName")
    var url = new URL(window.location.href);
    var testpassed = url.searchParams.get("endpoint");
        $.ajax({
            beforeSend: function (xhr) {
            if (typeof localStorage.getItem('token') !== "undefined" && localStorage.getItem('token') !== "" && localStorage.getItem('token') != null ) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
                }
              },
                url: testpassed,
            })
            .done(function (response) {
                $("#innername").html(response.name);
                $("#innerimg").attr("src","."+response.picture.url );
                $("#innertype").html(response.datetype);
                $("#innerdesc").html(response.description);
                $("#innercreated").html("Created: " +response.created_at);
                $("#innerupdated").html("Updated: " +response.updated_at);
                $("#innerapply").attr("href","mailto:"+response.email );
            });
    });
