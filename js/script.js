function isInArray(item, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == item) {
            return true;
        }
    }
    return false;
}


$(document).ready(function() {
    var choice = [];
    var results = Array();
    
    // Hide numbers and game button on start
    $('#choice-section').hide();
    $('#game').hide();
    
    // Play button click
    $('#play').on('click', function() {
        $('#choice-section').show();
        $('#game').show();
        $(this).hide();
    });
    
    // Number click
    $('.number').on('click', function() {
        var number = $(this).text();
        
        // add or remove number from choice list
        if (choice.length < 5 && !isInArray(number, choice)) {
            choice.push(number);
            $(this).toggleClass('selected');
        } else if (choice.length <= 5 && isInArray(number, choice)) {
            var idx = choice.indexOf(number);
            choice.splice(idx, 1);
            $(this).toggleClass('selected');
        }
        
        // display choices
        $('#error-msg p').text(choice.sort() + "\t" + choice.length);
    });
    
    // Game button click
    $('#game').on('click', function() {
        if (choice.length !== 5) {
            $('#error-msg p').text('Please select 5 numbers.');
        } else {
            // Hide number section and game button
            $('#choice-section').hide();
            $(this).hide();
        }
    });
});