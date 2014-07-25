/*
 * @author Luis Garnica - Code refactoring and angular wrap up.
 * @acknowledgements: Lilian - Initial developer.
 * Framework: Angular JS
 * Module Description: Google Map API wrap up on Angular JS. 
 *                     Implemented on Region Panel for the Elseweb Experiment GUI
 * View: experiment-gui.php (see file head for js dependencies)
 */


(function (){
    /* Module inherited to elsewebGUI module */
    var app = angular.module ('region-ui', []);
  
    app.controller('RegionController', ['$http' , '$scope', function($http, $scope){
        var rectangle;
        var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(0, 0), new google.maps.LatLng(0, 0)); 
        var url_visko = "http://visko.cybershare.utep.edu/sparql?default-graph-uri=&query=";
        var callback_visko = "&callback=JSON_CALLBACK";
        var north, east, south, west;
        var sw, ne, nw, se;
        var entURL;
         
         //Hide data notification messages
         $( ".no-data" ).hide();
         $( ".data-available" ).hide();  
            
         //Render Google Maps Tool   
         $scope.initialize = function (){
            var myLatlng = new google.maps.LatLng(0, 0);
            var mapOptions = {
              zoom: 2,
              center: myLatlng,
              mapTypeId: google.maps.MapTypeId.SATELLITE
            };
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
          
            // Add an event listener on the rectangle.
            google.maps.event.addListener(rectangle, 'mouseout', $scope.showNewRect);
        };
        
        google.maps.event.addDomListener(window, 'load', $scope.initialize); 
        
	//Update the rectangle
        $scope.showNewRect = function(event) {
		ne = rectangle.getBounds().getNorthEast();
		sw = rectangle.getBounds().getSouthWest();
		nw = new google.maps.LatLng(ne.lat(), sw.lng());
		se = new google.maps.LatLng(sw.lat(), ne.lng());
		north = ne.lat();
		east = ne.lng();
		south = sw.lat();
		west = sw.lng();
		
		var textboxString = north + ', ' + east + ', ' + south + ', ' + west;
		
		entURL = "prefix+elseweb-data%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0D%0Aprefix+elseweb-edac%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-edac.owl%23%3E%0D%0Aselect+distinct+%3Fentity%0D%0Afrom+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Fedac%2Fservices%2Fwcs-services.owl%3E%0D%0Awhere%0D%0A%7B%0D%0A%3Fdataset+elseweb-data%3AcoversRegion+%3Fregion.%0D%0A%3Fregion+elseweb-data%3AhasLeftLongitude+%3Fllon.%0D%0A%3Fregion+elseweb-data%3AhasRightLongitude+%3Frlon.%0D%0A%3Fregion+elseweb-data%3AhasLowerLatitude+%3Fllat.%0D%0A%3Fregion+elseweb-data%3AhasUpperLatitude+%3Fulat.%0D%0Afilter%28%3Fllon+%3C%3D+"
					+ west + 
					"%29%0D%0Afilter%28%3Frlon+%3E%3D+"
					+ east + 
					"%29%0D%0Afilter%28%3Fllat+%3C%3D+"
					+ south +
					"%29%0D%0Afilter%28%3Fulat+%3E%3D+"
					+ north + 
					"%29%0D%0A%3Fdataset+elseweb-data%3AhasDataBand+%3Fband.%0D%0A%3Fband+elseweb-data%3ArepresentsEntity+%3Fentity.%0D%0A%0D%0A%7D%0D%0A&format=application%2Fjson&timeout=0&debug=on&callback?";
			
                $scope.experiment.coordinates = textboxString;
		
		//Request to check if there is any data in the selected region using the entity query URL and display message box.
               $http.jsonp(url_visko+entURL+callback_visko).success(function(data){
                    if(data.results.bindings == ""){
			$( ".data-available" ).slideUp( "slow", function() {});
			$( ".no-data" ).slideDown( "slow", function() {});
	             }
		     else{
                        $( ".no-data" ).slideUp( "slow", function() {});
                        $( ".data-available" ).slideDown( "slow", function() {});
		     }                  
                });
            
	     };
             
             //For future implementation, have to apply tab key event on text field to invoque this function.
             this.changeBounds = function(){
		userBounds = $scope.experiment.coordinates;
		boundsArray = userBounds.split(",");
			north  = boundsArray[0];
			east   = boundsArray[1];
			south  = boundsArray[2];
			west   = boundsArray[3];
		
		bounds = new google.maps.LatLngBounds(
			 new google.maps.LatLng(south, west),
			 new google.maps.LatLng(north, east)
		);
		$scope.initialize();
	   };
        
        
    }]); //end controller
 
})(); //app end


