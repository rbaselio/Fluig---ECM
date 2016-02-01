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

	if (numAtividade == 2) { // seta prazo para o atendimento
		
		log.info("----------------------PRAZO DE ATEDNIMENTO-------------------------------");

		var colleagueId = "Pool:Group:TI";
		log.info("---------------------colleagueId: " + colleagueId);		

		var data = new Date();
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
			var obj = hAPI.calculateDeadLineHours(data, 28800, horas, "TI");
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


function beforeStateLeave(sequenceId){
	
	log.info("---------------------BEFORE STATE LEAVE-------------------------------");
	
	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, nrProxAtividade);
	var numAtividade = sequenceId;
	var colleagueId = getValue("WKUser");
		
	log.info("---------------------numEmpresa: " + numEmpresa);
	log.info("--------------------numProcesso: " + numProcesso);
	log.info("----------------nrProxAtividade: " + nrProxAtividade);
	log.info("----------------------numThread: " + numThread);
	log.info("-------------------numAtividade: " + numAtividade);
	log.info("--------------------colleagueId: " + colleagueId);
	
	
		
	if(numAtividade == 0 || numAtividade == 1){ 
		log.info("----------------------COMENTARIO DA ABERTURA DO CHAMADO-------------------------------");
		log.info("numAtividade: " + numAtividade);
		log.info("setTaskComments: " + hAPI.getCardValue("desc_chamado"));
		
		var newComment = new String(hAPI.getCardValue("desc_chamado")).replace(new RegExp("\r?\n","g"), "<br/>");
		newComment = getValue("WKUserComment") + "<br/>" + newComment;
		
		try{
			hAPI.setTaskComments(colleagueId, numProcesso,  numThread,  newComment);
		} catch(e){				
			log.error("-------Erro ao setar comentario: ");
			log.error(e);			
		}
		log.info("--------------------FIM COMENTARIO DA ABERTURA DO CHAMADO-------------------------------");
		
		log.info("---------------------------------- EMAIL ----------------------------------------");			
		try{
			
			log.info("-------Monta mapa de parâmetros: ");				
			var parametros = new java.util.HashMap();				
			
			log.info("-------Setando titulo do e-mail: ");				
			parametros.put("subject", "Abertura de chamado técnico para a área de TI");				
			
			log.info("----------Preechendo o template: ");				
			parametros.put("processo", "" + numProcesso );	
			parametros.put("descricao", newComment);
			parametros.put("tempo", hAPI.getCardValue("prazo"));
			parametros.put("WDK_CompanyId", numEmpresa);			
			
			log.info("---Monta lista de destinatários: ");				
			var destinatarios = new java.util.ArrayList();				
			var usuario_form = hAPI.getCardValue("matricula_user");				
			destinatarios.add(usuario_form);								
			
			log.info("--------------------Enviando e-mail: ");				
			notifier.notify(getValue("WKUser"), "abert-chamado", parametros, destinatarios, "text/html");
			log.info("---------------------E-mail enviado: ");
			
		} catch(e){	
			log.error("----------Erro ao enviar e-mail: ");
			log.error(e);			
		}
		log.info("-------------------------------FIM EMAIL ----------------------------------------");		
	}
	log.info("---------------------FIM BEFORE STATE LEAVE-------------------------------");

}
