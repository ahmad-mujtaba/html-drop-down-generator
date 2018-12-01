$(document).ready(function () {

    var INTIAL_NO_OF_ITEMS = 3;   
    var html = '';
    for (var i = 0; i < INTIAL_NO_OF_ITEMS;) {
        html += getOptionItem((++i));
    }
    $(".options-editor").html(html);

    loadStyleSheet("https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700");


    $("input").change(function(e){
        //$(".result").fadeOut();
        generateCode();
    });

    $(".add-option").click(function(e){
        $(".options-editor").append(getOptionItem($(".options-editor .option-item").length + 1));
        //$(".result").fadeOut();
        generateCode();
    });

    $(document).on("click", ".delete-option", function(e){
        $(this).parent().parent().remove();
        readjustSequenceNumber();
        //$(".result").fadeOut();
        generateCode();
    });



    $(".generate-code").click(generateCode);

    $(".copy-code").on("click", function(e) {
        $("code").text().copyToClipboard();
    });


});

var generateCode = function(e){
    var code = '';

    
    var multiple = '';
    if($('.options-config-multiline').is(':checked')) {
        multiple += ' multiple=\'multiple\'';
    }
    code += '<select name=\''+$(".options-config-name").val()+'\''+multiple+'>\r\n';
    $(".options-editor .option-item").each(function(i, v) {


        code += '\t<option';

        var title = escapeHtml($(this).find('.option-title input').val());
        if(title.trim() !== '') {
            code += " title='"+title+"'";
        }

        var value = escapeHtml($(this).find('.option-value input').val());
        if(value.trim() !== '') {
            code += " value='"+value+"'";
        }

        var text = escapeHtml($(this).find('.option-text input').val());
        if(text.trim() === '') {
            text = $(this).find('.option-text input').attr('placeholder');
        }

        var selected = $(this).find('.option-selected input').is(':checked');

        selectedAttr = '';
        if(selected) {
            selectedAttr = ' selected=\'selected\'';
        }
        

        code += selectedAttr+'>'+text+'</option>\r\n';


        
    });
    code += '</select>'

    $('.result .preview').html(code);
    $('.result .generated-code code').html(escapeHtml(code));
    Prism.highlightElement($('code')[0]);

    $(".result").fadeIn();
    
    
};

var readjustSequenceNumber = function() {
    $(".options-editor .option-item").each(function(i,v){
        var n = 1+i;
        if($(this).attr("data-sequence") == n) {
            return;    
        } else {
            $(this).attr("data-sequence", n);
            $(this).find(".option-count").html("#"+n);
            $(this).find(".option-text input").attr("placeholder", "Option "+n+" Text");
            $(this).find(".option-value input").attr("placeholder", "option "+n+" value");
            $(this).find(".option-title input").attr("placeholder", "Option "+n+" Title");
        }
    });
}

var getOptionItem = function (n) {
    return `<div class='option-item' data-sequence='`+n+`' data-n='`+n+`'>
        <div class='option-count'>
            #` + n + `
        </div>
        <div class='option-selected'>
            <input type="radio" name='option-selected-radio' value='`+n+`' id='selected-`+n+`'>
            <label for='selected-`+n+`'>default</label>
        </div>
        <div class='option-text'>
            <input type="text" placeholder="Option ` + n + ` Text">
        </div>
        <div class='option-value'>
            <input type="text" placeholder="option ` + n + ` value">
        </div>
        <div class='option-title'>
            <input type="text" placeholder="Option ` + n + ` Title">
        </div>
        <div class='option-controls'>
            <button class='delete-option'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>                
                </svg>
            </button>
        </div>

    </div>`;

}

String.prototype.copyToClipboard = function () {
    var el = document.createElement('textarea');
    el.value = this;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp('\\' + search, 'g'), replacement);
};

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

 function loadStyleSheet(src){
    if (document.createStyleSheet) document.createStyleSheet(src);
    else {
        var stylesheet = document.createElement('link');
        stylesheet.href = src;
        stylesheet.rel = 'stylesheet';
        stylesheet.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    }
}