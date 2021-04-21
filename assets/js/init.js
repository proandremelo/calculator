
var clearInput = true;

document.getElementById("input").addEventListener("keydown", (evt)=>{
    // console.log("Text: " + evt.target.type);
    var equation = document.getElementById("last-operation");
    var textInput = document.getElementById("input");
    var patternNumber = /[0-9]/;
    var patterSignal = /[+|\-|*|/]/;
    var userInput = evt.key;
    if(userInput.match(patterSignal)){
        equation.value = textInput.value + " " + userInput.match(patterSignal)[0];
        clearInput = true;
    }
    if(userInput == "Enter"){
        try{
            clearInput = true;
            // console.log("Signal type: " + equation.innerHTML.match(patterSignal)[0]);
            let operator = equation.value.match(patterSignal)[0];
            let number1 = equation.value.split(operator)[0];
            // console.log("** N1: " + number1);
            // console.log("** OP: " + operator);
            // console.log("** TV: " + textInput.value);
            textInput.value = calculate(number1,operator,textInput.value);
        }catch(err){
            console.log(err);
        }
    }
    if(!(userInput.match(patternNumber) || userInput == "Backspace" || userInput == "Delete")){
        evt.preventDefault();
        console.log("Forbidden Key: " + userInput);
    }
    if(userInput.match(patternNumber) && clearInput){
        textInput.value = "";
        clearInput = false;
    }
    if(userInput == "Escape"){
        equation.value = "";
        textInput.value = "";
    }
});

var buttons = document.getElementById("buttons").querySelectorAll("input");
buttons.forEach(btn => btn.addEventListener("click", (evt)=>{
    // console.log("Button: " + evt.target.type);
    var equation = document.getElementById("last-operation");
    var textInput = document.getElementById("input");
    var patternNumber = /[0-9]/;
    var patterSignal = /[+|\-|*|/]/;
    var userInput = evt.target.value;
    if(userInput.match(patterSignal)){
        equation.value = textInput.value + " " + userInput.match(patterSignal)[0];
        clearInput = true;
    }
    if(userInput == "="){
        try{
            clearInput = true;
            // console.log("Signal type: " + equation.innerHTML.match(patterSignal)[0]);
            let operator = equation.value.match(patterSignal)[0];
            let number1 = equation.value.split(operator)[0];
            // console.log("** N1: " + number1);
            // console.log("** OP: " + operator);
            // console.log("** TV: " + textInput.value);
            textInput.value = calculate(number1,operator,textInput.value);
        }catch(err){
            console.log(err);
        }
    }
    if(userInput.match(patternNumber) && !clearInput){
        textInput.value += userInput;
    }
    if(userInput.match(patternNumber) && clearInput){
        textInput.value = "";
        clearInput = false;
        textInput.value = userInput;
    }
    if(userInput == "C"){
        equation.value = "";
        textInput.value = "";
    }
}));


function calculate(num1, operator, num2){
    try{
        num1 = parseInt(num1);
        num2 = parseInt(num2);
        switch(operator){
            case "+":
                return num1+num2;
            case "-":
                return num1-num2;
            case "*":
                return num1*num2;
            case "/":
                return num1/num2;
            default:
                console.log("Switch [default] => Operator: " + operator);
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}