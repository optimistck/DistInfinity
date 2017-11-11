// INVENTORY (i.e., Books) CONTROLLER (DATA MODEL)
var inventoryController = (function() {

	var Item = function(isAvailable, title, id, collateral) {
		this.isAvailable = isAvailable;
		this.title = title;
		this.id = id;
		this.collateral = collateral;
	};

	var inventory = {
		allitems: {
			books: []
		},
		status: {
			totalAvailable: 0,
			totalInUse: 0
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
		inputBtn: '.add__btn'
	}

	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputIsAvailable).value, // returns yes or no
				title: document.querySelector(DOMstrings.inputTitle).value,
				id: document.querySelector(DOMstrings.inputID).value,
				collateral: document.querySelector(DOMstrings.inputCollateral).value		
			}
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
		document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
		// event listener for the Enter key
		document.addEventListener('keypress', function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	};

	var ctrlAddItem = function() {
		// 1. Get the field input data
		var input = UICtrl.getInput();
		console.log(input);

		// 2. Add the item to the inventory controller

		// 3. Add a new item to UI

		// 4. Update the inventory

		// 5. Display the inventory in UI

	};

	return {
		init: function() {
			initiateEventListeners();
		}
	}




})(inventoryController, UIController);

controller.init();
