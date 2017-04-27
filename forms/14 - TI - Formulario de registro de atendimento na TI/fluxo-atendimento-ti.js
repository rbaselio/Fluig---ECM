var row, anexos, matr, process, isMobile, token;

function loadElementos(){	
	
	$('#tipo').change(function() {
		if ($(this).val() == "sistema" ) $('#sel_sistema').show();
		else {
			$('#sistema').val("");
			$('#sel_sistema').hide();
		}
		
		if ($("#tipo").val() != "") $("#desc_chamado").removeAttr('readOnly');
		else $("#desc_chamado").attr("readOnly", true).val("");
		
	});
	
	$("#ramal").on('keyup', function(){
		if ($(this).val().length > 12) $(this).mask('(00)00000-0000');
		else if ($(this).val().length > 3) $(this).mask('(00)0000-00000');
		else $(this).mask('00000');
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

}



// prencimento e ativação dos campos
function ativaPreencheCampos(modeView, numState, matricula, WKNumProces, documentId, mobile) {
	isMobile = mobile;
	matr = matricula;
	process = WKNumProces;
	
	blockAll(modeView);	
	if (modeView == "ADD" || modeView == "MOD") {	
		
		var filter = new Object();
		filter["colleaguePK.colleagueId"] = matricula;
		var colaborador = getDatasetValues('colleague', filter);
		
		var usuario = colaborador[0].colleagueName;
		var ramal = colaborador[0].extensionNr;
		var data = getData();
		var hora = getHora();		

		if (numState == 0 || numState == 1) {	
			showElemento($("#emissao"));			
			
			$('#matricula_user').val(matricula);
			$('#solicitante').val(usuario);
			$('#ramal').val("");					
			
			$('#num_processo').val(WKNumProces);
			$('#data_sol').val(data);
			$('#hora_sol').val(hora);			
			
			var filterGroup = new Object();
			filterGroup["colleagueGroupPK.groupId"] = 'TI';
			filterGroup["colleagueGroupPK.colleagueId"] = matricula;
			var grupos = getDatasetValues('colleagueGroup', filterGroup);
			if (!grupos[0]) {	
				$('#btZoomColab').css('pointer-events', 'none');				
			};
		}
		
		if (numState == 2  || numState == 4 ) {	
			var tipo_intera;
			showElemento($("#atendimento"));
			$('#num_processo').val(WKNumProces);
			$("#desc_chamado").attr("readOnly", true);
			
			if (numState == 2) {
				tipo_intera = "Atendimento da TI:";
				$('#avaliacao').hide();
			}
			if (numState == 4) {
				tipo_intera = "Avaliação do usuário:"
				$('#conclusao').val("");
				$('#nota').val("1");
				
			}			
			
			var ultimaLinhaTabela = $('#tb_interacao tr').last();
			if ( ultimaLinhaTabela.find("input[id^='matricula_interacao_']").val() != matricula ||
				 ultimaLinhaTabela.find("input[id^='tipo_atend_']").val() != tipo_intera){
				wdkAddChild('tb_interacao');
				ultimaLinhaTabela = $('#tb_interacao tr').last();
			}
			ultimaLinhaTabela.find("input[id^='tipo_atend_']").val(tipo_intera);				
			ultimaLinhaTabela.find("input[id^='matricula_interacao_']").val(matricula);
			ultimaLinhaTabela.find("input[id^='solicitante_intereacao_']").val(usuario);
			ultimaLinhaTabela.find("input[id^='data_interecao_']").val(data);
			ultimaLinhaTabela.find("textarea[id^='desc_interacao']").removeAttr('readOnly');
			showElemento(ultimaLinhaTabela.find("textarea[id^='desc_interacao']"));
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