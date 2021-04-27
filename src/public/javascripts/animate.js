//Jquery Example

$(document).ready(function() {
    var timer = setInterval(jump, 1);
       
          //  $("#jump").animate({height: '150px',
        //    width: '150px'});
    function jump(){
        $("#jump").animate({left: "+=5"});
        $("#jump").animate({top: "+=10", left: "+=5"});
       // $("#jump").animate({}, 300);
        $("#jump").animate({top: "-=10", left: "+=5"});

        
        //$("#jump").animate({left: "-=300"}, 1000);
        /*$("#jump").animate({ left: '250px',
            opacity: '0.5',
            height: '150px',
            width: '150px'});*/
           // 
           // $("#jump").animate({"opacity": "0.5"}, 500 );
           // $("#jump").animate({"opacity": "0.9"}, 100 );
    }
           function abortTimer() { // to be called when you want to stop the timer
            clearInterval(timer);

          }
      
});