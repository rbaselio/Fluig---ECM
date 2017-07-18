$(function(ready){
	
	$(".soNumeros").mask('000.000.000.000.000', {reverse: true});
	setMoneyClass($(".money"));
	
	$(".status").each(function(i) {
		if 	($(this).val() == "Cancelado") 	$(this).css({'background-color' : 'grey', 'color': 'black'});
		else if ($(this).val() == "Em andamento" || $(this).val() == "Iniciado") $(this).css({'background-color' : 'yellow'});
		else if ($(this).val() == "Em atraso")	$(this).css({'background-color' : 'red', 'color': 'black'});
		else if ($(this).val() != "") $(this).css({'background-color' : 'green' , 'color': 'black'});				
	});	
			
	
	// ativa/desativa campos quando o valor da origem for modificado
	$("#origem").change(function () {
		if ($("#origem").val() == "reclamacao de cliente" || $("#origem").val() == "montagem em campo") {
			$("#pedido").removeAttr('disabled');
		} else $("#pedido").attr('disabled', 'disabled').val(''); 
	}).trigger('change');
	
	// ativa/desativa campos quando o valor do tipo for modificado
	$("#tipo").change(function () {			
		if ($("#tipo").val() == "produto"){
			$("#nome_prod").removeAttr('disabled');
			$("#cod_prod").removeAttr('disabled');
			$("#processo").attr('disabled', 'disabled').val('0'); 
		}
		else if ($("#tipo").val() == "processo"){
			$("#processo").removeAttr('disabled');
			$("#cod_prod").attr('disabled', 'disabled').val(''); 
			$("#nome_prod").attr('disabled', 'disabled').val('');
		}				
	}).trigger('change');	
	
	$("#cod_prod").on('blur', function(){
		var token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];
		$("#nome_prod").val("");
		var subc1 = DatasetFactory.createConstraint("cod_item", $(this).val(), null, ConstraintType.MUST);
		var subc2 = DatasetFactory.createConstraint("estab", "1", null, ConstraintType.MUST);
		var subc3 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var subconstraints   = new Array(subc1, subc2, subc3);
		var subdataset = DatasetFactory.getDataset("TOTVSItem", null, subconstraints, null);
		if (subdataset.values.length > 0) {		
			$("#contrQualidade").val(subdataset.values[0]["contr_qualid"]);
			$("#nome_prod").val(subdataset.values[0]["desc_item"]);	
		}		
	});
	
	// ativa/desativa campos quando o valor da reincidencia for modificado
	$("#reincidencia").change(function () {	
		if ($("#reincidencia").val() == "sim"){
			$("#desc_reinc").removeAttr('disabled');
		} else $("#desc_reinc").attr('disabled', 'disabled').val(''); 
	}).trigger('change');
	
	// ativa/desativa campos quando o valor da ação for modificado
	$("#acao").change(function () {	
		if ($("#acao").val() == "retrabalhar"){
			$("#retrabalho").removeAttr('disabled');
			$("#resp_retrabalho").removeAttr('disabled');
		} else {
			$("#retrabalho").attr('disabled', 'disabled').val('0');
			$("#resp_retrabalho").attr('disabled', 'disabled').val('');
		}
	}).trigger('change');
	
	// ativa/desativa campos quando o valor da disposição for modificado
	$("#disposocao").change(function () {	
		$("#btZoomColab_parecer").attr('disabled', 'disabled');
		$("#btZoomColab_parecer").css('pointer-events', 'none');
		
		if ($("#disposocao").val() == "SAC") $("#btZoomColab_parecer").css('pointer-events', 'all');
		
		if ($("#disposocao").val() == "NCF"){
			$("#fornecedor").removeAttr('disabled');
			$("#btZoomColab_parecer").css('pointer-events', 'all');
		} else $("#fornecedor").attr('disabled', 'disabled').val('');
	}).trigger('change');
	
	
	$("#reponsabilidade").change(function () {	
		if($(this).val() == 6){
			$("#cod_fornec").removeAttr('readOnly');
			$("#listaColaborador").css('pointer-events', 'none');
			$("#listaColaborador").attr('disabled', 'disabled');
		}
		else{
			$("#cod_fornec").attr("readOnly", true).val('');
			$("#fornec").val('');
			$("#listaColaborador").css('pointer-events', 'all');
			$("#listaColaborador").removeAttr('disabled');
		}
	}).trigger('change');	
	
	
	$('#listaFamilia').click(function() {
		var thisModal = FLUIGC.modal({
		    title: 'Lista de Familias',
		    content: '<div id="postTabela"></div>',
		    id: 'fluig-modal',
		    size: 'large',
		    actions: [{
		        'label': 'Fechar',
		        'autoClose': true
		    }]
		}, function(err, data) {
			var param = {"datasetId" : "TOTVSFamilias", "limit" : "0"};
			
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
			    renderContent: ['fm_codigo', 'fm_descricao'], 
			    header: [{'title': 'Código', 'size': 'col-sm-2'},
			             {'title': 'Descrição', 'size': 'col-sm-4'}],
			    multiSelect: false,
			    search: {
			    	enabled: true,
			        onSearch: function(response) {
			        	$.ajax({
							  type: 'POST',
							  contentType: 'application/json',
							  dataType: 'json',
							  url: '/api/public/ecm/dataset/search',
							  data: JSON.stringify({"datasetId" : "TOTVSFamilias","limit" : "0", "searchField" : "fm_descricao", "searchValue" : response }),
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
			    $('#equip').val(selected.fm_descricao);
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	});
	
	$('#btZoomRep').click(function() {	
		var param = {"datasetId" : "TOTVSRepresentantes", "limit" : "0"};
		
		var thisModal = FLUIGC.modal({
		   title: 'Lista de Colaboradores',
		   content: '<div id="postEmb"></div>',
		   size: 'large',
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
			    renderContent: ['cod_rep', 'nome', 'estado'], 
			    header: [{'title': 'Código', 'size': 'col-sm-2'},
			             {'title': 'Nome', 'size': 'col-sm-7'},
			             {'title': 'Estado', 'size': 'col-sm-2'}],
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
							  data: JSON.stringify({"datasetId" : "TOTVSRepresentantes","limit" : "0", "searchField" : "nome", "searchValue" : response }),
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
			    $("#cod_rep").val(selected.cod_rep);
			    $("#nome_rep").val(selected.nome);	
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');	
	});
	
	$("#cod_fornec").on('blur', function(){
		if (!$(this).attr("readonly")){
			token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];
			var c1 = DatasetFactory.createConstraint("cod_emit", $(this).val().replace(/\D/g, ''), null, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
			var constraints   = new Array(c1, c2);
			var dataset = DatasetFactory.getDataset("TOTVSEmitente", null, constraints, null);
			
			if (dataset.values.length > 0 && dataset.values[0]["nome_emit"] != 'ERRO' ) {		
				$("#fornec").val(dataset.values[0]["nome_emit"]);
				$("#cod_fornec").val(dataset.values[0]["cod_emitente"]);			
			}
			else FLUIGC.message.alert({
					    message: "<strong>Cliente ou Fornecedor não cadastrado:</strong><br/>",
						title: 'Emitente invalido',
						label: 'OK'
						}, function(el, ev) {
							setTimeout(function() {
								$("#fornec").val("");							
								$("#cod_fornec").focus().val("");							
							}, 100);
						});
		}
	});
	
	
	
});

//zoom de colaboradores para a tabela de atividade emergencial
function zoomColaborador(linha) {
	var nome = $(linha).attr("name");
	row = nome.substring(nome.lastIndexOf("_") + 1);
	
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
		    $("#mat_emer___" + row).val(selected.colleagueId);
		    $("#responsavel_emer___" + row).val(selected.colleagueName);			   
		    thisModal.remove();					    
		});
	});
	$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	
}

//zoom de colaboradores para a tabela de ação corretiva
function zoomColaborador_corr(linha) {
	var nome = $(linha).attr("name");
	row = nome.substring(nome.lastIndexOf("_") + 1);
	
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
		    $("#matricula_corr___" + row).val(selected.colleagueId);
		    $("#responsavel_corr___" + row).val(selected.colleagueName);			   
		    thisModal.remove();					    
		});
	});
	$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
	
}

