// HTML Entities
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

jQuery.fn.selectText = function(){
    var doc = document;
    var element = this[0];
    console.log(this, element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();        
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

$('pre').on('click', function() {
    $(this).selectText();
});

var contentBar = $('.result-item').html();
$('#generated-code').html(htmlEntities(contentBar));

// Event keyup/type
$('#titulo').keyup(function() {
    
    $('.alert').find('strong').text($('#titulo').val());

    var contentBar = $('.result-item').html();
	$('#generated-code').html(htmlEntities(contentBar));

});

