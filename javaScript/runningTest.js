$(document).ready(function () {

	for (var i = 0; i < 1000000; i++) {

	var p = document.createElement("p"),
		body = document.getElementById("testBody");

	p.innerHTML = "test " + 1;

	body.appendChild(p);

	}

});

