function afterStateEntry(sequenceId){

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");
	
	log.info("----------------------AFTER STATE ENTRY 2 update-------------------------------")
	log.info("----------------------numEmpresa: " + numEmpresa);
	log.info("----------------------numProcesso: " + numProcesso);
	log.info("----------------------numThread: " + numThread);
	log.info("----------------------numAtividade: " + numAtividade);
	log.info("----------------------colleagueId: " + colleagueId);
	

	if(numAtividade == 5){  //implementar plano e ação
		var data = new Date();
		
		var prazo = hAPI.getCardValue("data_prazo");
		
		if (prazo != ''){
			var dt_planejada;			
			if (prazo.indexOf("-") > 0){
				dt_planejada = new java.lang.String(prazo).split("-");
				log.info("----------------------DIA: " + dt_planejada[2]);
				log.info("----------------------MES: " + (dt_planejada[1] - 1));
				log.info("----------------------ANO: " + dt_planejada[0]);	
				//seta o dia, mês (Janeiro é 0) e ano
				data.setDate(dt_planejada[2]);
				data.setMonth(dt_planejada[1] - 1);
				data.setFullYear(dt_planejada[0]);
				log.info("----------------------DATA: " + data);
			} else{
				dt_planejada = new java.lang.String(prazo).split("/");
				log.info("----------------------DIA: " + dt_planejada[0]);
				log.info("----------------------MES: " + (dt_planejada[1] - 1));
				log.info("----------------------ANO: " + dt_planejada[2]);
				//seta o dia, mês (Janeiro é 0) e ano
				data.setDate(dt_planejada[0]);
				data.setMonth(dt_planejada[1] - 1);
				data.setFullYear(dt_planejada[2]);
				log.info("----------------------DATA: " + data);
			}
			
			var obj = hAPI.calculateDeadLineTime(data, 28800, 960, "Default");
		    var dt = obj[0];
		    var segundos = obj[1];
		   
			hAPI.setDueDate(numProcesso, numThread, colleagueId, dt, 28800);
			
			
			
		}
	}
}