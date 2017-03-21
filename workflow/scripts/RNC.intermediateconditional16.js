function intermediateconditional16() {
	
	var process = getValue("WKNumProces");
	
	//log.warn("----------------------STATUS DE PROCESSOS-------------------------------")
	//log.warn("----------------------numProcesso: " + process);
	

	var status = true;

	try {
		var cardData = new java.util.HashMap();
		cardData = hAPI.getCardData(process);
		var keys = cardData.keySet().toArray();
		//log.warn("Verificando status dos subprocessos do processo: " + process);
		for ( var key in keys) {
			var field = keys[key];
			if (field.indexOf("fluxo_corr___") > -1) {

				var row = field.replace("fluxo_corr___", "");
				var processo = hAPI.getCardValue("fluxo_corr___" + row);				

				var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", processo, processo, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("processTaskPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constraints = new Array(c1, c2);
				
				var sortingFields = new Array("processTaskPK.movementSequence");
				
				var datasetPrincipal = DatasetFactory.getDataset("processTask", null, constraints, sortingFields);
				
				var i = datasetPrincipal.rowsCount - 1;
				
				if (datasetPrincipal.getValue(i, "active") == true){
					
					var childCardData = hAPI.getCardData(processo);
					hAPI.setCardValue("dtprazoativ_corr___" + row, childCardData.get("prazo_conclusao"));
					
					var dataStr = hAPI.getCardValue("dtprazoativ_corr___" + row).split("/");
					var dataPrevista = new Date();
					dataPrevista.setDate(dataStr[0]);
					dataPrevista.setMonth(dataStr[1] - 1);
					dataPrevista.setFullYear(dataStr[2]);
					
					if (new Date() > dataPrevista) {
						hAPI.setCardValue("status_corr___" + row, "Em atraso");
						//log.warn("O Processo " + processo + " ainda esta em atraso");						
					}
					else {
						hAPI.setCardValue("status_corr___" + row, "Em andamento");
						//log.warn("O Processo " + processo + " ainda esta em aberto");
					}
					status = false;
					
				} else if(datasetPrincipal.getValue(i, "status") == 4){
					hAPI.setCardValue("status_corr___" + row, "Cancelado");
					//log.warn("O Processo " + processo + " foi cancelado");											
				} else {
					hAPI.setCardValue("status_corr___" + row, datasetPrincipal.getValue(i, "taskCompletionDate"));
					//log.warn("O Processo " + processo + " foi concluído");										
				}				
			}
		}

	} catch (e) {
		//log.error("----------------ERRO:");
		//log.error(e);
	}
	return status;

}