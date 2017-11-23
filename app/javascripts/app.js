// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.refreshBalance();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshBalance: function() {
    var self = this;

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: account});
    }).then(function() {
      self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  controller.init();
  App.start();
});


// INVENTORY (i.e., Books) CONTROLLER (DATA MODEL)
var inventoryController = (function() {

  var Item = function(isAvailable, title, id, collateral) {
    this.isAvailable = isAvailable;
    this.title = title;
    this.id = id;
    this.collateral = collateral;
  };

  var inventory = {
    allItems: {
      books: []
    },
    status: {
      totalItems: 0,
      totalAvailable: 0,
      totalInUse: 0,
      percentageInUse: -1
    }
  }; 

  var calculateTotalItems = function() {
    inventory.status.totalItems = inventory.allItems.books.length;
  };

  var calculateTotalInUse = function() {
    var inUse = 0;
    inventory.allItems.books.forEach(function(curr) {
      if (curr.isAvailable === "no") {
        inUse++;
      }
    });
    inventory.status.totalInUse = inUse;
  };

  var calculatePercentageInUse = function () {
    if (inventory.status.totalItems > 0) {
      inventory.status.percentageInUse = Math.round(100*(inventory.status.totalInUse / inventory.status.totalItems));
    } else {
      status.percentageInUse = -1;
    }
  };

  var calculateTotalAvailable = function() {
    inventory.status.totalAvailable = inventory.status.totalItems - inventory.status.totalInUse;
  }


  return {
    addItem: function(isAvail, title, id, coltr) {
      var newItem;
      newItem = new Item(isAvail, title, id, coltr);
      // add new item object to the array of books
      inventory.allItems.books.push(newItem);
      return newItem;
    },

    deleteItem: function(id) {
      // assume id is a hash and always unique
      var itemsArray, index;
      itemsArray = inventory.allItems.books;
      if (itemsArray.includes(id)) {
        index = itemIDsArray.indexOf(id);
      }
      if (index !== -1) {
        inventory.allItems.books.splice(index, 1);
      }
    },

    calculateInventoryStatus: function() {
      calculateTotalItems();
      calculateTotalInUse();
      calculatePercentageInUse();
      calculateTotalAvailable();
    },

    getInventoryStatus: function() {
      return {
        totalItems: inventory.status.totalItems,
        totalInUse: inventory.status.totalInUse,
        percentageInUse: inventory.status.percentageInUse,
        totalAvailable: inventory.status.totalAvailable
      }
    },

    //temp
    testing: function() {
      //console.log(inventory);
    }

  }

})();


