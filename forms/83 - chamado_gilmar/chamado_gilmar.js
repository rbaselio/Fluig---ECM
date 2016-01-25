$(document).ready(function () {
	
});



function zoomProduto(){
    window.open("/webdesk/zoom.jsp?" +
    		"datasetId=Produtos" +
    		"&dataFields=Produto,Produto,Descricao,Descricao" +
    		"&resultFields=Produto,Descricao" +
    		"&type=produto", 
    		"zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
}

function zoomOcorrencia() {
    window.open("/webdesk/zoom.jsp?" +
    		"datasetId=consulta_criticidade" +
    		"&dataFields=tipo_ocorrencia,Tipo de Ocorrencia" +
    		"&resultFields=tipo_ocorrencia,criticidade,aprovacao_gestor" +
    		"&type=ocorrencia", 
    		"zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
}

function setSelectedZoomItem(selectedItem) {
    if (selectedItem['type'] == "produto") {
    	$("#nm_produto").val(selectedItem['Produto'] + " - " + selectedItem['Descricao']);
    }else if (selectedItem['type'] == "ocorrencia"){
    	$("#nm_tipo_ocorrencia").val(selectedItem['tipo_ocorrencia']);
    	$("#nm_aprova_gestor").val(selectedItem['aprovacao_gestor']);
    	$("#nm_criticidade").val(selectedItem['criticidade']);
    }
}

function exibeCampos(mode, state, user , complete){
	if (mode == "VIEW"){
		blockAll();
	}else{
		if(mode == "ADD" || state == 4){
			$(".ti").hide();
			if(mode == "ADD"){
				preencheDadosSolicitante();
			}
		}else if (state == 8 || state == 20){
			blockAll();
		}else if (state == 17 || state == 18 || state == 19){
			$(".solicitante div").removeAttr("onclick");
			$(".solicitante input").attr("readonly","readonly");
			$(".solicitante select").attr("readonly","readonly");
			$(".solicitante textarea").attr("readonly","readonly");
			$('.solicitante select option:not(:selected)').attr('disabled', true);
		}
	}
}

function preencheDadosSolicitante(){
	$.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        url: '/api/public/social/user/logged/v2',
        async: true,
        success: function (response){
        	$("#nm_solicitante").val(response.content.name);
        }
	});
	$("#dt_data").val(dateBase());
}

function blockAll(){
	$("div").removeAttr("onclick");
	$("span").removeAttr("onclick");
	$("input").attr("readonly","readonly");
	$("select").attr("readonly","readonly");
	$("textarea").attr("readonly","readonly");
	$('select option:not(:selected)').attr('disabled', true);
	$("input:button").attr("disabled",true);
}

var beforeSendValidate = function(numState,nextState){
	if (numState == 4 && nextState == 13){
		$(".obgSolic").each(function(){
			if ($(this).val() == null || $(this).val() == ""){
			    throw("Favor preencehr o campo: " + $(this).attr("name"));
			}
		});
	}
}