

(function(){
    //Testcase for species dropdown menu.
    var app = angular.module('elsewebGUI', ['ui.bootstrap']);
    
    //Global variables
    var url = "http://visko.cybershare.utep.edu/sparql?default-graph-uri=&query=";    
    var callback = "&callback=JSON_CALLBACK";
    //Encoded species query, todo:decode and separate to module
    var species = "prefix+lifemapper%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-lifemapper.owl%23%3E%0D%0Aprefix+data%3A+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Felseweb-data.owl%23%3E%0D%0A%0D%0Aselect+%3Fname%0D%0Afrom+%3Chttp%3A%2F%2Fontology.cybershare.utep.edu%2FELSEWeb%2Flinked-data%2Flifemapper%2Foccurrences%2Fspecies-occurrences.owl%3E%0D%0Awhere%7B%0D%0A%3Fdataset+a+lifemapper%3ASpeciesOccurrenceDataset.%0D%0A%3Fdataset+data%3AhasLayer+%3Flayer.%0D%0A%3Fdataset+data%3AhasManifestation+%3Fmanif.%0D%0A%3Fmanif+data%3AhasFileDownloadURL+%3FfileURL.%0D%0A%3Fmanif+data%3AhasLandingPageURL+%3FmetadataURL.%0D%0A%3Flayer+data%3AcontainsFeatureSet+%3Fset.%0D%0A%3Fset+a+lifemapper%3ASpeciesOccurrenceSet.%0D%0A%3Fset+lifemapper%3AhasOccurrenceSetID+%3Fid.%0D%0A%3Fset+lifemapper%3AhasOccurrenceOfSpecies+%3Fspecies.%0D%0A%3Fspecies+lifemapper%3AhasGenusName+%3Fname.%0D%0A%7D%0D%0A&format=application%2Fjson";

    app.controller('SpeciesController', ['$http' , '$scope', function($http, $scope){
       
        $http.jsonp(url+species+callback).success(function(data){
            $scope.species = [];
            $scope.species = data.results.bindings;
        });
        
    }]);
    
})();

