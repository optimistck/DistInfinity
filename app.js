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
		containerInUse: '.inuse__list', 
		availableLabel: '.inventory__available--value',
		inUseLabel: '.inventory__inuse--value',
		totalLabel: '.inventory__value', 
		percentageInUseLabel: '.inventory__inuse--percentage'
	}

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
				html = '<div class="item clearfix" id="available-0"><div class="item__description">%item%</div><div class="right clearfix"><div class="item__value">%collateral%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

			} else if (isAvailable === 'no') {
				element = DOMstrings.containerInUse;
				html = '<div class="item clearfix" id="inuse-0"><div class="item__description">%item%</div><div class="right clearfix"><div class="item__value">%collateral%</div><div class="item__percentage">15%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}

			newHTML = html.replace('%item%', obj.title);
			newHTML = newHTML.replace('%collateral%', obj.collateral);

			document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);

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
			console.log(obj);
			document.querySelector(DOMstrings.totalLabel).textContent = obj.totalItems;
			document.querySelector(DOMstrings.availableLabel).textContent = obj.totalAvailable;
			document.querySelector(DOMstrings.inUseLabel).textContent = obj.totalInUse;
			document.querySelector(DOMstrings.percentageInUseLabel).textContent = obj.percentageInUse + '%';
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

	return {
		init: function() {
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

controller.init();
