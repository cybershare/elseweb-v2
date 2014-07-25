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
    
    app.controller('OcurrenceController', ['$http' , '$scope', function($http, $scope){
        
        this.getOcurrence = function (){
            specimen = "\""+$scope.experiment.species+"\"^^<http://www.w3.org/2001/XMLSchema"
            var ocurrenceQuery = "prefix%20lifemapper%3A%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper.owl%23%3E%0Aprefix%20data%3A%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0A%0Aselect%20%3Fid%0Afrom%20%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Flifemapper%2Foccurrences%2Fspecies-occurrences.owl%3E%0Awhere%7B%0A%3Fdataset%20a%20lifemapper%3ASpeciesOccurrenceDataset.%0A%3Fdataset%20data%3AhasLayer%20%3Flayer.%0A%3Fdataset%20data%3AhasManifestation%20%3Fmanif.%0A%3Fmanif%20data%3AhasFileDownloadURL%20%3FfileURL.%0A%3Fmanif%20data%3AhasLandingPageURL%20%3FmetadataURL.%0A%3Flayer%20data%3AcontainsFeatureSet%20%3Fset.%0A%3Fset%20a%20lifemapper%3ASpeciesOccurrenceSet.%0A%3Fset%20lifemapper%3AhasOccurrenceSetID%20%3Fid.%0A%3Fset%20lifemapper%3AhasOccurrenceOfSpecies%20%3Fspecies.%0A%3Fspecies%20lifemapper%3AhasGenusName%20"+specimen+"%23string%3E.%0A%7D&format=application%2Fjson";
            $http.jsonp(url_visk+ocurrenceQuery+callback_visk).success(function(data){
                $scope.ocurrence = [];
                $scope.ocurrence = data.results.bindings;
                alert(JSON.stringify($scope.ocurrence));
            });
           
        }; 
            
    }]);

    app.controller('DataController', ['$http' , '$scope', function($http, $scope){
            
        
            
    }]);

    app.controller('AssemblyController', ['$http' , '$scope', function($http, $scope){
            
        
            
    }]);

    app.controller('SubmissionController', ['$http' , '$scope', function($http, $scope){
            
        
            
    }]);

})(); //app end

