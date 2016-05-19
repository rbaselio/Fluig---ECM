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
			
		if (numAtividade == 2){
			log.info("----------------------RENOMEAR DOCUMENTO-------------------------------");
			var consumer = oauthUtil.getNewAPIConsumer("api_fluig", "api_fluig",
		            "03e5895b-8ef2-4bb7-90cc-9a08ceea7a74",
		            "8737e42a-ce67-44b7-a387-7f63e6aa0bce5ad390c5-12f8-499b-8644-f22a385497c3");
			var jsonContent = '{"id":"' + documento + '","description":"Processo - ' + numProcesso + '"}';
			log.warn(jsonContent);    
			   
		    try{
		    	 consumer.post("/public/ecm/document/updateDescription", jsonContent);
			} catch(e){				
				log.error("-----------------------------Erro ao renomar documento: ");
				log.error(e);			
			}
		    log.info("----------------------FIM RENOMEAR DOCUMENTO-------------------------------");
		}
			
			
			
		
		log.info("----------------------PRAZO DE ATEDNIMENTO-------------------------------");
		
		if (numAtividade == 6){
			colleagueId = hAPI.getCardValue("matricula_atend");
		}
		else if (hAPI.getCardValue("responsavel") == "" || hAPI.getCardValue("responsavel") == "root"){
			colleagueId = "Pool:Role:TI";
		} else {
			colleagueId = hAPI.getCardValue("responsavel");
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
