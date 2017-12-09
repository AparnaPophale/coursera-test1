(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    return $http({
        method: "GET",
        url: (ApiBasePath)
    }).then(function (response) {
      return response.data;
    });
  };

  service.getItemsForCategory = function(categoryShortName) {
    return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="),
        params: {
            category: categoryShortName
        }
    }).then(function (response) {
      return response.data;
    });
  };
}

})();