function displayFields(form, customHTML) {
	form.setShowDisabledFields(true);
	var numAtividade = getValue("WKNumState");

	var numProcesso = getValue("WKNumProces");
	form.setValue("processo", numProcesso);

	if (numAtividade == 0) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('gervenda_usuario', colaborador.get(0).get(
				"colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox1.value = ydate.txt;");
		customHTML
				.append("document.getElementById('direcao').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gervenda2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox1.value = ydate.txt;");
		customHTML
				.append("document.getElementById('direcao').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gervenda2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}

	if (numAtividade == 1) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('diretor_usuario', colaborador.get(0)
				.get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_gervenda').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox2.value = ydate.txt;");

		customHTML
				.append("document.getElementById('div_gervenda2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}

	if (numAtividade == 2) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('diretor_usuario', colaborador.get(0)
				.get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('direcao').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox2.value = ydate.txt;");

		customHTML
				.append("document.getElementById('div_gervenda2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 4) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('gerente_usuario', colaborador.get(0)
				.get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_gervenda2').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox3.value = ydate.txt;");

		customHTML
				.append("document.getElementById('div_comercial').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_comercial2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 6) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('troca_usuario', colaborador.get(0).get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_comercial').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox4.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_comercial2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}

	if (numAtividade == 7) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form
				.setValue('troca_usuario2', colaborador.get(0).get(
						"colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_comercial2').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox5.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_comercial').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 8) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form
				.setValue('transp_usuario', colaborador.get(0).get(
						"colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_transporte').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox6.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_recebimento').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_fiscal').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 9) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form
				.setValue('recebe_usuario', colaborador.get(0).get(
						"colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_recebimento').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('fiscal_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_fiscal').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox7.value = ydate.txt;");

		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 10) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form
				.setValue('fiscal_usuario', colaborador.get(0).get(
						"colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_fiscal').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox8.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_entradanf').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 12) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('nf_usuario', colaborador.get(0).get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_entradanf').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('fiscal_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_fiscal').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox9.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_logistica').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display ='none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 15) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('log_usuario', colaborador.get(0).get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_logistica').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('fiscal_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_fiscal').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox10.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_gerente').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_diretor').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 16) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('ger_usuario', colaborador.get(0).get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_gerente').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('fiscal_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_fiscal').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('log_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_logistica').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('diretor_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_diretor').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox11.value = ydate.txt;");

		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
	if (numAtividade == 17) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('diretor_usuario2', colaborador.get(0).get(
				"colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_diretor').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");

			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('fiscal_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_fiscal').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('log_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_logistica').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox11.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_transporte2').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}

	if (numAtividade == 19) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('transp2_usuario', colaborador.get(0)
				.get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_transporte2').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('fiscal_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_fiscal').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('log_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_logistica').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox13.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_financeiro').style.display = 'none';");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");

		customHTML.append("</SCRIPT>");

	}

	if (numAtividade == 20) {
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId", getValue("WKUser"));
		var colaborador = getDatasetValues('colleague', filter);
		form.setValue('fince_usuario', colaborador.get(0).get("colleagueName"));

		customHTML.append("<SCRIPT>");
		customHTML.append("function changeColorDiv(){");
		customHTML
				.append("document.getElementById('div_financeiro').style.background='#AFEEEE';");
		customHTML.append("}");
		customHTML.append("</SCRIPT>");

		if (form.getValue('troca_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial').style.display = 'none';");
			customHTML.append("</SCRIPT>");
		}
		if (form.getValue('troca_usuario2') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_comercial2').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('fiscal_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_fiscal').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		if (form.getValue('log_usuario') == '') {
			customHTML.append("<SCRIPT>");
			customHTML
					.append("document.getElementById('div_logistica').style.display = 'none';");
			customHTML.append("</SCRIPT>");

		}
		customHTML.append("<SCRIPT>");
		customHTML
				.append("document.frmDevolucaoIND.textbox14.value = ydate.txt;");
		customHTML
				.append("document.getElementById('div_ciencia').style.display = 'none';");
		customHTML.append("</SCRIPT>");

	}
}