function afterStateEntry(sequenceId) {

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade);
	var numAtividade = sequenceId;
	var colleagueId = getValue("WKUser");

	log.info("----------------------AFTER STATE ENTRY-------------------------------");
	log.info("----------------------numEmpresa: " + numEmpresa);
	log.info("----------------------numProcesso: " + numProcesso);
	log.info("----------------------nrProxAtividade: " + nrProxAtividade);
	log.info("----------------------numThread: " + numThread);
	log.info("----------------------numAtividade: " + numAtividade);
	log.info("----------------------colleagueId: " + colleagueId);

	if (numAtividade == 2) { // seta prazo para o atendimento
		
		log.info("----------------------PRAZO DE ATEDNIMENTO-------------------------------");

		var colleagueId = hAPI.getCardValue("responsavel");
		log.info("----------------------colleagueId: " + colleagueId);

		var data = new Date();

		//var dt_planejada = new java.lang.String(hAPI.getCardValue("data_sol")).split("-");
		//log.info("----------------------ANO: " + dt_planejada[2]);
		//log.info("----------------------MES: " + (dt_planejada[1] - 1));
		//log.info("----------------------ANO: " + dt_planejada[0]);

		var horas = hAPI.getCardValue("prazo");
		log.info("--------------------HORAS: " + horas);

		// seta o dia, mês (Janeiro é 0) e ano
		//data.setDate(dt_planejada[2]);
		//data.setMonth(dt_planejada[1] - 1);
		//data.setFullYear(dt_planejada[0]);

		try {
			var obj = hAPI.calculateDeadLineHours(data, 28800, horas, "Default");
			var dt = obj[0];
			var segundos = obj[1];
			log.info("----------------NOVA DATA: " + dt);
			log.info("---------------- SEGUNDOS: " + segundos);

			try {
				hAPI.setDueDate(numProcesso, numThread, colleagueId, dt, segundos);
			} catch (e) {
				log.error("----------------Erro ao alterar a data de execução:\n" + e);
			}

		} catch (e) {
			log.error("----------------Erro ao calcular o novo periodo:\n" + e);
		}
	}
}


function beforeStateLeave(sequenceId){
	
	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade);
	var numAtividade = sequenceId;
	var colleagueId = getValue("WKUser");
	
	log.info("----------------------BEFORE STATE LEAVE-------------------------------");
	log.info("numEmpresa: " + numEmpresa);
	log.info("numProcesso: " + numProcesso);
	log.info("nrProxAtividade: " + nrProxAtividade);
	log.info("numThread: " + numThread);
	log.info("numAtividade: " + numAtividade);
	log.info("colleagueId: " + colleagueId);
	
	
	if(numAtividade == 0 || numAtividade == 1){ 
		log.info("----------------------COMENTARIO DA ABERTURA DO CHAMADO-------------------------------");
		log.info("numAtividade: " + numAtividade);
		log.info("setTaskComments: " + hAPI.getCardValue("desc_chamado"));
		hAPI.setTaskComments(colleagueId, numProcesso,  numThread,  hAPI.getCardValue("desc_chamado"));	
		
		
		log.info("---------------------------------- EMAIL ----------------------------------------");			
		try{										
			log.info("---------------------------------- Monta mapa com parâmetros do template");				
			var parametros = new java.util.HashMap();				
			
			log.info("----------------------------------Este parâmetro é obrigatório e representa o assunto do e-mail");				
			parametros.put("subject", "Abertura de chamado técnico para a área de TI");				
			
			log.info("----------------------------------criando dados para o template do e-mail");				
			parametros.put("processo", "" + numProcesso );	
			
			var texto = new String(hAPI.getCardValue("desc_chamado")).replace(new RegExp('\r?\n','g'), "<br/>");
			parametros.put("descricao", texto);
			
			
			parametros.put("tempo", hAPI.getCardValue("prazo"));
			parametros.put("WDK_CompanyId", numEmpresa);			
			

			log.info("----------------------------------Monta lista de destinatários");				
			var destinatarios = new java.util.ArrayList();				
			var usuario_form = hAPI.getCardValue("matricula_user");				
			destinatarios.add(usuario_form);								
			
			log.info("----------------------------------Envia e-mail");				
			notifier.notify(getValue("WKUser"), "abert-chamado", parametros, destinatarios, "text/html");			
		}			
		catch(e){				
			log.error("----------------------------------Erro ao enviar e-mail\n" + e);			
		}
		
	}

}
