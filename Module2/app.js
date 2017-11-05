(function() {
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController) 
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService){
    	var toBuy = this;
    	toBuy.list = ShoppingListCheckOffService.getBuyingItems();
    	toBuy.item = function(itemIndex){
    		try{
    			ShoppingListCheckOffService.pushItems(itemIndex);
    		} catch(err) {
    			alert(err);
    		}
    	};
    }

    function AlreadyBoughtController(ShoppingListCheckOffService){
        var itemsBought = this;
        itemsBought.list= ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService(){
    	var service=this;
    	var bought_items = [];
    	var tobuy_items = [
            {name: "Bananas", quantity: 5},
            {name: "Cereal bars", quantity: 12},
            {name: "Donuts", quantity: 6},
            {name: "Chocolate Milk cartons", quantity: 2},
            {name: "Cookies", quantity: 10}
    	];

    	service.getBuyingItems= function(){
    		return tobuy_items;
    	};

    	service.getBoughtItems = function(){
            return bought_items;
    	};

    	service.pushItems = function(itemIndex){
    		var item= tobuy_items.splice(itemIndex,1);
    		bought_items.push(item[0]);    		
    	};
    }

})();