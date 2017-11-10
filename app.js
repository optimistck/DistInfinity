// INVENTORY (i.e., Books) CONTROLLER (MODEL)
var inventoryController = (function() {

	// some code

})();

// UI CONTROLLER (VIEW)
var UIController = (function() {

	// Some code

})();


// GLOBAL APP (CONTROLLER)
var controller = (function(inventoryCtrl, UICtrl) {

	var ctrlAddItem = function() {
		// 1. Get the field input data

		// 2. Add the item to the inventory controller

		// 3. Add a new item to UI

		// 4. Update the inventory

		// 5. Display the inventory in UI

		console.log('It works');
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


