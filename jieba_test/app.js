var segment = require("nodejieba");
segment.loadDict("./node_modules/nodejieba/dict/jieba.dict.utf8", "./node_modules/nodejieba/dict/hmm_model.utf8");
var wordList = segment.cutSync("aaaa");
if (wordList.constructor == Array) // just for tutorial, this is always be true 
{
    wordList.forEach(function(word) {
        console.log(word);     
    });
}