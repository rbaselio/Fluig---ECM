function beforeStateEntry(sequenceId){

	var numEmpresa = getValue("WKCompany");
	var numProcesso = getValue("WKNumProces");
	var numAtividade = sequenceId;
	var numThread = hAPI.getActualThread(numEmpresa, numProcesso, numAtividade);
	var colleagueId = getValue("WKUser");
	
	//log.warn("----------------------BEFORE STATE ENTRY 2 update-------------------------------")
	//log.warn("----------------------numEmpresa: " + numEmpresa);
	//log.warn("----------------------numProcesso: " + numProcesso);
	//log.warn("----------------------numThread: " + numThread);
	//log.warn("----------------------numAtividade: " + numAtividade);
	//log.warn("----------------------colleagueId: " + colleagueId);
	
	if(numAtividade == 26 && hAPI.getCardValue("nec_adiant") == "sim" ){ 
		var userList = new java.util.ArrayList();
		userList.add(hAPI.getCardValue("matricula_user"));
		
		var hpForm = new java.util.HashMap();						
		
		hpForm.put("data_prazo", hAPI.getCardValue("dtprazoativ_retorno"));
		hpForm.put("origem_desp", "sol_viagem");
		hpForm.put("moeda", hAPI.getCardValue("moeda"));
		hpForm.put("vl_prestacao", hAPI.getCardValue("vl_fornec"));
		
		hpForm.put("matricula_user", hAPI.getCardValue("matricula_user"));
		hpForm.put("nome_resp", hAPI.getCardValue("solicitante"));
		
		hpForm.put("matricula_solic", hAPI.getCardValue("matricula_user"));
		hpForm.put("user_solic", hAPI.getCardValue("solicitante"));		
		
		hpForm.put("desc_emissao", "RDV iniciado automaticamente pela Solicitação de Viagem nr.: " + numProcesso);
		
		hpForm.put("cpf_cnpj", hAPI.getCardValue("cpf_cnpj"));
		hpForm.put("banco", hAPI.getCardValue("banco"));
		hpForm.put("agencia", hAPI.getCardValue("agencia"));
		hpForm.put("conta_cor", hAPI.getCardValue("conta_cor"));			
		
		//var resposta = hAPI.startProcess("RDV", 58, userList, "Iniciado pela solicitação de viagem nr.: " + numProcesso, true, hpForm, false);
		hAPI.setCardValue("desc_entregue", hAPI.getCardValue("desc_entregue") + "\n\nIniciado processo de RDV nr.: " + resposta.get("iProcess"));
	}
	
	
}