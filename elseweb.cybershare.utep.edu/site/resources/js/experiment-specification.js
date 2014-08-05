/*
 * @author Luis Garnica
 * Framework: Angular JS
 * Module Description: Experiment specification assembly factory.
 * View: experiment-gui.php (see file head for js dependencies)
 */

(function(){
    /* Module inherited to elsewebGUI module */ 
    var app = angular.module('spec-factory', []);
    
    /* Global Variables */
    var url_visk = "http://visko.cybershare.utep.edu/sparql?default-graph-uri=&query=";    
    var callback_visk = "&callback=JSON_CALLBACK";
    
    app.controller('SubmissionController', ['$http' , '$scope', '$rootScope', function($http, $scope, $rootScope){
            
        this.processAssemble = function (){
            middleNoty('information', 'Processing Parameters...');
            $.blockUI({ message: null });
            this.getOcurrence();
            this.getDatasets();
        };    
         
        this.getOcurrence = function (){
            specimen = "\""+$scope.experiment.species+"\"^^<http://www.w3.org/2001/XMLSchema";
            var ocurrenceQuery = "prefix%20lifemapper%3A%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper.owl%23%3E%0Aprefix%20data%3A%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0A%0Aselect%20%3Fid%0Afrom%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Flifemapper%2Foccurrences%2Fspecies-occurrences.owl%3E%0Awhere%7B%0A%3Fdataset%20a%20lifemapper%3ASpeciesOccurrenceDataset.%0A%3Fdataset%20data%3AhasLayer%20%3Flayer.%0A%3Fdataset%20data%3AhasManifestation%20%3Fmanif.%0A%3Fmanif%20data%3AhasFileDownloadURL%20%3FfileURL.%0A%3Fmanif%20data%3AhasLandingPageURL%20%3FmetadataURL.%0A%3Flayer%20data%3AcontainsFeatureSet%20%3Fset.%0A%3Fset%20a%20lifemapper%3ASpeciesOccurrenceSet.%0A%3Fset%20lifemapper%3AhasOccurrenceSetID%20%3Fid.%0A%3Fset%20lifemapper%3AhasOccurrenceOfSpecies%20%3Fspecies.%0A%3Fspecies%20lifemapper%3AhasGenusName%20"+specimen+"%23string%3E.%0A%7D&format=application%2Fjson";
            $http.jsonp(url_visk+ocurrenceQuery+callback_visk).success(function(data){
                $scope.ocurrence = [];
                $scope.ocurrence = data.results.bindings;
                //alert(JSON.stringify($scope.ocurrence));
            }).error(function(data){
                $.unblockUI();
                $.noty.closeAll(); 
                topNoty('error', 'Error retrieving species ocurrence id, try again later!');
            });
        }; 
        
        this.getDatasets = function () {
            for (dataset in $scope.datasets){
                var start = $scope.datasets[dataset].start;
                var end = $scope.datasets[dataset].end;
                var entity = $scope.datasets[dataset].entity;
                var characteristic = $scope.datasets[dataset].characteristic;
                var source = $scope.datasets[dataset].source;
                
                datasetQuery = this.getDatasetQuery(start, end, entity, characteristic, source);
                
                $http.jsonp(url_visk+datasetQuery+callback_visk).success(function(data){
                    $scope.datasetURI = [];
                    $scope.datasetURI  = data.results.bindings;
                    $scope.assembleExperiment();   //call to assemble the experiment
            }).error(function(data){
                $.unblockUI();
                $.noty.closeAll(); 
                topNoty('error', 'Error retrieving datasets, try other parameters!');
            });
                
            }
            //alert(JSON.stringify($scope.datasets));   //For debugging
        };
        
        this.getDatasetQuery = function (start, end, entity, characteristic, source) {
            userBounds = $scope.experiment.coordinates;
	    boundsArray = userBounds.split(",");
	    north  = boundsArray[0];
	    east   = boundsArray[1];
	    south  = boundsArray[2];
	    west   = boundsArray[3];
            
            var  datasetQuery = "define%20input%3Ainference%20%22http%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Fmappings%2Felseweb-mappings.owl%22%0Aprefix%20elseweb-data%3A%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0Aprefix%20elseweb-edac%3A%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-edac.owl%23%3E%0Aprefix%20provo%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A%0Aselect%20distinct%20%3Fdataset%20%3Fmetadata%0Afrom%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Fedac%2Fservices%2Fwcs-services.owl%3E%0Awhere%0A%7B%0A%3Fdataset%20elseweb-data%3AcoversRegion%20%3Fregion.%0A%3Fregion%20elseweb-data%3AhasLeftLongitude%20%3Fllon.%0A%3Fregion%20elseweb-data%3AhasRightLongitude%20%3Frlon.%0A%3Fregion%20elseweb-data%3AhasLowerLatitude%20%3Fllat.%0A%3Fregion%20elseweb-data%3AhasUpperLatitude%20%3Fulat.%0A%0Afilter(%3Fllon%20%3C%3D%20"+west+")%0Afilter(%3Frlon%20%3E%3D%20"+east+")%0Afilter(%3Fllat%20%3C%3D%20"+south+")%0Afilter(%3Fulat%20%3E%3D%20"+north+")%0A%0A%0A%3Fdataset%20elseweb-data%3AcoversTimePeriod%20%3Fperiod.%0A%3Fperiod%20elseweb-data%3AhasStartDate%20%3FstartDate.%0A%3Fperiod%20elseweb-data%3AhasEndDate%20%3FendDate.%0A%0A%3FstartDate%20elseweb-data%3AhasDateTime%20%3FsDate.%0A%3FendDate%20elseweb-data%3AhasDateTime%20%3FeDate.%0A%0Afilter(%3FsDate%20%3E%3D%20%22"+start+"%22%5E%5Exsd%3Adate)%0Afilter(%3FeDate%20%3C%3D%20%22"+end+"%22%5E%5Exsd%3Adate)%20%0A%0A%3Fdataset%20elseweb-data%3AhasDataBand%20%3Fband.%0A%3Fdataset%20elseweb-data%3AhasManifestation%20%3Fmanifest.%0A%3Fmanifest%20elseweb-edac%3AhasJSONCapabilitiesDigestURL%20%3Fmetadata.%0A%0A%3Fband%20elseweb-data%3ArepresentsEntity%20%3C"+entity+"%3E.%0A%3Fband%20elseweb-data%3AencodingOfCharacteristic%20%3C"+characteristic+"%3E.%0A%3Fband%20provo%3AwasGeneratedBy%20%3Factivity.%0A%3Factivity%20provo%3AwasAssociatedWith%20%3C"+source+"%3E%0A%0A%7D%20limit%205&format=application%2Fjson";   
            //alert(datasetQuery);
            return(datasetQuery);
        };
        
       $scope.assembleExperiment = function (){
           //JSON Initializations
           $scope.eSpecification = {};
           $scope.eSpecification.specification = {};
           $scope.eSpecification.specification.algorithm = {};
           $scope.eSpecification.specification.algorithm.parameterBindings = [];
           $scope.eSpecification.specification.modelingScenario = [];
           
           $scope.eSpecification["specification"]["occurrenceDataID"] = $scope.ocurrence[0].id.value;
           $scope.eSpecification["specification"]["algorithm"]["id"] = $scope.experiment["algorithm"].slice(79);
           
           //Populate 
           for (index in  $rootScope.filteredparams.items){
               var parameters = {};
               parameters.name = $rootScope.filteredparams.items[index].paramName.value;
               parameters.value = $rootScope.filteredparams.items[index].default.value;
               if($rootScope.filteredparams.items[index].datatype.value.slice(33) === "float") 
                    parameters.datatype = "double";
               else
                    parameters.datatype = $rootScope.filteredparams.items[index].datatype.value.slice(33);
               $scope.eSpecification.specification.algorithm.parameterBindings.push(parameters);
           }
           for (index in $scope.datasetURI){
               var datasets = {};
               datasets.datasetURI = $scope.datasetURI[index].dataset.value;
               $scope.eSpecification.specification.modelingScenario.push(datasets);
           }

           
           //alert(JSON.stringify($scope.eSpecification));
           $("textarea#experiment").val(JSON.stringify($scope.eSpecification));
           $.unblockUI();
           $.noty.closeAll(); 
       }; 
       
       this.submitExperiment = function (base_url){
           genGUID(base_url);
       };
            
    }]);

})(); //app end

