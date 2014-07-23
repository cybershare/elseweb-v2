    <!-- Page javascript files -->
    <script src="<?php echo base_url(JS."JSLINQ.js");?>"></script>
    <script src="<?php echo base_url(JS."angular.min.js");?>"></script>
    <script src="<?php echo base_url(JS."ui-utils.min.js");?>"></script>
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
                              <input ng-model="experiment.coordinates" disabled="true" id="boundsText" class="form-control" placeholder= "e.g. 50, -65.123, 23, -126 (N, E, S, W) (Press the 'TAB' key)" type="text"/>
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
                             <div><button ng-click="dataCrtl.addDataSetBeta()" type="button" class="btn btn-purchase" >+ Add data set</button></div>
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
                                          <tr ng-repeat = "dataset in datasets" >
                                              <td><input ng-model="dataset.start" class="form-control blck-input datepicker" type="text" placeholder="{{dataset.start}}" /></td>
                                              <td><input ng-model="dataset.end" class="form-control blck-input datepicker" type="text" placeholder="{{dataset.end}}" /></td>
                                              <td>
                                                  <select ng-options="e.entity.value.slice(59) for e in entities | unique:'entity.value'" ng-model="dataset.entity" class="form-control blck-input selEnt">
                                                      <option style="display:none" value="">select...</option>
                                                  </select>
                                              </td>
                                              <td>
                                                  <select ng-options="e.char.value.slice(59) for e in entities" ng-model="dataset.characteristic" class="form-control blck-input selEnt">
                                                      <option style="display:none" value="">select...</option>
                                                  </select>                                                  
                                              </td>
                                              <td>
                                                  <select ng-options="e.source.value.slice(59) for e in entities" ng-model="dataset.source" class="form-control blck-input selEnt">
                                                      <option style="display:none" value="">select...</option>
                                                  </select>                                                                                   
                                              </td>
                                              <td style="text-align:center; vertical-align: middle;">
                                                  <button type="button" class="btn btn-purchase btn-xs"><span ng-click="dataCrtl.deleteDataset(dataset)" class="glyphicon glyphicon-remove"></span></button>
                                              </td>
                                              
                                          </tr>
                                      </tbody>    
                                  </table>
                             </div>
                         </div>
                     </div>
                </div>    

                <div class="tab-panel" ng-show="panel.isSelected(4)">
                     <div class="row experiment-row" ng-controller="AlgorithmController as algorithmCrtl"> 
                         <div class="col-md-12 gray-bg">
                             <h4>Algorithm</h4>
                             <p>Select algorithm and modify parameters values (default value shown)</p>
                             <div class="col-md-2" style="vertical-align: text-bottom">
                                  <h5>Algorithm:</h5>
                             </div>  
                             <div class="col-md-10">
                                  <form>
                                       <div class="form-group">
                                           <select  ng-model="experiment.algorithm" ng-change="algorithmCrtl.populateParameter()" ng-click="algorithmCtrl.populateParameter()" name="selectAlgorithm" class="form-control blck-input">
                                                <option ng-repeat="algorithm in algorithms" value="{{algorithm.algorithmURI.value}}">{{algorithm.algorithmName.value}}</option>  
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
                                          <tr ng-repeat = "row in filteredparams.items">
                                              <td>{{row.paramName.value}}</td>       
                                              <td> 
                                                  <input class="form-control blck-input" type="number" min="{{row.minimos.value}}" max="{{row.maximos.value}}"
                                                         ng-model="row.default.value" placeholder="{{row.default.value}}"/>
                                              </td>  
                                              <td>{{row.minimos.value}}</td>  
                                              <td>{{row.maximos.value}}</td>  
                                              <td>{{row.datatype.value.slice(33)}}</td>  
                                          </tr>
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
               <p><b>Region Bounds: </b><span ng-bind="experiment.coordinates"></span> </p>
               <p><b>Species: </b><span ng-bind="experiment.species"></span></p>
               <p><b>Datasets: </b><span></span></p>
               <p><b>Algorithm: </b><span ng-bind="experiment.algorithm.slice(79)"></span></p>   
               <div class="eq-len">
                    <table id="algorithmParamsSummary" class="table table-striped">
                            <thead>
                                <th>Parameter</th>   
                                <th>Value</th>   
                            </thead>
                            <tbody>
                                <tr ng-repeat = "row in filteredparams.items">
                                    <td>{{row.paramName.value}}</td>       
                                    <td>{{row.default.value}}</td>  
                                </tr>
                            </tbody>    
                    </table>
             </div>
           </div>
 
       </div>    
        
    </div>    
    <!--container end-->
    

