function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	if(getValue("WKCompletTask") == 'true' ){
	
		var numState = getValue("WKNumState");
		var process = getValue("WKNumProces");
		
		if ((numState == 0 || numState == 4) && hAPI.getCardValue("prenchimento") == 'solic'){
			if (!temAnexo(numState)) throw "</br></br>- É necessario incluir os comprovantes de despesa";
		}
		
		if (numState == 5){		
			if (!temAnexo(4) && !temAnexo(numState)) throw "</br></br>- É necessario incluir os comprovantes de despesa";
		}
		
		if (numState == 27 && hAPI.getCardValue("aprov_finaceira") == "sim"){		
			var vl_adiant = parseFloat(hAPI.getCardValue("vl_prestacao").replace(".","").replace(",","."));
			if (isNaN(vl_adiant)) vl_adiant = 0;
			var tot_desp = parseFloat(hAPI.getCardValue("vl_tot_geral").replace(".","").replace(",","."));
			if (isNaN(tot_desp)) tot_desp = 0;		
			if ((vl_adiant - tot_desp) < 0 && !temAnexo(numState)) throw "</br></br>- É necessario incluir os comprovantes de depósito";
		}
	}
	
	
	function temAnexo(numState){
		var process = getValue("WKNumProces");
		var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', process, process, ConstraintType.MUST);
		var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, new Array(constraintProcessAttachment), null);
		
		for(var i = 0; i < datasetProcessAttachment.rowsCount; i++) {
			var constraintDocument1 = DatasetFactory.createConstraint('documentPK.documentId', datasetProcessAttachment.getValue(i, "documentId"), datasetProcessAttachment.getValue(i, "documentId"), ConstraintType.MUST);
			var constraintDocument2 = DatasetFactory.createConstraint('documentPK.companyId', datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
			var constraintDocument3 = DatasetFactory.createConstraint('documentPK.version', datasetProcessAttachment.getValue(i, "version"), datasetProcessAttachment.getValue(i, "version"), ConstraintType.MUST);
			var constraintDocument4 = DatasetFactory.createConstraint('documentType', '5', '5', ConstraintType.MUST_NOT);
			
			var datasetDocument = DatasetFactory.getDataset('document', null, new Array(constraintDocument1, constraintDocument2, constraintDocument3, constraintDocument4), null);
			if (datasetDocument.rowsCount > 0) {
				var constraintProcessHistory1 = DatasetFactory.createConstraint('processHistoryPK.movementSequence', datasetProcessAttachment.getValue(i, "originalMovementSequence"), datasetProcessAttachment.getValue(i, "originalMovementSequence"), ConstraintType.MUST);
				var constraintProcessHistory2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', process, process, ConstraintType.MUST);
				var constraintProcessHistory3 = DatasetFactory.createConstraint('processHistoryPK.companyId', datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), datasetProcessAttachment.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
				var constraintProcessHistory4 = DatasetFactory.createConstraint('stateSequence', numState, numState, ConstraintType.MUST);
				var datasetProcessHistory = DatasetFactory.getDataset('processHistory', null, new Array(constraintProcessHistory1, constraintProcessHistory2, constraintProcessHistory3, constraintProcessHistory4), null);
				if (datasetProcessHistory.rowsCount > 0) return true;
			}
		}
		return false;	
	}
	
	
	
}