function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	if (hAPI.listAttachments().size() < 2) {
        throw "    É necessario incluir os arquivos XML e PDF!";
    }
	
}