// HELPERS
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

//$('pre').on('click', function() {
//    $(this).selectText();
//});

// Generator
var fields = ['#titulo', '#descricao']

function generator(t, v) {

    var value = v
    var tag = t
    var target = $('#generated-code')
    var targetTitle = target.find('.title')
    var targetDescription = target.find('.desc')
    var alertPreview = $('#alert-preview')

    switch (tag) {
        case '#titulo':
            if(value.length > 0) {
                targetTitle.html(htmlEntities('        <strong>') + value + htmlEntities('</strong>'))
                alertPreview.find('strong').text(value)
            } else {
                targetTitle.html(null)
                alertPreview.find('strong').text('')
            }
            break;
        case '#descricao':
            if(value.length > 0) {
                targetDescription.html(htmlEntities('        <span>') + value + htmlEntities('</span>'))
                alertPreview.find('span').text(value)
            } else {
                targetDescription.html(null)
                alertPreview.find('span').text('')
            }
            break;
        default:
            statements_def
            break;
    }

}

function monta(m) {
    var modelo = m;
    $('#generated-code').find('.init').html(htmlEntities('<div class="alert alerta-'+modelo+'">\n    <button data-dismiss="alert" class="item-close" type="button">×</button>\n    <p>'));
    $('#generated-code').find('.footer').html(htmlEntities('    </p>\n</div>'));
}

$('#modelo').on('change', function() {

    var modelSelected = $('#modelo option:selected').val();

    monta(modelSelected)

    var alertPreview = $('#alert-preview')
    alertPreview.removeClass();
    alertPreview.addClass('alert alerta-'+modelSelected)

});

var modelo = $('#modelo').val();
monta(modelo);



$.each(fields, function(key, value) {
    $(value).on('keyup', function() {
        generator($(value)['selector'], $(value).val());
    });
});