console.log(openpgp);
openpgp.initWorker({ path:'openpgp/openpgp.worker.js'});	//init openpgp

function run(f) {
	var options = {
		currentWindow: true,
		active: true,	
	};
	chrome.tabs.query(options, f);
}

function encrypt(data) {
	run(function(tabs) {
		console.log(tabs);
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
