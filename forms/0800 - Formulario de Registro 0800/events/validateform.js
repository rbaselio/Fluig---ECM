function validateForm(form){
	var numAtividade = getValue("WKNumState");
	var erros = "";
	
	if (numAtividade == 0 || numAtividade == 1) {
		if(form.getValue("nome_empresa") == ""){
			erros += " - [Empresa do Contato];</br>";
		}
		if(form.getValue("nome_contato") == ""){
			erros += " - [Nome do Contato];</br>";
		}
		if(form.getValue("tel_empresa") == "" && form.getValue("cel_empresa") == ""){
			erros += " - [Telefone do Contato];</br>";
		}
		if(form.getValue("origem") == ""){
			erros += " - [Origem];</br>";
		}
		if(form.getValue("unid_negocio") == ""){
			erros += " - [Unidade de Negocio];</br>";
		}
		if(form.getValue("servico") == "" && form.getValue("produto") == ""){
			erros += " - [Serviço ou Produto];</br>";
		}
		if(form.getValue("desc_recla") == ""){
			erros += " - [Descrição da Reclamação];</br>";
		}
	}
	
	if (numAtividade == 11) {
		if(form.getValue("prazo") == ""){
			erros += " - [Prazo];</br>";
		}
		if(form.getValue("desc_acao") == ""){
			erros += " - [Ação Sugerida];</br>";
		}	
		if(form.getValue("matricula_resp2") == ""){
			erros += " - [Usuário Responsável];</br>";
		}	
	}
	
	if (numAtividade == 3) {
		if(form.getValue("data_contato") == ""){
			erros += " - [Data do contato];</br>";
		}
		if(form.getValue("obs_aceite") == ""){
			erros += " - [Observações];</br>";
		}		
	}
	
	if (numAtividade == 5) {
		if(form.getValue("obs_exec") == ""){
			erros += " - [Observações];</br>";
		}		
	}
	
	if (numAtividade == 6) {
		if(form.getValue("obs_encer") == ""){
			erros += " - [Observações];</br>";
		}
	}
	
	if (numAtividade == 9) {
		if(form.getValue("rd_aprov_qualidade") == "sim" &&  form.getValue("num_nrc") == ""){
			erros += " - [Número da RNC];</br>";
		}
	}	
	
	if(erros != ""){
		throw "</br>Os campos abaixo são de preenchimento obrigatório:</br>" + erros;
	}
}