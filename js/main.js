// HELPERS
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

// GENERATOR VIRTUAL BAR
// @author github.com/diogomoretti
var s,
GeneratorVirtualBar = {

    settings: {
        fields: ['#titulo', '#descricao', '#link', '#botao', '#botao-link'],
        barModel: $('#modelo'),
        target: $('#generated-code'),
        alertPreview: $('#alert-preview'),
        linkPreview: $('#link-preview'),
        modelSelected: $('#modelo option:selected').val()
    },

    init: function() {
        s = this.settings;
        this.setModel(s.modelSelected);
    },

    setModel: function (v) {
        s = this.settings;
        s.target.find('.init').html(this.convertoToHTMLEntities('<div class="alert alerta-' + v + '">\n    <button data-dismiss="alert" class="item-close" type="button">×</button>\n    <p>'));
        s.target.find('.footer').html(this.convertoToHTMLEntities('    </p>\n</div>'));
        s.alertPreview.removeClass();
        s.alertPreview.addClass('alert alerta-' + v);
    },

    generate: function (t, v) {
        var value = v, 
            tag = t;

        switch (tag) {
            case '#titulo':
                if(value.length > 0) {
                    s.target.find('.title').html(this.convertoToHTMLEntities('        <strong>') + value + this.convertoToHTMLEntities('</strong>'))
                    s.alertPreview.find('strong').text(value)
                } else {
                    s.target.find('.title').html(null)
                    s.alertPreview.find('strong').text('')
                }
                break;
            case '#descricao':
                if(value.length > 0) {
                    s.target.find('.desc').html(this.convertoToHTMLEntities('        <span>') + value + this.convertoToHTMLEntities('</span>'))
                    s.alertPreview.find('span').text(value)
                } else {
                    s.target.find('.desc').html(null)
                    s.alertPreview.find('span').text('')
                }
                break;
            case '#link':
                if(value.length > 0) {
                    s.target.find('.link-open').html(this.convertoToHTMLEntities('        <a href="') + value + this.convertoToHTMLEntities('">'))
                    s.target.find('.link-close').html(this.convertoToHTMLEntities('        </a>'))
                    s.linkPreview.attr('href', value)
                } else {
                    s.target.find('.link-open').html(null)
                    s.target.find('.link-close').html(null)
                    s.linkPreview.removeAttr('href')
                }
                break;
            case '#botao':
                if(value.length > 0) {
                    s.target.find('.button').html(this.convertoToHTMLEntities('        <a href="') + $('#botao-link').val() + this.convertoToHTMLEntities('">') + value + this.convertoToHTMLEntities('</a>'))
                    s.alertPreview.find('.btn').removeClass('hidden').text(value)
                } else {
                    s.target.find('.button').html(null)
                    s.alertPreview.find('.btn').addClass('hidden').text(value)
                }
                break;
            case '#botao-link':
                if(value.length > 0) {
                    s.target.find('.button').html(this.convertoToHTMLEntities('        <a href="') + value + this.convertoToHTMLEntities('">') + $('#botao').val() + this.convertoToHTMLEntities('</a>'))
                    s.alertPreview.find('.btn').attr('href', value)
                } else {
                    s.target.find('.button').html(this.convertoToHTMLEntities('        <a href="') + '#' + this.convertoToHTMLEntities('">') + $('#botao').val() + this.convertoToHTMLEntities('</a>'))
                    s.alertPreview.find('.btn').attr('href', '#')
                }
                break;
            default:
                return false;
                break;
        }
    },

    convertoToHTMLEntities: function (str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    changeModel: function () {
        var v = $(this)[0]['value'];
        GeneratorVirtualBar.setModel(v);
    }

};

// Add Events
GeneratorVirtualBar.settings.barModel.on('change', GeneratorVirtualBar.changeModel);

$.each(GeneratorVirtualBar.settings.fields, function(key, value) {
    $(value).on('keyup', function() {
        GeneratorVirtualBar.generate($(value)['selector'], $(value).val());
    });
});

$('pre').on('click', function() {
    $(this).selectText();
});

// Init GeneratorVirtualBar
GeneratorVirtualBar.init();