function login() {
	var val = document.getElementById('name').value;
	chrome.storage.sync.set({'uid_k':val}, login_check);
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

