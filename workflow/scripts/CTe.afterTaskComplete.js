function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var sequenceId = getValue("WKNumState");
	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, sequenceId);
	var colleagueId = getValue("WKUser");	
	
	if (sequenceId == 0 || sequenceId == 1) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("narrativaNF"));
	
	if (sequenceId == 3) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_analista"));
			
	if (sequenceId == 11)  hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_contratante"));
		
	if (sequenceId == 38)  hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_cancelamento")); 
	
	if (sequenceId == 48) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_checkDados")); 

	if (sequenceId == 52) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_aprov_checkDados")); 

	if (sequenceId == 59) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_aprov_final")); 

	if (sequenceId == 29) hAPI.setTaskComments(colleagueId, numProcesso,  numThread, hAPI.getCardValue("desc_lancDatasul"));
	
	
}