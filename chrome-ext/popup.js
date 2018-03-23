
document.onload = new function() {
	chrome.storage.local.set({"x":"why  hi there"}, new function() {
		chrome.storage.local.get(["x"],new function(res) {
			alert("result: " + res.key);
		});
	});
}


/*chrome.sync.get("x",new function(res) {
		alert("result" + res);
});*/

