function afterStateEntry(sequenceId) {

	log.info("----------------------AFTER STATE ENTRY-------------------------------");

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");

	log.info("----------------------numEmpresa: " + numEmpresa);
	log.info("---------------------numProcesso: " + numProcesso);
	log.info("-----------------nrProxAtividade: " + nrProxAtividade);
	log.info("-----------------------numThread: " + numThread);
	log.info("--------------------numAtividade: " + numAtividade);
	log.info("---------------------colleagueId: " + colleagueId);

	if (numAtividade == 5) {
		try {
			var dataStr = hAPI.getCardValue("prazo_conclusao").split("/");

			var data = new Date();
			
			data.setDate(dataStr[0]);
			data.setMonth(dataStr[1] - 1);
			data.setFullYear(dataStr[2]);
			
			colleagueId = hAPI.getCardValue("responsavel");
			

			try {
				hAPI.setDueDate(numProcesso, numThread, colleagueId, data, 61200);
			} catch (e) {
				log.error("----------------Erro ao alterar a data de execução:");
				log.error(e);
			}
		} catch (e) {
			log.error("----------------Erro ao calcular o novo periodo:");
			log.error(e);
		}
	}
}