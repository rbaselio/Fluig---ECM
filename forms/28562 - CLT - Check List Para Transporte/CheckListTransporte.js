var row, anexos, matr, process, isMobile, token;

function getRadioValue(nome){
	var retorno = '';	
	$('input[type=radio][name='+ $(nome).attr('name') + ']').each(function() {
		if ($(this).is(':checked')) {
			switch ($(this).val()) {
			    case 'sim':
			    	retorno = "Sim";
			        break;
			    case 'nao':
			    	retorno =  "Não";
			        break;
			    case 'n_a':
			    	retorno =  "N/A";
			        break;
			    case 'cob_fec':
			    	retorno =  "Coberto Fechado";
			        break;
			    case 'cob_ab':
			    	retorno =  "Coberto Aberto";
			        break;
			    case 'relento':
			    	retorno =  "Ao Relento";
			        break;
			    case 'chuv':
			    	retorno =  "Chuvoso";
			        break;
			    case 'semChuv':
			    	retorno =  "Sem Chuva";
			        break;
			    case 'lona':
			    	retorno =  "Enlonado";
			        break;
			    case 'corda':
			    	retorno =  "Amarrado";
			        break;
			}
		}
	});	
	return retorno; 
	
	
	
	
	
	
	
	
}

//comportamento do form
function loadElementos(){	
	
	$('#abrirFT').click(function() {
		$.ajax({
		    url : "check_list.html",
		    async:false,            //this is the trick
		    success : function(result){
				    	var doctos = "";
				    	$('.docto').each(function() {
				    		if($(this).is(':checked')){
				    			doctos = doctos + " - " + $(this).val();
		                	} 		                	
		                });		                
		                result =  result.replace('#documentos', doctos)
		                				.replace('#process', $("#num_processo").val())
	                					.replace('#transp', $("#nome_transp").val())
		                				.replace('#nome_cliente', $("#nome_dest").val())
		                				.replace('#cnpj_transp', $("#cnpj_transp").val())
		                				.replace('#ord_coleta', $("#ord_coleta").val())
		                				.replace('#email_transp', $("#email_transp").val())
		                				.replace('#cidade_cliente', $("#cidade_cli").val())
		                				.replace('#prop_veiculo', $("#prop_veic").val())
		                				.replace('#linhaProd', $("#unid_negocio").val())
		                				.replace('#motorista', $("#nome_motorista").val())
		                				.replace('#placaCavalo', $("#placa_cavalo").val())
		                				.replace('#placaCarreta', $("#placa_carreta").val())
		                				.replace('#cidade_veiculo', $("#cid_cavalo").val())
		                				.replace('#cpf', $("#cpf_motorista").val())
		                				.replace('#tipoFrete', $("#modNota").val() + " - " + $("#contratante").val() )
		                				.replace('#telefone_contato', $("#tel_motorista").val())
		                				.replace('#habilitacao', $("#cnh_motorista").val())
		                				.replace('#validade', $("#cnh_validade").val())
		                				.replace('#cathabil', $("#cat_cnh").val())
		                				.replace('#horaChega', $("#dt_chegada").val() + " " + $("#hora_chegada").val())
		                				.replace('#horaEntrada', $("#dt_entrada").val() + " " + $("#hora_entrada").val())
		                				.replace('#horaSaida', $("#dt_saida").val() + " " + $("#hora_saida").val())
		                				.replace('#data', $("#dt_saida").val())
		                				
		                				.replace('#pneus1', getRadioValue("#pneus"))
		                				.replace('#obsPneu1', $("#obs_pneus").val())
		                				
		                				.replace('#assoa1', getRadioValue("#i_assoalho"))
		                				.replace('#obsAssoa1', $("#obs_assoalho").val())
		                				.replace('#assoa2', getRadioValue("#i_assoalho_buraco"))
		                				.replace('#obsAssoa2', $("#obs_i_assoalho_buraco").val())
		                				.replace('#assoa3', getRadioValue("#i_assoalho_limpo"))
		                				.replace('#obsAssoa3', $("#obs_i_assoalho_limpo").val())
		                				.replace('#assoa4', getRadioValue("#i_assoalho_molhado"))
		                				.replace('#obsAssoa4', $("#obs_i_assoalho_molhado").val())
		                				.replace('#assoa5', getRadioValue("#i_assoalho_tampas"))
		                				.replace('#obsAssoa5', $("#obs_i_assoalho_tampas").val())
		                				
		                				.replace('#cob1', getRadioValue("#i_cobertura_imper"))
		                				.replace('#obsCob1', $("#obs_i_cobertura_imper").val())
		                				.replace('#cob2', getRadioValue("#i_cobertura_furo"))
		                				.replace('#obsCob2', $("#obs_i_cobertura_furo").val())
		                				.replace('#cob3', getRadioValue("#i_cobertura_limpo"))
		                				.replace('#obsCob3', $("#obs_i_cobertura_limpo").val())
		                				.replace('#cob4', getRadioValue("#i_cobertura_molhado"))
		                				.replace('#obsCob4', $("#obs_i_cobertura_molhado").val())
		                				
		                				.replace('#corda1', getRadioValue("#i_corda"))
		                				.replace('#obsCorda1', $("#obs_i_corda").val())
		                				
		                				.replace('#tipoEntrega', getRadioValue("#entrega"))
		                				.replace('#localCarga', getRadioValue("#i_carregamento"))
		                				.replace('#clima', getRadioValue("#i_clima"))
		                				
		                				.replace('#process_rec', $("#num_processo").val())
		                				.replace('#motorista_rec', $("#nome_motorista").val())
		                				.replace('#cpf_rec', $("#cpf_motorista").val())
		                				.replace('#cliente_rec', $("#nome_dest").val())
		                				.replace('#documentos_rec', doctos);
		                
		                WinPrint = window.open('', 'Check List', 'scrollbars=1,width=700,height=600');
		                WinPrint.document.write(result);
		                WinPrint.document.close();
		                WinPrint.scrollBy(0,50);
		                WinPrint.focus();		               
		               } 
		    });		
	});
	
	
	
	
	$(".soNumeros").mask('000.000.000.000.000', {reverse: true});
	$(".placa").mask('SSS-0000', {reverse: false}).css('text-transform', 'uppercase');
	
	
	
	$(".tel").on('keyup', function(){
		if ($(this).val().length > 12) $(this).mask('(00)00000-0000');
		else $(this).mask('(00)0000-00000');		
	});
	
	
	$(".time").mask('00:00', {reverse: true});
	
	//inicia campo como calendario
	FLUIGC.calendar($(".date"), {
		pickDate: true,
	   defaultDate: new Date(dataAtual.getTime()),
		showToday: true,
	    language: 'pt-br'
	});
	
	$(".cpf").mask('000.000.000-00', {reverse: true})
			.on('blur', function(){
				$('#nome_motorista').val("");
				$('#tel_motorista').val("");
				$('#cnh_motorista').val("");
				$('#cnh_validade').val("");
				$('#cat_cnh').val("");
				$('#placa_cavalo').val("");
				$('#placa_carreta').val("");
				$('#cid_cavalo').val("");
				$('#uf_cavalo').val("");
				$('#tipoVeiculo').val("");
				$('#prop_veic').val("");
				$('#email_transp').val("");
				cpf = $(this);
				if (cpf.val() != '' && !isCPFValid(cpf.val())){
					FLUIGC.message.alert({
					    message: "<strong>Informe um CPF ou CNPJ válidos:</strong><br/>",
					    title: 'CPF / CNPJ inválido',
					    label: 'OK'
					}, function(el, ev) {
						setTimeout(function() {
							cpf.focus();
						}, 100);
					});					
				}
				else{
					
					var constraintCLT1 = DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST);
					var constraintCLT2 = DatasetFactory.createConstraint('cpf_motorista', cpf.val(), cpf.val(), ConstraintType.MUST);
					var datasetCLT = DatasetFactory.getDataset('CLT', null, new Array(constraintCLT1, constraintCLT2), null);
					if (datasetCLT.values.length > 0) {
						$('#nome_motorista').val(datasetCLT.values[0]["nome_motorista"]);
						$('#tel_motorista').val(datasetCLT.values[0]["tel_motorista"]);
						$('#cnh_motorista').val(datasetCLT.values[0]["cnh_motorista"]);
						$('#cnh_validade').val(datasetCLT.values[0]["cnh_validade"]);
						$('#cat_cnh').val(datasetCLT.values[0]["cat_cnh"]);
						$('#placa_cavalo').val(datasetCLT.values[0]["placa_cavalo"]).trigger('keyup').trigger('blur');
						$('#placa_carreta').val(datasetCLT.values[0]["placa_carreta"]);
						$('#tipoVeiculo').val(datasetCLT.values[0]["tipoVeiculo"]);
						$('#prop_veic').val(datasetCLT.values[0]["prop_veic"]);
						$('#email_transp').val(datasetCLT.values[0]["email_transp"]);
					}
				}
			});
	
	
	$("#placa_cavalo").on('blur', function(){
		$('#uf_cavalo').val("");
		$('#cid_cavalo').val("");
		
		
		var constraintCLT1 = DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST);
		var constraintCLT2 = DatasetFactory.createConstraint('placa_cavalo', $(this).val(), $(this).val(), ConstraintType.MUST);
		var datasetCLT = DatasetFactory.getDataset('CLT', null, new Array(constraintCLT1, constraintCLT2), null);
		if (datasetCLT.values.length > 0) {
			$('#cid_cavalo').val(datasetCLT.values[0]["cid_cavalo"]);
			$('#uf_cavalo').val(datasetCLT.values[0]["uf_cavalo"]);
		}
	});
	
	
	
	
	
	$(".cnpj").mask('00.000.000/0000-00', {reverse: true})
	.on('blur', function(){
		cpf = $(this);
		if (cpf.val() != '' && !isCNPJValid(cpf.val())){
			FLUIGC.message.alert({
			    message: "<strong>Informe um CNPJ válidos:</strong><br/>",
			    title: 'CPF / CNPJ inválido',
			    label: 'OK'
			}, function(el, ev) {
				setTimeout(function() {
					cpf.focus();
				}, 100);
			});
			
		}});

	
	$("#cod_dest").on('blur', function(){
		token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];
		var c1 = DatasetFactory.createConstraint("cod_emit", $(this).val().replace(/\D/g, ''), null, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var constraints   = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("TOTVSEmitente", null, constraints, null);
		
		if (dataset.values.length > 0 && dataset.values[0]["nome_emit"] != 'ERRO' ) {		
			$("#nome_dest").val(dataset.values[0]["nome_emit"]);
			$("#cidade_cli").val(dataset.values[0]["cidade"]);
			$("#uf_cliente").val(dataset.values[0]["estado"]);
		}
		else FLUIGC.message.alert({
				    message: "<strong>Cliente ou Fornecedor não cadastrado:</strong><br/>",
					title: 'Emitente invalido',
					label: 'OK'
					}, function(el, ev) {
						setTimeout(function() {
							$("#nome_dest").val("");
							$("#cidade_cli").val("");
							$("#uf_cliente").val("");
							$("#nr_pedcli").val("");							
							$("#cod_dest").focus().val("");
							
						}, 100);
					});
	});
	
	$('#listaTransp').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de bancos',
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
			            data: JSON.stringify({"datasetId" : "TOTVSTransportador","limit" : "0"}),
			            crossDomain: true,
			            cache: false
			        },
			        root: 'content'
			    },
			    renderContent: ['cod_transp', 'nome_transp', 'cidade'], 
			    header: [{'title': 'Cod.', 'size': 'col-sm-2'},
			             {'title': 'Nome', 'size': 'col-sm-4'},
			             {'title': 'Cidade', 'size': 'col-sm-3'}],
			    multiSelect: false,
			    search: {
			        enabled: true,
			        onSearch: function(response) {
			        	$.ajax({
							  type: 'POST',
							  contentType: 'application/json',
							  dataType: 'json',
							  url: '/api/public/ecm/dataset/search',
							  data: JSON.stringify({"datasetId" : "TOTVSTransportador","limit" : "0", "searchField" : "nome_transp", "searchValue" : response }),
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
			    $('#nome_transp').val(selected.nome_transp);
			    $('#cod_transp').val(selected.cod_transp);
			    $('#cnpj_transp').val("");
			    $('#cpf_motorista').val("");
			    if (selected.natureza != 'Pessoa Física') $('#cnpj_transp').val(selected.cgc).trigger('keyup').trigger('blur');
			    else $('#cpf_motorista').val(selected.cgc).trigger('keyup').trigger('blur');
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});	
	
	$('#listaCidadeVeiculo').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de bancos',
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
			    $('#cid_cavalo').val(selected.cidade);
			    $('#uf_cavalo').val(selected.estado);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	$('#listaCidadeCliente').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de bancos',
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
			    $('#cidade_cli').val(selected.cidade);
			    $('#uf_cliente').val(selected.estado);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	$('#listaPedido').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de bancos',
		    content: '<div id="postTabela"></div>',
		    id: 'fluig-modal',
		    size: 'large',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {
			token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];
			var param = {"datasetId" : "TOTVSPedidosCliente", "limit" : "0", 
						"filterFields" : ["cod_emit", $('#cod_dest').val(), "token", token] };
			//, "filter" : {"cod_emit" : "1" , "token" : token}
			console.log(JSON.stringify(param));
			var thisTable = FLUIGC.datatable('#postTabela', {				
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
			    renderContent: ['nr_pedido', 'nr_pedcli'], 
			    header: [{'title': 'Pedido CASP', 'size': 'col-sm-3'},
			             {'title': 'Pedido Cliente', 'size': 'col-sm-3'}],
			    multiSelect: false,
			    search: {
			        enabled: false			        
			    },
			    scroll: {
			        target: '#postTabela',
			        enabled: true			        
		        },
			    tableStyle: 'table-striped'
			}).on('dblclick', function(ev) {
				var index = thisTable.selectedRows()[0];
			    var selected = thisTable.getRow(index);	
			    $('#nr_pedcli').val(selected.nr_pedcli);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
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
			showElemento($("#identificacao"));
			$("#saida").hide();
			
			$("#num_processo").val(process);
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$('#matricula_emit').val(matricula);
			$('#user_emit').val(usuario);
			$("#data_emit").val(ramal);
			
		}
		
		if (numState == 2){
			showElemento($("#inspecao"));
			$("#saida").hide();
			
			$("#num_processo").val(process);
			
			$('#matricula_checklist').val(matricula);
			$('#user_checklist').val(usuario);
			$("#data_checklist").val(data);			
		}
		if (numState == 12){
			showElemento($("#carregamento"));
			$("#saida").hide();
			
			$("#num_processo").val(process);
			
			$('#matricula_fatur').val(matricula);
			$('#user_fatur').val(usuario);
			$("#data_fatur").val(data);	
			
		}
		
		if (numState == 9){
			showElemento($("#saida"));
			$("#num_processo").val(process);
			
			$('#matricula_saida').val(matricula);
			$('#user_saida').val(usuario);
			$("#data_saida").val(data);			
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
	});
}


