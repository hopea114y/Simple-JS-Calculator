var numbers    = document.querySelectorAll(".number"),
		operations = document.querySelectorAll(".operation"),
		decimalBtn = document.getElementById("decimal"),
		c          = document.getElementById("c"),
		resultBtn  = document.getElementById("result"),
		display    = document.getElementById("display"),
		information = document.getElementById("info"),
		MemoryCurrentNumber = 0,
		MemoryNewNumber     = false,
		MemoryPendingoperation = "",
		operationsList = document.getElementById("operationsList");


for (var i = 0; i < numbers.length; i++) {
	var number = numbers[i];
	number.addEventListener("click", function (e) {
		numberPress(e.target.textContent);
	});
}

for (var i = 0; i < operations.length; i++) {
	var operationBtn = operations[i];
	operationBtn.addEventListener("click", function (e) {
		operation(e.target.textContent);
	});
}

decimalBtn.addEventListener("click", decimal);

c.addEventListener("click", clear);

resultBtn.addEventListener("click", result);

information.addEventListener("click", inform);

function numberPress(number) {
	if(MemoryNewNumber) {
		display.value = number;
		MemoryNewNumber = false;
	}
	else {
		if(display.value === "0") {
		display.value = number;
		}
		else {
			display.value += number;
		}
	}	
};

function operation(oper) {
	var localOperMemory = display.value;

	if (MemoryNewNumber && MemoryPendingoperation !== '=') {
		display.value = MemoryCurrentNumber;
	}
	else {
		MemoryNewNumber = true;
		if (MemoryPendingoperation === "+") {
			MemoryCurrentNumber += parseFloat(localOperMemory);
		}
		else if (MemoryPendingoperation === "-") {
			MemoryCurrentNumber -= parseFloat(localOperMemory);
		}
		else if (MemoryPendingoperation === "*") {
			MemoryCurrentNumber *= parseFloat(localOperMemory);
		}
		else if (MemoryPendingoperation === "/") {
			MemoryCurrentNumber /= parseFloat(localOperMemory);
		}
		else {
			MemoryCurrentNumber = parseFloat(localOperMemory);
		}

		display.value = MemoryCurrentNumber;
		MemoryPendingoperation = oper;
	}
};

function decimal(argument) {
	var localDecimalMemory = display.value;

	if (MemoryNewNumber) {
		localDecimalMemory = "0.";
		MemoryNewNumber = false;
	}
	else {
		if (localDecimalMemory.indexOf(".") === -1 ) {
			localDecimalMemory += ".";
		}
	}
	display.value = localDecimalMemory;
};

function clear(argument) {
	display.value = "0";
	MemoryNewNumber = true;
	MemoryCurrentNumber = 0;
	MemoryPendingoperation = "";
};

function inform(argument) {

	for (var i = 0; i < operations.length; i++) {
		var newLi = document.createElement("li");
		var operationText = operations[i].value;
		newLi.innerText = operationText;
		operationsList.appendChild(newLi);
	}
};