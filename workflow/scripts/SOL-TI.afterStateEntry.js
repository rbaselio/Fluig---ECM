function afterStateEntry(sequenceId) {
	
	//log.warn("----------------------AFTER STATE ENTRY-------------------------------");

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");
	var documento = getValue("WKCardId");

	//log.warn("----------------------numEmpresa: " + numEmpresa);
	//log.warn("---------------------numProcesso: " + numProcesso);
	//log.warn("-----------------nrProxAtividade: " + nrProxAtividade);
	//log.warn("-----------------------numThread: " + numThread);
	//log.warn("--------------------numAtividade: " + numAtividade);
	//log.warn("---------------------colleagueId: " + colleagueId);
	//log.warn("----------------------DocumentId: " + documento);
	
	if (numAtividade == 2 || numAtividade == 6) { // seta prazo para o atendimento
		//log.warn("----------------------PRAZO DE ATEDNIMENTO-------------------------------");
		
		if (numAtividade == 6){
			colleagueId = hAPI.getCardValue("matricula_atend");
		} else if (hAPI.getCardValue("responsavel") == "" || hAPI.getCardValue("responsavel") == "root"){
			colleagueId = "Pool:Role:TI";
		} else {
			colleagueId = hAPI.getCardValue("responsavel");
		}
		//log.warn("---------------------colleagueId: " + colleagueId);		

		var data = new Date();
		//log.warn("-----------------------DATA ATUAL: " + data);
		
		var horas = hAPI.getCardValue("prazo");
		//log.warn("------------HORAS DE ATENDIMENTO: " + horas);
		
		try {
			
			var elapsed = (data.getHours() * 60 * 60) + (data.getMinutes() * 60) + data.getSeconds();
			//log.warn("-----------------------SEGUNDOS: " + elapsed);
			
			var obj = hAPI.calculateDeadLineHours(data, elapsed, horas, "Default");
			var dt = obj[0];
			var segundos = obj[1];
			//log.warn("-----------------------NOVA DATA: " + dt);
			//log.warn("------------------------SEGUNDOS: " + segundos);			

			try {
				hAPI.setDueDate(numProcesso, numThread, colleagueId, dt, segundos);
			} catch (e) {
				//log.error("----------------Erro ao alterar a data de execução:");
				//log.error(e);
			}
		} catch (e) {
			//log.error("----------------Erro ao calcular o novo periodo:");
			//log.error(e);
		}
		//log.warn("---------------------- FIM PRAZO DE ATENDIMENTO -----------------------------");
	}
	//log.warn("----------------------FIM AFTER STATE ENTRY-------------------------------");
	
	
}
