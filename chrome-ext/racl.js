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
/*function test() {
	txt = "hello world!";
	console.log("this is a message");
	var aes_key = cryptico.generateAESKey();
	console.log(aes_key);
	var encrypted = cryptico.encryptAESCBC(txt,aes_key);
	console.log(encrypted);
	var decrypted = cryptico.decryptAESCBC(encrypted,aes_key);
	console.log(decrypted);
}*/

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
