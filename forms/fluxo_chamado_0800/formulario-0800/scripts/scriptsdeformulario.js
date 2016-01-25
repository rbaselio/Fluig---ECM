function displayFields(form,customHTML){ 
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(false);
	
	var numAtividade = getValue("WKNumState");
	
	var matricula = getValue("WKUser");
	
	var filter = new java.util.HashMap();
	filter.put("colleaguePK.colleagueId",getValue("WKUser"));
	
	var dadosusuario = getDatasetValues('colleague',filter);
	var colaborador = dadosusuario.get(0).get("colleagueName");
	var ramal = dadosusuario.get(0).get("extensionNr"); 

	var dtNow = new java.util.Date();
	var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
	var today = sdf.format(dtNow);
	
	var sdf = new java.text.SimpleDateFormat("HH:mm");
	var now = sdf.format(dtNow);
	
	setEnabledConponent('btZoomColab', true);

	if(numAtividade == 0 || numAtividade == 1){ //abertura do atendimento
		
		form.setValue('matricula_user', matricula);
		form.setValue('solicitante', colaborador);
		form.setValue('ramal', ramal);
		
		form.setValue('hora_sol', now);
		form.setValue('data_sol', today);
	}
	
	if(numAtividade == 2){ //propor ação corretiva
		form.setValue('chamado_num', getValue("WKNumProces"));
		form.setValue('matricula_resp', matricula);
		form.setValue('responsavel', colaborador);
		form.setValue('data_resp', today);
		setEnabledConponent('btZoomColab', false);
	}
	
	if(numAtividade == 3){ //notificar cliente
		form.setValue('chamado_num', getValue("WKNumProces"));
		form.setValue('matricula_ret', matricula);
		form.setValue('user_ret', colaborador);
		form.setValue('data_ret', today);
	}
	
	if(numAtividade == 5){ //implementar plano e ação
		form.setValue('chamado_num', getValue("WKNumProces"));
		form.setValue('matricula_exec', matricula);
		form.setValue('user_exec', colaborador);
		form.setValue('data_exec', today);
	}
	
	if(numAtividade == 6){ //implementar plano e ação
		form.setValue('chamado_num', getValue("WKNumProces"));
		form.setValue('matricula_encer', matricula);
		form.setValue('user_encer', colaborador);
		form.setValue('data_encer', today);
	}
	
	function setEnabledConponent(componente, lEnable) {
		customHTML.append("<script>");
		customHTML.append("$('#" + componente+ "').attr('disabled', " + lEnable + ");");
		customHTML.append("</script>");
	}
}

function enableFields(form){ 
	
	setEnabled(form, false); //dasabilita todos os campos

	var numAtividade = getValue("WKNumState");

	if (numAtividade == 0 || numAtividade == 1) {
		form.setEnabled("nome_empresa", true);
		form.setEnabled("nome_contato", true);
		form.setEnabled("tel_empresa", true);
		form.setEnabled("cel_empresa", true);
		form.setEnabled("email_contato", true);
		form.setEnabled("rd_tipo_atend", true);
		form.setEnabled("origem", true);
		form.setEnabled("unid_negocio", true);
		form.setEnabled("rd_tipo_recla", true);
		form.setEnabled("servico", true);		
		form.setEnabled("produto", true);
		form.setEnabled("desc_recla", true);
	}
	
	if (numAtividade == 2) {
		form.setEnabled("prazo", true);
		form.setEnabled("desc_acao", true);
		form.setEnabled("matricula_resp2", true);
		form.setEnabled("user_resp", true);
		form.setEnabled("ramal_resp", true);
	}
	
	if (numAtividade == 3) {
		form.setEnabled("data_contato", true);
		form.setEnabled("obs_aceite", true);
		form.setEnabled("rd_aceite", true);
	}
	if (numAtividade == 5) {
		form.setEnabled("obs_exec", true);		
	}
	if (numAtividade == 6) {
		form.setEnabled("obs_encer", true);		
	}
	
	
	function setEnabled(form, lEnable) {
		var hpForm = new java.util.HashMap();
		hpForm = form.getCardData();
		var it = hpForm.keySet().iterator();
		while (it.hasNext()) {
			var key = it.next();
			form.setEnabled(key, lEnable);
		}
	}
	
}

function validateForm(form){
	var numAtividade = getValue("WKNumState");
	var erros = "";
	
	if (numAtividade == 0 || numAtividade == 1) {
		if(form.getValue("nome_empresa") == ""){
			erros += " - [Empresa do Contato];\n";
		}
		if(form.getValue("nome_contato") == ""){
			erros += " - [Nome do Contato];\n";
		}
		if(form.getValue("tel_empresa") == "" && form.getValue("cel_empresa") == ""){
			erros += " - [Telefone do Contato];\n";
		}
		if(form.getValue("origem") == ""){
			erros += " - [Origem];\n";
		}
		if(form.getValue("unid_negocio") == ""){
			erros += " - [Unidade de Negocio];\n";
		}
		if(form.getValue("servico") == "" && form.getValue("produto") == ""){
			erros += " - [Serviço ou Produto];\n";
		}
		if(form.getValue("desc_recla") == ""){
			erros += " - [Descrição da Reclamação];\n";
		}
	}
	
	if (numAtividade == 2) {
		if(form.getValue("prazo") == ""){
			erros += " - [Prazo];\n";
		}
		if(form.getValue("desc_acao") == ""){
			erros += " - [Ação Sugerida];\n";
		}	
		if(form.getValue("matricula_resp2") == ""){
			erros += " - [Usuário Responsável];\n";
		}	
	}
	
	if (numAtividade == 3) {
		if(form.getValue("data_contato") == ""){
			erros += " - [Data do contato];\n";
		}
		if(form.getValue("obs_aceite") == ""){
			erros += " - [Observações];\n";
		}		
	}
	
	if (numAtividade == 5) {
		if(form.getValue("obs_exec") == ""){
			erros += " - [Observações];\n";
		}		
	}
	
	if (numAtividade == 6) {
		if(form.getValue("obs_encer") == ""){
			erros += " - [Observações];\n";
		}
	}
	
	
	if(erros != ""){
		throw "\nOs campos abaixo são de preenchimento obrigatório:\n" + erros;
	}
}