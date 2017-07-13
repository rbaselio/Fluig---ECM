var row, anexos, matr, process, isMobile;

//comportamento do form
function loadElementos(){
	
	$("#dias_manut").mask("000", {reverse: true});
	
	$(':radio[id="nec_material"]').change(function() {
		if ($(this).filter(':checked').val() == 'sim')$("#div_pecas").show();
		if ($(this).filter(':checked').val() == 'nao') {
			$("#div_pecas").hide();
			$("input[id^='quant_pecs___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none"){
					$(this).closest('tr').remove();
				}
			});
		}
	}).trigger('change');
	
	$(".readonly").attr("readOnly", true);
	
	
	setMoneyClass($(".money"));
	setMoneyClass($(".number"));
	setTimeInicial($(".setIni"));
	setTimeFinal($(".setFim"));
	setAvalInicial($(".setIniAval"));
	setAvalFinal($(".setFimAval"));	
	somaHoras();
	
	
	$('#listCcusto').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de Centros de Custos',
		    content: '<div id="postEmb"></div>',
		    id: 'fluig-modal',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {			
			var thisTable = FLUIGC.datatable('#postEmb', {
			    dataRequest: {
			        url: '/api/public/ecm/dataset/search',
			        options: {
			            contentType:"application/json",
			            dataType: 'json',
			            method: 'POST',
			            data: JSON.stringify({"datasetId" : "TOTVSCentroDeCusto","limit" : "0"}),
			            crossDomain: true,
			            cache: false
			        },
			        root: 'content'
			    },
			    renderContent: ['cod_ccusto', 'descricao'], 
			    header: [{'title': 'Cod.'},
			             {'title': 'Descição'}],
			    multiSelect: false,
			    search: {
			        enabled: true,
			        onSearch: function(response) {
			        	$.ajax({
							  type: 'POST',
							  contentType: 'application/json',
							  dataType: 'json',
							  url: '/api/public/ecm/dataset/search',
							  data: JSON.stringify({"datasetId" : "TOTVSCentroDeCusto","limit" : "0", "searchField" : "descricao", "searchValue" : response }),
							  success: function(data) {
								  thisTable.reload(data.content);
							  }
							});
			        }
			    },
			    scroll: {
			        target: '#postEmb',
			        enabled: true			        
		        },
			    tableStyle: 'table-striped'
			}).on('dblclick', function(ev) {
				var index = thisTable.selectedRows()[0];
			    var selected = thisTable.getRow(index);	
			    $('#ccusto').val(selected.cod_ccusto + " - " + selected.descricao);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	
	
}
function addReporte(tabela){
	$(".readonly").attr("readOnly", true);
	row = wdkAddChild(tabela);
	setTimeInicial($("#btn_ini_manut___" + row));
	setTimeFinal($("#btn_fim_manut___" + row));	
}

function setTimeInicial(elemento){
	elemento.on('click', function(){
		var aux = $(this).closest('tr').find("input").eq(1).attr('id').indexOf('___');
		var thisRow = $(this).closest('tr').find("input").eq(1).attr('id').substring(aux + 3);
		if($("#data_ini_manut___" + thisRow).val() == ''){
			dataAtual = new Date();
			$("#data_ini_manut___" + thisRow).val(getData());
			$("#hora_ini_manut___" + thisRow).val(getHora());
		}
	});
}

function setTimeFinal(elemento){
	elemento.on('click', function(){		
		var aux = $(this).closest('tr').find('input').attr('id').indexOf('___');
		var thisRow = $(this).closest('tr').find('input').attr('id').substring(aux + 3);
		if($("#data_ini_manut___" + thisRow).val() != ''){
			var dataini = $("#data_ini_manut___" + thisRow).val().split("/");
			var horaini = $("#hora_ini_manut___" + thisRow).val().split(":");
			var inicio = new Date(dataini[2], dataini[1] - 1, dataini[0], horaini[0], horaini[1], 0, 0);
			
			dataAtual = new Date();		
			$("#data_fim_manut___" + thisRow).val(getData());
			$("#hora_fim_manut___" + thisRow).val(getHora());
						
			var diferenca = Math.abs(inicio - dataAtual)
			var horas = Math.trunc(diferenca / (60 * 60 * 1000));
			var minutos = Math.trunc(((diferenca / (60 * 60 * 1000)) - horas) * 60);
			$("#tempo_rep_manut___" + thisRow).val(("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));
			somaHoras();	
		}
	});	
}

function somaHoras() {	
	var diferenca = 0;
	$("#tempo_manut").val("00:00");
	$("input[id^='tempo_rep_aval___']").each(function(i) {
		var aux = $(this).closest('tr').find("input").eq(1).attr('id').indexOf('___');
		var thisRow = $(this).closest('tr').find('input').attr('id').substring(aux + 3);
		
		var dt_inicio = $("#data_ini_manut___" + thisRow).val().split("/");
		var hora_inicio = $("#hora_ini_manut___" + thisRow).val().split(":");		
		var dataInicio = new Date(dt_inicio[2], dt_inicio[1] - 1, dt_inicio[0], hora_inicio[0], hora_inicio[1], '00')
		
		var dt_final = $("#data_fim_manut___" + thisRow).val().split("/");
		var hora_final = $("#hora_fim_manut___" + thisRow).val().split(":");		
		var dataFinal = new Date(dt_final[2], dt_final[1] - 1, dt_final[0], hora_final[0], hora_final[1], '00')
		
		diferenca += (dataFinal - dataInicio);
		
	});
	horas = (diferenca / (60 * 60 * 1000)) | 0;
	minutos = (((diferenca / (60 * 60 * 1000)) - horas) * 60);		
	$("#tempo_manut").val(("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));	
}

function addAval(tabela){
	$(".readonly").attr("readOnly", true);
	row = wdkAddChild(tabela);
	setAvalInicial($("#btn_ini_aval___" + row));
	setAvalFinal($("#btn_fim_aval___" + row));	
}

function setAvalInicial(elemento){
	elemento.on('click', function(){
		var aux = $(this).closest('tr').find("input").eq(1).attr('id').indexOf('___');
		var thisRow = $(this).closest('tr').find("input").eq(1).attr('id').substring(aux + 3);
		if($("#data_ini_aval___" + thisRow).val() == ''){
			dataAtual = new Date();
			$("#data_ini_aval___" + thisRow).val(getData());
			$("#hora_ini_aval___" + thisRow).val(getHora());
		}
	});
}

function setAvalFinal(elemento){	
	elemento.on('click', function(){
		var aux = $(this).closest('tr').find("input").eq(1).attr('id').indexOf('___');
		var thisRow = $(this).closest('tr').find("input").eq(1).attr('id').substring(aux + 3);		
		if($("#data_ini_aval___" + thisRow).val() != ''){
			var dataini = $("#data_ini_aval___" + thisRow).val().split("/");
			var horaini = $("#hora_ini_aval___" + thisRow).val().split(":");
			var inicio = new Date(dataini[2], dataini[1] - 1, dataini[0], horaini[0], horaini[1], 0, 0);
			
			dataAtual = new Date();		
			$("#data_fim_aval___" + thisRow).val(getData());
			$("#hora_fim_aval___" + thisRow).val(getHora());
						
			var diferenca = Math.abs(inicio - dataAtual)
			var horas = Math.trunc(diferenca / (60 * 60 * 1000));
			var minutos = Math.trunc(((diferenca / (60 * 60 * 1000)) - horas) * 60);
			$("#tempo_rep_aval___" + thisRow).val(("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));
			somaHoras();	
		}
	});	
}

function setMoneyClass(elemento){
	elemento.mask('000.000.000,00', {reverse: true})
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
}



function addLinha(tabela){
	row = wdkAddChild(tabela);
	setMoneyClass($("#quant_pecs___" + row));
	setMoneyClass($("#valor_pecs___" + row));
	$(".smd").attr("readOnly", true);
	
}

function addPecasUtilizadas(tabela){
	row = wdkAddChild(tabela);
	setMoneyClass($("#quant_pecs_utilizadas___" + row));
	setMoneyClass($("#valor_pecs_utilizadas___" + row));	
	
}

function fnCustomDelete(oElement){
    var tr = $(oElement).closest('tr');
    tr.remove();
    somaHoras();
}

function setMoneyClass(elemento){
	elemento.mask('000.000.000,00', {reverse: true})
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
}

function getAnexos(processo) {	
	var c1 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", processo, processo, ConstraintType.MUST);
    var constraints   = new Array(c1);
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("processAttachment", null, constraints, null);
    return dataset.values.length;
}



//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId, mobile) {
	isMobile = mobile;
	matr = matricula;
	process = WKNumProces;
	
	blockAll();
	if(modeView == "ADD" || modeView == "MOD"){		
				
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
	
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;	
		var data = getData();
		var hora = getHora();	
		
		if (numState == 0 || numState == 1){
			showElemento($("#emissao"));
			
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$('#matricula_solic').attr("readOnly", true).val(matr);
			$('#user_solic').attr("readOnly", true).val(usuario);
			$("#data_solic").attr("readOnly", true).val(ramal);
		}
		
		if (numState == 2){
			showElemento($("#preAnalise"));
			$("#num_processo").val(process);
			
			$('#mat_preAnal').attr("readOnly", true).val(matr);
			$('#resp_preAnal').attr("readOnly", true).val(usuario);
			$("#data_preAnal").attr("readOnly", true).val(ramal);
		}
		if (numState == 4){
			showElemento($("#pn_avaliacao"));
			$(".smd").attr("readOnly", true);
			
			$('#matricula_avaliacao').attr("readOnly", true).val(matr);
			$('#user_avaliacao').attr("readOnly", true).val(usuario);
			$("#data_avaliacao").attr("readOnly", true).val(ramal);
		}
		
		if (numState == 12){
			anexos = getAnexos(WKNumProces);
			showElemento($("#cotacao"));	
			$("#pn_exec_manut").hide();
			$('#mat_cotacao').attr("readOnly", true).val(matr);
			$('#resp_cotacao').attr("readOnly", true).val(usuario);
			$("#data_cotacao").attr("readOnly", true).val(ramal);
		}		
		
		if (numState == 8){
			showElemento($("#pn_aprov_manut"));
			$("#pn_exec_manut").hide();
			$("#num_processo").val(process);
			
			$('#matricula_aprov_manut').attr("readOnly", true).val(matr);
			$('#aprov_manut').attr("readOnly", true).val(usuario);
			$("#data_aprov_manut").attr("readOnly", true).val(ramal);	
			
			alert("Para valores e custos, favor consultar as cotações em anexo");
		}
		
		
		
		if (numState == 15){
			showElemento($("#pn_compra"));
			$("#pn_exec_manut").hide();
			
			$('#matricula_compra_manut').attr("readOnly", true).val(matr);
			$('#compra_manut').attr("readOnly", true).val(usuario);
			$("#data_compra_manut").attr("readOnly", true).val(ramal);
			
			$(".smd").removeAttr('readOnly');
		}
		
		if (numState == 20){
			showElemento($("#pn_exec_manut"));	
			
			$('#matricula_exec_manut').attr("readOnly", true).val(matr);
			$('#user_exec_manut').attr("readOnly", true).val(usuario);
			$("#data_exec_manut").attr("readOnly", true).val(ramal);
		}
		
		if (numState == 23){
			showElemento($("#pn_user_aprov_manut"));	
			
			$('#matricula_user_aprov_manut').attr("readOnly", true).val(matr);
			$('#user_aprov_manut').attr("readOnly", true).val(usuario);
			$("#data_user_aprov_manut").attr("readOnly", true).val(ramal);
		}
		
	}
}


//exibe um panel
function showElemento(elemento){	
	elemento.show()
			.css('pointer-events', 'all')
			.find('input[type=text], input[type=zoom], textarea').removeAttr('readOnly');
	
	setTimeout(function () {
		var offset = elemento.offset().top; 
		$('html, body').animate({ scrollTop: offset }, offset);	
	}, 1000);
}
//bloqueia todos os panels para edição 
function blockAll() {
	$('html, body').animate({ scrollTop: 0 }, 5);
	$('.panel').each(function(i) {
		if ($(this).attr('id') != null) {			
			$(this).hide()
					.css('pointer-events', 'none')
					.find('input[type=text], input[type=zoom], textarea')
					.attr("readOnly", true)
					.css('pointer-events', 'all')
					.each(function(){
						if ($(this).val() != "" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) != 0.00) {
							$(this).closest('.panel').show();
						}
					});
		}
	});
}
