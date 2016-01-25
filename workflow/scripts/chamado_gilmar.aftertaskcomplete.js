function afterTaskComplete(colleagueId,nextSequenceId,userList){
	var process = getValue("WKNumProces");
	if (nextSequenceId == 13 || nextSequenceId == 5){
		hAPI.setCardValue("nm_solicitacao",process);
	}
}