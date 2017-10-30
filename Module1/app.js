(function() {
    'use strict';

    angular.module('LunchCheck', []).controller('LunchCheckController',
            LunchCheckController);

    LunchCheckController.$inject = [ '$scope' ];
    function LunchCheckController($scope) {

        $scope.showMessage = function() {
            if (!$scope.itemList) {
                $scope.message = 'Please enter data first';
            } else {
                $scope.itemList = $scope.itemList.split(',');
                
                if($scope.itemList.length === 0){
                    $scope.message = 'Please enter data first';
                    return;
                }
                //Considered this case item 1, item2,,item3 or this case item 1, item2, ,item3 as 4 items in the list.
                //Only graded features are implemented.
                if ($scope.itemList.length <= 3) {
                    $scope.message = 'Enjoy!';
                } else {
                    $scope.message = 'Too much!!';
                }
            }
            $scope.itemList = undefined;
        };



    }

})();

