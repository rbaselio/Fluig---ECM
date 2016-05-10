function enableFields(form){ 
	
	setEnabled(form, false); //dasabilita todos os campos

	var numAtividade = getValue("WKNumState");

	if (numAtividade == 0 || numAtividade == 1) {
		form.setEnabled("nome_empresa", true);
		form.setEnabled("nome_contato", true);
		form.setEnabled("tel_empresa", true);
		form.setEnabled("cel_empresa", true);
		form.setEnabled("origem", true);
		form.setEnabled("email_contato", true);
		form.setEnabled("rd_tipo_atend", true);
		form.setEnabled("unid_negocio", true);
		form.setEnabled("rd_tipo_recla", true);
		form.setEnabled("servico", true);		
		form.setEnabled("produto", true);
		form.setEnabled("desc_recla", true);
		form.setEnabled("localidade", true);
	}
	
	if (numAtividade == 11) {
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
		form.setEnabled("rd_aprov_acao", true);	
		form.setEnabled("nota", true);
	}
	
	if (numAtividade == 9) {
		form.setEnabled("rd_aprov_qualidade", true);		
		form.setEnabled("num_nrc", true);		
		form.setEnabled("obs_qualidade", true);
			
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

