function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var sequenceId = getValue("WKNumState");
	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, sequenceId);
	var colleagueId = getValue("WKUser");	
	
	if (sequenceId == 3) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_analista").replace("\n", "<br/>"));
			
	if (sequenceId == 11)  hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_contratante").replace("\n", "<br/>"));
		
	if (sequenceId == 38)  hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_cancelamento").replace("\n", "<br/>")); 
	
	if (sequenceId == 48) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_checkDados").replace("\n", "<br/>")); 

	if (sequenceId == 52) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_aprov_checkDados").replace("\n", "<br/>")); 

	if (sequenceId == 59) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_aprov_final").replace("\n", "<br/>")); 

	if (sequenceId == 29) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_lancDatasul").replace("\n", "<br/>"));
	
	
}