function dfs(root) {
	if ((root.nodeType == Node.TEXT_NODE && /.*encrypt.*/.exec(root.nodeValue)) || (root.nodeType == Node.ELEMENT_NODE && /.*encrypt.*/.exec(root.value))) {
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
		if (element.nodeType == Node.TEXT_NODE) {
			txt = element.nodeValue;
		}
		else {
			txt = element.value;
		}
		txt = txt.substring('encrypt'.length,txt.length);
		var data = JSON.parse(txt);

		chrome.runtime.sendMessage({type:'encrypt',content:data.data, gid:data.gid, index:i},function (response) {
			var pos = response.index;
			if (elements[pos].nodeType == Node.TEXT_NODE) {
				elements[pos].nodeValue = 'decrypt' + JSON.stringify(response.r);
			}
			if (elements[pos].nodeType == Node.ELEMENT_NODE){
				elements[pos].value = 'decrypt' + JSON.stringify(response.r);
			}
		});
	}
});




