var $container = $("div.container");

for (var i = 0; i <= 10000; i++) {

	var div = document.createElement("div"),

	div.textContent = "Testing Content";
	div.style.display = "none";

	$container.append(div);

}