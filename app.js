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
			totalAvailable: 0,
			totalInUse: 0
		}
	}


	return {
		addItem: function(isAvail, title, id, coltr) {
			var newItem;
			newItem = new Item(isAvail, title, id, coltr);
			// add new item object to the array of books
			inventory.allItems.books.push(newItem);
			return newItem;
		},

		//temp
		testing: function() {
			console.log(inventory);
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
		containerInUse: '.inuse__list'
	}

	return {
		getInput: function() {
			return {
				isAvailable: document.querySelector(DOMstrings.inputIsAvailable).value, // returns yes or no // TODO, make bool
				title: document.querySelector(DOMstrings.inputTitle).value,
				id: document.querySelector(DOMstrings.inputID).value,
				collateral: document.querySelector(DOMstrings.inputCollateral).value		
			}
		},

		getNewItem: function(obj, isAvailable) {
			var html, newHTML, element;
			//console.log(obj);

			if (isAvailable === 'yes') {
				element = DOMstrings.containerAvailable;
				html = '<div class="item clearfix" id="available-0"><div class="item__description">%item%</div><div class="right clearfix"><div class="item__value">%collateral%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

			} else if (isAvailable === 'no') {
				element = DOMstrings.containerInUse;
				html = '<div class="item clearfix" id="inuse-0"><div class="item__description">%item%</div><div class="right clearfix"><div class="item__value">%collateral%</div><div class="item__percentage">15%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}

			newHTML = html.replace('%item%', obj.title);
			newHTML = newHTML.replace('%collateral%', obj.collateral);

			document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

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
		var newItem;

		// 1. Get the field input data
		var input = UICtrl.getInput();

		// 2. Add the item to the inventory controller
		newItem = inventoryCtrl.addItem(input.isAvailable, input.title, input.id, input.collateral);

		// 3. Add a new item to UI
		UICtrl.getNewItem(newItem, input.isAvailable);

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
