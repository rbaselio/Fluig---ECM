function validateForm(form){
	
	if(getValue("WKCompletTask") == "true"){
	
		loading.setMessage("Validando campos de formulário");
		
		var numState = getValue("WKNumState");
		var message = "";	
		
		if (numState == 0 || numState == 1){
			if (form.getValue("tipo_manut") == '') message += "<br/>- Informe o tipo do equipamento;";
			if (form.getValue("tipo_manut_equip") == '') message += "<br/>- Informe o tipo da manutenção;";
			if (form.getValue("desc_equip") == '') message += "<br/>- Informe a descrição do equipamento;";
			if (form.getValue("ccusto") == '') message += "<br/>- Informe o centro de custo;";
			if (form.getValue("dias_manut") == '') message += "<br/>- Informe o previsão da manutenção;";
			if (form.getValue("tipo_problema") == '') message += "<br/>- Informe o tipo do problema;";
			if (form.getValue("desc_emissao") == '') message += "<br/>- Descreva o problema;";		
		}
		
		if (numState == 4){
			if (form.getValue("desc_aval_manut") == '') message += "<br/>- Informe a situação encontrada";
			
			var indexes = form.getChildrenIndexes("tb_rep_avail");
			if (indexes.length == 0) message += "<br/>- Informe ao menos um reporte de tempo;";
			
			var horas = 0;
			var minutos = 0;
			for (var i = 0; i < indexes.length; i++) {
		    	var dt_inicio = form.getValue("data_ini_aval___" + indexes[i]).split("/");
				var hora_inicio = form.getValue("hora_ini_aval___" + indexes[i]).split(":");		
				var dataInicio = new Date(dt_inicio[2], dt_inicio[1] - 1, dt_inicio[0], hora_inicio[0], hora_inicio[1], '00')
				if (isNaN(dataInicio.getTime()))  message += "<br/>- Data e hora de inicio na linha " + (i + 1);
				
				var dt_final = form.getValue("data_fim_aval___" + indexes[i]).split("/");
				var hora_final = form.getValue("hora_fim_aval___" + indexes[i]).split(":");		
				var dataFinal = new Date(dt_final[2], dt_final[1] - 1, dt_final[0], hora_final[0], hora_final[1], '00')
				if (isNaN(dataFinal.getTime()))  message += "<br/>- Data e hora de encerramento na linha " + (i + 1);
				
				var diferenca = (dataFinal - dataInicio);
				horas = (diferenca / (60 * 60 * 1000)) | 0;
				minutos = (((diferenca / (60 * 60 * 1000)) - horas) * 60);				
				form.setValue("tempo_rep_aval___" + indexes[i], ("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));
			}
			
			
			if (form.getValue('nec_material') == "sim"){
				var indexes = form.getChildrenIndexes("tb_pecas");
				if (indexes.length == 0) message += "<br/>- Informe ao menos uma peça necessaria;";
				for (var i = 0; i < indexes.length; i++) {
					var aux_valor = parseFloat(form.getValue("quant_pecs___" + indexes[i]).replace(".","").replace(",","."));
					if (isNaN(aux_valor)) aux_valor = 0;				
					if (aux_valor == 0) message += "<br/>- Informe a quantidade necessaria na linha " + (i + 1);					
				}		
			}
		}		
		
		if (numState == 12){
			if (temAnexo() == false) message += "<br/>- É necessario incluir o comprovante de cotação;";
		}
		
		if (numState == 8){
			if (form.getValue('resp_aprov_manut') == "nao" && form.getValue("desc_aprov_manut") == '') message += "<br/>- Informe motivo da rejeição;";
		}
		
		if (numState == 15){
			var indexes = form.getChildrenIndexes("tb_pecas");
			for (var i = 0; i < indexes.length; i++) {
				if (form.getValue("num_smd___" + indexes[i]) == "") message += "<br/>- Informe o numero da SMD linha " + ( i + 1);
			}
		}
		
		if (numState == 20){
			if (form.getValue("desc_exec_manut") == '') message += "<br/>- Descreva a manutenção realizada;";
			
			if (form.getValue("tp_manut") == "") message += "<br/>- Informe se é manutenção preventiva;";
			var indexes = form.getChildrenIndexes("tb_rep_horas");
			if (indexes.length == 0) message += "<br/>- Informe ao menos um reporte de tempo;";
			var diferencaTotal = 0;
			var horas = 0;
			var minutos = 0;
			for (var i = 0; i < indexes.length; i++) {
				var dt_inicio = form.getValue("data_ini_manut___" + indexes[i]).split("/");
				var hora_inicio = form.getValue("hora_ini_manut___" + indexes[i]).split(":");		
				var dataInicio = new Date(dt_inicio[2], dt_inicio[1] - 1, dt_inicio[0], hora_inicio[0], hora_inicio[1], '00')
				if (isNaN(dataInicio.getTime()))  message += "<br/>- Data e hora de inicio na linha " + (i + 1);
				
				var dt_final = form.getValue("data_fim_manut___" + indexes[i]).split("/");
				var hora_final = form.getValue("hora_fim_manut___" + indexes[i]).split(":");		
				var dataFinal = new Date(dt_final[2], dt_final[1] - 1, dt_final[0], hora_final[0], hora_final[1], '00')
				if (isNaN(dataFinal.getTime()))  message += "<br/>- Data e hora de encerramento na linha " + (i + 1);
				
				var diferenca = (dataFinal - dataInicio);
				diferencaTotal += diferenca;
				horas = (diferenca / (60 * 60 * 1000)) | 0;
				minutos = (((diferenca / (60 * 60 * 1000)) - horas) * 60);				
				form.setValue("tempo_rep_manut___" + indexes[i], ("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));
				
			
			}
			horas = (diferencaTotal / (60 * 60 * 1000)) | 0;
			minutos = (((diferencaTotal / (60 * 60 * 1000)) - horas) * 60);	
			form.setValue("tempo_manut", ("0" + horas).substr(-2) + ":" + ("0" + minutos).substr(-2));
			
			
			var indexes = form.getChildrenIndexes("tb_pecas_utilizadas");
			for (var i = 0; i < indexes.length; i++) {
				if (form.getValue("tempo_rep_manut___" + indexes[i]) == "")  message += "<br/>- Informe o reporte de tempo na " + (i + 1);
				if (parseFloat(form.getValue("quant_pecs_utilizadas___" + indexes[i]).replace(".","").replace(",",".")) == 0) message += "<br/>- Informe a quantidade utilizada na linha " + (i + 1);
				if (parseFloat(form.getValue("valor_pecs_utilizadas___" + indexes[i]).replace(".","").replace(",",".")) == 0) message += "<br/>- Informe o valor aproximado na linha " + (i + 1);
			}
		}		
			
		if (numState == 23){
			if (form.getValue('sol_aprov_manut') == "nao" && form.getValue("desc_user_aprov_manut") == '') message += "<br/>- Informe motivo da rejeição;";
		}
		
		if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;
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
	
	
}