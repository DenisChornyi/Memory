
var max = 9;
var arr = [];
var hasFlippedCard = false;
var first;
var second;
var lock;
var timeoutID = null;
var Counter = 0;

function flipCard() {
    if (lock) return;
    if ($(this) === first)return;
    if (first && second) return;

    $(this).addClass('flip');

    Counter++;
    $("#counter").html("" + Counter);

    if ($('.main-card').length === $('.main-card.flip').length) {
        $('#main').css('display','none');
        $('.and-game').css('display','block');
    }

    if (!hasFlippedCard){
        hasFlippedCard = true;
        first = $(this);
    } else {
        hasFlippedCard = false;
        second = $(this);
        checkFor();
    }
}
function checkFor(){
    if(first.attr('data-id') === second.attr('data-id')){
        $(first).addClass('open');
        $(second).addClass('open');
        disableCards();
        resetBoard();
        return;
    }
    unflipCards();
}
function disableCards() {
    first.off('click', flipCard);
    second.off('click', flipCard);

}
function unflipCards(){
    if (timeoutID) {
        clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(function(){
        first.removeClass('flip');
        second.removeClass('flip');
        resetBoard();
    },1000);
}
function resetBoard() {
    [hasFlippedCard, lock] = [false, false];
    [first, second] = [null, null];
}

function initBoard() {
    for(var i = 1; i <= max; i++){
        arr.push(i, i);
    }
    arr.sort(() => 0.5 - Math.random());
    console.log(arr);

    $('.main-card').each(function( index ) {
        $(this).attr('data-id', arr[index]);
        $(this).find('.main-card_front').text(arr[index]);
    });
}

function initEvents(){
    $('#hider').click(function() {
        $('#main').css('opacity',1);
        $('#hider').css('display','none');
    });

    $('.main-card').click(flipCard);
}

$(document).ready(function() {
    initBoard();
    initEvents();
});

