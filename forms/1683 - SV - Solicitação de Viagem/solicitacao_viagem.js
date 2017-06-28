var row, isMobile, thisProcesso, moeda;

function loadElementos(){ 
		
	$("#agencia").mask("000000000", {reverse: true});
	$("#conta_cor").mask("000000000-0", {reverse: true});
	
	//atribui formatação numerica ao input text e seta o valor inicial 0.00
	$(".money").mask('000.000.000,00', {reverse: true})
			.on('blur', function(){
				if ($(this).val() == '') $(this).val('0,00')
				else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');
	
	//inicia campo como calendario
	FLUIGC.calendar($(".date"), {
		pickDate: true,
	    minDate :  new Date(dataAtual.getTime()),
		defaultDate: new Date(dataAtual.getTime() + (1 * 24 * 60 * 60 * 1000)),
		showToday: true,
	    language: 'pt-br'
	});
	
	$('#btZoomColab').click(function() {	
		var param = {"datasetId" : "colleague", "limit" : "0", 
				 "filterFields" : ["active", "true"]};
		
		var thisModal = FLUIGC.modal({
		   title: 'Lista de Colaboradores',
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
			            data: JSON.stringify(param),
			            crossDomain: true,
			            cache: false
			        },
			        root: 'content'
			    },
			    renderContent: ['colleagueId', 'colleagueName'], 
			    header: [{'title': 'Matricula', 'size': 'col-sm-2'},
			             {'title': 'Nome', 'size': 'col-sm-5'}],
			    multiSelect: false,
			    search: {
			        enabled: true,
			        searchAreaStyle: 'col-md-9',
			        onSearch: function(response) {
			        	var param2 = {"datasetId" : "colleague", "limit" : "0", 
								"filterFields" : ["active", "true"], 
								"searchField" : "colleagueName", "searchValue" : response };
			        	$.ajax({
							  type: 'POST',
							  contentType: 'application/json',
							  dataType: 'json',
							  url: '/api/public/ecm/dataset/search',
							  data: JSON.stringify(param2),
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
			    $("#matricula_user").val(selected.colleagueId);
			    $("#solicitante").val(selected.colleagueName);	
			    $("#ramal").val("");			    
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');	
	});
	
	$('#listaCidade').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de Cidades',
		    content: '<div id="postTabela"></div>',
		    id: 'fluig-modal',
		    size: 'large',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {			
			var thisTable = FLUIGC.datatable('#postTabela', {
			    dataRequest: {
			        url: '/api/public/ecm/dataset/search',
			        options: {
			            contentType:"application/json",
			            dataType: 'json',
			            method: 'POST',
			            data: JSON.stringify({"datasetId" : "TOTVSCidadeEstado","limit" : "0"}),
			            crossDomain: true,
			            cache: false
			        },
			        root: 'content'
			    },
			    renderContent: ['cidade', 'estado'], 
			    header: [{'title': 'Cidade', 'size': 'col-sm-5'},
			             {'title': 'Estado', 'size': 'col-sm-3'}],
			    multiSelect: false,
			    search: {
			        enabled: true,
			        onSearch: function(response) {
			        	$.ajax({
							  type: 'POST',
							  contentType: 'application/json',
							  dataType: 'json',
							  url: '/api/public/ecm/dataset/search',
							  data: JSON.stringify({"datasetId" : "TOTVSCidadeEstado","limit" : "0", "searchField" : "cidade", "searchValue" : response }),
							  success: function(data) {
								  thisTable.reload(data.content);
							  }
							});
			        }
			    },
			    scroll: {
			        target: '#postTabela',
			        enabled: true			        
		        },
			    tableStyle: 'table-striped'
			}).on('dblclick', function(ev) {
				var index = thisTable.selectedRows()[0];
			    var selected = thisTable.getRow(index);	
			    $('#cidade').val(selected.cidade);
			    $('#estado_pais').val(selected.estado);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
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
	
	$('#listBancos').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de Bancos FEBRABAN',
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
			            data: JSON.stringify({"datasetId" : "bancosWebservice","limit" : "0"}),
			            crossDomain: true,
			            cache: false
			        },
			        root: 'content'
			    },
			    renderContent: ['Cod_banco', 'Banco'], 
			    header: [{'title': 'Cod.'},
			             {'title': 'Descrição'}],
			    multiSelect: false,
			    search: {
			        enabled: true,
			        onSearch: function(response) {
			        	$.ajax({
							  type: 'POST',
							  contentType: 'application/json',
							  dataType: 'json',
							  url: '/api/public/ecm/dataset/search',
							  data: JSON.stringify({"datasetId" : "bancosWebservice","limit" : "0", "searchField" : "Banco", "searchValue" : response }),
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
			    $('#banco').val(selected.Cod_banco + " - " + selected.Banco);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	
	$("#div_verba").hide()
	$(':radio[id="nec_adiant"]').change(function() {
		if ($(this).filter(':checked').val() == 'sim'){
			$("#div_verba").show();		
			if ($('#cpf_cnpj').val() == "") {
				FLUIGC.message.alert({
				    message: "Caso necessite de valores em espécie, preencha os dados normalmente e em seguida clique em recibo, imprima e encaminhe o documento a tesouraria",
				    title: 'Emissão de recibo',
				    label: 'OK'
				});
			}
		}
		if ($(this).filter(':checked').val() == 'nao') $("#div_verba").hide();
	}).trigger('change');
	
	$("#viagem").hide()
	$(':radio[id="nec_hosp"]').change(function() {
		showViagem()	
	}).trigger('change');
	$(':radio[id="nec_voo"]').change(function() {
		showViagem()	
	}).trigger('change');
	$(':radio[id="nec_veiculo"]').change(function() {
		showViagem()	
	}).trigger('change');
	
	function showViagem(){
		if ($(':radio[id="nec_hosp"]').filter(':checked').val() == 'sim' ||
			$(':radio[id="nec_voo"]').filter(':checked').val() == 'sim' ||
			$(':radio[id="nec_veiculo"]').filter(':checked').val() == 'sim'){
				$("#viagem").show();				
			}
		else $("#viagem").hide();
	}
	
	
	//verifica a necessidade de veiculo e oculta ou exibe a div de acordo com a necessidade
	$("#div_veiculo").hide();
	$(':radio[id="nec_veiculo"]').change(function() {
		if ($(this).filter(':checked').val() == 'sim') $("#div_veiculo").show();
		if ($(this).filter(':checked').val() == 'nao') $("#div_veiculo").hide();
	}).trigger('change');
	
	
	//verifica a necessidade de hotel e oculta ou exibe as div's de acordo com a necessidade
	$(':radio[id="nec_hosp"]').change(function() {
		if ($(this).filter(':checked').val() == 'sim'){
			$("#tabela_hotel").show();
			$("#selecao_hotel").show();
		}
		if ($(this).filter(':checked').val() == 'nao'){
			$("#tabela_hotel").hide();
			$("#selecao_hotel").hide();
		}
	}).trigger('change');
	
	//verifica a necessidade de voo e oculta ou exibe as div's de acordo com a necessidade
	$(':radio[id="nec_voo"]').change(function() {
		if ($(this).filter(':checked').val() == 'sim'){
			$("#tabela_voo").show();
			$("#selecao_voo").show();
		} 
		if ($(this).filter(':checked').val() == 'nao'){
			$("#tabela_voo").hide();
			$("#selecao_voo").hide();
		}
	}).trigger('change');
	
	$(':radio[id="nec_veiculo"]').change(function() {		
		
		if ($(this).filter(':checked').val() == 'sim' && $("#origem").val() == 'locacao'){
			$("#tabela_veiculo").show();
			$("#selecao_veiculo").show();
		} 
		if ($("#origem").val() != 'locacao'){
			$("#tabela_veiculo").hide();
			$("#selecao_veiculo").hide();
		}
	}).trigger('change');
	
	//verifica o tipo de adiantamento, dinheiro, deposito ou mix e oculta ou exibe a div de acordo com a necessidade
	$("#vl_dep_mix").hide();
	$("#dados_deposito").hide();
	$('#btn_recibo').hide();
	$(':radio[id="nec_tipo"]').change(function() {
		switch($(this).filter(':checked').val()) {
		    case 'deposito':
		    	$("#vl_dep_mix").hide();
		    	$("#dados_deposito").show()
		    	$('#btn_recibo').hide();
		        break;
		    case 'dep_mix':
		    	$("#vl_dep_mix").show();
		    	$("#dados_deposito").show();
		    	$('#btn_recibo').show();
		        break;
		    case 'dinheiro':
		    	$("#vl_dep_mix").hide();
		    	$("#dados_deposito").hide();
		    	$('#btn_recibo').show();
		        break;
		}
	}).trigger('change');
	
	var myCalendar = FLUIGC.calendar($("#dtPicker_retirada"), {
		pickDate: true,
	    showToday: true,
	    daysOfWeekDisabled: [0,6],
	    disabledDates: feriados(2),
	    language: 'pt-br'
	});
	
	
	$(':radio[id="moeda"]').change(function() {
		var diasUteis = 1;		
		if ($(this).filter(':checked').val() == 'real') {
			diasUteis = 1;
			moeda = "reais";
		}
		if ($(this).filter(':checked').val() == 'dolar') {
			diasUteis = 3;
			moeda = "dolares";
		}		
		var date = somaDiasUteis(dataAtual, diasUteis);
		myCalendar.setMinDate(date);
		myCalendar.setDate(date);			
	});
	
	//quando se trata de reserva de veiculo da frota, seta a mascara para placa do veiculo
	$('#origem').change(function() {
		if ($(this).val() == 'frota') $("#veiculo").mask('SSS-0000').css('text-transform', 'uppercase');			
		else $("#veiculo").unmask();		
	}).trigger('change');
	
	//formata campo para cpf ou cnpj e valida o dado
	//a função de validação esta na lib utils.js na pasta resources do fluig
	$('#cpf_cnpj').on('focusin blur keyup', function() {
		$(this).unmask();
		var dado = $(this).val().replace(/[^\d]+/g,'');
		if (dado.length > 11 ) $(this).mask('00.000.000/0000-00', {reverse: true});
		else $(this).mask('0000.000.000-00', {reverse: true});
	}).on('blur', function() {
		if(!isCNPJValid($(this).val()) && !isCPFValid($(this).val())){
			FLUIGC.message.alert({
			    message: "<strong>Informe um CPF ou CNPJ válidos:</strong><br/>",
			    title: 'CPF / CNPJ inválido',
			    label: 'OK'
			}, function(el, ev) {
				setTimeout(function() {
					$('#cpf_cnpj').focus().val("");
				}, 100);
			});
		} 
	});	
	
	$(".time").mask("000:99", {reverse: true})
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0:00')
			else if ($(this).val().substring($(this).val().lastIndexOf(":")).length <= 2) $(this).val($(this).val() + ':00');
		}).trigger('blur');
	
	
	
	$('#recibo').on('click', function() {
		
		meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
		 
		var mywindow = window.open('', 'emissao');
        mywindow.document.write('<html><head><title>Recibo</title>');
        mywindow.document.write('</head><body >');
        
        mywindow.document.write('<h1 style="text-align: center;">Solicita&ccedil;&atilde;o de valores e recibo</h1>');
        mywindow.document.write('<p>&nbsp;</p>');
        mywindow.document.write('<p>Amparo, ' + ('0' + dataAtual.getDate()).substr(-2) +  ' de ' + meses[dataAtual.getMonth()]+ ' de ' + dataAtual.getFullYear() + '</p>');
        mywindow.document.write('<p>&nbsp;</p>');
        mywindow.document.write('<p>Eu ' + $('#user_emissor').val() + ' conforme solicita&ccedil;&atilde;o eletronica ' + $('#num_processo').val() + ' solicito a quantia de ' + $('#vl_adiant').val() + ' ' + moeda + ' em espécie, a fim de realiza&ccedil;&atilde;o de atividades externa.</p>');
        mywindow.document.write('<p>&nbsp;</p>');
        mywindow.document.write('<p>Tamb&eacute;m me comprometro a realizar a devida presta&ccedil;&atilde;o de contas quando do meu retorno.</p>');
        mywindow.document.write('<p>&nbsp;</p>');
        mywindow.document.write('<p style="text-align: right;">Atenciosamente</p>');
        mywindow.document.write('<p style="text-align: right;">&nbsp;</p>');
        mywindow.document.write('<p style="text-align: right;">&nbsp;</p>');
        mywindow.document.write('<p style="text-align: right;">__________________________</p>');
        mywindow.document.write('<p style="text-align: right;">' + $('#user_emissor').val() + '</p>');
        mywindow.document.write('<p style="text-align: right;">CPF:' + $('#cpf_cnpj').val() + '</p>');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();	
		
	});
	
}




function addOpcoes(tabela){
	row = wdkAddChild(tabela);
	//atribui formatação numerica ao input text em itens pai-filho e seta o valor inicial 0.00
	$(".money").mask('000.000.000,00', {reverse: true})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
	}).trigger('blur');	
	
	$(".time").mask("000:99", {reverse: true})
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0:00')
			else if ($(this).val().substring($(this).val().lastIndexOf(":")).length <= 2) $(this).val($(this).val() + ':00');
		}).trigger('blur');
	
}



//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId, mobile) {
	isMobile = mobile;
	thisProcesso = WKNumProces;
	
	blockAll();	
	
	//$('#recibo').css('pointer-events', 'all');
	//$('#myTab a:first').tab('show');
	
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
			
			$('#matricula_emissor').val(matricula);
			$('#user_emissor').val(usuario);
			$("#ramal_emissor").val(ramal);
			
			if ($('#matricula_user').val() == ""){
				$('#matricula_user').val(matricula);
				$('#solicitante').val(usuario);	
				$("#ramal").val(ramal);
			}			
		}
		
		if (numState == 4){
			showElemento($("#aprov_imediato"));			
			$("#num_processo").val(WKNumProces);
			
			$('#matricula_aprov_imediato').val(matricula);
			$('#user_aprov_imediato').val(usuario);
			$("#data_aprov_imediato").val(data);
			
		}
		
		if (numState == 8){
			showElemento($("#aprov_diretoria"));
			
			$('#matricula_aprov_diretoria').val(matricula);
			$('#user_aprov_diretoria').val(usuario);
			$("#data_aprov_diretoria").val(data);
			
		}
		
		if (numState == 71){
			
			showElemento($("#entrega_verba"));
			$("#cotacao").hide();
			$("#selecao").hide();
			$("#aprov_imediato2").hide();
			$("#compra").hide();
			
			$("#num_processo").val(WKNumProces);
			$('#matricula_entrega').val(matricula);
			$('#user_entrega').val(usuario);
			$("#data_entrega").val(data);
			
			
			
		}
		
		if (numState == 12){
			
			showElemento($("#cotacao"));
			$("#entrega_verba").hide();
			$('#matricula_cotacao').val(matricula);
			$('#user_cotacao').val(usuario);
			$("#data_cotacao").val(data);
			
		}
		
		if (numState == 14){
			showElemento($("#selecao"));
			$("#entrega_verba").hide();
			$('#matricula_selecao').val(matricula);
			$('#user_selecao').val(usuario);
			$("#data_selecao").val(data);
			
		}
		
		if (numState == 16){
			showElemento($("#aprov_imediato2"));
			$("#entrega_verba").hide();
			
			$('#matricula_aprov_imediato2').val(matricula);
			$('#user_aprov_imediato2').val(usuario);
			$("#data_aprov_imediato2").val(data);
			
		}		
		
		if (numState == 24){
			showElemento($("#compra"));
			if($('#origem').val() == 'locacao') {
				showElemento($("#veiculos"));
				$('#matricula_compra_veic').val(matricula);
				$('#user_compra_veic').val(usuario);
				$("#data_compra_veic").val(data);
			}
			$("#entrega_verba").hide();
			$('#matricula_compra').val(matricula);
			$('#user_compra').val(usuario);
			$("#data_compra").val(data);
			
		}
		
		if (numState == 98) {
			showElemento($("#veiculos"));
			$('#matricula_compra_veic').val(matricula);
			$('#user_compra_veic').val(usuario);
			$("#data_compra_veic").val(data);
			$("#entrega_verba").hide();			
		}
		
		
		if (numState == 26) {
			
			setTimeout(function () {
				var offset = $("#entrega_verba").offset().top; 
				$('html, body').animate({ scrollTop: offset }, offset);	
			}, 1000);
			
			
			var vl_adiant = parseFloat($('#vl_adiant').val().replace(/[^0-9\,]+/g,"").replace(",","."));
			var vl_adiant_dep = parseFloat($('#vl_adiant_dep').val().replace(/[^0-9\,]+/g,"").replace(",","."));
			var adiantamento = parseFloat($("#vl_fornec").val().replace(/[^0-9\,]+/g,"").replace(",","."));
		
		   if (adiantamento  != (vl_adiant + vl_adiant_dep)) {
			   $('#desc_entregue').val( "Valor entregue difere do valor solicitado.\n\n" + $('#desc_entregue').val());
		   }
		   
		}
		
		
		
		
		
	}	
}

//posiciona o tela de acordo com a posição do elemento
//habilita elementos do panel para edição
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
	});
}


