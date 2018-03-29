const tag = "*ROBOT VOICE* BEGIN ENCRYPTED TEXT *END ROBOT VOICE*"

function isEncrypted(txt) {
	return txt.substring(txt.length - tag.length,txt.length) === tag;
}

function getEncrypted(txt) {
	return txt.substring(0,txt.length - tag.length);
}

function encrypt(txt,key) {
	return cryptico.encryptAESCBC(txt,key);
}

function decrypt(txt,key) {
	return cryptico.decryptAESCBC(txt,key);
}

function init(key) {
	var uid = key['uid_k'];

	var dom_list = document.getElementsByTagName("P");
	var list = []
	for (var i = 0 ; i < dom_list.length ; i++) {
		var txt = dom_list[i].innerText;
	//	console.log(txt);
		if (txt != "" && txt.length >= tag.length && isEncrypted(txt)) {
	//		console.log(getEncrypted(txt));
			list.push(getEncrypted(txt));	//cant write further without writing the encryption side first
		}
	}
//	console.log(list);
}

document.onload = new function() {
	chrome.storage.sync.get(['uid_k'],init);
}
