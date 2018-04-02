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
	else {
		chrome.identity.getProfileUserInfo(function(id) {
			chrome.storage.local.set({'email':id.email}, function () {
				chrome.tabs.executeScript({file:'./decrypt.js'});
			});
		});
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
	else if ('type' in request && request.type === "decrypt") {
		chrome.storage.local.get(['key','secret'],function(result) {
			var key = openpgp.key.readArmored(JSON.parse(result.key).privateKeyArmored).keys[0];
			key.decrypt(result.secret);
			var options = {
				message : openpgp.message.readArmored(request.content),
				privateKeys: [key]
			};
			openpgp.decrypt(options).then(function(decrypted) {
				sendResponse({data:decrypted.data,index:request.index});
			});
		});
		return true;
	}
});
