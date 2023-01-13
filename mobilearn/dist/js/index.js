// Search feature
document.getElementById("searcher").onclick = (el) => {
	var field = document.getElementById("search");
	goto(Links.search + field.value.replace(/ /g, "+"));
};