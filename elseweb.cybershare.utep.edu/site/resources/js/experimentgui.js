
//Global Variables
var rectangle, map, infoWindow, infoWindowBox;
var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(0, 0), new google.maps.LatLng(0, 0)); 
var north = [];
var east = [];
var south = [];
var west = [];
var url = "http://visko.cybershare.utep.edu/sparql?default-graph-uri=&query=";
var sw, ne, nw, se;
var userBounds, boundsArray;

var entURL;


      //google map
      function initialize() {
          $( ".no-data" ).hide();
          $( ".data-available" ).hide();
          var myLatlng = new google.maps.LatLng(0, 0);
          var mapOptions = {
              zoom: 2,
              center: myLatlng,
              mapTypeId: google.maps.MapTypeId.SATELLITE
          }
          var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          
          // Define the rectangle (bounding box) and set its editable property to true.
	  rectangle = new google.maps.Rectangle({
			bounds: bounds,
			editable: true,
			draggable: true,
			fillColor: '#FF9900',
			fillOpacity: .5,
			strokeColor: '#FF9900',
			strokeWeight: 1,
			strokeOpacity: 1
	  });
	  rectangle.setMap(map);
          
	   // Define an info window on the map.
	   infoWindow = new google.maps.InfoWindow();
	   infoWindowBox = new google.maps.InfoWindow();
           

         // Add an event listener on the rectangle.
	  google.maps.event.addListener(rectangle, 'mouseout', showNewRect);
                    

      }
      google.maps.event.addDomListener(window, 'load', initialize);

	// Show the new coordinates for the rectangle in an info window and textbox
	// @this {google.maps.Rectangle} 
	function showNewRect(event) {
		ne = rectangle.getBounds().getNorthEast();
		sw = rectangle.getBounds().getSouthWest();
		nw = new google.maps.LatLng(ne.lat(), sw.lng());
		se = new google.maps.LatLng(sw.lat(), ne.lng());
		north[0] = ne.lat();
		east[0] = ne.lng();
		south[0] = sw.lat();
		west[0] = sw.lng();
		
		var textboxString = north[0] + ', ' + east[0] + ', ' + south[0] + ', ' + west[0];
		
                
		entURL = url + "prefix+elseweb-data%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0D%0Aprefix+elseweb-edac%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-edac.owl%23%3E%0D%0Aselect+distinct+%3Fentity%0D%0Afrom+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Fedac%2Fservices%2Fwcs-services.owl%3E%0D%0Awhere%0D%0A%7B%0D%0A%3Fdataset+elseweb-data%3AcoversRegion+%3Fregion.%0D%0A%3Fregion+elseweb-data%3AhasLeftLongitude+%3Fllon.%0D%0A%3Fregion+elseweb-data%3AhasRightLongitude+%3Frlon.%0D%0A%3Fregion+elseweb-data%3AhasLowerLatitude+%3Fllat.%0D%0A%3Fregion+elseweb-data%3AhasUpperLatitude+%3Fulat.%0D%0Afilter%28%3Fllon+%3C%3D+"
					+ west[0] + 
					"%29%0D%0Afilter%28%3Frlon+%3E%3D+"
					+ east[0] + 
					"%29%0D%0Afilter%28%3Fllat+%3C%3D+"
					+ south[0] +
					"%29%0D%0Afilter%28%3Fulat+%3E%3D+"
					+ north[0] + 
					"%29%0D%0A%3Fdataset+elseweb-data%3AhasDataBand+%3Fband.%0D%0A%3Fband+elseweb-data%3ArepresentsEntity+%3Fentity.%0D%0A%0D%0A%7D%0D%0A&format=application%2Fjson&timeout=0&debug=on&callback?";
			
		document.getElementById("boundsText").value = textboxString;
		
		//Request to check if there is any data in the selected region using the entity query URL and display infoWindow in the map.
		$.ajax({  
			type: "GET",
			url: entURL,  
			dataType: "jsonp",  
			success: function(data) { 
				if(data.results.bindings == ""){
					$( ".data-available" ).slideUp( "slow", function() {
                                            // Animation complete.
                                         });
					 $( ".no-data" ).slideDown( "slow", function() {
                                            // Animation complete.
                                         });
				}
				else{
                                        $( ".no-data" ).slideUp( "slow", function() {
                                            // Animation complete.
                                         });
					$( ".data-available" ).slideDown( "slow", function() {
                                            // Animation complete.
                                         });
				}			
			}  
		}); 
	}
	
	//gets user input and creates a rectangle with given bounds (buggy needs remaking)
	function changeBounds(){
		userBounds = document.getElementById("boundsText").value;
		boundsArray = userBounds.split(",");
			north  = boundsArray[0];
			east   = boundsArray[1];
			south  = boundsArray[2];
			west   = boundsArray[3];
		
		bounds = new google.maps.LatLngBounds(
			 new google.maps.LatLng(south, west),
			 new google.maps.LatLng(north, east)
		);
		initialize();
	}
        
   
        