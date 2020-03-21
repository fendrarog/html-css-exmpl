$('.lol').on('click', function(){
    $(this).hide();
})


setTimeout(function(){
    $('.lol').toggleClass('lol--active');

    setTimeout(function(){
        $('.lol').toggleClass('lol--active')
    },5000);

},5000)