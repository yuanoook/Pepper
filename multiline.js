//From: https://github.com/sindresorhus/multiline

window.multiline = function(fn){
    var reCommentContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//;
	if(typeof fn !== 'function'){throw new TypeError('Expected a function');}
	var match = reCommentContents.exec(fn.toString());
	if(!match){throw new TypeError('Multiline comment missing.');}
	return match[1];
};
