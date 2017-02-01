function afterStateEntry(sequenceId) {
	
	//log.warn("Entrei-------------------" + sequenceId);
	
	var process = getValue("WKNumProces");
	
	var resposta;
	var row;

	var cardData = new java.util.HashMap();
	cardData = hAPI.getCardData(process);
	var keys = cardData.keySet().toArray();
	
	if (sequenceId == 10) {
		
		try {	
			
			var cardData = new java.util.HashMap();
			cardData = hAPI.getCardData(process);
			var keys = cardData.keySet().toArray();
			for ( var key in keys) {
				var field = keys[key];
				if (field.indexOf("mat_emer___") > -1) {
					
					row = field.replace("mat_emer___", "");
					
					if (hAPI.getCardValue("fluxo_emer___" + row) == ""){					
						var userList = new java.util.ArrayList();
						userList.add(hAPI.getCardValue("mat_emer___" + row));
						
						var hpForm = new java.util.HashMap();						
						hpForm.put("process_pai", "" + process);
						hpForm.put("prazo_conclusao", "" + hAPI.getCardValue("dtprazoativ_emer___" + row));
						hpForm.put("descAtividade", "" + hAPI.getCardValue("descAtividade_emer___" + row));
						hpForm.put("responsavel", "" + hAPI.getCardValue("mat_emer___" + row));
						
						resposta = hAPI.startProcess("Sub-RNC", 0, userList, hAPI.getCardValue("descAtividade_emer___" + row), true, hpForm, false);
						hAPI.setCardValue("fluxo_emer___" + row, resposta.get("iProcess"));
						hAPI.setCardValue("status_emer___" + row,"Iniciado");
					}					
				}
			}

		} catch (e) {
			log.error("----------------ERRO:");
			log.error(e);
		}
	}
	
	if (sequenceId == 16) {		
		try {			
			for ( var key in keys) {
				var field = keys[key];
				if (field.indexOf("matricula_corr___") > -1) {
					
					row = field.replace("matricula_corr___", "");
					
					if (hAPI.getCardValue("fluxo_corr___" + row) == ""){					
						
						var userList = new java.util.ArrayList();
						userList.add(hAPI.getCardValue("matricula_corr___" + row));
						
						var hpForm = new java.util.HashMap();
						hpForm.put("process_pai", "" + process);
						hpForm.put("prazo_conclusao", "" + hAPI.getCardValue("dtprazoativ_corr___" + row));
						hpForm.put("descAtividade", "" + hAPI.getCardValue("descAtividade_corr___" + row));
						hpForm.put("responsavel", "" + hAPI.getCardValue("matricula_corr___" + row));
						
						resposta = hAPI.startProcess("Sub-RNC", 0, userList, hAPI.getCardValue("descAtividade_corr___" + row), true, hpForm, false);
						hAPI.setCardValue("fluxo_corr___" + row, resposta.get("iProcess"));
						hAPI.setCardValue("status_corr___" + row,"Iniciado");
					}					
				}
			}

		} catch (e) {
			log.error("----------------ERRO:");
			log.error(e);
		}
	}	
	
	if (sequenceId == 6) {
		try {
			cardData = hAPI.getCardData(process);
			var keys = cardData.keySet().toArray();
			log.warn("Verificando status dos subprocessos do processo: " + process);
			for ( var key in keys) {
				var field = keys[key];
				if (field.indexOf("fluxo_emer___") > -1) {

					var row = field.replace("fluxo_emer___", "");
					var processo = hAPI.getCardValue("fluxo_emer___" + row);				

					var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", processo, processo, ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("processTaskPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
					var constraints = new Array(c1, c2);
					
					var sortingFields = new Array("processTaskPK.movementSequence");
					
					var datasetPrincipal = DatasetFactory.getDataset("processTask", null, constraints, sortingFields);
					
					var i = datasetPrincipal.rowsCount - 1;
					
					if(datasetPrincipal.getValue(i, "status") == 4){
						hAPI.setCardValue("status_emer___" + row, "Cancelado");
						log.warn("O Processo " + processo + " foi cancelado");											
					} else {
						hAPI.setCardValue("status_emer___" + row, datasetPrincipal.getValue(i, "taskCompletionDate"));
						log.warn("O Processo " + processo + " foi concluído");										
					}				
				}
			}

		} catch (e) {
			log.error("----------------ERRO:");
			log.error(e);
		}
	}
}