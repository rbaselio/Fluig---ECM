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
	
	if(numAtividade == 9){ //implementar plano e ação
		form.setValue('chamado_num', getValue("WKNumProces"));
		form.setValue('matricula_qualidade', matricula);
		form.setValue('user_qualidade', colaborador);
		form.setValue('data_qualidade', today);
	}
	
	
	function setEnabledConponent(componente, lEnable) {
		customHTML.append("<script>");
		customHTML.append("$('#" + componente+ "').attr('disabled', " + lEnable + ");");
		customHTML.append("</script>");
	}


}

