const bits = 2048;
/*
function test(key) {
	var options = {
		data: "hello there",
		publicKeys: openpgp.key.readArmored(key.publicKeyArmored).keys
	}
	openpgp.encrypt(options).then(function(cipher) {
		var priv = openpgp.key.readArmored(key.privateKeyArmored).keys[0];
		priv.decrypt('mysecret');
		options = {
			message: openpgp.message.readArmored(cipher.data),
			privateKeys: [priv]
		}
		openpgp.decrypt(options).then(function(decrypted) {
			console.log(decrypted);

		});
	});
}
*/

function login() {
	var val = document.getElementById('name').value;	// secret value
	chrome.identity.getProfileUserInfo(function(info) {
		// generate key
		openpgp.generateKey({
			numBits: bits,
			userIds: [{name:info.email}],
			passphrase: val
		}).then(function(key) {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {// on confirm only
					chrome.storage.local.set({'key':JSON.stringify(key),'secret':val},login_check);
				}
			}
			url = 'http://127.0.0.1:8000/key/register/?email=' + info.email + '&key=' + key.publicKeyArmored;
			url = encodeURI(url);
			url = url.replace(/\+/g,"%2B");
			request.open('GET',encodeURI(url),false);
			request.send(null);
		});
	});
	
}

function logout() {
	chrome.storage.local.set({'key':''}, login_check);
}

function login_check() {
	chrome.storage.local.get(['key'],function (result) {	//check uid
		//get elements
		var login_div = document.getElementById('login_div');
		var status_div = document.getElementById('status');
		var text = document.getElementById('text');

		if ('key' in result && !(result['key'] === '')) {	//logged in
			login_div.style.display = 'none';
			status_div.style.display = 'block';
		}
		else {
			// show login
			login_div.style.display = 'block';
			status_div.style.display = 'none';
		}
	});

}

window.onload = function() {
	openpgp.initWorker({ path:'openpgp/openpgp.worker.js'});
	document.getElementById('login').onclick = login;
	document.getElementById('logout').onclick = logout;
	login_check();
}

