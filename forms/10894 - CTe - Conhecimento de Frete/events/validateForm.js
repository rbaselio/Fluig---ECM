function validateForm(form){
	
	var numState = getValue("WKNumState");
	var process = getValue("WKNumProces");
	var anexado = false;
	var message = "";
	
	var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', process, process, ConstraintType.MUST);
	var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, new Array(constraintProcessAttachment), null);
	
	
	for(var i = 0; i < datasetProcessAttachment.rowsCount; i++) {
		log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		var constraintProcessHistory1 = DatasetFactory.createConstraint('processHistoryPK.movementSequence', datasetProcessAttachment.getValue(i, "originalMovementSequence"), datasetProcessAttachment.getValue(i, "originalMovementSequence"), ConstraintType.MUST);
		var constraintProcessHistory2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', datasetProcessAttachment.getValue(i, "processAttachmentPK.processInstanceId"), datasetProcessAttachment.getValue(i, "processAttachmentPK.processInstanceId"), ConstraintType.MUST);
		var constraintProcessHistory3 = DatasetFactory.createConstraint('processHistoryPK.companyId', datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
		var constraintProcessHistory4 = DatasetFactory.createConstraint('stateSequence', numState, numState, ConstraintType.MUST);
		var datasetProcessHistory = DatasetFactory.getDataset('processHistory', null, new Array(constraintProcessHistory1, constraintProcessHistory2, constraintProcessHistory3, constraintProcessHistory4), null);
		
		for(var j = 0; j < datasetProcessHistory.rowsCount; j++) {
			log.warn("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
			anexado = true;			
		}		
	}
	
	
	
	if (numState == 1){			
		if (form.getValue("codEmitente") == "") message += "<br/>- A campo Cod. Cliente é de preenccimento obrigatório;";
		if (form.getValue("nomeEmit") == "") message += "<br/>- A campo Nome Cliente é de preenccimento obrigatório;";
		if (form.getValue("nrCTe") == "") message += "<br/>- A campo Nr. CTe é de preenccimento obrigatório;";
		if (form.getValue("SerieCTe") == "") message += "<br/>- A campo Série CTe é de preenccimento obrigatório;";
		if (form.getValue("codEstab") == "") message += "<br/>- A campo Estabelecimento é de preenccimento obrigatório;";
		if (form.getValue("dataCTe") == "") message += "<br/>- A campo Data CTe é de preenccimento obrigatório;";
		if (form.getValue("cidade") == "") message += "<br/>- A campo Cidade é de preenccimento obrigatório;";
		if (form.getValue("estado") == "") message += "<br/>- A campo Estado é de preenccimento obrigatório;";
		if (form.getValue("ValorCTe") == "") message += "<br/>- A campo Valor Frete é de preenccimento obrigatório;";		
		
	}
	
	if (numState == 3){			
		if (form.getValue("desc_analista") == "") message += "<br/>- Descreva as informações relevantes ao processo;";
		
		if ((form.getValue("matricula_emissao") != "AUTO") ) {		
			if (form.getValue("tipoVeiculo") == "") message += "<br/>- A campo Tipo Veículo é de preenccimento obrigatório;";
			if (form.getValue("tpRod") == "") message += "<br/>- A campo Tipo de Rodado é de preenccimento obrigatório;";			
			if (form.getValue("codTransp") == "") message += "<br/>- A campo Cod. Transp é de preenccimento obrigatório;";
			if (form.getValue("nomeTransp") == "") message += "<br/>- A campo Nome Transp é de preenccimento obrigatório;";
			if (form.getValue("vlCotacao") == "") message += "<br/>- A campo Vl. Cotação é de preenccimento obrigatório;";
			
			var indexes = form.getChildrenIndexes("tb_cotacoes");
			if (indexes.length == 0) message += "<br/>- Informe ao menos um item da Nota Fiscal;";	
			
			if (form.getValue("nrNota___1") == "") message += "<br/>- A campo Nr. Nota Fiscal é de preenccimento obrigatório;";
			if (form.getValue("SerieNF___1") == "") message += "<br/>- A campo Serie NF é de preenccimento obrigatório;";
			if (form.getValue("DateNF___1") == "") message += "<br/>- A campo Data NF é de preenccimento obrigatório;";
			if (form.getValue("freteNF___1") == "") message += "<br/>- A campo Valor Frete NF é de preenccimento obrigatório;";
			
		    for (var i = 0; i < indexes.length; i++) {
		    	if (form.getValue("codItem___" + indexes[i]) == "") message += message += "<br/>- A campo Cod.Item é de preenccimento obrigatório na linha " + ( i + 1);
				if (form.getValue("descItem___" + indexes[i]) == "") message += "<br/>- A campo Descrição é de preenccimento obrigatório na linha " + ( i + 1);
				if (form.getValue("vlItem___" + indexes[i]) == "") message += "<br/>- A campo Vl. Item é de preenccimento obrigatório na linha " + ( i + 1);
			}		
		}	
		
	}
	if (numState == 11){
		if (form.getValue("aprov_contratante") == "nao"){
			if (!anexado) message += "<br/>- É necessario incluir o comprovante de cancelamento;";
			if(form.getValue("desc_contratante") == "") message += "<br/>- Informe motivo da rejeição;";			
			
		} 
		
		if (form.getValue("aprov_contratante") == "sim"){
			if (form.getValue("tipoPedido") == "" &&  
				form.getValue("ccusto_contrat") == "") message += "<br/>- Informe centro de custo;";
			
			/*limpar cancelamento*/
			form.setValue("matricula_cancelamento","");
			form.setValue("user_cancelamento","");
			form.setValue("data_cancelamento","");
			form.setValue("desc_cancelamento","");	
		}		
	}
	if (numState == 38){
		if (form.getValue("cancelamento") == "nao" && form.getValue("desc_cancelamento") == "") message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 48){
		
		var indexes = form.getChildrenIndexes("tb_rateio");
		if (indexes.length == 0) message += "<br/>- Informe ao menos um item de rateio;";	
		
	    for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ccusto_rateio___" + indexes[i]) == "") message += "<br/>- A campo centro de custo é de preenccimento obrigatório na linha " + ( i + 1);
			if (form.getValue("desc_rateio___" + indexes[i]) == "") message += "<br/>- A campo descrição no rateio é de preenccimento obrigatório na linha " + ( i + 1);
			if (form.getValue("val_rateio___" + indexes[i]) == "") message += "<br/>- A campo valor no rateio é de preenccimento obrigatório na linha " + ( i + 1);
			
    	}
		if (form.getValue("desc_checkDados") == "") message += "<br/>- Descreva as informações relevantes ao processo;";		
		
	}
	if (numState == 52){
		if (form.getValue("aprovcheckDados") == "") message += "<br/>- Informe condição da aprovação;";
		if (form.getValue("aprovcheckDados") == "nao" && form.getValue("desc_aprov_checkDados") == "") message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 59){
		if (form.getValue("aprovfinal") == "") message += "<br/>- Informe condição da aprovação;";
		if (form.getValue("aprovfinal") == "nao" && form.getValue("desc_aprov_final") == "") message += "<br/>- Informe motivo da rejeição;";
	}
	if (numState == 29){
		if (form.getValue("desc_lancDatasul") == "") message += "<br/>- Descreva as informações relevantes ao processo;";
	}	
	
	if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;	
	
	
	
}