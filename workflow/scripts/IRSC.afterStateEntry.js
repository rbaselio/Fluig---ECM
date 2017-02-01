function afterStateEntry(sequenceId) {

	//log.warn("----------------------AFTER STATE ENTRY-------------------------------");

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");

	//log.warn("----------------------numEmpresa: " + numEmpresa);
	//log.warn("---------------------numProcesso: " + numProcesso);
	//log.warn("-----------------nrProxAtividade: " + nrProxAtividade);
	//log.warn("-----------------------numThread: " + numThread);
	//log.warn("--------------------numAtividade: " + numAtividade);
	//log.warn("---------------------colleagueId: " + colleagueId);

	if (numAtividade == 7) {
		var responsavel = hAPI.getCardValue("matricula_resp");		
		
		if (responsavel != ""){		
			
			var dataStr = hAPI.getCardValue("prazo").split("/");
			var data = new Date();

			data.setDate(dataStr[0]);
			data.setMonth(dataStr[1] - 1);
			data.setFullYear(dataStr[2]);

			try {
				hAPI.setDueDate(numProcesso, numThread, responsavel, data,
						61200);
			} catch (e) {
				log.error("----------------Erro ao alterar a data de execução:");
				log.error(e);
			}
		}
	}
}