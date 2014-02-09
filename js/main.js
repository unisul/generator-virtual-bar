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
var fields = ['#titulo', '#descricao', '#link', '#botao', '#botao-link']

function generator(t, v) {

    var value = v
    var tag = t
    var target = $('#generated-code')
    var targetTitle = target.find('.title')
    var targetDescription = target.find('.desc')
    var targetLink = target.find('.link-open')
    var targetLinkClose = target.find('.link-close')
    var targetButton = target.find('.button')
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
        case '#link':
            if(value.length > 0) {
                targetLink.html(htmlEntities('        <a href="') + value + htmlEntities('">'))
                targetLinkClose.html(htmlEntities('        </a>'))
                $('#link-preview').attr('href', value)
            } else {
                targetLink.html(null)
                targetLinkClose.html(null)
                $('#link-preview').removeAttr('href')
            }
            break;
        case '#botao':
            if(value.length > 0) {
                targetButton.html(htmlEntities('        <a href="') + $('#botao-link').val() + htmlEntities('">') + value + htmlEntities('</a>'))
                alertPreview.find('.btn').removeClass('hidden').text(value)
            } else {
                targetButton.html(null)
                alertPreview.find('.btn').addClass('hidden').text(value)
            }
            break;
        case '#botao-link':
            if(value.length > 0) {
                targetButton.html(htmlEntities('        <a href="') + value + htmlEntities('">') + $('#botao').val() + htmlEntities('</a>'))
                alertPreview.find('.btn').attr('href', value)
            } else {
                targetButton.html(htmlEntities('        <a href="') + '#' + htmlEntities('">') + $('#botao').val() + htmlEntities('</a>'))
                alertPreview.find('.btn').attr('href', '#')
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
    alertPreview.removeClass()
    alertPreview.addClass('alert alerta-'+modelSelected)

});

var modelo = $('#modelo').val();
monta(modelo);



$.each(fields, function(key, value) {
    $(value).on('keyup', function() {
        generator($(value)['selector'], $(value).val());
    });
});