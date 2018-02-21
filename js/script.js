function isInArray(item, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return true;
        }
    }
    return false;
}

function sortNumber(a, b) {
    return a - b;
}


$(document).ready(function() {
    var choice = [];
    var results = [];
    
    var choiceSection = $('#choice-section');
    var gameSection = $('#game-section');
    var resultSection = $('#results');
    
    
    // Hide numbers and game button on start
    choiceSection.hide();
    gameSection.hide();
    resultSection.hide();
    
    // Play button click
    $('#play').on('click', function() {
        choiceSection.show();
        gameSection.show();
        $(this).hide();
    });
    
    // Number click
    $('.number').on('click', function() {
        var number = $(this).text();
        
        // add or remove number from choice list
        if (choice.length < 5 && !isInArray(number, choice)) {
            choice.push(number);
            $(this).toggleClass('selected');
            if (choice.length == 5) {
                $('#error-msg p').text('');
            }
        } else if (choice.length <= 5 && isInArray(number, choice)) {
            var idx = choice.indexOf(number);
            choice.splice(idx, 1);
            $(this).toggleClass('selected');
        }
        
        // display choices
        //$('#error-msg p').text(choice.sort() + "\t" + choice.length);
    });
    
    // Game button click
    $('#game').on('click', function() {
        if (choice.length !== 5) {
            $('#error-msg p').text('Please select 5 numbers.');
        } else {
            // Hide number section, error message and game button
            choiceSection.hide();
            $('#error-msg').hide();
            gameSection.hide();
            resultSection.show();
            
            // generate results
            for (var i = 0; i < 5; i++) {
                var rand = Math.floor( (Math.random() * 40) + 1 );
                
                // check if already generated
                while (isInArray(rand, results)) {
                    rand = Math.floor( (Math.random() * 40) + 1 );
                }
                
                results.push(rand);
            }
            results.sort(sortNumber);
            
            // change user's choices to numbers and sort
            for (var i = 0; i < choice.length; i++) {
                choice[i] = parseInt(choice[i]);
            }
            choice.sort(sortNumber);
            
            // calculate guessed numbers
            var guessed = 0;
            for (var i = 0; i < choice.length; i++) {
                if (isInArray(choice[i], results)) {
                    guessed++;
                }
            }
            
            
            // display results
            $('#lottery-result').text(results);
            $('#user-choice').text(choice);
            $('#guessed').text('You guessed ' + guessed + ' out of 5 numbers.');
        }
    });
});