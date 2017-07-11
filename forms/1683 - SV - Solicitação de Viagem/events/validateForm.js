function validateForm(form){
	
	var numState = getValue("WKNumState");
	var process = getValue("WKNumProces");
	var anexado = false;
	var message = "";
	
	if (numState == 0 || numState == 1){
		if (form.getValue("matricula_user") == "") message += "<br/>- Informe o usuario solitante;";
		if (form.getValue("ramal") == "") message += "<br/>- Informe um telefone ou ramal para contato;";
		
		if (form.getValue("nec_adiant") == "") message += "<br/>- Informe se há necessidade de adiantamento;";
		if (form.getValue("nec_hosp") == "") message += "<br/>- Informe se há necessidade de hospedagem;";
		if (form.getValue("nec_voo") == "") message += "<br/>- Informe se há necessidade de vôo;";
		if (form.getValue("nec_veiculo") == "") message += "<br/>- Informe se há necessidade de veículo;";
		
		if (form.getValue("nec_adiant") == "nao" &&
			form.getValue("nec_hosp") == "nao" &&
			form.getValue("nec_voo") == "nao" && 
			form.getValue("nec_veiculo") == "nao" )message += "<br/>- Informe ao menos uma necessidade;";
		
		if (form.getValue("nec_veiculo") == "sim" && form.getValue("origem") == "") message += "<br/>- Informe tipo do veículo;";
		
		if (form.getValue("descricao") == "") message += "<br/>- Descreva o motivo da solicitação;";
		if (form.getValue("motivo") == "") message += "<br/>- Informe o motivo da solicitação;";
		
		if (form.getValue("motivo") == "atend") {
			if (form.getValue("nr_pedido") == "") message += "<br/>- Informe o pedido referente ao atendimento;";
			if (form.getValue("vl_pedido") == "") message += "<br/>- Informe o valor do pedido referente ao atendimento;";
		}		
		
		if (form.getValue("ccusto") == "") message += "<br/>- Informe o centro de custo do solicitante;";
				
		if (form.getValue("nec_hosp") == "sim" ||
			form.getValue("nec_voo") == "sim" || 
			form.getValue("nec_veiculo") == "sim"){
			if (form.getValue("destino") == "") message += "<br/>- Informe o destino da viagem;";
			if (form.getValue("Cidade") == "") message += "<br/>- Informe o cidade da viagem;";
			if (form.getValue("estado_pais") == "") message += "<br/>- Informe o estado ou país da viagem;";
			if (form.getValue("endereco") == "") message += "<br/>- Informe o endereço da viagem;";
			
			var dt_entrada = form.getValue("dtprazoativ_partida").split("/");
			var dataEntrada = new Date(dt_entrada[2], dt_entrada[1] - 1, dt_entrada[0]);
			if (isNaN(dataEntrada.getTime())) message += "<br/>- Informe a data prevista de partida;";
			
			var dt_saida = form.getValue("dtprazoativ_retorno").split("/");
			var dataSaida = new Date(dt_saida[2], dt_saida[1] - 1, dt_saida[0]);
			if (isNaN(dataSaida.getTime()))  message += "<br/>- Informe a data prevista de retorno;"; 
			
			if (dataEntrada > dataSaida) message += "<br/>- A data de saída não pode ser maior que a data retorno;";
			
		}
		
		if (form.getValue("nec_adiant") == "sim"){
			if (form.getValue("nec_tipo") == "") message += "<br/>- Informe o tipo do adiantamento;";
			if (form.getValue("moeda") == "") message += "<br/>- Informe o a moeda adiantamento;";
			
			
			var vl_adiant = parseFloat(form.getValue("vl_adiant").replace(".","").replace(",","."));
			if (isNaN(vl_adiant)) vl_adiant = 0;
			var vl_adiant_dep = parseFloat(form.getValue("vl_adiant_dep").replace(".","").replace(",","."));
			if (isNaN(vl_adiant_dep)) vl_adiant_dep = 0;			
			
			if ((vl_adiant) <= 0.01) message += "<br/>- Informe o o valor do adiantamento;";
			
			if (form.getValue("nec_tipo") == "dinheiro") {
				if (vl_adiant > 200 && form.getValue("moeda") == 'real') message += "<br/>- Não é permitido valores em dinheiro superior a 200,00";
	    		if (vl_adiant > 2000 && form.getValue("moeda") == 'dolar') message += "<br/>- Não é permitido valores de adiantamento superior a 2000,00";
			}
			else {
				if (vl_adiant_dep + vl_adiant  > 2000) message += "<br/>- Não é permitido valores de adiantamento superior a 2000,00";
		    	if (form.getValue("banco") == '') message += "<br/>- Informe o banco para deposito;";
				if (form.getValue("agencia") == '') message += "<br/>- Informe a agencia para deposito;";
				if (form.getValue("conta_cor") == '') message += "<br/>- Informe a conta para deposito;";
			}
			
			if (form.getValue("nec_tipo") == "dep_mix") {
				if (vl_adiant_dep  <=0.01 ) message += "<br/>- Informe o valor do adiantamento para deposito";
		    	if (vl_adiant > 200) message += "<br/>- Não é permitido valores em dinheiro superior a 200,00";
		    }
			
			if (form.getValue("cpf_cnpj") == "") message += "<br/>- Informe o CPF/CNPJ do solicitante;";
			
			
			var dt_entrada = form.getValue("dtprazoativ_partida").split("/");
			var dataEntrada = new Date(dt_entrada[2], dt_entrada[1] - 1, dt_entrada[0]);
			if (isNaN(dataEntrada.getTime())) dataEntrada = new Date();
			
			var dt_saida = form.getValue("data_retirada").split("/");
			var dataSaida = new Date(dt_saida[2], dt_saida[1] - 1, dt_saida[0]);
			if (isNaN(dataSaida.getTime()))  message += "<br/>- Informe a data prevista de retirada;"; 
			
			//if (dataSaida > dataEntrada ) message += "<br/>- A data de retirada não pode ser menor que hoje ou que a data de partida;";
		}
	}
	
	if (numState == 4){
		if (form.getValue("aprov_imediato") == "nao" && form.getValue("desc_aprov_imediato") == "") message += "<br/>- Informe o motivo da reprovação;";  
	}
	
	if (numState == 8){
		if (form.getValue("aprov_diretoria") == "nao" && form.getValue("desc_aprov_diretoria") == "") message += "<br/>- Informe o motivo da reprovação;";  
	}
	if (numState == 12){
		if (temAnexo() == false) message += "<br/>- É necessario anexar os comprovantes de cotações;";
		
	}
	
	if (numState == 14){
		if (form.getValue("nec_hosp") == "sim") {
			if (form.getValue("hotel_select") == "") message += "<br/>- Informe o hotel selecionado;";
			if (form.getValue("val_hotel_select") == "0,00" ) message += "<br/>- Informe o valor do hotal selecionado;";
			if (form.getValue("just_hotel") == "") message += "<br/>- Justifique a seleção do hotel;";
		}
		if (form.getValue("nec_voo") == "sim") {
			if (form.getValue("voo_select") == "") message += "<br/>- Informe o vôo selecionado;";
			if (form.getValue("val_voo_select") == "0,00" ) message += "<br/>- Informe o valor do vôo selecionado;";
			if (form.getValue("just_voo") == "") message += "<br/>- Justifique a seleção do vôo;";
			
		}
		if (form.getValue("nec_veiculo") == "sim" && form.getValue("origem") == 'locacao') {
			if (form.getValue("veic_select") == "") message += "<br/>- Informe o veículo selecionado;";
			if (form.getValue("val_veic_select") == "0,00" ) message += "<br/>- Informe o valor do veículo selecionado;";
			if (form.getValue("just_veic") == "") message += "<br/>- Justifique a seleção do veículo;";
		}	
		
	}
	
	if (numState == 16){
		if (form.getValue("aprov_imediato2") == "nao" && form.getValue("desc_aprov_imediato2") == "") message += "<br/>- Informe o motivo da reprovação;";  
	}
	
	if (numState == 24){
		if (temAnexo() == false) message += "<br/>- É necessario anexar os comprovantes de reservas;";
		
	}
	
	
	if (numState == 71){
		var vl_adiant = parseFloat(form.getValue("vl_adiant").replace(".","").replace(",","."));
		if (isNaN(vl_adiant)) vl_adiant = 0;
		var vl_adiant_dep = parseFloat(form.getValue("vl_adiant_dep").replace(".","").replace(",","."));
		if (isNaN(vl_adiant_dep)) vl_adiant_dep = 0;
		var vl_fornec = parseFloat(form.getValue("vl_fornec").replace(".","").replace(",","."));
		if (isNaN(vl_fornec)) vl_adiant_dep = 0;
		
		if (vl_fornec <= 0.01) message += "<br/>- Informe o valor fornecido;";
		
		if (vl_fornec > (vl_adiant + vl_adiant_dep)) message += "<br/>- Valor forncecido não pode ser maior que o valor solicitado;";
		if (vl_fornec < (vl_adiant + vl_adiant_dep)) form.setValue("desc_entregue", "Valor fornecido inferior ao solicitado.\n" + form.getValue("desc_entregue"));
		
		if (form.getValue("nec_tipo") != "dinheiro" && temAnexo() == false) message += "<br/>- É necessario anexar os comprovantes de deposito;";
		
	}
	if (numState == 98){
		if (form.getValue("veiculo") == "") message += "<br/>- Informe a placa do veiculo;";
		if (form.getValue("locadora") == "") message += "<br/>- Informe o modelo do veículo;";
		
	}
	
	
	if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;
	
	function temAnexo(){		
		var process = getValue("WKNumProces");	
		var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', process, process, ConstraintType.MUST);
		var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, new Array(constraintProcessAttachment), null);
		
		for(var i = 0; i < datasetProcessAttachment.rowsCount; i++) {
			var constraintProcessHistory1 = DatasetFactory.createConstraint('processHistoryPK.movementSequence', datasetProcessAttachment.getValue(i, "originalMovementSequence"), datasetProcessAttachment.getValue(i, "originalMovementSequence"), ConstraintType.MUST);
			var constraintProcessHistory2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', process, process, ConstraintType.MUST);
			var constraintProcessHistory3 = DatasetFactory.createConstraint('processHistoryPK.companyId', datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
			var constraintProcessHistory4 = DatasetFactory.createConstraint('stateSequence', numState, numState, ConstraintType.MUST);
			var datasetProcessHistory = DatasetFactory.getDataset('processHistory', null, new Array(constraintProcessHistory1, constraintProcessHistory2, constraintProcessHistory3, constraintProcessHistory4), null);
			for(var j = 0; j < datasetProcessHistory.rowsCount; j++) {				
				return true;			
			}	
		}
		return false;	
	}
	
	
	
	
}