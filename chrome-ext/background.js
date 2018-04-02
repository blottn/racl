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


function run_encryption(data,gid) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = async function() {
		if (this.readyState == 4 && this.status == 200) {
			var key_list = JSON.parse(this.responseText);
			key_list[0] = openpgp.key.readArmored(key_list[0]).keys[0];
			var options = {
				data : request.content,
				publicKeys : key_list
			}
			var encrypted = await openpgp.encrypt(options);
			return {"data":encrypted.data};
		}
	};
	req.open('GET','http://127.0.0.1:8000/key/get/?gid=' + gid, false);
	req.send(null);

}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
	var data = request.content;
	if (request.type === "encrypt") {
	/*	var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var key_list = JSON.parse(this.responseText);
				key_list[0] = openpgp.key.readArmored(key_list[0]).keys[0];
				var options = {
					data : request.content,
					publicKeys : key_list
				}
				var encrypted = await openpgp.encrypt(options);
				console.log('encrypted..');
				console.log(encrypted);
				sendResponse({"data":encrypted.data});
			}
		};
		req.open('GET','http://127.0.0.1:8000/key/get/?gid=' + request.gid, false);
		req.send(null);*/
		var result = run_encryption(data, request.gid);
		sendResponse({r:result});
	}
});
