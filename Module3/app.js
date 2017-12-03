(function () {
  'use strict'

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com/menu_items.json");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ntdCtrl = this;
  ntdCtrl.found = MenuSearchService.getItems();
  ntdCtrl.searchMenuItems = function () {
    if (ntdCtrl.searchTerm === "") {
      MenuSearchService.clear();
    } else {
      MenuSearchService.getMatchedMenuItems(ntdCtrl.searchTerm)
      .then(function(result) {
        ntdCtrl.found = result;
      });
    }
  }

  ntdCtrl.removeItem = function(itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItemCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundItemCtrl = this;

  foundItemCtrl.NothingFound = function() {
    if (foundItemCtrl.items.length === 0) {
      return true;
    }
    return false;
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function(searchTerm) {
    foundItems.splice(0, foundItems.length);
    if (searchTerm === "") {
      return foundItems;
    }
    return $http({
      method: "GET",
      url: (ApiBasePath)
    }).then(function(result) {
      var itemList = result.data.menu_items;
      foundItems.splice(0, foundItems.length);
      for (var index = 0; index < itemList.length; ++index) {
        if (itemList[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(itemList[index]);
        }
      }
      return foundItems;
    });
  };

  service.clear = function() {
    foundItems.splice(0, foundItems.length);
  }

  service.removeItem = function(itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

  service.getItems = function() {
    return foundItems;
  };
}

})();