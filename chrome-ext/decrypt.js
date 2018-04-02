function dfs(root) {
	// console.log(root.nodeType);
	if (root.nodeType == Node.TEXT_NODE && /racl post here/.exec(root.nodeValue)) {
		return [root.parentNode];
	}
	var res = [];
	for (var i = 0; i < root.childNodes.length; i++) {
		var r = dfs(root.childNodes[i]);
		res = res.concat(r);
	}
	return res;
}
