var row, anexos, matr, process, isMobile;

var chaveNF;

//comportamento do form
function loadElementos(){
	
	// get rows as array and detach them from the table
    var rows = $('#tb_cotacoes tr:not(:first)').detach();
    // sort rows by the number in the td with class "pts"
    rows.sort(function (row1, row2) {
    	if ($(row1).find('.chave1').val() < $(row2).find('.chave1').val()) return -1;
    	if ($(row1).find('.chave1').val() > $(row2).find('.chave1').val()) return 1;
    	if ($(row1).find('.chave2').val() < $(row2).find('.chave2').val()) return -1;
    	if ($(row1).find('.chave2').val() > $(row2).find('.chave2').val()) return 1;
    	if ($(row1).find('.chave3').val() < $(row2).find('.chave3').val()) return -1;
    	if ($(row1).find('.chave3').val() > $(row2).find('.chave3').val()) return 1;
    	return 0;
    	
	});
    // add each row back to the table in the sorted order (and update the rank)
    rows.each(function () {
    	$(this).appendTo('#tb_cotacoes');
    });
	
	$("input[id^='ChaveNF']").each(function(i) {
		var chaveNF = $(this);
		$("input[id^='ChaveNF']").each(function(i) {
			if ($(this).val() == chaveNF.val() && !$(this).is(chaveNF)) {
				$(this).closest('div.nota_fiscal').hide();
			}				
		});
		chaveNF.val(chaveNF.val() + " - " + i);	
	});
	
	var aux = "";
	$("input[id^='nrPedido']").each(function(i) {
		if (!(aux == "" || aux != $(this).val())){
			$(this).closest('div.pedido').hide();
		}
		aux = $(this).val();
	});
	
	var aux = "";
	$("input[id^='nrNota']").each(function(i) {
		if (!(aux == "" || aux != $(this).val())){
			$(this).closest('div.nota_fiscal').hide();
		}
		aux = $(this).val();
	});
	
	
	$('#tipoVeiculo').change(function() {
		if ($(this).val() != '') $("#transportador").show();
		else $("#transportador").hide();		
	}).trigger('change');
	
	
	
	if ($('#tipoPedido').val() != "" ) {
		$("#ccusto_contratante").hide();				
	}
	
	setTimeout(function () {
		$("textarea").trigger('keyup');		
	}, 100);
	
	$(".money").mask('#000.000.000,00', {reverse: true})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
	
	$(".quant").mask('000.000.000,0000', {reverse: true})
	.on('blur', function(){
		if ($(this).val() == '') $(this).val('0,0000')
		else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 4) $(this).val($(this).val() + ',0000');
	}).trigger('blur');
	
	
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
			    $('#ccusto_contrat').val(selected.cod_ccusto + " - " + selected.descricao);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	 numerarLinha();
}

function zoomCCustoLinha(linha){
	var nome = $(linha).attr("name");
	row = nome.substring(nome.lastIndexOf("_") + 1);
	
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
		    $("#ccusto_rateio___" + row).val(selected.cod_ccusto + " - " + selected.descricao);
		    thisModal.remove();					    
		});
	});
	$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	
	
}

function numerarLinha(){
	$(".numero_rateio").remove();	
	$('.numeracao_rateio').each(function(indice){ 
		$(this).prepend("<label class='numero_rateio'>" + ("00" + indice).substr(-3) + "</label>");	
	});
}

function removeRateio(tabela){
	fnWdkRemoveChild(tabela);
	numerarLinha();	
}

//adiciona linha a tabela
function addLinha(tabela){
	row = wdkAddChild(tabela);
	numerarLinha();	
	$(".money").mask('000.000.000,00', {reverse: true})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
}

