

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

    app.controller('DataController', function(){
        
        //Global Jquery functions    
        $(".delete").live('click', function(event) {
          $(this).parent().parent().remove();
        });
        
        
        //Functions
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
                    '<td><input id="start[]" name="start[]" type="text" class="datepicker form-control blck-input" /></td>' +
                    '<td><input id="end[]" name="end[]" type="text" class="datepicker form-control blck-input" /></td>' +
                    '<td>' +
                    '<select  name="selectEntity" class="form-control blck-input">' +
                    '<option>-- select...</option>' +
                    '</select>' +
                    '</td>' +
                    '<td>' +
                    '<select  name="selectChar" class="form-control blck-input">' +
                    '<option>-- select...</option>' +
                    '</select>' +
                    '</td>' +
                    '<td>' +
                    '<select  name="selectSource" class="form-control blck-input">' +
                    '<option>-- select...</option>' +
                    '</select>' +
                    '</td>' +
                    '<td style="text-align:center; vertical-align: middle;">' +
                    '<button  type="button" class="btn btn-purchase btn-xs delete"><span class="glyphicon glyphicon-remove"></span></button>' +
                    '</td>' +
                '</tr>'); 

                 //add datepicker to the .datepicker class input elements
                 $( ".datepicker" ).datepicker({
                     changeMonth: true,
                     changeYear: true,
                     yearRange: '1900:2099'
                  });
            }
        };
        
    });
    
})();

