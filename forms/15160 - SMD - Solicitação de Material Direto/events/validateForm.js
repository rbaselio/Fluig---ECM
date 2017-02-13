function validateForm(form){
	
	var numState = getValue("WKNumState");	
	var message = ""; 
	
	if (numState == 1){			
		if (form.getValue("ccusto") == "" && form.getValue("ord_fabric") == "") message += "<br/>- Centro de custo ou Ordem de Fabricação;";
		if (form.getValue("quant") == "0,00") message += "<br/>- Quantidade;";
		if (form.getValue("unmedida") == "") message += "<br/>- Unidade de medida;";
		if (form.getValue("prevdias") == "") message += "<br/>- Previsão;";
		if (form.getValue("tipocompra") == "") message += "<br/>- Tipo da compra;";
		if (form.getValue("valor_aprox") == "0,00") message += "<br/>- Cotação Inicial;";
		if (form.getValue("desccompra") == "") message += "<br/>- Descrição da Compra;";
		if (form.getValue("aplicacao") == "") message += "<br/>- Aplicação;";
		//if (!temAnexo()) message += "<br/>- Anexar a cotação inicial;";		
	}
	
	if (numState == 52){
		if (form.getValue("aprov_solicitacao") == "nao" && form.getValue("desc_aprov_solic") == "") message += "<br/>- Informe motivo da rejeição;";			
	}
	
	if (numState == 46){
		if (form.getValue("aprov_membro_compras") == "nao" && form.getValue("desc_membro_compras") == "") message += "<br/>- Informe motivo da rejeição;";			
	}
	
	if (numState == 2){
		if (form.getValue("ccontabil") == "") message += "<br/>- Conta Contábil;";
		if (form.getValue("desc_ccontabil") == "") message += "<br/>- Descrição;";
		if (form.getValue("ativo") == "") message += "<br/>- Ativo;";
		if (form.getValue("obs_contabil") == "") message += "<br/>- Observações;";		
	}
	
	if (numState == 4){
		if (form.getValue("aprov_ger_suprimento") == "nao" && form.getValue("desc_aprov_ger_suprimento") == "") message += "<br/>- Informe motivo da rejeição;";
	}
	
	if (numState == 6){
		if (form.getValue("aprov_dir_suprimento") == "nao" && form.getValue("desc_aprov_dir_suprimento") == "") message += "<br/>- Informe motivo da rejeição;";
	}
	
	if (numState == 12){
		if (form.getValue("aprov_dirPresidencia") == "nao" && form.getValue("desc_aprov_dirPresidencia") == "") message += "<br/>- Informe motivo da rejeição;";
	}
	
	if (numState == 10){
		if (!temAnexo()) message += "<br/>- Anexar a cotação inicial; " + temAnexo();
		
		var indexes = form.getChildrenIndexes("tb_cotacoes");
		if (indexes.length == 0) message += "<br/>- Informe ao menos uma cotação;";
		
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("fornecedor___" + indexes[i]) == "") message += message += "<br/>- Fornecedor na linha " + ( i + 1);
			if (form.getValue("vl_unit___" + indexes[i]) == "0,00") message += "<br/>- Valor unitário na linha " + ( i + 1);
			if (form.getValue("cond_pagto___" + indexes[i]) == "") message += "<br/>- Condição de pagamento na linha " + ( i + 1);
			if (form.getValue("prazo_ent___" + indexes[i]) == "") message += "<br/>- Prazo de entrega na linha " + ( i + 1);
			if (form.getValue("modFrete___" + indexes[i]) == "") message += "<br/>- Modalidade de Frete na linha " + ( i + 1);			
			
		}
	}
	
	if (numState == 17){		
		var indexes = form.getChildrenIndexes("tb_pedido");
		if (indexes.length == 0) message += "<br/>- Informe ao menos um pedido/OC;";
		
		for (var i = 0; i < indexes.length; i++) {
	    	if (form.getValue("ordem_datasul___" + indexes[i]) == "") message += message += "<br/>- Nr. Ordem na linha " + ( i + 1);
			if (form.getValue("pedido_datasul___" + indexes[i]) == "") message += "<br/>- Nr. pedido na linha " + ( i + 1);						
		}
	}
	
	
	if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message + "<br/><br/>.";	
	
	
	
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