function validateForm(form) {
	var numAtividade = getValue("WKNumState");
	var erros = "";

	if (numAtividade == 0 || numAtividade == 1) {

		if (form.getValue("ramal") == "") {
			erros += " - [Informe o ramal do solicitante];\n";
		}		
		if (form.getValue("classe") == "") {
			erros += " - [Tipo / Classe do chamado];\n";
		}
		if (form.getValue("criticidade") == "") {
			erros += " - [Impacto do chamado];\n";
		}
		if (form.getValue("desc_chamado") == "") {
			erros += " - [Descrição do chamado];\n";
		}
	}
	
	if ((numAtividade == 2 || numAtividade == 6)) {
		if (form.getValue("re_classe") == "") {
			erros += " - [Reclassificar Tipo / Classe do chamado];\n";
		}		
	}
	
	if (numAtividade == 4) {
		if (form.getValue("comentarios") == "") {
			if (form.getValue("nota") == "2" || form.getValue("nota") == "3") {
				erros += " - [Comente o motivo do não atendimento ou atendimento parcial];\n";
			}
		}		
	}

	if (erros != "") {
		throw "\nOs campos abaixo são de preenchimento obrigatório:\n" + erros;
	}
}