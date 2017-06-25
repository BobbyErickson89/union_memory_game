function createBoard(){

    // cloning 5 cards into a row
    for(var i = 1; i < 5; i++){
        $('.card:first').clone().appendTo('.row');
    }

    // after cards are cloned into a row, we are cloning 4 rows.
    for(var i = 1; i < 4; i++){
        $('.row:first').clone().appendTo("#board");
    }
}



createBoard();