console.log(openpgp);
openpgp.initWorker({ path:'openpgp/openpgp.worker.js'});	//init openpgp

function encrypt(data) {
	
}

function decrypt(data) {
	if (!('priv_k' in data) || data['priv_k'] == '') {
		alert('please login');
	}
}

chrome.commands.onCommand.addListener(function(cmd) {
	chrome.storage.sync.get(['priv_k'],function(result) {
		if (cmd === 'encrypt') {
			encrypt(result);
		}
		else if (cmd === 'decrypt') {
			decrypt(result);
		}
	});
});
