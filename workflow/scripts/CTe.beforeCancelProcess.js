function beforeCancelProcess(colleagueId,processId){
	var process;
	var cardData = new java.util.HashMap();
	
	//Monta as constraints para consulta
    var c1 = DatasetFactory.createConstraint("processId", "CTe", "CTe", ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
    var constraints   = new Array(c1, c2);
    
    //Define os campos para ordenação
    var sortingFields = new Array("workflowProcessPK.processInstanceId");
     
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("workflowProcess", null, constraints, sortingFields);    
    
    for(var i = 0; i < dataset.rowsCount; i++) {
    	process = dataset.getValue(i, "workflowProcessPK.processInstanceId");	
		cardData = hAPI.getCardData(process);			
		if (hAPI.getCardValue("ChaveCTe")  == cardData.get("ChaveCTe")){
			 throw " Existem mais processos referentes a CTe em aberto, não é possivel cancelar ";			
		}
	}  
	
	
	
}