//zoom de colaboradores para a atribuição de responsavel por parecer
function zoomColaborador_falha() {
	
	var param = {"datasetId" : "TOTVSColaboradores", "limit" : "0", 
			 	 "filterFields" : ["ativo", "true"]};

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
		    renderContent: ['matricula', 'nome'], 
		    header: [{'title': 'Matricula', 'size': 'col-sm-2'},
		             {'title': 'Nome', 'size': 'col-sm-5'}],
		    multiSelect: false,
		    search: {
		        enabled: true,
		        searchAreaStyle: 'col-md-9',
		        onSearch: function(response) {
		        	var param2 = {"datasetId" : "TOTVSColaboradores", "limit" : "0", 
 							"filterFields" : ["ativo", "true"], 
 							"searchField" : "nome", "searchValue" : response };
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
		    $("#matr_falha").val(selected.matricula);
		    $("#colab_falha").val(selected.nome);			   
		    thisModal.remove();					    
		});
	});
	$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');	
	
}

//zoom de colaboradores para a atribuição de responsavel por parecer
function zoomColaborador_parecer() {
	
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
		    $("#matricula_parecer").val(selected.colleagueId);
		    $("#responsavel_parecer").val(selected.colleagueName);			   
		    thisModal.remove();					    
		});
	});
	$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');	
	
}

