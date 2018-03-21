const tag = "*ROBOT VOICE* BEGIN ENCRYPTED TEXT *END ROBOT VOICE*"

function isEncrypted(txt) {
	return txt.substring(txt.length - tag.length,txt.length) === tag;
}

function getEncrypted(txt) {
	return txt.substring(0,txt.length - tag.length);
}

function encrypt(txt) {
	
}

document.onload = new function() {
	var dom_list = document.getElementsByTagName("P");
	var list = []
	for (var i = 0 ; i < dom_list.length ; i++) {
		var txt = dom_list[i].innerText;
		if (txt != "" && txt.length >= tag.length && isEncrypted(txt)) {
			console.log(getEncrypted(txt));
			list.push(getEncrypted(txt));	//cant write further without writing the encryption side first
		}
	}

}
