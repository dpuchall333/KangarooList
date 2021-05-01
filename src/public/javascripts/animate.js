//Jquery Example

$(document).ready(function() {
    var timer = setInterval(jump, 1);
       
    function jump(){
        $("#jump").animate({left: "+=5"});
        $("#jump").animate({top: "+=10", left: "+=5"});
       // $("#jump").animate({}, 300);
        $("#jump").animate({top: "-=10", left: "+=5"});

        
    }
           function abortTimer() { // to be called when you want to stop the timer
            clearInterval(timer);

          }
      
});