// UI CONTROLLER (VIEW)
var UIController = (function() {

  var DOMstrings = {
    inputIsAvailable: '.is__available',
    inputTitle: '.add__title',
    inputID: '.add__id',
    inputCollateral: '.add__collateral',
    inputBtn: '.add__btn', 
    containerAvailable: '.available__list',
    containerInUse: '.inuse__list', 
    availableLabel: '.inventory__available--value',
    inUseLabel: '.inventory__inuse--value',
    totalLabel: '.inventory__value', 
    percentageInUseLabel: '.inventory__inuse--percentage',
    container: '.container',
    dateLabel: '.inventory__title--month'
  }; 


  //nodelist. Reusable instead of a forEach. 
  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      // first class function
      callback(list[i], i);
    }
  };

  return {
    getInput: function() {
      return {
        isAvailable: document.querySelector(DOMstrings.inputIsAvailable).value, // returns yes or no // TODO, make bool
        title: document.querySelector(DOMstrings.inputTitle).value,
        id: document.querySelector(DOMstrings.inputID).value,
        collateral: parseFloat(document.querySelector(DOMstrings.inputCollateral).value)    
      }
    },

    getNewItem: function(obj, isAvailable) {
      var html, newHTML, element;
      //console.log(obj);

      if (isAvailable === 'yes') {
        element = DOMstrings.containerAvailable;
        html = '<div class="item clearfix" id="available-%id%"><div class="item__description">%item%</div><div class="right clearfix"><div class="item__value">%collateral%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

      } else if (isAvailable === 'no') {
        element = DOMstrings.containerInUse;
        html = '<div class="item clearfix" id="inuse-%id%"><div class="item__description">%item%</div><div class="right clearfix"><div class="item__value">%collateral%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      newHTML = html.replace('%item%', obj.title);
      newHTML = newHTML.replace('%collateral%', obj.collateral);
      newHTML = newHTML.replace('%id%', obj.id);

      document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

    },

    deleteItemInList: function(itemId) {
      if (itemId) {
        var element = document.getElementById(itemId);
        element.parentNode.removeChild(element);
      }
    },

    clearInputFields: function() {
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMstrings.inputTitle + ', ' + DOMstrings.inputID + ', ' + DOMstrings.inputCollateral);
      fieldsArray = Array.prototype.slice.call(fields);
      fieldsArray.forEach(function(arrayElement) {
        arrayElement.value = "";
      });

      fieldsArray[0].focus();

    },

    displayInventoryStatus: function(obj) {
      document.querySelector(DOMstrings.totalLabel).textContent = obj.totalItems;
      document.querySelector(DOMstrings.availableLabel).textContent = obj.totalAvailable;
      document.querySelector(DOMstrings.inUseLabel).textContent = obj.totalInUse;
      if (parseInt(obj.percentageInUse) === -1) {
        document.querySelector(DOMstrings.percentageInUseLabel).textContent = '--';
      } else {
        document.querySelector(DOMstrings.percentageInUseLabel).textContent = obj.percentageInUse + '%';
      }
    },

    displayMonth: function() {
      var now = new Date();
      var month = now.getMonth();
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      document.querySelector(DOMstrings.dateLabel).textContent = months[month];
    },

    changedType: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputIsAvailable + ',' +
        DOMstrings.inputTitle + ',' +
        DOMstrings.inputID + ',' +
        DOMstrings.inputCollateral);

      nodeListForEach(fields, function(cur) {
        cur.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    },

    // make DOMsettings public and visible to the controller
    getDOMstrings: function() {
      return DOMstrings;
    }
  }

})();


// GLOBAL APP (CONTROLLER)
var controller = (function(inventoryCtrl, UICtrl) {

  var initiateEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    //event listener for click on "add" button. 
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    // event listener for the Enter key
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    // event listener for deleting of items
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    // event listener for change of focus for deleting items
    document.querySelector(DOM.inputIsAvailable).addEventListener('change', UICtrl.changedType);
  };

  var updateTotals = function() {

    // calculate totals
    inventoryCtrl.calculateInventoryStatus();
    // update totals
    var inventoryStatus = inventoryCtrl.getInventoryStatus();

    // display totals
    UICtrl.displayInventoryStatus(inventoryStatus);
  };

  var ctrlAddItem = function() {
    var newItem;

    // 1. Get the field input data
    var input = UICtrl.getInput();

    if (input.title !== "" && input.id != "" && !isNaN(input.collateral)) {
      // 2. Add the item to the inventory controller
      newItem = inventoryCtrl.addItem(input.isAvailable, input.title, input.id, input.collateral);

      // 3. Add a new item to UI
      UICtrl.getNewItem(newItem, input.isAvailable);
      UICtrl.clearInputFields();

      updateTotals();

    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, id;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    splitID = itemID.split('-');
    id = splitID[1];
    // delete from the data structure
    inventoryCtrl.deleteItem(id);
    // delete from the DOM using both the prexif & the actual hash / id
    UICtrl.deleteItemInList(itemID);
    // update the UI
    updateTotals();
  };

  return {
    init: function() {
      UICtrl.displayMonth();
      UICtrl.displayInventoryStatus({
        totalItems: 0,
        totalInUse: 0,
        percentageInUse: -1,
        totalAvailable: 0
      });
      initiateEventListeners();
    }
  }


})(inventoryController, UIController);

