/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
	$(document).on('focus', ".datePicker", function () {
        if ($(this).get(0).nodeName === "INPUT" && $(this).attr("readonly") != "readonly") {
            $(this).datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: 'dd/mm/yy',
                dayNames: ['Domingo', 'Segunda', 'Ter?a', 'Quarta', 'Quinta', 'Sexta', 'S?bado', 'Domingo'],
                dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
                dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S?b', 'Dom'],
                monthNames: ['Janeiro', 'Fevereiro', 'Mar?o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                minDate: '01/01/2015', //opicional
                maxDate: '31/12/2015', //opicional
                autoSize: false
            });
        }
    });
    
    $("#cb_tipo").change(function(){
    	if ($(this).val() == "Uniformes"){
    		$('.obgRH2').removeAttr('readonly');
    	}else{
    		$('.obgRH2').attr('readonly','readonly');
    		$('.obgRH2').val("");
    	}
    });

});

function intItem() {
    linha = wdkAddChild('solic_itens');
    if ($("#cb_tipo").val() == "Uniformes"){
		$('.obgRH2').removeAttr('readonly');
	}else{
		$('.obgRH2').attr('readonly','readonly');	
	}
	$('.aprovRhTi option:not(:selected)').attr('disabled', true);
    $('#nm_linha_item').val(linha);
}

function zoomProduto(obj) {
    window.open("/webdesk/zoom.jsp?datasetId=sc_produtos&dataFields=Cod,Codigo,Desc,Descricao,UM,UM&resultFields=Cod,Desc,UM&type=" + $(obj).prev("input").attr("name") + "&filterValues=metadata_active," + "" + "-" + $('#nm_cod_grupo').val() + "-" + $('#nm_cod_subgrupo').val(), "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
}

function zoomLoja() {

    window.open("/webdesk/zoom.jsp?datasetId=filial&dataFields=Cod,Codigo,Desc,Descricao,Endereco,Endereco&resultFields=Cod,Desc,Endereco&type=Filial", "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");

}

function zoomGrupo() {
	if (qtdFilhos() > 0 && $("#nm_cod_grupo").val() != ""){
		if (confirm("Você já possui itens referenciados a um grupo, fazer a alteração do grupo irá limpar o grid de itens, deseja continuar?")){
			removeFilhos()
			window.open("/webdesk/zoom.jsp?datasetId=grupo_produto&dataFields=Cod,Codigo,Desc,Descricao&resultFields=Cod,Desc&type=Grupo&filterValues=metadata_active," + $('#nm_cod_loja').val(), "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
		}
	}else{
		window.open("/webdesk/zoom.jsp?datasetId=grupo_produto&dataFields=Cod,Codigo,Desc,Descricao&resultFields=Cod,Desc&type=Grupo&filterValues=metadata_active," + $('#nm_cod_loja').val(), "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
	}

}


function zoomColleague() {

    window.open("/webdesk/zoom.jsp?datasetId=user_protheus&dataFields=Cod,Codigo,Desc,Nome&resultFields=Cod,Desc&type=colleague", "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");

}

function refazRegra() {

}

function setSelectedZoomItem(selectedItem) {
    var info = selectedItem.type.split("___");
    if (selectedItem['type'] == "Filial") {
        $("#nm_cod_loja").val(selectedItem['Cod']);
        $("#nm_loja").val(selectedItem['Desc']);
        $("#nm_end_entrega").val(selectedItem['Endereco']);
    } else if (selectedItem['type'] == "Grupo") {
        $("#nm_cod_grupo").val(selectedItem['Cod']);
        $("#nm_grupo").val(selectedItem['Desc']);
    } else if (selectedItem['type'] == "SubGrupo") {
        $("#nm_cod_subgrupo").val(selectedItem['Cod']);
        $("#nm_subgrupo").val(selectedItem['Desc']);
    } else if (info[0] == "nm_produto") {
        $('#nm_cod_prod___' + info[1]).val(selectedItem["Cod"]);
        $('#nm_produto___' + info[1]).val(selectedItem["Desc"]);
        $('#nm_um___' + info[1]).val(selectedItem["UM"]);
    } else if (selectedItem['type'] == "colleague") {
        $("#nm_cod_func_epi").val(selectedItem['Cod']);
        $("#nm_func_epi").val(selectedItem['Desc']);
        getGestor(selectedItem['Cod']);
    }
}


function getGestor(cod) {
	var c1 = DatasetFactory.createConstraint("PROTHEUS", cod, cod, ConstraintType.MUST);

    var constraints = new Array(c1);        
    var dataset = DatasetFactory.getDataset("user_protheus", null, constraints, null);
    var i = 0;
    if (dataset.values.length > 0){
    	cod = dataset.values[0].Cod;
    	$("#nm_cod_func_epi").val(dataset.values[0].Cod);
    }else{
    	alert("Não foi possivel identificar o usuario fluig correspondente ao usuario protheus selecionado");
    	return false;
    }
	$.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        url: '/api/public/social/user/'+cod,
        async: true,
        success: function (response){
        	if (response.userData.gestor == null){
        		alert("Não foi possivel identificar o usuario fluig correspondente ao usuario protheus selecionado");
        		$("#nm_gestor").val("");
            	$("#nm_cod_func_epi").val("");
            	$("#nm_func_epi").val("");
        	}else{
        		$("#nm_gestor").val(response.userData.gestor);
        	}
        },
        error: function(response){
        	alert("Não foi possivel identificar o usuario no fluig");
        	$("#nm_gestor").val("");
        	$("#nm_cod_func_epi").val("");
        	$("#nm_func_epi").val("");
        }
    });	
	/*
	var c1 = DatasetFactory.createConstraint("PROTHEUS", cod, cod, ConstraintType.MUST);

    var constraints = new Array(c1);        
    var dataset = DatasetFactory.getDataset("gestor_sql", null, constraints, null);
    var i = 0;
    if (dataset.values.length > 0){
    	$("#nm_gestor").val(dataset.values[0].GESTOR);
    }else{
    	alert("Não foi possivel identificar o usuario fluig correspondente ao usuario protheus selecionado");
    	$("#nm_gestor").val("");
    	$("#nm_cod_func_epi").val("");
    	$("#nm_func_epi").val("");
    }
    */
}

function qtdFilhos(){
	var contador = 0;
	var linhas = 0;
	$(".table tr").each(function(){  
		contador++;
        if (contador > 2){
        	linhas++;
        }
     });
	return linhas++;
}

function removeFilhos(){
    var contador = 0;
    $(".table tr").each(function(){ 
       contador++;
       if (contador > 2){
        fnWdkRemoveChild(this); 
       }
    });
}
