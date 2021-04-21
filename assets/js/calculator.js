function Calculator(){
    this.equation = document.getElementById("last-operation");
    this.textInput = document.getElementById("input");
    this.patternNumber = /[0-9]/;
    this.patternSignal = /[+|\-|*|/]/;
    this.clearInput = true;
};
Calculator.prototype.operations = function(num1, operator, num2){
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
};

function Screen(){
    Calculator.call(this);    
};
Screen.prototype = Object.create(Calculator.prototype);

function Buttons(){
    Calculator.call(this);
};
Buttons.prototype = Object.create(Calculator.prototype);

Screen.prototype.calculate = function(evt){
    this.userInput = evt.key;
    let allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
    // console.log("Clear Input: " + this.clearInput);
    // console.log("Text Input: " + this.textInput.value);

    if(this.userInput.match(this.patternSignal)){
        if(this.textInput.value){
            this.equation.value = [this.textInput.value,this.userInput.match(this.patternSignal)].join(" ");
            evt.preventDefault();
            this.clearInput = true;
        }
    }
    if(this.userInput == "Enter"){
        try{
            var operator = this.equation.value.match(this.patternSignal)[0];
            let number1 = this.equation.value.split(operator)[0];
            var input = this.textInput.value
            var result = this.operations(number1, operator, input);
            this.equation.value += " " + input + " = " + result;
            this.textInput.value = result;
            this.clearInput = true;
            console.log("Last Operation Inner HTML: " + this.equation.value);
        }catch(error){
            console.log(error);
        }
        
        
    }
    if(this.userInput == "Escape"){
        this.equation.value = "";
        this.textInput.value = "";
    }
    if(this.userInput.match(this.patternNumber) && this.clearInput){
        this.textInput.value = "";
        this.clearInput = false;
    }
    if(!(this.userInput.match(this.patternNumber) ||  allowedKeys.includes(this.userInput))){
        evt.preventDefault();
    }
    
 
};

Buttons.prototype.calculate = function(evt){
    this.userInput = evt.target.value;

    if(this.userInput.match(this.patternSignal)){
        if(this.textInput.value){
            this.equation.value = [this.textInput.value,this.userInput.match(this.patternSignal)].join(" ");
            evt.preventDefault();
            this.clearInput = true;
        }
    }
    if(this.userInput == "="){
        try{
            var operator = this.equation.value.match(this.patternSignal)[0];
            let number1 = this.equation.value.split(operator)[0];
            var input = this.textInput.value
            var result = this.operations(number1, operator, input);
            this.equation.value += " " + input + " = " + result;
            this.textInput.value = result;
            this.clearInput = true;
        }catch(error){
            console.log(error);
        }
    }
    if(this.userInput == "C"){
        this.equation.value = "";
        this.textInput.value = "";
    }
    if(this.userInput.match(this.patternNumber) && !this.clearInput){
        this.textInput.value += this.userInput;
    }
    if(this.userInput.match(this.patternNumber) && this.clearInput){
        this.textInput.value = "";
        this.textInput.value += this.userInput;
        this.clearInput = false;
    }

};

var screen = new Screen();
var buttonsDiv = new Buttons();

document.getElementById("input").addEventListener("keydown", (evt)=>screen.calculate(evt));

var buttons = document.getElementById("buttons").querySelectorAll("input");
buttons.forEach(btn => btn.addEventListener("click", (evt)=>buttonsDiv.calculate(evt)));