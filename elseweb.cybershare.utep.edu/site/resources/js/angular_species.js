

(function(){
    //Testcase for species dropdown menu.
    var app = angular.module('elsewebGUI', ['ui.bootstrap']);
    
    //Global variables
    var url = "http://visko.cybershare.utep.edu/sparql?default-graph-uri=&query=";    
    var callback = "&callback=JSON_CALLBACK";
    //Encoded species query, todo:decode and separate to module
    var species = "prefix+lifemapper%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper.owl%23%3E%0D%0Aprefix+data%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0D%0A%0D%0Aselect+%3Fname%0D%0Afrom+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Flifemapper%2Foccurrences%2Fspecies-occurrences.owl%3E%0D%0Awhere%7B%0D%0A%3Fdataset+a+lifemapper%3ASpeciesOccurrenceDataset.%0D%0A%3Fdataset+data%3AhasLayer+%3Flayer.%0D%0A%3Fdataset+data%3AhasManifestation+%3Fmanif.%0D%0A%3Fmanif+data%3AhasFileDownloadURL+%3FfileURL.%0D%0A%3Fmanif+data%3AhasLandingPageURL+%3FmetadataURL.%0D%0A%3Flayer+data%3AcontainsFeatureSet+%3Fset.%0D%0A%3Fset+a+lifemapper%3ASpeciesOccurrenceSet.%0D%0A%3Fset+lifemapper%3AhasOccurrenceSetID+%3Fid.%0D%0A%3Fset+lifemapper%3AhasOccurrenceOfSpecies+%3Fspecies.%0D%0A%3Fspecies+lifemapper%3AhasGenusName+%3Fname.%0D%0A%7D%0D%0A&format=application%2Fjson";
    var algorithmName = "prefix+modelling%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-modelling.owl%23%3E%0D%0Aprefix+parameters%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper-parameters.owl%23%3E%0D%0Aprefix+lifemapper%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper.owl%23%3E%0D%0A%0D%0Aselect+distinct+%3FalgorithmName%0D%0A%0D%0Afrom+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Flifemapper%2Fparameter-descriptions%2Fparameter-descriptions.owl%3E%0D%0Awhere%0D%0A%7B%0D%0A%3FalgorithmURI+a+lifemapper%3ALifemapperAlgorithm.%0D%0A%3FalgorithmURI+modelling%3AhasAlgorithmName+%3FalgorithmName.%0D%0A%3Fparams+lifemapper%3AdescribesBehaviorOf+%3FalgorithmURI.%0D%0A%3Fparams+lifemapper%3AhasParameterDescription+%3FparamDescription.%0D%0A%0D%0A%3FparamDescription+modelling%3AhasParameterName+%3FparamName.%0D%0A%3FparamDescription+lifemapper%3AhasDefaultValue+%3Fdefault.%0D%0Aoptional%7B%3FparamDescription+lifemapper%3AhasLowerBoundInclusive+%3Fmin.%7D%0D%0Aoptional%7B%3FparamDescription+lifemapper%3AhasUpperBoundInclusive+%3Fmax.%7D%0D%0A%7D%0D%0A&format=application%2Fjson";
    var algorithmURI = "prefix+modelling%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-modelling.owl%23%3E%0D%0Aprefix+parameters%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper-parameters.owl%23%3E%0D%0Aprefix+lifemapper%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper.owl%23%3E%0D%0A%0D%0Aselect+distinct+%3FalgorithmURI%0D%0A%0D%0Afrom+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Flifemapper%2Fparameter-descriptions%2Fparameter-descriptions.owl%3E%0D%0Awhere%0D%0A%7B%0D%0A%3FalgorithmURI+a+lifemapper%3ALifemapperAlgorithm.%0D%0A%3FalgorithmURI+modelling%3AhasAlgorithmName+%3FalgorithmName.%0D%0A%3Fparams+lifemapper%3AdescribesBehaviorOf+%3FalgorithmURI.%0D%0A%3Fparams+lifemapper%3AhasParameterDescription+%3FparamDescription.%0D%0A%0D%0A%3FparamDescription+modelling%3AhasParameterName+%3FparamName.%0D%0A%3FparamDescription+lifemapper%3AhasDefaultValue+%3Fdefault.%0D%0Aoptional%7B%3FparamDescription+lifemapper%3AhasLowerBoundInclusive+%3Fmin.%7D%0D%0Aoptional%7B%3FparamDescription+lifemapper%3AhasUpperBoundInclusive+%3Fmax.%7D%0D%0A%7D&format=tapplication%2Fjson";
   
    app.controller("PanelController", ['$scope', function($scope){
        this.tab = 1;
        $scope.experiment = {coordinates: "0,0,0,0"}
        $scope.experiment = {species: "Not Selected"};
        
        this.selectTab = function(setTab){
            this.tab = setTab;
        };
        
        this.isSelected = function(checkTab){
            return this.tab === checkTab;
        };        
            
    }]);
        
    app.controller('SpeciesController', ['$http' , '$scope', function($http, $scope){
       
        $http.jsonp(url+species+callback).success(function(data){
            $scope.species = [];
            $scope.species = data.results.bindings;
        });
        
    }]);

     app.controller('AlgorithmController', ['$http' , '$scope', function($http, $scope){
       
        $http.jsonp(url+algorithmName+callback).success(function(data){
            $scope.algorithms = [];
            $scope.algorithms = data.results.bindings;
        });
        
    }]);

    app.controller('DataController', ['$http' , '$scope', function($http, $scope){
        var currentRow = 1;
        this.entities = [];
        
        /* Dataset Module Jquery Listeners */       
        $(".delete").live('click', function(event) {
          $(this).parent().parent().remove();
          //currentRow --;
        });
        
        $(".selEnt").live('mouseover', function(event){
            if (($("#"+this.id+" option").length <= 1)){
                $("#"+this.id).empty();
                $scope.populateEntity(this.id); 
            }
        });
        
        
        /* Controller Functions */
        this.checkRows = function(){
            var maxRows = 11;
            var table = document.getElementById('dataInputs');
            if (table.rows.length < maxRows)
                return true;
            return false; 
        };
        
        this.addDataSet = function (){
           if (this.checkRows()){ 
                $('#dataInputs tr:last').after('<tr>' +
                    '<td><input id="start'+currentRow+'" name="start[]" type="text" class="datepicker form-control blck-input" /></td>' +
                    '<td><input id="end'+currentRow+'" name="end[]" type="text" class="datepicker form-control blck-input" /></td>' +
                    '<td ng-click="dataCrtl.populateEntity(this.id)">' +
                    '<select  id="selectEntity'+currentRow+'"  name="selectEntity[]" class="form-control blck-input selEnt">' +
                    '<option>select...</option>' +
                    '</select>' +
                    '</td>' +
                    '<td>' +
                    '<select  id="selectChar'+currentRow+'" name="selectChar[]" class="form-control blck-input">' +
                    '<option>select...</option>' +
                    '</select>' +
                    '</td>' +
                    '<td>' +
                    '<select  id="selectSource'+currentRow+'" name="selectSource" class="form-control blck-input">' +
                    '<option>select...</option>' +
                    '</select>' +
                    '</td>' +
                    '<td style="text-align:center; vertical-align: middle;">' +
                    '<button  type="button" class="btn btn-purchase btn-xs delete"><span class="glyphicon glyphicon-remove"></span></button>' +
                    '</td>' +
                    '</tr>');
                $('#end'+currentRow).datepicker({
                        changeMonth: true,
                        changeYear: true,
                        yearRange: '1900:2099'
                });
                $('#start'+currentRow).datepicker({
                        changeMonth: true,
                        changeYear: true,
                        yearRange: '1900:2099'
                });
                currentRow++;  
            }
            
        }; 
            
        $scope.populateEntity = function(selectID){
            alert(selectID);
            entity = $scope.entityQuery();
            $http.jsonp(url+entity+callback).success(function(data){
                $scope.entities = data.results.bindings;
            });    
            var options = $("#"+selectID);
                $.each($scope.entities, function(i, item) {   
                var text = item.entity.value.replace('http://visko.cybershare.utep.edu/linked-data/edac/services/', '');    
                options.append($("<option />").val(item.entity.value).text(text));
            });
      
        };
        
        $scope.entityQuery = function(){
            userBounds = document.getElementById("boundsText").value;
	    boundsArray = userBounds.split(",");
	    north  = boundsArray[0];
	    east   = boundsArray[1];
	    south  = boundsArray[2];
	    west   = boundsArray[3];
            var queryString = "prefix+elseweb-data%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0D%0Aprefix+elseweb-edac%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-edac.owl%23%3E%0D%0Aselect+distinct+%3Fentity%0D%0Afrom+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Fedac%2Fservices%2Fwcs-services.owl%3E%0D%0Awhere%0D%0A%7B%0D%0A%3Fdataset+elseweb-data%3AcoversRegion+%3Fregion.%0D%0A%3Fregion+elseweb-data%3AhasLeftLongitude+%3Fllon.%0D%0A%3Fregion+elseweb-data%3AhasRightLongitude+%3Frlon.%0D%0A%3Fregion+elseweb-data%3AhasLowerLatitude+%3Fllat.%0D%0A%3Fregion+elseweb-data%3AhasUpperLatitude+%3Fulat.%0D%0Afilter%28%3Fllon+%3C%3D+"
					+ west + 
					"%29%0D%0Afilter%28%3Frlon+%3E%3D+"
					+ east + 
					"%29%0D%0Afilter%28%3Fllat+%3C%3D+"
					+ south +
					"%29%0D%0Afilter%28%3Fulat+%3E%3D+"
					+ north + 
					"%29%0D%0A%3Fdataset+elseweb-data%3AhasDataBand+%3Fband.%0D%0A%3Fband+elseweb-data%3ArepresentsEntity+%3Fentity.%0D%0A%0D%0A%7D%0D%0A&format=application%2Fjson";
            return queryString;
        };
         
    }]);
    
})();

