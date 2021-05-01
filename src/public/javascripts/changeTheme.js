
$(document).ready(function() {
    
    $('#changeTheme').click(function(){
        var newcolor = $("#colorpicker").val();
        $('body').css("color",newcolor)
    })
})