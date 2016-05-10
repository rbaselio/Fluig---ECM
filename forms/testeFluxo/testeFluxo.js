var row;

function zoomColaborador(linha) {
	var nome = $(linha).attr("name");
	row = nome.substring(nome.indexOf("___") + 3, nome.length);
	zoomEcmTipo("colleague",
			"colleagueId,Matricula,colleagueName,Colaborador",
			"colleagueId,colleagueName,extensionNr", 
			"Zoom Colaborador",
			"setColaborador");	
}

function setColaborador(selectedItem) {
	$("#matricula___" + row).val(selectedItem['colleagueId']);
	$("#responsavel___" + row).val(selectedItem['colleagueName']);		
}

function addTarefa() {
	row = wdkAddChild('tbatividades');
	FLUIGC.calendar("#dtPickerPrazo___" + row, {
		minDate : new Date(),
		showToday: true,
	    language: 'pt-br',
	    disabledDates: feriados(4),
		daysOfWeekDisabled: [0,6]
	});		
}

function removeTarefa(oElement){		
	var processo =  $(oElement).closest('tr').find("input").eq(3).val();
    if(processo == ""){
    	fnWdkRemoveChild(oElement);	    	
	}else{
		alert("Não é possivel remover tarefas com processos iniciados");	    	  		   		
    }
}


function exibeCampos(mode, state, user, process){
	if (mode == "VIEW"){
		blockAll();
	}
	if(mode == "ADD" || mode == "MOD"){
		
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
		var constraints   = new Array(c1);
		var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		var dadosusuario = dataset.values[0]["colleagueName"];
		var ramal = dataset.values[0]["extensionNr"]; 
		//alert(ramal);
		
		//blockAll();		
	}	
}


function blockAll(){
	$("div").removeAttr("onclick");
	$("div").css('pointer-events', 'none');
	$("span").removeAttr("onclick");
	$("span").css('pointer-events', 'none');
	$("input").attr("readonly","readonly");
	$("select").attr("readonly","readonly");
	$("textarea").attr("readonly","readonly");
	$('select option:not(:selected)').attr('disabled', true);
	$("button").attr("disabled",true);
}

var beforeMovementOptions = function(numState){	
	throw("Erro Xyz");
	
	// throw("Favor preencehr o campo: " + $(this).attr("name"));
	
}






