function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	if (hAPI.listAttachments().size() < 2) {
        throw "    É necessario incluir os arquivos XML e PDF!";
    }
	
	if (nextSequenceId == 45) {
		
		var process;
		var cardData = new java.util.HashMap();
		
		//Monta as constraints para consulta
	    var c1 = DatasetFactory.createConstraint("processId", "CTe", "CTe", ConstraintType.MUST);
	    var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	    var constraints   = new Array(c1, c2);
	    
	    //Busca o dataset
	    var dataset = DatasetFactory.getDataset("workflowProcess", null, constraints, null);
	    
	    process = 0;
	    for(var i = 0; i < dataset.rowsCount; i++) {
	    	process = dataset.getValue(i, "workflowProcessPK.processInstanceId");	    	
	    	cardData = hAPI.getCardData(process);			
			if (hAPI.getCardValue("ChaveCTe")  == cardData.get("ChaveCTe") && process != getValue("WKNumProces")){
				var cc1 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", process, process, ConstraintType.MUST);
			    var cc2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
			    var cconstraints   = new Array(cc1, cc2);
			    
			    var subDataset = DatasetFactory.getDataset("processHistory", null, cconstraints, null);
			    for(var j = 0; j < subDataset.rowsCount; j++) {
			    	if (subDataset.getValue(j, "stateSequence") != 29 && subDataset.getValue(j, "stateSequence") != 45) throw "<br/>Ainda não é possivel enviar este processo para a proxima etapa! </br>Aguardando o processo: " + process;			    
			    }			
				
			}
		}
	}
	

	if (nextSequenceId == 74) {
		
		var process;
		var cardData = new java.util.HashMap();
		
		//Monta as constraints para consulta
	    var c1 = DatasetFactory.createConstraint("processId", "CTe", "CTe", ConstraintType.MUST);
	    var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	    var constraints   = new Array(c1, c2);
	    
	    //Busca o dataset
	    var dataset = DatasetFactory.getDataset("workflowProcess", null, constraints, null);
	    
	    process = 0;
	    for(var i = 0; i < dataset.rowsCount; i++) {
	    	process = dataset.getValue(i, "workflowProcessPK.processInstanceId");	    	
	    	cardData = hAPI.getCardData(process);			
			if (hAPI.getCardValue("ChaveCTe")  == cardData.get("ChaveCTe") && process != getValue("WKNumProces")){
				var cc1 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", process, process, ConstraintType.MUST);
			    var cc2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
			    var cconstraints   = new Array(cc1, cc2);
			    
			    var subDataset = DatasetFactory.getDataset("processHistory", null, cconstraints, null);
			    for(var j = 0; j < subDataset.rowsCount; j++) {
			    	if (subDataset.getValue(j, "stateSequence") != 3 && subDataset.getValue(j, "stateSequence") != 11) {
			    		if (cardData.get("aprov_contratante") != hAPI.getCardValue("aprov_contratante"))
			    			throw "<br/>A decisão desta tarefa difere do processo " + process + " que contem o mesmo CTe e <strong>" + cardData.get("aprov_contratante") + "</strong> foi aprovado";			    
			    	}
			    }			
				
			}
		}
	}
}