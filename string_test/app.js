var string = "{rank_level:0,stars:0,scores:0,win_times_continue:0,win_times_total:0,protected:0,leave_msg:'',fight_recently:''}"
console.log(string);
var obj = eval('('+string+')');	
console.log(obj);
var string2 = JSON.stringify(obj);
console.log(string);

var str = 'Hello' + ' World' + ' '+ 123;
console.log(str);

var str_compare1 = "1_lee";
var str_compare2 = "1_lee2";
if(str_compare1 == str_compare2){
	console.log("true");
}
else{
	console.log("false");
}
	
var str_reg = "Welcome to Microsoft! ";
var str_replace = 'Microsoft';
str_reg = str_reg.replace(str_replace, "W3School");
console.log(str_reg);

//	 mask word
var sentence = "中国共产党万岁";
var mask_word = "万岁";
var result = sentence.indexOf(mask_word,0);
console.log(result);
result = sentence.replace(mask_word,"****");
console.log(result);
