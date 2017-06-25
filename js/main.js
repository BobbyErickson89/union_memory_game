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
        var image = '<img src="sports-icons/svg/' + card_icons[i] + '.svg" />';

        // Going through each of our cards.  When we come across the first empty card,
        // we will put that icon inside that card.
        $('.card').each(function(){
            if($(this).is(':empty')){
                $(this).prepend(image);
                return false
            }
        });
    }
}



createBoard();