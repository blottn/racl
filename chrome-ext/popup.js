const bits = 1024;

function login() {
	var val = document.getElementById('name').value;	// secret value
	chrome.storage.set({'secret':val}, function () {
		
		chrome.identity.getProfileUserInfo(function(info) {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {// on confirm only
					chrome.storage.sync.set({'uid_k':val},login_check);
				}
			}
			url = 'http://127.0.0.1:8000/key/register?email=' + info.email + '&key=' + cryptico.publicKeyString(key);
			request.open('GET',url,false);
			request.send(null);
		});
	});
}

function logout() {
	chrome.storage.sync.set({'secret':''}, login_check);
}

function login_check() {
	chrome.storage.sync.get(['secret'],function (result) {	//check uid
		//get elements
		var login_div = document.getElementById('login_div');
		var status_div = document.getElementById('status');
		var text = document.getElementById('text');

		if (!(typeof result['uid_k'] == 'undefined' || result['uid_k'] === '')) {	//logged in
			login_div.style.display = 'none';
			status_div.style.display = 'block';
			text.innerHTML = 'Logged in as: ';
			text.innerHTML += result['uid_k'];
		}
		else {
			// show login
			login_div.style.display = 'block';
			status_div.style.display = 'none';
			text.innerHTML = 'Logged in as: ';	//clear current login text
		}
	});

}

window.onload = function() {
	openpgp.initWorker({ path:'openpgp/openpgp.worker.js'});
	/*var encrypted;
	var options = {
		    data: "hello world", // input as Uint8Array (or String)
			    passwords: ['secret stuff'],              // multiple passwords possible
				    armor: false                              // don't ASCII armor (for Uint8Array output)
	};

	openpgp.encrypt(options).then(function(ciphertext) {
	    encrypted = ciphertext.message.packets.write(); // get raw encrypted packets as Uint8Array
		console.log(encrypted);

		options = {
	    	message: openpgp.message.read(encrypted), // parse encrypted bytes
		    passwords: ['secret stuff'],              // decrypt with password
			format: 'binary'                          // output as Uint8Array
		};
		openpgp.decrypt(options).then(function(plaintext) {
			console.log(new TextDecoder("utf-8").decode(plaintext.data));
		   	return plaintext.data // Uint8Array([0x01, 0x01, 0x01])
		});
	});*/
	

	document.getElementById('login').onclick = login;
	document.getElementById('logout').onclick = logout;
	login_check();
}

