
var button = document.getElementById('button')

button.addEventListener('click', function(event){
    var x = document.getElementById('x').value
    var y = document.getElementById('y').value
    var result = document.getElementById('result')

    if(Number(x) && Number(y)){
        var cal = (x*100)/y
    
    result.innerHTML = "<h3>Result: " + cal  +" %</h3>"
    }else{
        alert("enter a valide number")
    }
    
})