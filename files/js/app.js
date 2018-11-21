$(document).ready(function(){
    var NO_OF_FIELDS=3;
    
    
    $("#addMore,#tFootBtn").on("click",function(){
        
        no_of_inputs=$("#genI input").length;
        $(".noOpts").html((no_of_inputs/NO_OF_FIELDS)+1);
        if(!$("#preview").hasClass("old")) {
            $("#preview,#code").addClass("old");
        }
        if(no_of_inputs%NO_OF_FIELDS===0) {
            no_of_opts=no_of_inputs/NO_OF_FIELDS;
            $("#genI").append("<tr>");
            $("#genI tr").eq(no_of_opts).append("<td><input class='text' type='text' name='text"+(no_of_opts+1)+"'></td>", "<td class='val'><input class='value' type='text' name='val"+(no_of_opts+1)+"'></td>","<td><input class='title' type='text' name='title"+(no_of_opts+1)+"'></td>");
        }
        else { // inputs were not added correctly as they are always to be added in triples
            alert("Error");
        }
        
    });//end addMore
    
    $("#less").on("click",function(){
        no_of_inputs=$("#genI input").length;
        
        
        
        if((no_of_inputs/NO_OF_FIELDS)>1) {
            if(!$("#preview").hasClass("old")) {
                $("#preview,#code").addClass("old");
            }
            $("#genI input").eq((no_of_inputs)-1).detach();
            $("#genI input").eq((no_of_inputs-1)-1).detach();
            $("#genI input").eq((no_of_inputs-2)-1).detach();
            $("#genI tr").eq((no_of_inputs/NO_OF_FIELDS)-1).detach();
            $(".noOpts").html((no_of_inputs/NO_OF_FIELDS)-1);
        }
    }); // end less
    
    
    $("#generate").on("click",function(){
        no_of_inputs=$("#genI input").length;
        $(".noOpts").html(no_of_inputs/NO_OF_FIELDS);
        
        code="<select name='"+$("#variable").val()+"' ";
        if(document.getElementById("multi").checked) {code+=" multiple='multiple' ";}
        code+=">";
        
        for(i=0;i<no_of_inputs;i=i+NO_OF_FIELDS) {
            tempText=$("#genI input").eq(i).val();
            tempVal=$("#genI input").eq(i+1).val();
            tempTitle=$("#genI input").eq(i+2).val();
            
            if(tempText===''){tempText="Option "+((i/NO_OF_FIELDS)+1);}
            if(tempTitle===''){tempTitle=tempText}
            if(tempVal===''){tempVal=tempText}
            
            code+="\n\t<option title='"+tempTitle+"' value='"+tempVal+"'>"+tempText+"</option>";
        }
        code+="\n</select>";
        $("#previewInner,#code").html(code);
        
        $("#preview,#code").removeClass("old");
        
    });// end generate
    
    
    
});