//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId, mobile) {
	isMobile = mobile;
	matr = matricula;
	process = WKNumProces;
	blockAll(modeView);	
	
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
			$(".cotacoesButton").show();
			$("#num_processo").val(process);
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			$('#matricula_emissao').attr("readOnly", true).val(matricula);
			$('#user_amissao').attr("readOnly", true).val(usuario);
			$("#data_emissao").attr("readOnly", true).val(data);			
		}		
		
		if (numState == 3){
			
			showElemento($("#analise"));
			
			$(".cotacoesButton").show();
			$(".cotacoesButton").css('pointer-events', 'all');
			
			$("#tipoPedido").css('pointer-events', 'all');			
			$("#num_processo").val(process);
			$('#matricula_analista').attr("readOnly", true).val(matricula);
			$('#user_analista').attr("readOnly", true).val(usuario);
			$("#data_analista").attr("readOnly", true).val(data);
			
			$("input[id^='fretePed___']").each(function(i) {
				$(this).removeAttr('readOnly');
			});
			if (($('#matricula_emissao').val() != "AUTO") ) {				
				
				showElemento($("#tb_cotacoes"));
				
				$("#divAddButton").show().css('pointer-events', 'all');
				$("#tb_cotacoes").find("tr").each(function(){
					   $(this).find("td:first").show();
				});				
				$('#tipoVeiculo').css('pointer-events', 'all');
				$('#tpRod').css('pointer-events', 'all');
				$('#codTransp').removeAttr('readOnly');
				$('#nomeTransp').removeAttr('readOnly');
				$('#vlCotacao').removeAttr('readOnly');
				
				$('#narrativaNF').removeAttr('readOnly');
				$('#codMelhorTransp').removeAttr('readOnly');
				$('#melhorTransp').removeAttr('readOnly');
				$('#vlMelhor').removeAttr('readOnly');
			}
			
		}
		
		if (numState == 11){
			showElemento($("#pn_contratante"));	
			$('#matricula_contratante').attr("readOnly", true).val(matricula);
			$('#user_contratante').attr("readOnly", true).val(usuario);
			$("#data_contratante").attr("readOnly", true).val(data);
		}
		
		if (numState == 38){
			showElemento($("#pn_cancelamento"));						
			$('#matricula_cancelamento').attr("readOnly", true).val(matricula);
			$('#user_cancelamento').attr("readOnly", true).val(usuario);
			$("#data_cancelamento").attr("readOnly", true).val(data);
		}
		if (numState == 48){
			showElemento($("#checkDados"));					
			$('#matricula_checkDados').attr("readOnly", true).val(matricula);
			$('#user_checkDados').attr("readOnly", true).val(usuario);
			$("#data_checkDados").attr("readOnly", true).val(data);
		}
		if (numState == 52){
			showElemento($("#pn_aprov_checkDados"));						
			$('#matricula_aprov_checkDados').attr("readOnly", true).val(matricula);
			$('#user_aprov_checkDados').attr("readOnly", true).val(usuario);
			$("#data_aprov_checkDados").attr("readOnly", true).val(data);
		}
		if (numState == 59){
			showElemento($("#pn_aprov_final"));						
			$('#matricula_aprov_final').attr("readOnly", true).val(matricula);
			$('#user_aprov_final').attr("readOnly", true).val(usuario);
			$("#data_aprov_final").attr("readOnly", true).val(data);
		}
		if (numState == 29){
			showElemento($("#lancDatasul"));						
			$('#matricula_lancDatasul').attr("readOnly", true).val(matricula);
			$('#user_lancDatasul').attr("readOnly", true).val(usuario);
			$("#data_lancDatasul").attr("readOnly", true).val(data);
		}
		
		
	}	
}

//exibe um panel
function showElemento(elemento){	
	elemento.show()
			.css('pointer-events', 'all')
			.find('input[type=text], input[type=zoom], textarea').each(function(i) {
				if (!$(this).hasClass('readonly')) $(this).removeAttr('readOnly');
			});
	elemento.find('.table').find("tr").each(function(){
				$(this).find("td:first").show();
			})
	elemento.find('.divAddButton').show();
	
	setTimeout(function () {
		var offset = elemento.offset().top; 
		$('html, body').animate({ scrollTop: offset }, offset);	
	}, 1000);
}
//bloqueia todos os panels para edição 
function blockAll(modeView) {
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
		if(modeView == "ADD" || modeView == "MOD"){
			$(this).find('.table').find("tr").each(function(){
				   $(this).find("td:first").hide();
			});
		}
		$(this).find('.divAddButton').hide();
	});
}
	
	
	



