const bits = 1024;

function login() {
	var val = document.getElementById('name').value;
	var key = cryptico.generateRSAKey(val,bits);
	console.log(cryptico.publicKeyString(key));
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {// on confirm only
			chrome.storage.sync.set({'uid_k':val}, login_check);
		}
	}
	url = 'http://127.0.0.1:8000/key/register?uid=' + val + '&key=' + cryptico.publicKeyString(key);
	request.open('GET',url,false);
	request.send(null);
}

function logout() {
	chrome.storage.sync.set({'uid_k':''}, login_check);
}

function login_check() {
	chrome.storage.sync.get(['uid_k'],function (result) {	//check uid
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
	document.getElementById('login').onclick = login;
	document.getElementById('logout').onclick = logout;
	login_check();
}

