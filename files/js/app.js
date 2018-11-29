$(document).ready(function () {

    var INTIAL_NO_OF_ITEMS = 4;
    // var NO_OF_FIELDS=3;


    // $("#addMore,#tFootBtn").on("click",function(){

    //     no_of_inputs=$("#genI input").length;
    //     $(".noOpts").html((no_of_inputs/NO_OF_FIELDS)+1);
    //     if(!$("#preview").hasClass("old")) {
    //         $("#preview,#code").addClass("old");
    //     }
    //     if(no_of_inputs%NO_OF_FIELDS===0) {
    //         no_of_opts=no_of_inputs/NO_OF_FIELDS;
    //         $("#genI").append("<tr>");
    //         $("#genI tr").eq(no_of_opts).append("<td><input class='text' type='text' name='text"+(no_of_opts+1)+"'></td>", "<td class='val'><input class='value' type='text' name='val"+(no_of_opts+1)+"'></td>","<td><input class='title' type='text' name='title"+(no_of_opts+1)+"'></td>");
    //     }
    //     else { // inputs were not added correctly as they are always to be added in triples
    //         alert("Error");
    //     }

    // });//end addMore

    // $("#less").on("click",function(){
    //     no_of_inputs=$("#genI input").length;



    //     if((no_of_inputs/NO_OF_FIELDS)>1) {
    //         if(!$("#preview").hasClass("old")) {
    //             $("#preview,#code").addClass("old");
    //         }
    //         $("#genI input").eq((no_of_inputs)-1).detach();
    //         $("#genI input").eq((no_of_inputs-1)-1).detach();
    //         $("#genI input").eq((no_of_inputs-2)-1).detach();
    //         $("#genI tr").eq((no_of_inputs/NO_OF_FIELDS)-1).detach();
    //         $(".noOpts").html((no_of_inputs/NO_OF_FIELDS)-1);
    //     }
    // }); // end less


    // $("#generate").on("click",function(){
    //     no_of_inputs=$("#genI input").length;
    //     $(".noOpts").html(no_of_inputs/NO_OF_FIELDS);

    //     code="<select name='"+$("#variable").val()+"' ";
    //     if(document.getElementById("multi").checked) {code+=" multiple='multiple' ";}
    //     code+=">";

    //     for(i=0;i<no_of_inputs;i=i+NO_OF_FIELDS) {
    //         tempText=$("#genI input").eq(i).val();
    //         tempVal=$("#genI input").eq(i+1).val();
    //         tempTitle=$("#genI input").eq(i+2).val();

    //         if(tempText===''){tempText="Option "+((i/NO_OF_FIELDS)+1);}
    //         if(tempTitle===''){tempTitle=tempText}
    //         if(tempVal===''){tempVal=tempText}

    //         code+="\n\t<option title='"+tempTitle+"' value='"+tempVal+"'>"+tempText+"</option>";
    //     }
    //     code+="\n</select>";
    //     $("#previewInner,#code").html(code);

    //     $("#preview,#code").removeClass("old");

    //     $.ajax("log.php",{
    //         type:"POST",
    //         data: {code: code},
    //         success: function(d){
    //             console.log(d);
    //         },
    //         error : function(a,b,c){
    //             console.error(a+b+c);
    //         }
    //     });

    // });// end generate

    // $(".copy-btn").on('click', function(e){

    //     copyToClipboard($("#code").html().replaceAll("&lt;", "<").replaceAll("&gt;", ">"));
    //     $(".copy-action-info").show();
    //     setTimeout(function(){
    //         $(".copy-action-info").fadeOut(2000);
    //     }, 1000)

    // });


    var html = '';
    for (var i = 0; i < INTIAL_NO_OF_ITEMS; ++i) {
        html += getOptionItem((1 + i));
    }
    $(".options-editor").html(html);


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
                x
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