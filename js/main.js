/////// VARIABLES //////

let first_card, second_card;
let click_count = 0;

// will be used in awardPoint.  Keeps track of player points.
let player1 = 0;
let player2 = 0;
let gameTurn = 0;




//////// FUNCTIONS ///////

// function for shuffling the values in an array
function shuffleArray(arr){
    let j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}

//creates a new, blank card board.  Is set off on page load and when users want to play a new game.
function createBoard(){

    // creating our basic row
    let empty_row =
        "<div class='row'>" +
            "<div class='card effect_click'>" +
                "<div class='front'></div>" +
                "<div class='back'></div>" +
            "</div>" +
        "</div>";

    // placing that row in our board
    $('#board').append(empty_row);

    // cloning 5 cards into a row
    for(let i = 1; i < 5; i++){
        $('.card:first').clone().appendTo('.row');
    }

    // after cards are cloned into a row, we are cloning 4 rows.
    for(let i = 1; i < 4; i++){
        $('.row:first').clone().appendTo("#board");
    }

    // this is the name of each one of our icons
    let card_icons = [
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

    for(let i = 0; i < card_icons.length; i++){
        //creating an image tag to place in our card div
        let image = '<img src="sports-icons/svg/' + card_icons[i] + '.svg" data-icon="' + card_icons[i] + '"/>';

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

function awardPoint(){
    if(gameTurn % 2){
        player1++;
        $('#player1').text(player1);
    }
    else {
        player2++;
        $('#player2').text(player2);
    }
}

function flipCard(){
    let card = $(this);

    //preventing users from flipping the same card
    if(card.hasClass('flipped')){
        return;
    }
    //once user has clicked card, we increase click_count and flip card
    else {
        click_count++;
        card.addClass('flipped');
        //flipped_card is set to the image's data attribute
        var card_image = card.find('img').data('icon');

        if(click_count < 2){
            first_card = card_image;
        }
        // if this is the second card flipped, we check to see if the cards match
        else {
            second_card = card_image;
            gameTurn++;
            if(second_card === first_card){
                // awardPoint();  Commenting out awardPoint because we're disabling 2 player for now.
                //unbinding the click event
                $('.effect_click').off('click', flipCard);
                //removing the effect_click class, that way the matching cards cannot be clicked/flipped again.
                $('.flipped').removeClass('effect_click');

                click_count = 0;
                //re-binding our flipCard event
                $('.effect_click').on('click', flipCard);
            }
            // this else statement is fired when 2 cards have been flipped and they were not a match.
            else {
                $('.effect_click').off('click', flipCard);

                setTimeout(function(){
                    $('.effect_click').removeClass('flipped');
                    click_count = 0;
                    // re-binding our flipCard click event to our cards.
                    $('.effect_click').on('click', flipCard);
                }, 1500);
            }
        }
    }
}

function newGame(){
    // re-setting our variables
    first_card = null;
    second_card = null;
    click_count = 0;
    player1 = 0;
    player2 = 0;
    gameTurn = 0;

    // reset our board and the player's scores.
    $('#board').empty();
    $('.player-score').empty();

    // re-create board and bind flipCard click event
    createBoard();
    $('.effect_click').on('click', flipCard);
}

$(document).ready(function(){
    createBoard();
    $('.effect_click').on('click', flipCard);
    $('#new-game').on('click', newGame);
});




