function beforeTaskSave(colleagueId,nextSequenceId,userList){	
	
	hAPI.setCardValue('num_processo', getValue("WKNumProces"));
	
	if (nextSequenceId = 52){
		if (hAPI.listAttachments().size() < 1) {
			throw "<br/><strong>ATENÇÃO:</strong><br/><br/>É obrigatorio a inclusão de uma cotação inicial<br/><br/>.";
		}
	}	
}