/*
//validação dos campos
var beforeSendValidate = function(numState){
	var message = "";
	
	
	if (numState == 0 || numState == 1){
		
		if ($("#destino").val() == '') message += "<br/>- Informe do destino da viagem;";
		if ($("#cidade").val() == '') message += "<br/>- Informe a cidade destino da viagem;";
		if ($("#estado_pais").val() == '') message += "<br/>- Informe o estado destino da viagem;";
		
		if(!$('#motivo:checked').val()) message += "<br/>- Informe o motivo da viagem;";
				
	
if ($("#ccusto").val() == '') message += "<br/>- Informe o centro de custo;";
		
		if ($("#descricao").val() == '') message += "<br/>- Descreva o motivo da viagem;"; 
		
		if(!$('#nec_adiant:checked').val()) message += "<br/>- Informe o necessidade de verba;";
		if(!$('#nec_veiculo:checked').val()) message += "<br/>- Informe o necessidade de veiculo;";
		if(!$('#nec_hosp:checked').val()) message += "<br/>- Informe a necessidade estadia;";
		if(!$('#nec_voo:checked').val()) message += "<br/>- Informe a necessidade vôo;";
		
		if ($('#nec_veiculo:checked').val() == "sim") {
			if($("#origem").val() == '') message += "<br/>- Informe o tipo do veículo;";			
		}
		
		//verificação se a data de retorno é menor que a data de ida
		if (FLUIGC.calendar("#dtPickerPrazo_partida").getDate() > FLUIGC.calendar("#dtPickerPrazo_retorno").getDate()) message += "<br/>- A data de retorno é anterior a data de partida;";
		
		//caso seja necessario adiantamento
		if($('#nec_adiant:checked').val() == 'sim'){
			if(!$('#nec_tipo:checked').val()) message += "<br/>- O tipo de adiantamento;";
			if(!$('#moeda:checked').val()) message += "<br/>- Informe a moeda de adiantamento;";
			
			if ($("#vl_adiant").val() == '') message += "<br/>- Informe o valor do adiantamento;";
			
			if (FLUIGC.calendar("#dtPicker_retirada").getDate() > FLUIGC.calendar("#dtPickerPrazo_partida").getDate()) message += "<br/>- A data de liberação da verba deve ser anterior a data de partida;";
			
			if ($("#cpf_cnpj").val() == '') message += "<br/>- Informe o CPF ou CNPJ para deposito;";
			var vl_adiant = parseFloat($('#vl_adiant').val().replace(/[^0-9\,]+/g,"").replace(",","."));
			var vl_adiant_dep = parseFloat($('#vl_adiant_dep').val().replace(/[^0-9\,]+/g,"").replace(",","."));
			
			//validações para os tipo de adiantamento
			switch($('#nec_tipo:checked').val()) {
			    case 'dinheiro':
			    	if (vl_adiant  == 0) message += "<br/>- Informe o valor do adiantamento";
			    	if (vl_adiant > 200 && $('#moeda:checked').val() == 'real') message += "<br/>- Não é permitido valores em dinheiro superior a 200,00";
			    	if (vl_adiant > 2000 && $('#moeda:checked').val() == 'dolar') message += "<br/>- Não é permitido valores de adiantamento superior a 2000,00";
			        break;
			    case 'dep_mix':
			    	if (vl_adiant  == 0) message += "<br/>- Informe o valor do adiantamento em dinheiro";
			    	if (vl_adiant_dep  == 0) message += "<br/>- Informe o valor do adiantamento para deposito";
			    	if (vl_adiant > 200) message += "<br/>- Não é permitido valores em dinheiro superior a 200,00";
			    	if (vl_adiant_dep + vl_adiant  > 2000) message += "<br/>- Não é permitido valores de adiantamento superior a 2000,00";
			    	if ($("#banco").val() == '') message += "<br/>- Informe o banco para deposito;";
					if ($("#agencia").val() == '') message += "<br/>- Informe a agencia para deposito;";
					if ($("#conta_cor").val() == '') message += "<br/>- Informe a conta para deposito;";
			    	break;
			    case 'deposito':
			    	if (vl_adiant  == 0) message += "<br/>- Informe o valor do adiantamento";
			    	if (vl_adiant > 2000) message += "<br/>- Não é permitido valores de adiantamento superior a 2000,00";
			    	if ($("#banco").val() == '') message += "<br/>- Informe o banco para deposito;";
					if ($("#agencia").val() == '') message += "<br/>- Informe a agencia para deposito;";
					if ($("#conta_cor").val() == '') message += "<br/>- Informe a conta para deposito;";
					break;	
			}
		}
	}	
	
	if (numState == 4){	
		if ($('#aprov_imediato:checked').val() == "nao" && $("#desc_aprov_imediato").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	
	if (numState == 8){	
		if ($('#aprov_diretoria:checked').val() == "nao" && $("#desc_aprov_diretoria").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	
	if (numState == 71){
		
		if (!$('#especie').is(':checked') && isMobile == 'false' && anexos >= getAnexos(thisProcesso) ) message += "<br/>- É necessario incluir o comprovante de entrega;";
		
		var vl_adiant = parseFloat($('#vl_adiant').val().replace(/[^0-9\,]+/g,"").replace(",","."));
		var vl_adiant_dep = parseFloat($('#vl_adiant_dep').val().replace(/[^0-9\,]+/g,"").replace(",","."));
		var adiantamento = parseFloat($("#vl_fornec").val().replace(/[^0-9\,]+/g,"").replace(",","."));
		
		if (adiantamento  == 0) message += "<br/>- Informe o valor do adiantamento";

		var difValor = "O valor entregue é diferente do valor socilitado!\n";
		$('#desc_entregue').val($('#desc_entregue').val().replace(difValor, ""));
		if (adiantamento  != (vl_adiant + vl_adiant_dep)) {
			$('#desc_entregue').val( difValor + $('#desc_entregue').val());
		}
	}
	
	if (numState == 12){
		
		if (isMobile == 'false' && anexos >= getAnexos(thisProcesso) ) message += "<br/>- É necessario incluir o comprovante de cotação;";
		
		if($('#nec_hosp:checked').val() == 'sim'){
			$("input[id^='hotel___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Nome do hotel na linha" + $(this).closest('tr').index();
				}
			});
			$("input[id^='end_hotel___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Endereço do hotel na linha" + $(this).closest('tr').index();
				}
			});
			$("input[id^='val_hotel___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == ""){
					message += "<br/>- Valor do Hotel na linha" + $(this).closest('tr').index();
				}
			});			
		}
			
		if($('#nec_voo:checked').val() == 'sim'){
			$("input[id^='voo___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Vôo de ida na linha" + $(this).closest('tr').index();
				}
			});
			$("input[id^='aeroporto___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Aeroporto de ida na linha" + $(this).closest('tr').index();
				}
			});
			$("input[id^='voo_valor___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00){
					message += "<br/>- Valor do vôo ida na linha" + $(this).closest('tr').index();
				}
			});	
			
			$("input[id^='voo_volta___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Vôo de volta na linha" + $(this).closest('tr').index();
				}
			});
			$("input[id^='aeroporto_volta___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
					message += "<br/>- Aeroporto de volta na linha" + $(this).closest('tr').index();
				}
			});
			$("input[id^='voo_valor_volta___']").each(function(i) {
				if ($(this).closest('tr').attr('style') != "display:none" && parseFloat($(this).val().replace(/[^0-9\,]+/g,"").replace(",",".")) == 0.00){
					message += "<br/>- Valor do vôo volta na linha" + $(this).closest('tr').index();
				}
			});	
		}	
	}
	
	if (numState == 14){	
		if($('#nec_hosp:checked').val() == 'sim'){
			if($("#hotel_select").val()=='') message += "<br/>- Selecione uma opção de hotel;";
			if($("#val_hotel_select").val()=='') message += "<br/>- Informe o valor do hotel;";
			if($("#just_hotel").val()=='') message += "<br/>- Justifique a opção de hotel;";
		}
		
		if($('#nec_voo:checked').val() == 'sim'){
			if($('#voo_select').val() == '') message += "<br/>- Selecione uma opção de vôo de ida;";
			if($('#val_voo_select').val() == '') message += "<br/>- Informe o valor de ida;";
			if($('#just_voo').val() == '') message += "<br/>- Justifique a opção de vôo;";			
		}
	}
	
	if (numState == 16){
		if ($('#aprov_imediato2:checked').val() == "nao" && $("#desc_aprov_imediato2").val() == '') message += "<br/>- Informe motivo da rejeição;";
	}
	
	if (numState == 24){		
		if (isMobile == 'false' && anexos >= getAnexos(thisProcesso) ) message += "<br/>- É necessario incluir o comprovante de reserva;";
		if($('#origem').val() == 'locacao') {
			if($("#veiculo").val() == '') message += "<br/>- Informe a placa ou reserva do veiculo;";
			if($("#locadora").val() == '') message += "<br/>- Informe a modelo ou locadora do veiculo;";			
		}
	}	
	
	if (numState == 98 && $('#origem').val() == 'frota') {
		if($("#veiculo").val() == '') message += "<br/>- Informe a placa ou reserva do veiculo;";
		if($("#locadora").val() == '') message += "<br/>- Informe a modelo ou locadora do veiculo;";			
	}
	
	if (message != ""){
		FLUIGC.message.alert({
		    message: "<strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message,
		    title: 'CAMPOS OBRIGATÓRIOS',
		    label: 'OK'
		});
		return false;
					
	}
	return true;
	
	
}
var beforeMovementOptions = beforeSendValidate;*/