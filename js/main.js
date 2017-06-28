// function for shuffling the values in an array
function shuffleArray(arr){
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}

//creates a new, blank card board.  Is set off on page load and when users want to play a new game.
function createBoard(){

    // cloning 5 cards into a row
    for(var i = 1; i < 5; i++){
        $('.card:first').clone().appendTo('.row');
    }

    // after cards are cloned into a row, we are cloning 4 rows.
    for(var i = 1; i < 4; i++){
        $('.row:first').clone().appendTo("#board");
    }

    // this is the name of each one of our icons
    var card_icons = [
        "baseball",
        "basketball",
        "bowling",
        "boxing",
        "football",
        "golf",
        "hockey",
        "ping_pong",
        "soccer",
        "tennis"
    ];

    //duplicating all of our icons since we will need 2.
    card_icons = card_icons.concat(card_icons);

    shuffleArray(card_icons);

    for(var i = 0; i < card_icons.length; i++){
        //creating an image tag to place in our card div
        var image = '<img src="sports-icons/svg/' + card_icons[i] + '.svg" data-image="' + card_icons[i] + '"/>';

        // Going through each of our cards.  When we come across the first empty card,
        // we will put that icon inside that card.
        $('.back').each(function(){
            if($(this).is(':empty')){
                $(this).prepend(image);
                return false
            }
        });
    }
}

// will be used in flipCard.  Keeping track of how many times user has flipped cards.
var click_count = 0;

function flipCard(){
    var card = $(this);

    //preventing users from flipping the same card
    if(card.hasClass('flipped')){
        return;
    }
    //once user has clicked card, we increase click_count and flip card
    else {
        click_count++;
        card.addClass('flipped');

        //once user has clicked card twice, we use setTimeout() to flip cards back over after 2 seconds.
        if(click_count >= 2){
            // This is unbinding our flipCard click event from all effect_click classes.
            // It will stop users from being able to flip other cards during setTimeout.
            $('.effect_click').off('click', flipCard);

            setTimeout(function(){
                $('.flipped').removeClass('flipped');
                click_count = 0;
                // re-binding our flipCard click event to our cards.
                $('.effect_click').on('click', flipCard);
            }, 3000);
        }
    }
}

createBoard();

$('.effect_click').on('click', flipCard);



