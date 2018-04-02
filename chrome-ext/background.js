openpgp.initWorker({ path:'openpgp/openpgp.worker.js'});	//init openpgp

function encrypt(data) {
	chrome.identity.getProfileUserInfo(function(id) {
		chrome.storage.local.set({'email':id.email}, function () {
			chrome.tabs.executeScript({file:'./encrypt.js'});
		});
	});
}

function decrypt(data) {
	if (!('key' in data) || data['key'] == '') {
		alert('please login');
	}
}

chrome.commands.onCommand.addListener(function(cmd) {
	chrome.storage.local.get(['key'],function(result) {
		if (cmd === 'encrypt') {
			encrypt(result);
		}
		else if (cmd === 'decrypt') {
			decrypt(result);
		}
	});
});


function run_encryption(d,gid) {
	var req = new XMLHttpRequest();
	req.open('GET','http://127.0.0.1:8000/key/get/?gid=' + gid, false);
	req.send(null);
	var key_list = JSON.parse(req.responseText);
	key_list[0] = openpgp.key.readArmored(key_list[0]).keys[0];
	var options = {
		data : d,
		publicKeys : key_list
	}
	return openpgp.encrypt(options);
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	if ('type' in request && request.type === "encrypt") {
		var data = request.content;
		run_encryption(data, request.gid).then(function(result) {
			sendResponse({r:result.data,index:request.index});
		});
		return true;
	}
});
