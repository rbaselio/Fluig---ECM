function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	hAPI.setCardValue('num_processo', getValue("WKNumProces"));
	
	if (nextSequenceId = 2 && hAPI.getCardValue('espNota') == "devolucao"){
		
		var token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");	
		
		var co1 = DatasetFactory.createConstraint('nat_oper', hAPI.getCardValue("natOper_emitente"), hAPI.getCardValue("natOper_emitente"), ConstraintType.MUST);
		var co2 = DatasetFactory.createConstraint('token', token, token, ConstraintType.MUST);
	    var datasetTOTVSNaturOper = DatasetFactory.getDataset('TOTVSNaturOper', null, new Array(co1, co2), null);
	    
		if (hAPI.listAttachments().size() < 1 && datasetTOTVSNaturOper.getValue(0, "nat_operacao") == 'Saída') {
			throw "<br/><strong>ATENÇÃO:</strong><br/><br/>É obrigatorio incluir um scan da nota de referência<br/><br/>.";
		}
	}	
	
}