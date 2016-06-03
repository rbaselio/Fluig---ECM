function afterStateEntry(sequenceId) {
	
	log.info("----------------------AFTER STATE ENTRY-------------------------------");

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");
	var documento = getValue("WKCardId");

	log.info("----------------------numEmpresa: " + numEmpresa);
	log.info("---------------------numProcesso: " + numProcesso);
	log.info("-----------------nrProxAtividade: " + nrProxAtividade);
	log.info("-----------------------numThread: " + numThread);
	log.info("--------------------numAtividade: " + numAtividade);
	log.info("---------------------colleagueId: " + colleagueId);
	log.info("----------------------DocumentId: " + documento);
	
	if (numAtividade == 2 || numAtividade == 6) { // seta prazo para o atendimento
		log.info("----------------------PRAZO DE ATEDNIMENTO-------------------------------");
		
		if (numAtividade == 6){
			colleagueId = hAPI.getCardValue("matricula_atend");
		} else if (hAPI.getCardValue("responsavel") == "" || hAPI.getCardValue("responsavel") == "root"){
			colleagueId = "Pool:Role:TI";
		} else {
			colleagueId = hAPI.getCardValue("responsavel");
		}
		log.info("---------------------colleagueId: " + colleagueId);		

		var data = new Date();
		log.info("-----------------------DATA ATUAL: " + data);
		
		var horas = hAPI.getCardValue("prazo");
		log.info("------------HORAS DE ATENDIMENTO: " + horas);
		
		try {
			
			var elapsed = (data.getHours() * 60 * 60) + (data.getMinutes() * 60) + data.getSeconds();
			log.info("-----------------------SEGUNDOS: " + elapsed);
			
			var obj = hAPI.calculateDeadLineHours(data, elapsed, horas, "Default");
			var dt = obj[0];
			var segundos = obj[1];
			log.info("-----------------------NOVA DATA: " + dt);
			log.info("------------------------SEGUNDOS: " + segundos);			

			try {
				hAPI.setDueDate(numProcesso, numThread, colleagueId, dt, segundos);
			} catch (e) {
				log.error("----------------Erro ao alterar a data de execução:");
				log.error(e);
			}
		} catch (e) {
			log.error("----------------Erro ao calcular o novo periodo:");
			log.error(e);
		}
		log.info("---------------------- FIM PRAZO DE ATENDIMENTO -----------------------------");
	}
	log.info("----------------------FIM AFTER STATE ENTRY-------------------------------");
	
	
}
