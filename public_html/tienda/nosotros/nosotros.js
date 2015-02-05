app.controller("NosotrosController", function MainController() {

        var myOptions = {
            zoom: 17,
            center: new google.maps.LatLng(39.4806984, -0.4230923000000075),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
        marker = new google.maps.Marker({map: map, position: new google.maps.LatLng(39.4806984, -0.4230923000000075)});
        infowindow = new google.maps.InfoWindow({content: "<b>CyCy Corporation</b><br/>Calle de la piruleta<br/>Pais de la gominola"});
        google.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
        });
        infowindow.open(map, marker);

    });