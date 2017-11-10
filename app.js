// INVENTORY (i.e., Books) CONTROLLER (MODEL)
var inventoryController = (function() {

	// some code

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

	var DOM = UICtrl.getDOMstrings();

	var ctrlAddItem = function() {
		// 1. Get the field input data
		var input = UICtrl.getInput();
		console.log(input);

		// 2. Add the item to the inventory controller

		// 3. Add a new item to UI

		// 4. Update the inventory

		// 5. Display the inventory in UI

	}

	//event listener for click on "add" button. 
	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

	// event listener for the Enter key
	document.addEventListener('keypress', function(event) {
		if (event.keyCode === 13 || event.which === 13) {
			ctrlAddItem();
		}
	});

})(inventoryController, UIController);


