function enableFields(form) {

	setEnabled(form, false); // dasabilita todos os campos
	var numAtividade = getValue("WKNumState");

	if (numAtividade == 0 || numAtividade == 1) {
		form.setEnabled('matricula_user', true);
		form.setEnabled('solicitante', true);
		form.setEnabled('ramal', true);
		form.setEnabled('classe', true);
		form.setEnabled('tipo', true);
		form.setEnabled('criticidade', true);
		form.setEnabled('desc_chamado', true);
	}

	if ((numAtividade == 2 || numAtividade == 6)) {
		form.setEnabled('re_classe', true);
		form.setEnabled('re_tipo', true);
		
		form.setEnabled('desc_interacao', true);
		form.setEnabled('dt_intera', true);
	}

	if (numAtividade == 3) {
		form.setEnabled('desc_aceite', true);
		form.setEnabled('dt_aceite', true);
	}

	if (numAtividade == 4) {
		form.setEnabled('comentarios', true);
		form.setEnabled('nota', true);
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

