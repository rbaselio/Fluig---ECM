function afterStateLeave(sequenceId){
	
log.info("---------------------AFTER STATE LEAVE-------------------------------");
	
	
	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");
	
	
	log.info("---------------------numEmpresa: " + numEmpresa);
	log.info("--------------------numProcesso: " + numProcesso);
	log.info("----------------nrProxAtividade: " + nrProxAtividade);
	log.info("----------------------numThread: " + numThread);
	log.info("-------------------numAtividade: " + numAtividade);
	log.info("--------------------colleagueId: " + colleagueId);
	
		
	if(numAtividade == 0 || numAtividade == 1 || nrProxAtividade == 6){ 
		
		var newComment = new String(hAPI.getCardValue("desc_chamado")).replace(new RegExp("\r?\n","g"), "<br/>");	
		
		log.info("---------------------------------- EMAIL ----------------------------------------");				
		log.info("-------Monta mapa de parâmetros: ");				
		var parametros = new java.util.HashMap();				
		
		log.info("-------Setando titulo do e-mail: ");				
		parametros.put("subject", "Chamado técnico para a área de TI");				
		
		log.info("----------Preechendo o template: ");				
		parametros.put("processo", "" + numProcesso );	
		parametros.put("descricao", newComment);
		parametros.put("tempo", hAPI.getCardValue("prazo"));			
		parametros.put("WDK_CompanyId", numEmpresa);
		parametros.put("WDK_TaskLink", hAPI.getUserTaskLink(sequenceId));	
		
		log.info("---Monta lista de destinatários: ");				
		var destinatarios = new java.util.ArrayList();				
		var usuario_form = hAPI.getCardValue("matricula_user");				
		destinatarios.add(usuario_form);								
		
		log.info("--------------------Enviando e-mail: ");				
		notifier.notify(colleagueId, "abert-chamado", parametros, destinatarios, "text/html");
		log.info("---------------------E-mail enviado: ");

		log.info("-------------------------------FIM EMAIL ----------------------------------------");		
		
	}
	log.info("---------------------FIM AFTER STATE LEAVE-------------------------------");
	
	
}