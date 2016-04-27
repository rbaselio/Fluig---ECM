function beforeCancelProcess(colleagueId,processId){
	
	
	var process = getValue("WKNumProces");
	
	log.info("----------------------CANCELAMENTO DE PROCESSOS-------------------------------")
	log.info("----------------------numProcesso: " + process);
	

	var status = false;	

	try {
		var cardData = new java.util.HashMap();
		cardData = hAPI.getCardData(process);
		var keys = cardData.keySet().toArray();
		log.warn("Verificando status dos subprocessos do processo: " + process);
		for ( var key in keys) {
			var field = keys[key];
			if (field.indexOf("processo___") > -1) {

				var row = field.replace("processo___", "");
				var processo = hAPI.getCardValue("processo___" + row);

				var c1 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", processo, processo, ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("processId", "subteste", "subteste", ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("workflowProcessPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
				var constraints = new Array(c1, c2, c3, c4);
				
				var datasetPrincipal = DatasetFactory.getDataset("workflowProcess", null, constraints, null);
				
				if (datasetPrincipal.rowsCount > 0) {
					hAPI.setCardValue("status___" + row, "Em andamento");
					log.warn("O Processo " + processo + " ainda esta em aberto");
					status = true;
					break;
				} 
			}
		}

	} catch (e) {
		log.error("----------------ERRO:");
		log.error(e);
	}
	
	if (status == true) {
		throw "<br>É necessario finalizar ou cancelar o subprocesso nº" + processo + " para cancelar este processo<br>";
	}
		
}