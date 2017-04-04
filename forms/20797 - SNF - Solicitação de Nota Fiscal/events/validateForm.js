function validateForm(form){
	
	if(getValue("WKCompletTask") == 'true' ){
		loading.setMessage("Validando campos de formulário");
		
		var token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");	
		
		var numState = getValue("WKNumState");	
		
		var message = ""; 	
		if (numState == 1){	
			
			if (form.getValue("tipoNota") == "") message += "<br/>- Tipo de Nota;";
			if (form.getValue("destNota") == "" || form.getValue("destNota") == "A" || form.getValue("destNota") == null) message += "<br/>- Tipo de destino;";
			log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + form.getValue("destNota"));
			if (form.getValue("estabNota") == "") message += "<br/>- Estabelecimento;";
			if (form.getValue("espNota") == "") message += "<br/>- Espécie";
			if (form.getValue("espNota") == "devolucao" && form.getValue("nfRef") == "") message += "<br/>- Nr. da Nota de referência";
					
			if (form.getValue("cod_emitente") == "") message += "<br/>- Codigo do destino;";
			if (form.getValue("nome_emitente") == "") message += "<br/>- Nome do destino;";
			if (form.getValue("cep_emitente") == "") message += "<br/>- CEP do destino;";
			else if (!validaCEP(form.getValue("cep_emitente"))) message += "<br/>- CEP não consta na base dos Correios";
			
			if (form.getValue("cnpj_emitente") == "") message += "<br/>- CPF / CNPJ;";
			if (form.getValue("insc_emitente") == "") message += "<br/>- Inscrisão Estadual;";
			
			if (form.getValue("natOper_emitente") == "") message += "<br/>- Natureza da operação;";
			else if (!validaNatureza(form.getValue("natOper_emitente"))) message += "<br/>- Natureza da operação inválida;";
			
			var indexes = form.getChildrenIndexes("tb_itens_nota");
			if (indexes.length == 0) message += "<br/>- Informe ao menos um item;";		
			
			for (var i = 0; i < indexes.length; i++) {
				if (form.getValue("quant_item___" + indexes[i]) == "0,00") message += "<br/>- Quantidade do item na linha " + ( i + 1);
				if(!validaItem(form.getValue("cod_item___" + indexes[i]), form.getValue("estabNota"))) message += "<br/>- Item inválido na linha " + ( i + 1);
				if(form.getValue("desc_item___" + indexes[i]) == "") message += "<br/>- Descrição do item na linha " + ( i + 1);
				if (form.getValue("valor_item___" + indexes[i]) == "0,00") message += "<br/>- Valor unitário na linha " + ( i + 1);
				
				if (form.getValue("natOper_item___" + indexes[i]) == "") message += "<br/>- Natureza da operação na linha " + ( i + 1);
				else if(!validaNatureza(form.getValue("natOper_item___" + indexes[i]))) message += "<br/>- Natureza é invalida na linha " + ( i + 1);
				
				if(!validaNCM(form.getValue("ncm_item___" + indexes[i]))) message += "<br/>- Codigo NCM na linha " + ( i + 1);
			}
			
			if (form.getValue("modNota") == "") message += "<br/>- Modalidade;";
			if (form.getValue("cod_transp") == "" && form.getValue("nome_transp") == "") message += "<br/>- Código e/ nome do transportador";
			if (form.getValue("tpEmbalagem") == "") message += "<br/>- Tipo da embalagem;";	
			
			if (form.getValue("volumes") == "") message += "<br/>- Volumes;";
			
			if (form.getValue("pesoLiq") == "0,00") message += "<br/>- Peso líquido;";
			if (form.getValue("pesoBruto") == "0,00") message += "<br/>- Peso bruto;";		
		}
		
		if (numState == 2){
			if (form.getValue("aprov_emissao") == "nao" && form.getValue("desc_aprov_emis") == "") message += "<br/>- Informe motivo da rejeição;";			
		}
		
		if (numState == 6){		
			if (form.getValue("nota_emitida") == ""){message += "<br/>- Informe emissão da nota fiscal;"}
			if (form.getValue("nota_emitida") == "nao" && form.getValue("desc_emissao_nota") == "") message += "<br/>- Informe motivo da rejeição;";
			if (form.getValue("nota_emitida") == "sim"){
				if (form.getValue("nrNota") == "") message += "<br/>- Nr. Nota Fiscal;";
				if(!temAnexo()) message += "<br/>- Anexar a Nota Fiscal;";
			}
		}
		
		
		loading.setMessage("");	
		if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message + "<br/><br/>.";
		
	}
		
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
	
	
		
	function validaNCM(ncm){
		ncm = String(ncm).replace(/\D/g, '');
		var constraintItem = DatasetFactory.createConstraint('classFiscal', ncm, ncm, ConstraintType.MUST);
		var constraintToken = DatasetFactory.createConstraint('token', token, token, ConstraintType.MUST);
		var datasetNCM = DatasetFactory.getDataset('TOTVSclassFiscal', null, new Array(constraintItem, constraintToken ), null);
		return datasetNCM.getValue(0, "descricao") != "ERRO";		
	}	
	
	
	function validaNatureza(nat_operacao){		
		var co1 = DatasetFactory.createConstraint('nat_oper', nat_operacao, nat_operacao, ConstraintType.MUST);
		var co2 = DatasetFactory.createConstraint('token', token, token, ConstraintType.MUST);
	    var datasetTOTVSNaturOper = DatasetFactory.getDataset('TOTVSNaturOper', null, new Array(co1, co2), null);
	    return String(datasetTOTVSNaturOper.getValue(0, "denominacao")).toUpperCase() != "ERRO";
	}
	
	function validaCEP(cep){		
		var constraintCEP = DatasetFactory.createConstraint('cep', cep, cep, ConstraintType.MUST);
		var datasetCEP = DatasetFactory.getDataset('consultaCEP', null, new Array(constraintCEP), null);
	    return datasetCEP.getValue(0, "cep") == cep;
	}
	
	function validaItem(item, estab){		
		var subc1 = DatasetFactory.createConstraint("cod_item", item, item, ConstraintType.MUST);
		var subc2 = DatasetFactory.createConstraint("estab", estab, estab, ConstraintType.MUST);
		var subc3 =  DatasetFactory.createConstraint('token', token, token, ConstraintType.MUST);
		var subconstraints   = new Array(subc1, subc2, subc3);
		var subdataset = DatasetFactory.getDataset("TOTVSItem", null, subconstraints, null);	
		return subdataset.getValue(0, "desc_item") != "ERRO";			
	}	
	
}