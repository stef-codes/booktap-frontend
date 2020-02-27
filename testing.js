function foo(){    
    function bar() {        
        return 3;    
    }    
        return bar();    
        function bar() {        
            return 8;    
        } 
}

alert(foo());

//function parent() {    var hoisted = "I'm a variable";    function hoisted() {        return "I'm a function";    }    return hoisted(); }console.log(parent());


alert(foo());
function foo() {  
    var bar = function() {    
        return 3;  
    };  
        return bar();  

    var bar = function() {    
        return 8;  };
}

var myVar = 'foo';

(function() {  
    console.log('Original value was: ' + myVar);  
    var myVar = 'bar'
    console.log('New value is: ' + myVar);
})();


function getShape(condition) {    // shape exists here with a value of undefined
    // OUTPUT : undefined    console.log(shape);
if (condition) {        
    var shape = "square";        
    // some other code        
    return shape;    
} else {        
    // shape exists here with a value of undefined        
    return false;    }}