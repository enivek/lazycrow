
/**
 * Get actual text in the card. (Ignore text from children).
 */
function getTextInCard(cardHtmlElem) {
    var textInCard = $(cardHtmlElem).clone().children().remove().end().text();
    return textInCard;
}


/**
 * Match a number in the card.
 */
function getMatchNumber(cardHtmlElem, beginChar, endChar) {
    var result = null;
    try {
        var textInCard = getTextInCard(cardHtmlElem);
        var beginIndex = textInCard.lastIndexOf(beginChar);
        var endIndex = textInCard.lastIndexOf(endChar) + 1;
        if( beginIndex >= 0 ) {
            var match = textInCard.slice(beginIndex, endIndex);
            if( match ) {
                var numberAsString = match.slice(1, -1);
                result = parseFloat(numberAsString);
            }
        }
    } catch( error ) {
    }
    return result;
}


/**
 * Get the estimated card.
 */
function getEstimated(cardHtmlElem) {
    return getMatchNumber(cardHtmlElem, '(', ')');
}


/**
 * Get the completed card.
 */
function getCompleted(cardHtmlElem) {
    return getMatchNumber(cardHtmlElem, '[', ']');
}


/**
 * Compute total completed and total estimated.
 */
function computeForAllCards(allCardsElem) {
    var totalCompleted = 0;
    var totalEstimated = 0;
    allCardsElem.each(function() { 
    
        var textInCard = getTextInCard(this);
        var estimated = getEstimated(this);
        var completed = getCompleted(this);
        
        if( estimated ) {
            totalEstimated += estimated;
            totalEstimated = Math.round(100*totalEstimated)/100;
        }
        
        if( completed ) {
            totalCompleted += completed;
            totalCompleted = Math.round(100*totalCompleted)/100;
        }
        
    }); 
    return [totalEstimated, totalCompleted];    
}


/**
 * Display for all cards.
 */
function displayForAllCards() {
    
    var allCards = $("span.js-card-name");
    
    var values = computeForAllCards(allCards);
    var totalEstimated = values[0];
    var totalCompleted = values[1];

    var htmlEstimated = "<div class='estimated indicator'>" + totalEstimated + "</div>";
    var htmlCompleted = "<div class='completed indicator'>" + totalCompleted + "</div>";
    var htmlTotals = "<div class='board-header-btns mod-right board_overall'>" + htmlCompleted + htmlEstimated + "</div>";

    $("div.board-header").append(htmlTotals);
    
}


/**
 * Display all lists.
 */
function displayForAllLists() {

    var allLists = $("div.js-list-content");
    allLists.each(function() {
        
        var title = $(this).find("h2").text();
        var allCards = $(this).find(".js-card-name");
        var values = computeForAllCards(allCards);
        var totalEstimated = values[0];
        var totalCompleted = values[1];
        
        var htmlEstimated = "<div class='estimated indicator'>" + totalEstimated + "</div>";
        var htmlCompleted = "<div class='completed indicator'>" + totalCompleted + "</div>";
        var htmlTotals = "<div class='list_overall'>" + htmlCompleted + htmlEstimated + "</div>";
        $(this).find("textarea").after(htmlTotals);
        
    });
 
}

$(document).ready(function() {
    displayForAllLists();
    displayForAllCards();
});
























