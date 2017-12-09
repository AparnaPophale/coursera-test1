(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menu/categories.component.template.html',
  bindings: {
    items: '<'
  }
});

})();