var row, anexos, matr, process, isMobile, token;

//comportamento do form
function loadElementos(){
	
	$(".soNumeros").each(function(){$(this).mask('000.000.000', {reverse: true});});
	$(".NCM").each(function(){$(this).mask('0000.00.00', {reverse: true});});
	setMoneyClass($(".money"));	
	
	for (i = 1; i <= $('#tb_itens_nota tr').length; i++){
		initCompoents(i);		
	}
	
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
			        searchAreaStyle: 'col-sm-9',
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
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	
	$('#listaEmb').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de bancos',
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
			            data: JSON.stringify({"datasetId" : "TOTVSEmbalagem","limit" : "0"}),
			            crossDomain: true,
			            cache: false
			        },
			        root: 'content'
			    },
			    renderContent: ['embalagem'], 
			    header: [{'title': 'Descrição'}],
			    multiSelect: false,
			    search: {
			        enabled: true,
			        searchAreaStyle: 'col-md-9',
			        onSearch: function(response) {
			        	$.ajax({
							  type: 'POST',
							  contentType: 'application/json',
							  dataType: 'json',
							  url: '/api/public/ecm/dataset/search',
							  data: JSON.stringify({"datasetId" : "TOTVSEmbalagem","limit" : "0", "searchField" : "embalagem", "searchValue" : response }),
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
			    $('#tpEmbalagem').val(selected.embalagem);
			    $('#embSigla').val(selected.sigla_emb);			   
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	$("#cod_emitente").on('blur', function(){
		var c1 = DatasetFactory.createConstraint("cod_emit", $(this).val().replace(/\D/g, ''), null, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var constraints   = new Array(c1, c2);
		var dataset = DatasetFactory.getDataset("TOTVSEmitente", null, constraints, null);	
		if (dataset.values.length > 0) {		
			$("#nome_emitente").val(dataset.values[0]["nome_emit"]);
			$("#cep_emitente").val(dataset.values[0]["cep"]).trigger('keyup');
			$("#end_emitente").val(dataset.values[0]["endereco"]);
			$("#cid_emitente").val(dataset.values[0]["cidade"]);
			$("#uf_emitente").val(dataset.values[0]["estado"]);			
			if (dataset.values[0]["natureza"] == 'Pessoa Jurídica') $("#pessoaNota").val("juridica").trigger('change')
			else $("#pessoaNota").val("fisica").trigger('change');
			$("#cnpj_emitente").val(dataset.values[0]["cgc"]).trigger('keyup').trigger('blur');
			$("#insc_emitente").val(dataset.values[0]["ins_estadual"]);
			$("#natOper_emitente").val(dataset.values[0]["nat_operacao"]).trigger('blur');
			$("#destNota").val(dataset.values[0]["tipo"].substring(0, 1));
		}
		else FLUIGC.message.alert({
				    message: "<strong>Cliente ou Fornecedor não cadastrado:</strong><br/>",
					title: 'Emitente invalido',
					label: 'OK'
					}, function(el, ev) {
						setTimeout(function() {
							$("#cod_emitente").focus().val();
							$("#nome_emitente").val("");
							$("#cep_emitente").val("");
							$("#end_emitente").val("");
							$("#cid_emitente").val("");
							$("#uf_emitente").val("");
							$("#pessoaNota").val("").trigger('change');
							$("#cnpj_emitente").val("");
							$("#insc_emitente").val("");
							$("#natOper_emitente").val("");
							$("#destNota").val("");
						}, 100);
					});
	});
	
	$("#natOper_emitente").on('blur', function(){
		var subc1 = DatasetFactory.createConstraint("nat_oper", $(this).val(), null, ConstraintType.MUST);
		var subc2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var subconstraints   = new Array(subc1, subc2);
		var dataset = DatasetFactory.getDataset("TOTVSNaturOper", null, subconstraints, null);
		if (dataset.values.length > 0) {
			$("#tipoNota").val(dataset.values[0]["tipo"]);
			$("#desc_nat").val(dataset.values[0]["denominacao"]);
		}
		else FLUIGC.message.alert({
				    message: "<strong>Cliente ou Fornecedor não cadastrado:</strong><br/>",
					title: 'Emitente invalido',
					label: 'OK'
					}, function(el, ev) {
						setTimeout(function() {
							$("#tipoNota").val("");	
						}, 100);
					});
		if ($(this).val() == "" || $("#tipoNota").val() == "ERRO") {
			$("#tipoNota").val("");
			$("#desc_nat").val("");
		}
	}).css('text-transform', 'uppercase');
	
	
	$("#cep_emitente").mask('00000-000', {reverse: true})
	.on('blur', function(){
		FLUIGC.message.confirm({
			    message: "<strong>Atualiza endereço pelo CEP?</strong><br/>",
			    title: 'Origem do Endereço',
			    labelYes: 'Sim',
			    labelNo: 'Não'
			}, function(result, el, ev) {
				if (result == true)  {
					var subdataset = DatasetFactory.getDataset("consultaCEP", null, new Array(DatasetFactory.createConstraint("cep", $("#cep_emitente").val(), null, ConstraintType.MUST)), null);
					if (subdataset.values.length > 0) {	
						 $("#end_emitente").val(subdataset.values[0]["logradouro"] + (subdataset.values[0]["complemento"] ? ", " + subdataset.values[0]["complemento"] : '') );
			             $("#cid_emitente").val(subdataset.values[0]["localidade"]);
			             $("#uf_emitente").val(subdataset.values[0]["uf"]);
					}
					$("#end_emitente").focus();
					this.close();	
				}
			});
	});
	
	$("#cnpj_emitente").on('focusin', function(){$(this).select();})
	.on('blur', function(){	
		if($(this).val() == "") return true;
		if (($("#pessoaNota").val() == "juridica" && !isCNPJValid($(this).val()))
				||
			($("#pessoaNota").val() == "fisica" && !isCPFValid($(this).val()))
			){
			FLUIGC.message.alert({
			    message: "<strong>Informe um CPF ou CNPJ válidos:</strong><br/>",
			    title: 'CPF / CNPJ inválido',
			    label: 'OK'
			}, function(el, ev) {
				setTimeout(function() {
					$('#cnpj_emitente').focus();
				}, 100);
			});
		}	
	});
	
	
	$("#pessoaNota").change(function() {		
		if ($(this).val() == "juridica") $("#cnpj_emitente").mask('00.000.000/0000-00', {reverse: true});
		if ($(this).val() == "fisica") $("#cnpj_emitente").mask('000.000.000-00', {reverse: true}); 
	}).trigger('change');	
	
	$(':radio[id="nota_emitida"]').change(function() {
		if ($(this).filter(':checked').val() == 'sim'){
			$("#nrNota").removeAttr('readOnly');			
		}
		else $("#nrNota").attr("readOnly", true)
	}).trigger('change');	
}



function initCompoents(linha){
	row = linha;
	
	$("#cod_item___" + row).on('blur', function(){	
		var thisrow = $(this).attr('id').substr($(this).attr('id').lastIndexOf("_") + 1);
		$("#desc_item___" + thisrow).val("");
		$("#ipi_item___" + thisrow).val("0,00").trigger('keyup');
		$("#valor_item___" + thisrow).val("0,00").trigger('keyup');
		
		var subc1 = DatasetFactory.createConstraint("cod_item", $(this).val(), null, ConstraintType.MUST);
		var subc2 = DatasetFactory.createConstraint("estab", $("#estabNota").val().replace(/\D/g, ''), null, ConstraintType.MUST);
		var subc3 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var subconstraints   = new Array(subc1, subc2, subc3);
		var subdataset = DatasetFactory.getDataset("TOTVSItem", null, subconstraints, null);		
		if (subdataset.values.length > 0) {		
			$("#desc_item___" + thisrow).val(subdataset.values[0]["desc_item"]);
			$("#ncm_item___" + thisrow).val(subdataset.values[0]["ncm"]).trigger('keyup');
			$("#ipi_item___" + thisrow).val(parseFloat(subdataset.values[0]["ipi"]).toFixed(2)).trigger('keyup');
			var aux = parseFloat(subdataset.values[0]["m_mat"]) + parseFloat(subdataset.values[0]["m_mob"]) + parseFloat(subdataset.values[0]["m_ggf"]);
			$("#valor_item___" + thisrow).val(aux.toFixed(2)).trigger('keyup');
		}		
	});
	
	$("#ncm_item___" + row).on('blur', function(){	
		var thisrow = $(this).attr('id').substr($(this).attr('id').lastIndexOf("_") + 1);
		$("#ipi_item___" + thisrow).val("0,00");
		var subc1 = DatasetFactory.createConstraint("classFiscal", $(this).val(), null, ConstraintType.MUST);
		var subc2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var subconstraints   = new Array(subc1, subc2);
		var subdataset = DatasetFactory.getDataset("TOTVSclassFiscal", null, subconstraints, null);
		if (subdataset.values.length > 0) {
			$("#ipi_item___" + thisrow).val(parseFloat(subdataset.values[0]["aliquota_ipi"]).toFixed(2)).trigger('keyup');
			$("#desc_ncm___" + thisrow).val(subdataset.values[0]["descricao"]);
		}
		else {
			$("#ipi_item___" + thisrow).val("0,00").trigger('keyup');
			$("#desc_ncm___" + thisrow).val("");
		}
			
	}).css('text-transform', 'uppercase').trigger('keyup').trigger('blur');
	
	
	$("#natOper_item___" + row).on('blur', function(){	
		var thisrow = $(this).attr('id').substr($(this).attr('id').lastIndexOf("_") + 1);
		$("#icms_item___" + thisrow).val("0,00");
		var subc1 = DatasetFactory.createConstraint("nat_oper", $(this).val(), null, ConstraintType.MUST);
		var subc2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var subconstraints   = new Array(subc1, subc2);
		var subdataset = DatasetFactory.getDataset("TOTVSNaturOper", null, subconstraints, null);
		if (subdataset.values.length > 0) {
			$("#icms_item___" + thisrow).val(parseFloat(subdataset.values[0]["aliquota_icm"]).toFixed(2)).trigger('keyup');
			$("#desc_nat_item___" + thisrow).val(subdataset.values[0]["denominacao"]);
			
			   
		}
	}).trigger('blur').css('text-transform', 'uppercase');

	if ($("#natOper_item___" + row).val() == "") $("#natOper_item___" + row).val($("#natOper_emitente").val()).trigger('keyup').trigger('blur');	
	
}

function addLinha(tabela){
	
	row = wdkAddChild(tabela);
	$(".NCM").mask('0000.00.00', {reverse: true}).trigger('keyup');
	setMoneyClass($(".money"));
	initCompoents(row);
}

function fnCustomDelete(oElement){
    var tr = $(oElement).closest('tr');
    tr.remove();   
    somatorio();
}

function somatorio(){		
	var acumulado = 0.0; 
	var valor;
	var quant;
	var icms;
	$('.somatorio').each(function() {
		valor = parseFloat($(this).val().replace(/[^\d\,\-]/g, "").replace(",","."));
		row = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_") + 1);
		icms = $("#icms_item___" + row).val() ;
		quant = $("#quant_item___" + row).val();		
		if (!isNaN(valor) && quant && icms) {
			acumulado += (valor * parseFloat(quant.replace(/[^\d\,\-]/g, "").replace(",","."))) / (1 - parseFloat(icms.replace(/[^\d\,\-]/g, "").replace(",",".")) / 100);			
		}		
	});
	$("#total_nota").val(acumulado.toFixed(2));
	$("#total_nota").mask('000.000.000,00', {reverse: true});	
}

function setMoneyClass(elemento){
	elemento.mask('000.000.000,00', {reverse: true})
		.css("text-align", "right")
		.on('focusin', function(){$(this).select();})
		.on('blur', function(){
			if ($(this).val() == '') $(this).val('0,00')
			else if ($(this).val().substring($(this).val().lastIndexOf(",")).length <= 2) $(this).val($(this).val() + ',00');
			somatorio();
	}).on('keypress keyup', function(){
		somatorio();
	}).trigger('blur');
}

function setSelectedZoomItem(selectedItem) {
	if (selectedItem.inputId == "cod_transp") {
		$('#cod_transp').val(parseInt(selectedItem['cod_transp']) + ' - '+ selectedItem['nome_transp']);		
	}
}

//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId, mobile) {
	isMobile = mobile;
	matr = matricula;
	process = WKNumProces;
	
	blockAll(modeView);	
	if(modeView == "ADD" || modeView == "MOD"){	
		
		token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];
		setInterval(function(){
			token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];			
		}, 120000);
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
	
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;	
		var data = getData();
		var hora = getHora();			
		
		if (numState == 0 || numState == 1){
			showElemento($("#solicitacao"));
			
			$("#num_processo").val(process);
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			$('#matricula_solic').val(matricula);
			$('#user_solic').val(usuario);
			$("#data_solic").val(ramal);	
			
		}
		
		if (numState == 2){
			showElemento($("#aprov_emis"));
			
			$("#num_processo").val(process);			
			
			$('#matricula_aprov_emis').val(matricula);
			$('#user_aprov_emis').val(usuario);
			$("#data_aprov_emis").val(data);	
			
		}
		
		if (numState == 6){
			
			showElemento($("#emissao_nota"));
			
			$('#matricula_emissao_nota').val(matricula);
			$('#user_emissao_nota').val(usuario);
			$("#data_emissao_nota").val(data);	
			
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