//zoom de colaboradores para a atribuição de responsavel por disposição
function zoomColaborador_disp() {
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
			    $('#mat_disp').val(selected.colleagueId);
			    $('#responsavel_disp').val(selected.colleagueName);			   
			    thisModal.remove();					    
			});
		});
		$(".modal-body").css("max-height" , window.innerHeight/2 + 'px');
}
	
//zoom de colaboradores para a atribuição de responsavel por disposição
function zoomModFalha() {
	zoomEcmTipo("mod_falha",
				"Modo_Falha,Modo Falha",
				"Modo_Falha", 
				"Zoom Colaborador",
				"setModFalha");
}
function setModFalha(selectedItem) {
	$("#desc_mod_falha").val(selectedItem['Modo_Falha']);
			
}

//adição linha a tabela ação emergencial
function addLinhaTabela(tabela) {
	row = wdkAddChild(tabela);	
	$("#" + tabela).find('.date').each(function(i) {
		if ($(this).val() == ''){
			FLUIGC.calendar($(this), {
				minDate : dataAtual,
				defaultDate: dataAtual,
				showToday: true,
			    language: 'pt-br',
			    disabledDates: feriados(4),
				daysOfWeekDisabled: [0,6]
			});		
		}
	});
}

function addCustoNaoQualidade(tabela) {	
	initCompoents(wdkAddChild(tabela));	
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

function somatorio(){		
	var acumulado = 0.0; 
	var valor;
	var quant;
	
	
	
	$('.somatorio').each(function() {
		valor = parseFloat($(this).val().replace(/[^\d\,\-]/g, "").replace(",","."));
		row = $(this).attr('id').substring($(this).attr('id').lastIndexOf("_") + 1);
		quant = $("#quant_item___" + row).val();		
		if (!isNaN(valor) && quant) {
			
			if (quant == 0.00) quant = 1.00;
			acumulado += (valor * parseFloat(quant.replace(/[^\d\,\-]/g, "").replace(",",".")));			
		}		
	});
	$("#vl_tot").val(acumulado.toFixed(2));
	$("#vl_tot").mask('000.000.000,00', {reverse: true});	
}

function initCompoents(row){	
	setMoneyClass($(".money"));
	$("#quant_item___" + row).val("0,00");
	$("#cod_item___" + row).on('blur', function(){	
		var thisrow = $(this).attr('id').substr($(this).attr('id').lastIndexOf("_") + 1);
		$("#vl_mat___" + thisrow).val("0,00").trigger('keyup');
		var token = DatasetFactory.getDataset('tokens', null, null, null).values[0]["tokenTOTVSDatasul"];
		var subc1 = DatasetFactory.createConstraint("cod_item", $(this).val(), null, ConstraintType.MUST);
		var subc2 = DatasetFactory.createConstraint("estab", "1", null, ConstraintType.MUST);
		var subc3 = DatasetFactory.createConstraint("token", token , null, ConstraintType.MUST);
		var subconstraints   = new Array(subc1, subc2, subc3);
		var subdataset = DatasetFactory.getDataset("TOTVSItem", null, subconstraints, null);		
		if (subdataset.values.length > 0) {		
			$("#desc_mat___" + thisrow).val(subdataset.values[0]["desc_item"]);
			var aux = parseFloat(subdataset.values[0]["m_mat"]) + parseFloat(subdataset.values[0]["m_mob"]) + parseFloat(subdataset.values[0]["m_ggf"]);
			$("#vl_mat___" + thisrow).val(aux.toFixed(2)).trigger('keyup');
		}		
	});
	
}
	

//remove linha da tabela
function removeTarefa(oElement){
	var processo =  $(oElement).closest('tr').find("input").eq(3).val();
	if(processo == ""){
    	fnWdkRemoveChild(oElement);
	}else{
		FLUIGC.message.alert({
		    message: 'Não é possivel remover tarefas com processos iniciados',
		    title: 'Message',
		    label: 'OK'
		});		
    }
}


//prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, WKNumProces, documentId){
	blockAll();
	$('#myTab a:first').tab('show');
	showElemento($("#mod_falha"));
	if(modeView == "ADD" || modeView == "MOD"){	
		
		var getUsuario = $.ajax({
					        type: 'GET',
					        dataType: 'json',
					        contentType: "application/json",
					        url: '/api/public/social/user/logged/v2',
					        async: true
					     });			
		
		var data = getData();
		var hora = getHora();
				
		var offset;
		
		if (numState == 0 || numState == 1){
			$("#data_sol").val(data);
			$("#hora_sol").val(hora);
			
			getUsuario.done(function(response) {
				$("#matricula_emissor").val(response.content.userCode);
				$("#user_emissor").val(response.content.name);			   
			});
			$("#data_emissor").val(data);	
			showElemento($("#emissao"));			
		}
		
		if (numState == 4){
			$("#num_processo").val(WKNumProces);
			
			getUsuario.done(function(response) {
				$("#matricula_disp").val(response.content.userCode);
				$("#resp_disp").val(response.content.name);			   
			});
			$("#data_disp").val(data);	
			showElemento($("#disposicao"));	
		}
		
		
		if (numState == 5){
			$("#num_processo").val(WKNumProces);
			
			getUsuario.done(function(response) {
				$("#matricula_emer").val(response.content.userCode);
				$("#resp_emer").val(response.content.name);			   
			});
			$("#data_emer").val(data);	
			showElemento($("#emergencial"));					
		}
		
		if (numState == 6){
			getUsuario.done(function(response) {
				$("#mat_parecer").val(response.content.userCode);
				$("#resp_parecer").val(response.content.name);			   
			});
			$("#data_parecer").val(data);	
			showElemento($("#parecer"));			
		}
		
		if (numState == 15){
			getUsuario.done(function(response) {
				$("#mat_causa_raiz").val(response.content.userCode);
				$("#resp_causa_raiz").val(response.content.name);
				$("#mat_acoes").val(response.content.userCode);
				$("#resp_acoes").val(response.content.name);
			});
			$("#data_causa_raiz").val(data);
			$("#data_acoes").val(data);
			
			showElemento($("#causa_raiz"));
			showElemento($("#acoes"));	
		}
		
		if (numState == 18){
			
			$.ajax({
				method: "POST",
				dataType: 'json',
				contentType: "application/json",
				url: "/api/public/ecm/document/updateDescription",
				data: '{"id": "'+ documentId  +'", "description": "RNC - '+ WKNumProces + '"}',
				async: true
			});
			
			
			getUsuario.done(function(response) {
				$("#mat_eficacia").val(response.content.userCode);
				$("#mat_falha").val(response.content.name);
				$("#mat_eficacia").val(response.content.userCode);
				$("#resp_falha").val(response.content.name);
			});
			
			$("#data_falha").val(data);
			$("#data_eficacia").val(data);
			
			showElemento($("#eficacia"));
			
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

//validação dos campos
var beforeSendValidate = function(numState){
	var message = "";
	
	if (numState == 0 || numState == 1){
		if ($("#origem").val() == "0") message += "</br>Origem";
		if ($("#referencia").val() == "") message += "</br>Referencia/Cliente";
		if ($("#origem").val() == "reclamacao de cliente" || $("#origem").val() == "montagem em campo") {
			if ($("#pedido").val() == "") message += "</br>Pedido";
		}
		
		if ($("#tipo").val() == "0") message += "</br>Tipo";
		else if ($("#tipo").val() == "produto"){
			if ($("#cod_prod").val() == "") message += "</br>Codigo Produto";
			if ($("#nome_prod").val() == "") message += "</br>Nome Produto";
		} else if ($("#tipo").val() == "processo"){
			if ($("#processo").val() == "0") message += "</br>Processo";			
		}
		
		if ($("#unid_negocio").val() == "") message += "</br>Unidade de Negócio";	
		if ($("#criticidade").val() == "0") message += "</br>Criticidade";	
		
		if ($("#reincidencia").val() == "0") message += "</br>Reincidência";
		if ($("#reincidencia").val() == "sim" && $("#desc_reinc").val() == "") message += "</br>Desc. Reincidência";
		
		/*if ($("#local_detec").val() == "0") message += "</br>Local detecção";
		else if ($("#especific").val() == "") message += "</br>Detalhar";*/
		
		if ($("#responsavel_disp").val() == "") message += "</br>Resp. Disposição";
		
		if ($("#quant").val() == "") message += "</br>Quant.";
		
		if ($("#descEmissao").val() == "") message += "</br>Descrição";
	}
	
	if (numState == 4){
		if ($("#acao").val() == "0") message += "</br>Ação a ser tomada";	
		
		if ($("#acao").val() == "retrabalhar") {
			if ($("#retrabalho").val() == "0") message += "</br>Verificação do retrabalho";
			if ($("#resp_retrabalho").val() == "") message += "</br>Responsavel pelo retrabalho";			
		}
		if ($("#acao").val() == "aceitar com concessao") {
			if ($("#conc_cliente").val() == "" && $("#conc_of").val() == "") message += "</br>Validade da concessão para o cliente ou OF";
		}
		
		if ($("#quant_disp").val() == "") message += "</br>Quant.";	
		if ($("#desc_disp").val() == "") message += "</br>Descrição";
	}
	
	if (numState == 5){
		
		if ($("#reponsabilidade").val() == "") message += "</br>Informe a responsabilidade na aba Modo Falha e Responsabilidade";	
		if ($("#desc_mod_falha").val() == "") message += "</br>Informe o Modo Falha na aba Modo Falha e Responsabilidade";
		
		$("textarea[id^='descAtividade_emer']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Descrição da atividade na linha" + $(this).closest('tr').index();
			}	
		});
		$("input[id^='responsavel_emer']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Responsavel pela atividade na linha" + $(this).closest('tr').index();
			}
		});
	}
	
	if (numState == 6){
		if ($("#disposocao").val() == "0") message += "</br>Abrir documento";	
		
		if ($("#disposocao").val() == "SAC") {
			if ($("#responsavel_parecer").val() == "") message += "</br>Responsavel";
		} else if ($("#disposocao").val() == "NCF") {
			if ($("#fornecedor").val() == "") message += "</br>Fornecedor";
			if ($("#responsavel_parecer").val() == "") message += "</br>Responsavel";
		}		
		
		
		if ($("#desc_parecer").val() == "") message += "</br>Observações";
	}
	
	if (numState == 15){
		if ($("#desc_causa").val() == "") message += "</br>Causa Raiz";	
		
		$("textarea[id^='descAtividade_corr']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Descrição da atividade na linha" + $(this).closest('tr').index();
			}	
		});
		$("input[id^='responsavel_corr']").each(function(i) {
			if ($(this).closest('tr').attr('style') != "display:none" && $(this).val() == ""){
				message += "</br>Responsavel pela atividade na linha" + $(this).closest('tr').index();
			}
		});		
	}
	
	if (numState == 18){
		if ($("#conclusao").val() == "0") message += "</br>Conclusão";
		if ($("#desc_eficacia").val() == "") message += "</br>Descrição";
		
		if ($("#reponsabilidade").val() == "0") message += "</br>Responsabilidade:";
		if ($("#desc_mod_falha").val() == "") message += "</br>Modo Falha:";
		
	}		
	
	if (message != ""){
		message = "</br>Os campos abaixo são de preencimento obrigatorio:" + message;		
		throw(message);
	}
	
}
var beforeMovementOptions = beforeSendValidate;