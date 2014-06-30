    <!-- Page javascript files -->
    <script src="<?php echo base_url(JS."angular.min.js");?>"></script>
     <script src="<?php echo base_url(JS."ui-bootstrap-0.11.0.min.js");?>"></script>
    <script src="<?php echo base_url(JS."lodash.underscore.min.js");?>"></script>
    <script src="<?php echo base_url(JS."angular_species.js");?>"></script>
   <!-- <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&AMP;sensor=false"></script> -->
    <!--  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCotZjhwqwQ-4UjBvZHJNrQK0Yew5M2sOQ&sensor=true"></script> -->
    <!-- <script src="<?php echo base_url(JS."angular-google-maps.min.js");?>"></script> -->


   <!--container start-->
   <div class="container" ng-app="elsewebGUI">

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
        
        <div class="row experiment-row">
            <div class="col-md-8 col-lg-offset-2 gray-bg">
                <h4>Species</h4>
                <p>Select species</p>
                <form ng-controller="SpeciesController as speciesCtrl">
                    <div class="form-group">
                        <select  name="selectSpecimen" class="form-control blck-input">
                            <option ng-repeat="specimen in species" value="{{specimen.name.value}}">{{specimen.name.value}}</option>  
                        </select>
                    </div>
                </form>                  
             </div>   
        </div>
       
       <div class="row experiment-row">
           <div class="col-md-8 col-lg-offset-2 gray-bg">
               <h4>Data</h4>
               <p>Select up to 10 data sets</p>
               <div><button type="button" class="btn btn-purchase" >+ Add data set</button></div>
               <div class="eq-len">
                    <table class="table table-striped">
                        <thead>
                            <th>Start</th>   
                            <th>End</th>   
                            <th>Entity</th>   
                            <th>Characteristic</th>   
                            <th>Source</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input id="start[]" type="text" class="form-control" /></td>
                                <td><input id="end[]" type="text" class="form-control" /></td>
                                <td>
                                    <select  name="selectEntity" class="form-control blck-input">
                                        <option>-- select...</option>
                                    </select>
                                </td>
                                <td>
                                    <select  name="selectChar" class="form-control blck-input">
                                        <option>-- select...</option>
                                    </select>
                                </td>
                                <td>
                                    <select  name="selectSource" class="form-control blck-input">
                                        <option>-- select...</option>
                                    </select>
                                </td>
                                <td style='text-align:center; vertical-align: middle;'>
                                   <button type='button' class='btn btn-purchase btn-xs'><span class='glyphicon glyphicon-remove'></span></button> 
                                </td>
                            </tr>
                        </tbody>    
                    </table>
               </div>
           </div>
           
       </div>

        
    </div>    
    <!--container end-->
    

