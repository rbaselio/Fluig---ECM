function afterStateEntry(sequenceId){	var numEmpresa = getValue("WKCompany");	var numProcesso = getValue("WKNumProces");	var nrProxAtividade = getValue("WKNextState");	var numAtividade = sequenceId;	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);	var colleagueId = getValue("WKUser");		log.info("----------------------AFTER STATE ENTRY-------------------------------")	log.info("----------------------numEmpresa: " + numEmpresa);	log.info("----------------------numProcesso: " + numProcesso);	log.info("----------------------nrProxAtividade: " + nrProxAtividade);	log.info("----------------------numThread: " + numThread);	log.info("----------------------numAtividade: " + numAtividade);	log.info("----------------------colleagueId: " + colleagueId);		if(numAtividade == 5){  //implementar plano e ação		var colleagueId = hAPI.getCardValue("matricula_resp2");		log.info("----------------------colleagueId: " + colleagueId);				var data = new Date();		var dt_planejada = new java.lang.String(hAPI.getCardValue("prazo")).split("-");		log.info("----------------------ANO: " + dt_planejada[2]);		log.info("----------------------MES: " + (dt_planejada[1] - 1));		log.info("----------------------ANO: " + dt_planejada[0]);				//seta o dia, mês (Janeiro é 0) e ano		data.setDate(dt_planejada[2]);		data.setMonth(dt_planejada[1] - 1);		data.setFullYear(dt_planejada[0]);		log.info("----------------------data: " + data);		try {			hAPI.setDueDate(numProcesso, numThread, colleagueId, data, 28800);		}catch (e) {		            log.error("Erro ao alterar a data de execução:\n" + e);		}	}}