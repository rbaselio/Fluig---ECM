function afterStateEntry(sequenceId) {
	
	log.info("----------------------AFTER STATE ENTRY-------------------------------");

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade);
	var numAtividade = sequenceId;
	var colleagueId = getValue("WKUser");

	log.info("----------------------numEmpresa: " + numEmpresa);
	log.info("---------------------numProcesso: " + numProcesso);
	log.info("-----------------nrProxAtividade: " + nrProxAtividade);
	log.info("-----------------------numThread: " + numThread);
	log.info("--------------------numAtividade: " + numAtividade);
	log.info("---------------------colleagueId: " + colleagueId);

	if (numAtividade == 2 || numAtividade == 6) { // seta prazo para o atendimento
		
		log.info("----------------------PRAZO DE ATEDNIMENTO-------------------------------");
		
		var colleagueId = "Pool:Group:TI";
		if (numAtividade == 6) {
			colleagueId = hAPI.getCardValue("matricula_atend");
		}
		log.info("---------------------colleagueId: " + colleagueId);		

		var data = new Date();
		log.info("-----------------------DATA ATUAL: " + data);
		//var dt_planejada = new java.lang.String(hAPI.getCardValue("data_sol")).split("-");
		//log.info("----------------------ANO: " + dt_planejada[2]);
		//log.info("----------------------MES: " + (dt_planejada[1] - 1));
		//log.info("----------------------ANO: " + dt_planejada[0]);

		var horas = hAPI.getCardValue("prazo");
		log.info("------------HORAS DE ATENDIMENTO: " + horas);
		
		//seta o dia, mês (Janeiro é 0) e ano
		//data.setDate(dt_planejada[2]);
		//data.setMonth(dt_planejada[1] - 1);
		//data.setFullYear(dt_planejada[0]);

		try {
			
			var elapsed = (data.getHours() * 60 * 60) + (data.getMinutes() * 60) + data.getSeconds();
			log.info("-----------------------SEGUNDOS: " + elapsed);
			
			var obj = hAPI.calculateDeadLineHours(data, elapsed, horas, "Default");
			var dt = obj[0];
			var segundos = obj[1];
			log.info("-----------------------NOVA DATA: " + dt);
			log.info("----------------------- SEGUNDOS: " + segundos);			

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
