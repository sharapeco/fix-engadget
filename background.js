const abrakadabra = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const targetURLs = [
	"*://www.engadget.com/*",
	"*://japanese.engadget.com/*",
];

function rewriteHeader(e) {
	[].some.call(e.requestHeaders, header => {
		if (/^user-agent$/i.test(header.name)) {
			header.value = abrakadabra;
			return true;
		}
	});
	return {
		requestHeaders: e.requestHeaders,
	};
}

(browser || chrome).webRequest.onBeforeSendHeaders.addListener(
	rewriteHeader,
	{urls: targetURLs},
	["blocking", "requestHeaders"]
);
