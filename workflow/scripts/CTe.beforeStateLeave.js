function beforeStateLeave(sequenceId){
	
	hAPI.setCardValue("num_processo", getValue("WKNumProces"));
	
	if (sequenceId == 3) {
		var calendar = java.util.Calendar.getInstance().getTime();
        var docs = hAPI.listAttachments();
        for (var i = 0; i < docs.size(); i++) {
            var doc = docs.get(i);
            
            if (doc.getDocumentType() != "7") {continue;}
             
            var ext = doc.getDocumentDescription().substring(doc.getDocumentDescription().lastIndexOf(".")) ;             
           
            doc.setParentDocumentId(10809);
            doc.setDocumentDescription("Processo: " + getValue("WKNumProces") + " - Anexo: " + (i + 1) +  ext );          
            doc.setVersionDescription("Processo: " + getValue("WKNumProces"));
            doc.setAdditionalComments("Processo: " + getValue("WKNumProces") + " - Anexo: " + (i + 1));
            doc.setExpires(false);
            doc.setCreateDate(calendar);
            doc.setValidationStartDate(calendar);
            
            doc.setInheritSecurity(true);
            doc.setTopicId(1);
            doc.setUserNotify(false);
            
            doc.setVersionOption("0");
            doc.setImutable(false);
            doc.setUpdateIsoProperties(true);
            try { 
            	hAPI.publishWorkflowAttachment(doc);
            } catch (e) {
        		//log.error("----------------ERRO:");
        		//log.error(e);
        	}
        }
        
    }
	
	if (sequenceId == 82) {
		var process;
		var auxObs = "";
		var cardData = new java.util.HashMap();
		
		//Monta as constraints para consulta
	    var c1 = DatasetFactory.createConstraint("processId", "CTe", "CTe", ConstraintType.MUST);
	    var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	    var constraints   = new Array(c1, c2);
	    
	    //Define os campos para ordenação
	    var sortingFields = new Array("workflowProcessPK.processInstanceId");
	     
	    //Busca o dataset
	    var dataset = DatasetFactory.getDataset("workflowProcess", null, constraints, sortingFields);
	    
	    process = 0;
	    for(var i = 0; i < dataset.rowsCount; i++) {
	    	process = dataset.getValue(i, "workflowProcessPK.processInstanceId");	    	
	    	cardData = hAPI.getCardData(process);			
			if (hAPI.getCardValue("ChaveCTe")  == cardData.get("ChaveCTe") && process != getValue("WKNumProces")){
				auxObs = auxObs + "- Nota Fiscal: " + cardData.get("nrNota") + " no fluxo: " + process + "\n";
			}
		}
	    if (auxObs != "") hAPI.setCardValue("narrativaNF", hAPI.getCardValue("narrativaNF") + "\n\nEste CTe também contem:\n" + auxObs);
	    
	}	
	
	
}