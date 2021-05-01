
$(document).ready(function() {
    
    $('#changeTheme').click(function(){
        var newcolor = $("#colorpicker").val();
        $('body').css("color",newcolor);
        $('h5').css("color",newcolor);
        
        $('p').css("color",newColor);
    })
})