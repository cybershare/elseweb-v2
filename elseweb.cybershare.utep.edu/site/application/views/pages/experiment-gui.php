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
      
       <div class="row" ng-controller="PanelController as panel">
        
           <div class="col-md-7 gray-bg">
                <div class="tab-panel" ng-show="panel.isSelected(1)"> 
                     <div class="row">
                          <div class="col-md-12 gray-bg" style="padding-bottom: 15px; border-radius: 3px;">
                              <h4>Region</h4>
                              <p>Enter coordinates or drag point in map to set bounding box for the experiment.
                                 Coordinates will update on mouse out event on rectangle layer.</p>
                              <input ng-model="experiment.coordinates" id="boundsText" class="form-control" placeholder= "e.g. 50, -65.123, 23, -126 (N, E, S, W) (Press the 'TAB' key)" type="text"/>
                              <div class="no-data alert alert-danger">No data available. Please Change coordinates</div>
                              <div class="data-available alert alert-success">Data Available</div>
                          </div>
                      </div>

                      <div class="row">
                          <div class="col-md-12 gray-bg" style="padding-bottom: 15px; border-radius: 3px;">
                              <!--google map start-->
                              <div class="contact-map">
                                  <div id="map-canvas"></div>
                              </div>
                               <!--google map end-->  
                          </div>     
                      </div>
                </div>   

                <div class="tab-panel" ng-show="panel.isSelected(2)">
                     <div class="row experiment-row">
                         <div class="col-md-12  gray-bg">
                             <h4>Species</h4>
                             <p>Select species</p>
                             <form ng-controller="SpeciesController as speciesCtrl">
                                 <div class="form-group">
                                     <select ng-model="experiment.species" name="selectSpecimen" class="form-control blck-input">
                                         <option ng-repeat="specimen in species" value="{{specimen.name.value}}">{{specimen.name.value}}</option>  
                                     </select>
                                 </div>
                             </form>                  
                          </div>   
                     </div>
                </div>    

                <div class="tab-panel" ng-show="panel.isSelected(3)"> 
                     <div class="row experiment-row" ng-controller="DataController as dataCrtl">
                         <div class="col-md-12 gray-bg">
                             <h4>Data</h4>
                             <p class="">Select up to 10 data sets</p>
                             <div><button ng-click="dataCrtl.addDataSet()" type="button" class="btn btn-purchase" >+ Add data set</button></div>
                             <div class="eq-len">
                                  <table id="dataInputs" class="table table-striped">
                                      <thead>
                                          <th>Start</th>   
                                          <th>End</th>   
                                          <th>Entity</th>   
                                          <th>Characteristic</th>   
                                          <th>Source</th>
                                      </thead>
                                      <tbody>
                                          <!-- Dynamic rows will be added here -->
                                      </tbody>    
                                  </table>
                             </div>
                         </div>
                     </div>
                </div>    

                <div class="tab-panel" ng-show="panel.isSelected(4)">
                     <div class="row experiment-row"> 
                         <div class="col-md-12 gray-bg">
                             <h4>Algorithm</h4>
                             <p>Select algorithm and modify parameters' values (default value shown)</p>
                             <div class="col-md-2" style="vertical-align: text-bottom">
                                  <h5>Algorithm:</h5>
                             </div>  
                             <div class="col-md-10">
                                  <form ng-controller="AlgorithmController as algorithmCrtl">
                                       <div class="form-group">
                                           <select  name="selectAlgorithm" class="form-control blck-input">
                                               <option>----------- please select -----------</option>  
                                                <option ng-repeat="algorithm in algorithms" value="{{algorithm.algorithmName.value}}">{{algorithm.algorithmName.value}}</option>  
                                           </select>
                                       </div>
                                   </form> 
                             </div>
                             <div class="eq-len">
                                  <table id="algorithmParams" class="table table-striped">
                                      <thead>
                                          <th>Parameter</th>   
                                          <th>Value</th>   
                                          <th>Min</th>   
                                          <th>Max</th>   
                                          <th>Type</th>
                                      </thead>
                                      <tbody>
                                          <!-- Dynamic rows will be added here -->
                                      </tbody>    
                                  </table>
                             </div>
                         </div>
                     </div>
                </div>  
            

                <div class="row experiment-row">
                    <div class="col-md-12 gray-bg" style="margin-bottom: 10px">
                        <section class="tab-menu">
                            <ul class="nav nav-pills">
                                <li ng-class="{ active: panel.isSelected(1) }">
                                    <a href ng-click="panel.selectTab(1)">Region</a>
                                </li>
                                <li ng-class="{ active: panel.isSelected(2) }">
                                    <a href ng-click="panel.selectTab(2)">Species</a>
                                </li>
                                <li ng-class="{ active: panel.isSelected(3) }">
                                    <a href ng-click="panel.selectTab(3)">Datasets</a>
                                </li>
                                <li ng-class="{ active: panel.isSelected(4) }">
                                    <a href ng-click="panel.selectTab(4)">Algorithm</a>
                                </li>
                                <li ng-class="{ active: panel.isSelected(5) }">
                                    <a href ng-click="panel.selectTab(5)">Submit</a>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>    
           </div>
           
           <div class="col-md-4 gray-bg col-md-push-1">
               <h4>Experiment Summary</h4>
               <p>Region Bounds: <span ng-bind="experiment.coordinates"></span> </p>
               <p>Species: <span ng-bind="experiment.species"></span></p>
               <p>Datasets:<span> 0 </span></p>
               <p>Algorithm:<span> Not Selected </span></p>
               
           </div>
           
           
       </div>    
        
    </div>    
    <!--container end-->
    

