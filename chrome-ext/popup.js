document.onload = new function() {
	chrome.storage.sync.set({'uid_k':'example'}, function () {
		chrome.storage.sync.get(['uid_k'],function (result) {	//check uid
			//get elements
			var login_div = document.getElementById('login');
			var status_div = document.getElementById('status');
			var text = document.getElementById('text');

			if (!(typeof result['uid_k'] == 'undefined' || result['uid_k'] === '')) {	//logged in
				login_div.style.display = 'none';
				status_div.style.display = 'block';
				text.innerHTML += result['uid_k'];
			}
			else {
				// show login
				login_div.style.display = 'block';
				status_div.style.display = 'none';
			}
		});
	});
}

