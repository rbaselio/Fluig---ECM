function displayFields(form, customHTML) {
	
	customHTML.append("<script>");
	
	form.setShowDisabledFields(true);
	//form.setHidePrintLink(true);	
	form.setVisibleById('bt_add_interacao', false);
	form.setHideDeleteButton(true);
	
	setVisibleById('btZoomColab', false);
	setVisibleById('busca_tipo', false);
	setVisibleById('re_busca_tipo', false);

	var numAtividade = getValue("WKNumState");	
	var matricula = getValue("WKUser");
	
	var filter = new java.util.HashMap();
	filter.put("colleaguePK.colleagueId", matricula);
	var dadosusuario = getDatasetValues('colleague', filter).get(0);
	
	var colaborador = dadosusuario.get("colleagueName");
	var ramal = dadosusuario.get("extensionNr");
	var today = new java.text.SimpleDateFormat("dd/MM/yyyy").format(new java.util.Date());

	if (numAtividade == 0 || numAtividade == 1) {
		
		form.setValue('matricula_user', matricula);		
		form.setValue('solicitante', colaborador);
		form.setValue('ramal', ramal);
		form.setValue('data_sol', today);
		form.setValue('chamado_num', getValue("WKNumProces"));
		
		setVisibleById('busca_tipo', true);
		setVisibleById('btZoomColab', validarGrupo(matricula, "TI"));		
	}

	if (numAtividade == 2 || numAtividade == 6) {
		form.setValue('matricula_atend', matricula);
		form.setValue('atendente', colaborador);
		form.setValue('chamado_num', getValue("WKNumProces"));
		
		setVisibleById('re_busca_tipo', true);
		form.setVisibleById('bt_add_interacao', true);
		
		form.setHideDeleteButton(false);
	}

	if (numAtividade == 3) {
		form.setValue('chamado_num', getValue("WKNumProces"));
		var indexes = form.getChildrenIndexes("tb_interacao");
	    form.setValue("dt_aceite___" + indexes[indexes.length - 1], today);
	}

	if (numAtividade == 4) {
		form.setValue('chamado_num', getValue("WKNumProces"));
		form.setValue('matricula_aceite', matricula);
		form.setValue('user_aceite', colaborador);
		form.setValue('dt_final', today);
	}

	function setVisibleById(componente, lEnable) {		
		customHTML.append("$('#" + componente + "').attr('disabled', " + !lEnable + "); ");	
		if (lEnable == false) {
			customHTML.append("$('#" + componente + "').children('i').hide(); ");	
		} else {
			customHTML.append("$('#" + componente + "').children('i').show(); ");
		}		
	}	

	function validarGrupo(user, grupo) {
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupo, grupo, ConstraintType.MUST);
		var constraints = new Array(c1, c2);
		var datasetPrincipal = DatasetFactory.getDataset("colleagueGroup", null, constraints, null);
		for (var j = 0; j < datasetPrincipal.rowsCount; j++) {
			if (datasetPrincipal.getValue(j, "colleagueGroupPK.groupId") == grupo) {
				return true;
			}
		}
		return false;
	}
	customHTML.append("</script>");
}

