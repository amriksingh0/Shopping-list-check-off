(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ShoppingListAddController', ShoppingListAddController)
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController',AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListAddController(ShoppingListCheckOffService) {
      var itemAdder = this;

      itemAdder.itemName = "";
      itemAdder.itemQuantity = "";

      itemAdder.addItem = function () {
        ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
      }
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyList.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBougthList = this;

        alreadyBougthList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [];
        var alreadyBoughtItems = [];
        service.addItem = function (itemName, quantity) {
          var item = {
            name: itemName,
            quantity: quantity
           };
          toBuyItems.push(item);
        };
          service.buyItem = function(itemIndex){
            var item = toBuyItems[itemIndex];

            alreadyBoughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };



        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        };
    }
})();
