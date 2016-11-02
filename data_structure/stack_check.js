/**
 * 利用栈实现括号匹配
 */
function validBraces(s) {
    var sk = [];
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == '(') {
            sk.push('(');
        }
        if (s.charAt(i) == ')') {
            if (sk.length > 0 && sk.pop() == '(')
                continue;
            else
                return false;
        }
        if (s.charAt(i) == '[') {
            sk.push('[');
        }
        if (s.charAt(i) == ']') {
            if (sk.length > 0 && sk.pop() == '[')
                continue;
            else
                return false;
        }
        if (s.charAt(i) == '{') {
            sk.push('{');
        }
        if (s.charAt(i) == '}') {
            if (sk.length > 0 && sk.pop() == '{')
                continue;
            else
                return false;
        }
    }
    if (sk.length === 0)
        return true;
    else
        return false;
}

console.log(validBraces("(){}[]")) // => returns true 
console.log(validBraces("(}")) // => returns false 
console.log(validBraces("[(])")) // => returns false 
console.log(validBraces("([{}])")) // => returns true