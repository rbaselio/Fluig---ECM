var row, anexos, matr, process, soma,task;

//comportamento do form
function loadElementos(){
	
	
	if (task = 4 || task == 5){
		$(".tipo_despesa").unbind().on('change', function(e) {
			var thisRow = $(this).attr("name").substring($(this).attr("name").lastIndexOf("_") + 1);
			if ($(this).val() == 'outros' ) $("#ccontabil___" + thisRow).val('').removeAttr('readOnly');
			else $("#ccontabil___" + thisRow).val($(this).val()).attr("readOnly", true);		
		}).trigger('change');
	}
	
	
	$('.money').unbind().mask('000.000.000,00', {reverse: true})
				.on('blur', function(){
					if ($(this).val() == '') $(this).val('0,00')
					else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
				}).on('keypress keyup', function(){
					somatorio();					
				}).trigger('blur');
	
	$('.numerico').unbind().mask('000.000.000', {reverse: true})
				  .on('keypress keyup', function(){
					somatorio();					
				  });
	$("#placa").unbind().mask('SSS-0000').css('text-transform', 'uppercase');
	
	numerarLinhas();
	
	$("textarea").unbind().on('keyup input keypress keydown change', function(e) {
		var tamanhoMin =  $(this).attr('rows') * $(this).css('line-height').replace(/[^0-9\.]+/g, '');
		$(this).css({'height': 'auto'});
		var novoTamanho = this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"));
		if (tamanhoMin > novoTamanho) novoTamanho = tamanhoMin;
		$(this).css({'height': novoTamanho});
	}).css({
		'overflow':'hidden', 
		'resize':'none'
	}).delay(0).show(0, function() {
		var el = $(this);
		setTimeout(function () {
			el.trigger('keyup');
		}, 100);		
	});
	
	$('#origem_desp').unbind().on('change', function(e) {
		if ($(this).val() == 'cart_corp') $('.origem').show();
		else $('.origem').hide();
	}).trigger('change');
	
	
	var informaKm = $('#tb_quilometragem').find('tbody').find('tr').length;
	if ( informaKm > 1) $(".informaKm").show();
	else $(".informaKm").hide();
	
	if ( informaKm == 2 && $("#placa").attr("readonly") != "readonly"){
		FLUIGC.message.alert({
		    message: "<strong>Informe quilometragem somente caso tenha utilizado veiculo proprio.</br>" +
		    		"Para veiculos da CASP, não prencher este campos</strong>",
		    title: 'ATENÇÃO!!!',
		    label: 'OK'
		});		
	}
	
	
	FLUIGC.calendar($(".date"), {
		pickDate: true,
	    defaultDate: new Date(),
		showToday: true,
	    language: 'pt-br'
	});
	
	$("#banco_acerto").unbind().on('change', function(e) {
		switch($(this).val()) {
		    case '001':
		    	$("#agencia").val('3362-6');
		    	$("#conta_cor").val('2168-7');
		        break;
		    case '237':
		    	$("#agencia").val('0453-7');
		    	$("#conta_cor").val('2735-9');
		        break;
		    case '033':
		    	$("#agencia").val('0029');
		    	$("#conta_cor").val('013.000023-2');
		        break;
		    case '341':
		    	$("#agencia").val('0014');
		    	$("#conta_cor").val('2730-4');
		        break;
		}	
	}).trigger('change');
	
	
	$('#btZoomColab').unbind().click(function() {
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
			    $("#nome_resp").val(selected.colleagueName);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');	
	});
	
	
	$('.listCcusto').unbind().click(function() {
		var thisRow = $(this).closest('div').find('input').attr("id").split('___')[1];
		if(isNaN(thisRow)) thisRow = "1";
		
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
			    $('#ccusto___' + thisRow).val(selected.cod_ccusto + " - " + selected.descricao);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	$('.listaCidade').unbind().click(function() {
		var origem = $(this).hasClass('cid_origem');
		var thisRow = $(this).closest('div').find('input').attr("id").split('___')[1];
		if(isNaN(thisRow)) thisRow = "1";
		
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
			    if (origem) $('#cidade_origem___' + thisRow).val(selected.cidade + " - " + selected.estado);
			    else $('#cidade_destino___' + thisRow).val(selected.cidade + " - " + selected.estado);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	$('#listBancos').unbind().click(function() {
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
				thisModal.remove();	
				var index = thisTable.selectedRows()[0];
			    var selected = thisTable.getRow(index);	
			    $('#banco').val(selected.Cod_banco + " - " + selected.Banco);
			    $('#conta_cor').val("");
			    $('#agencia').focus().val("");
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	$('#cpf_cnpj').unbind()
				  .mask('0000.000.000-00', {reverse: true})
				  .on('blur', function() {
						if(!isCPFValid($(this).val())){
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
	
	somatorio();
	
	
}

function numerarLinhas(){
	$(".numeracao").remove();
	$('#tb_despesa').find('tr').each(function(indice){
		indice--;
		$(this).find("td:first").prepend("<div class='row numeracao'>" +
											"<div class='col-xs-12' align='left'>" +
												"<label  >" +
												"Desp.: " + ("00" + indice).substr(-3) + 
												"</label>" +
											"</div>" +
										"</div>");	       
	});	
	$('#tb_quilometragem').find('tr').each(function(indice){
		indice--;
		$(this).find("td:first").prepend("<div class='row numeracao'>" +
											"<div class='col-xs-12' align='left'>" +
												"<label  >" +
												"Km.: " + ("00" + indice).substr(-3) + 
												"</label>" +
											"</div>" +
										"</div>");	       
	});
}

//adiciona linha a tabela
function addLinha(tabela){
	row = wdkAddChild(tabela);
	loadElementos();
}

function fnCustomDelete(oElement){
    var tr = $(oElement).closest('tr');
    tr.remove();
    somatorio();
    numerarLinhas();
}


function somatorio(){
	var acumulado = 0.0; 
	var valor;
	
	$('.despesa').each(function() {
		valor = parseFloat($(this).val().replace(/[^\d\,\-]/g, "").replace(",","."));
		if (!isNaN(valor)) acumulado += valor;
	});
	$("#vl_tot_despesa").val(acumulado.toFixed(2)).mask('000.000.000,00', {reverse: true});
	
	var KMacumulado = 0; 
	$('.quilometragem').each(function() {
		valor = parseFloat($(this).val().replace(/[^\d\,\-]/g, "").replace(",","."));
		if (!isNaN(valor)) KMacumulado += valor;
	});	
	$("#km_total").val(KMacumulado.toFixed(0)).mask('000.000.000', {reverse: true});
	
	KMacumulado *= 0.86
	$("#vl_km_devido").val((KMacumulado).toFixed(2)).mask('000.000.000,00', {reverse: true});
	
	acumulado += KMacumulado;	
	$("#vl_tot_geral").val(acumulado.toFixed(2)).mask('000.000.000,00', {reverse: true});
	
	valor = parseFloat($("#vl_prestacao").val().replace(/[^\d\,\-]/g, "").replace(",","."));
	if (isNaN(valor)) valor = 0;
	
	acumulado -= valor;	
	$("#vl_tot_dev").val((acumulado).toFixed(2)).mask('000.000.000,00', {reverse: true});
	
	$('.acerto').hide();
	if (acumulado < 0){
		$('.acerto').show();
		$('.casp').show();
		$('.usuario').hide();		
		$('#agencia').unbind().attr("readOnly", true);
		$('#conta_cor').unbind().attr("readOnly", true);		
	} else if (acumulado > 0){
		$('.acerto').show();
		$('.casp').hide();
		$('.usuario').show();
		if ($("#placa").attr("readonly") != "readonly"){
			$('#agencia').unbind().removeAttr('readOnly').mask('000.000.000', {reverse: true});
			$('#conta_cor').unbind().removeAttr('readOnly').mask('000.000.000-0', {reverse: true});
		}
	}
	
}


//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, processo) {
	matr = matricula;
	process = processo;
	blockAll();
	
	if(modeView == "ADD" || modeView == "MOD"){
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
	
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;	
		var dataAtual = new Date();
		task = numState;
		
		var data = ("0" + dataAtual.getDate()).substr(-2) + "/" + ("0" + (dataAtual.getMonth() + 1)).substr(-2) + "/" + dataAtual.getFullYear();
		var hora = ("0" + dataAtual.getHours()).substr(-2) + ":" + ("0" + (dataAtual.getMinutes())).substr(-2);	
		
		if (numState == 0 || numState == 4){
			showElemento($("#emissao"));	
			
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$('#matricula_solic').val(matricula);
			$('#user_solic').val(usuario);
			$("#data_solic").val(ramal);
			
			$('#matricula_user').val(matricula);
			$('#nome_resp').val(usuario);		
			
			
			setTimeout(function () {
				FLUIGC.message.alert({
				    message: "<strong>O valor à ser informado no referido campo, não é o total de suas despesas, " +
				    		 "mas ao total da fatura no caso de cartão corporativo ou do adiantamento no " +
				    		 "caso de vales solicitados a tesouraria!</strong>",
				    title: 'ATENÇÃO!!!',
				    label: 'OK'
				});	
			}, 2000);
			
			$(':radio[id="prenchimento"]').change(function() {
				if ($(this).filter(':checked').val()){
					if($(this).filter(':checked').val() == 'solic'){
						showElemento($("#pn_prest_contas"));
						$('#matricula_orc').val(matricula);
						$('#user_orc').val(usuario);
						$("#data_orc").val(ramal);
						
						
						
						if ( $('#tb_quilometragem').find('tbody').find('tr').length == 2){
							FLUIGC.message.alert({
							    message: "<strong>Informe quilometragem somente caso tenha utilizado veiculo proprio.</br>" +
							    		"Para veiculos da CASP, não prencher este campos</strong>",
							    title: 'ATENÇÃO!!!',
							    label: 'OK'
							});		
						}
					}
					else $('#pn_prest_contas').hide();
				}
			}).trigger('change');
		}
		
		if (numState == 5){
			showElemento($("#pn_prest_contas"));
			$('#matricula_orc').val(matricula);
			$('#user_orc').val(usuario);
			$("#data_orc").val(ramal);
			
			$(".tipo_despesa").unbind().on('change', function(e) {
				var thisRow = $(this).attr("name").substring($(this).attr("name").lastIndexOf("_") + 1);
				if ($(this).val() == 'outros' ) $("#ccontabil___" + thisRow).val('').removeAttr('readOnly');
				else $("#ccontabil___" + thisRow).val($(this).val()).attr("readOnly", true);		
			}).trigger('change');
			
		}
		
		if (numState == 9){
			showElemento($("#aprovadores"));
			$('#user_aprov_contabil').val(usuario);
			$("#data_aprov_contabil").val(data);	
			
			$("#aprov_imediato").css('pointer-events', 'none');
			$("#desc_aprov_imediato").attr("readOnly", true);
			$("#aprov_dir_fin").css('pointer-events', 'none');
			$("#desc_aprov_dir_fin").attr("readOnly", true);
			$(".tipo_despesa").css('pointer-events', 'all').removeAttr('readOnly');
			
		}
		
		if (numState == 15){
			showElemento($("#aprovadores"));
			$('#user_aprov_imediato').val(usuario);
			$("#data_aprov_imediato").val(data);
			
			$("#aprov_contabil").css('pointer-events', 'none');
			$("#desc_aprov_contabil").attr("readOnly", true);
			$("#aprov_dir_fin").css('pointer-events', 'none');
			$("#desc_aprov_dir_fin").attr("readOnly", true);
		}
		
		if (numState == 21){
			showElemento($("#aprovadores"));
			$('#user_aprov_dir_fin').val(usuario);
			$("#data_aprov_dir_fin").val(data);
			
			$("#aprov_contabil").css('pointer-events', 'none');
			$("#desc_aprov_contabil").attr("readOnly", true);
			$("#aprov_imediato").css('pointer-events', 'none');
			$("#desc_aprov_imediato").attr("readOnly", true);
		}
		
		if (numState == 27){
			showElemento($("#pn_rembolsa"));
			$('#matricula_rembolsa').val(matricula);
			$('#user_rembolsa').val(usuario);
			$("#data_rembolsa").val(data);				
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

var isCPFValid = function(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf == '') return false; 
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;       
    // Valida 1o digito 
    add = 0;    
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11) 
        rev = 0;    
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
    return true;
}
