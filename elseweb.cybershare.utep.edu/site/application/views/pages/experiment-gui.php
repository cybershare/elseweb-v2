    <!-- Page javascript files -->
    <script src="<?php echo base_url(JS."angular.min.js");?>"></script>
    <script src="<?php echo base_url(JS."lodash.underscore.min.js");?>"></script>
   <!-- <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&AMP;sensor=false"></script> -->
    <!--  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCotZjhwqwQ-4UjBvZHJNrQK0Yew5M2sOQ&sensor=true"></script> -->
    <!-- <script src="<?php echo base_url(JS."angular-google-maps.min.js");?>"></script> -->


   <!--container start-->
    <div class="container">

        <div class="row">
            <!--feature start-->
            <div class="text-center feature-head">
                <h2>Experiment GUI</h2>
            </div>
            <!--feature end-->     
        </div>
        
        <div class="row">
            <div class="col-md-8 col-lg-offset-2 gray-bg" style="padding-bottom: 15px; border-radius: 3px;">
                <h4>Region</h4>
                <p>Enter coordinates or drag point in map to set bounding box for the experiment.
                   Coordinates will update on mouse out event on rectangle layer.</p>
                <input id="boundsText" class="form-control" placeholder= "e.g. 50, -65.123, 23, -126 (N, E, S, W) (Press the 'TAB' key)" type="text"/>
                <div class="no-data alert alert-danger">No data available. Please Change coordinates</div>
                <div class="data-available alert alert-success">Data Available</div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-8 col-lg-offset-2 gray-bg" style="padding-bottom: 15px; border-radius: 3px;">
                <!--google map start-->
                <div class="contact-map">
                    <div id="map-canvas"></div>
                </div>
                 <!--google map end-->  
            </div>     
            
        </div>
        

        
        
        
    </div>    
    <!--container end-->
    

