function dfs(root) {
	if ((root.nodeType == Node.TEXT_NODE && /.*decrypt.*/.exec(root.nodeValue)) || (root.nodeType == Node.ELEMENT_NODE && /.*decrypt.*/.exec(root.value))) {
		return [root];
	}
	var res = [];
	for (var i = 0; i < root.childNodes.length; i++) {
		var r = dfs(root.childNodes[i]);
		res = res.concat(r);
	}
	return res;
}

chrome.storage.local.get(['email'],function(res) {
	elements = dfs(document.body);	// get elements to be encrypted
	for (var i = 0 ; i < elements.length ; i++) {
		// encrypt!
		var txt;
		var element = elements[i];
		txt = "";
		txt = element.parentNode.innerText;
		txt = txt.substring('decrypt'.length,txt.length);
		var data = JSON.parse(txt);
		chrome.runtime.sendMessage({type:'decrypt',content:data.data,index:i},function (response) {
			var pos = response.index;
			elements[pos].parentNode.innerText = response.data;
		});
	}
});




