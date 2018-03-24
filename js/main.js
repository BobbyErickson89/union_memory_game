/////// VARIABLES //////

let first_card, second_card, timer;
let turn_clicks = 0;
let total_clicks = 0;
let lives = 12;

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
        let image = '<img src="images/sports-icons/svg/' + card_icons[i] + '.svg" data-icon="' + card_icons[i] + '"/>';

        // Going through each of our cards.  When we come across the first empty card,
        // we will put that icon inside that card.
        $('.back').each(function(){
            if($(this).is(':empty')){
                $(this).prepend(image);
                return false
            }
        });
    }

    renderLives();
}

function renderLives(){
    $('#lives').empty();

    for(let i = 0; i < lives; i++){
        let heart = '<img class="hearts" src="images/heart.svg" />';

        $('#lives').prepend(heart);
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
    total_clicks++;

    if(total_clicks === 1){
        startTimer();
    }
    let card = $(this);

    //preventing users from flipping the same card
    if(card.hasClass('flipped')){
        return;
    }
    //once user has clicked card, we increase turn_clicks and flip card
    else {
        turn_clicks++;
        card.addClass('flipped');
        //flipped_card is set to the image's data attribute
        var card_image = card.find('img').data('icon');

        if(turn_clicks < 2){
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

                turn_clicks = 0;
                //re-binding our flipCard event
                $('.effect_click').on('click', flipCard);
            }
            // this else statement is fired when 2 cards have been flipped and they were not a match.
            else {
                $('.effect_click').off('click', flipCard);

                setTimeout(function(){
                    $('.effect_click').removeClass('flipped');
                    turn_clicks = 0;
                    // re-binding our flipCard click event to our cards.
                    $('.effect_click').on('click', flipCard);
                }, 1000);

                // since the user guessed wrong, we are removing one life/heart.  If the user is at zero lives, we
                // give them a game over alert and start a new game.
                lives--;
                if(lives > 0){
                    $('#lives .hearts:last').remove();
                } else {
                    alert('Game Over!');
                    newGame();
                }
            }
        }
    }
}

function startTimer(){
    // we're using Date.now() instead of 0, because setInterval can be unreliable and not fire precisely.
    // Date.now() allows us to keep track of the exact millisecond we started, and the elapsed time it has
    // been whenever setInterval does fire.
    let start_time = Date.now();

    setInterval(function(){
        let elapsed_time = Date.now();
        let minutes = 0;
        let seconds = Math.floor((elapsed_time - start_time) / 1000);

        if(seconds > 59){
            minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
        }

        minutes = ("0" + minutes).slice(-2);
        seconds = ("0" + seconds).slice(-2);

        $('#timer').text(minutes + ':' + seconds);
    }, 1000);
}

function newGame(){
    // re-setting our variables
    first_card = null;
    second_card = null;
    turn_clicks = 0;
    total_clicks = 0;
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




