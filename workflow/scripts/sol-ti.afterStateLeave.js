function afterStateLeave(sequenceId){
	
//log.warn("---------------------AFTER STATE LEAVE-------------------------------");
	
	
	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");
	
	
	//log.warn("---------------------numEmpresa: " + numEmpresa);
	//log.warn("--------------------numProcesso: " + numProcesso);
	//log.warn("----------------nrProxAtividade: " + nrProxAtividade);
	//log.warn("----------------------numThread: " + numThread);
	//log.warn("-------------------numAtividade: " + numAtividade);
	//log.warn("--------------------colleagueId: " + colleagueId);
	
		
	if(numAtividade == 0 || numAtividade == 1 || nrProxAtividade == 6){ 
		
		var newComment = new String(hAPI.getCardValue("desc_chamado")).replace(new RegExp("\r?\n","g"), "<br/>");	
		
		//log.warn("---------------------------------- EMAIL ----------------------------------------");				
		//log.warn("-------Monta mapa de parâmetros: ");				
		var parametros = new java.util.HashMap();				
		
		//log.warn("-------Setando titulo do e-mail: ");				
		parametros.put("subject", "Chamado técnico para a área de TI");				
		
		//log.warn("----------Preechendo o template: ");				
		parametros.put("processo", "" + numProcesso );	
		parametros.put("descricao", newComment);
		parametros.put("tempo", hAPI.getCardValue("prazo"));			
		parametros.put("WDK_CompanyId", numEmpresa);
		parametros.put("WDK_TaskLink", hAPI.getUserTaskLink(sequenceId));	
		
		//log.warn("---Monta lista de destinatários: ");				
		var destinatarios = new java.util.ArrayList();				
		var usuario_form = hAPI.getCardValue("matricula_user");				
		destinatarios.add(usuario_form);								
		
		//log.warn("--------------------Enviando e-mail: ");				
		notifier.notify(colleagueId, "abert-chamado", parametros, destinatarios, "text/html");
		//log.warn("---------------------E-mail enviado: ");

		//log.warn("-------------------------------FIM EMAIL ----------------------------------------");		
		
	}
	//log.warn("---------------------FIM AFTER STATE LEAVE-------------------------------");
	
	
}