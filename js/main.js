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

$('pre').on('click', function() {
    $(this).selectText();
});

// Generator
var generator = {

    config: {
        resultPreview: '.result-item',
        generatedCode: '#generated-code',
        fields: ['#titulo', '#outro'],
        count: 0
    },

    init: function(config) {
        $.extend(generator.config, config);
        $config = generator.config;
        this.refresh($config);
    },

    refresh: function (config) {
        var getHTMLContent = $($config.resultPreview).html();
        $($config.generatedCode).html(htmlEntities(getHTMLContent));
    },

    autoComplete: function (config) {
        $.extend(generator.config, config);
        $config = generator.config;
        $('.alert').find('strong').text($('#titulo').val());

        if($config.count === 0) {
            $('.alert').find('p').append('<strong>');
            $config.count++;
        }

        this.refresh();
    }

};

generator.init();

$.each(generator.config.fields, function(key, value) {
    $(value).on('keyup', function() {
        generator.autoComplete();
    });
});