function validateForm(form){
	
	if(getValue("WKCompletTask") == 'true' ){
		
		var numState = getValue("WKNumState");
		var process = getValue("WKNumProces");
		var message = "";
		
		if (numState == 0 || numState == 4){
			
			//if (form.getValue("origem_desp") == "sol_viagem" && form.getValue("desc_emissao").indexOf("RDV iniciado automaticamente pela") == -1) message += "<br/>- A opção solicitação de viagem é reservada para fluxos automaticos, selecione cartão corporativo ou avulso;";
			if (form.getValue("nome_resp") == "") message += "<br/>- Selecione o destinátario do RDV;";
			if (form.getValue("user_solic") == "") message += "<br/>- Informe o solicitante do RDV;";
			if (form.getValue("prenchimento") == '') message += "<br/>- Informe quem será o responsavel pelo preechimento do RDV;";
			if (form.getValue("matricula_solic") == form.getValue("matricula_user") && form.getValue("prenchimento") == 'resp') message += "<br/>- Quando o solicitante e o destinários são os mesmos é obrigatório selecionar a opção Solicitante como responsável pelo preenchimento;";		
			if (form.getValue("desc_emissao") == "") message += "<br/>- Descreva o motivo do RDV;";	
		}		
		
		if ((numState == 4 && form.getValue("prenchimento") == 'solic') || numState == 5){
			
			var indexes = form.getChildrenIndexes("tb_despesa");
			var indexes2 = form.getChildrenIndexes("tb_quilometragem");
			if (indexes.length == 0 && indexes2.length == 0) message += "<br/>- Informe ao menos uma despesa ou quilometragem;";	
			for (var i = 0; i < indexes.length; i++) {
		    	if (form.getValue("data_despesa___" + indexes[i]) == "") message += message += "<br/>- Informe a data da despesa na linha " + ( i + 1);
				if (form.getValue("tipo_despesa___" + indexes[i]) == "") message += "<br/>- Informe o tipo da despesa na linha " + ( i + 1);
				if (form.getValue("ccontabil___" + indexes[i]) == "") message += "<br/>- Informe a conta contábil na linha " + ( i + 1);
				
				if (form.getValue("vl_despesa___" + indexes[i]) == "" || form.getValue("vl_despesa___" + indexes[i]) == "0,00") message += "<br/>- Informe o valor da despesa na linha " + ( i + 1);
				if (form.getValue("ccusto___" + indexes[i]) == "") message += "<br/>- Informe o centro de custo na linha " + ( i + 1);
				if (form.getValue("origem_desp") == "cart_corp" && form.getValue("desp_cart___" + indexes[i]) == "") message += "<br/>- Informe tipo da operação com cartão corporativo na linha " + ( i + 1);
				if (form.getValue("desc_despesa___" + indexes[i]) == "") message += "<br/>- Descreva a despesa na linha " + ( i + 1);
			}
			
			indexes2 = form.getChildrenIndexes("tb_quilometragem");
			for (var i = 0; i < indexes2.length; i++) {
		    	if (form.getValue("cidade_origem___" + indexes2[i]) == "") message += message += "<br/>- Informe a cidade de origem na linha " + ( i + 1);
				if (form.getValue("cidade_destino___" + indexes2[i]) == "") message += "<br/>- Informe a cidade de destino na linha " + ( i + 1);
				if (form.getValue("km_ini___" + indexes2[i]) == "" || form.getValue("vl_despesa___" + indexes2[i]) == "0") message += "<br/>- Informe a Km na linha " + ( i + 1);
			}
			if (form.getValue("placa") == "" && indexes2.length > 0) message += "<br/>- Informe a placa do veiculo;";
			
			
			var vl_adiant = parseFloat(form.getValue("vl_prestacao").replace(".","").replace(",","."));
			if (isNaN(vl_adiant)) vl_adiant = 0;
			var tot_desp = parseFloat(form.getValue("vl_tot_geral").replace(".","").replace(",","."));
			if (isNaN(tot_desp)) tot_desp = 0;
			
			if ((vl_adiant - tot_desp) != 0){
				if (form.getValue("cpf_cnpj") == "") message += "<br/>- Informe seu CPF;";
				if (form.getValue("agencia") == "") message += "<br/>- Informe a agencia de depósito;";
				if (form.getValue("conta_cor") == "") message += "<br/>- Informe a conta corrente de deposito;";
			}
			if ((vl_adiant - tot_desp) > 0){
				if (form.getValue("banco_acerto") == "") message += "<br/>- Informe o banco de depósito;";				
			}
			if ((vl_adiant - tot_desp) < 0){
				if (form.getValue("banco") == "") message += "<br/>- Informe o banco de depósito;";	
			}
		}
		
		if (numState == 9){
			if (form.getValue("aprov_contabil") == "nao" && form.getValue("desc_aprov_contabil") == "") message += "<br/>- Informe motivo da rejeição;";
		}
		if (numState == 15){
			if (form.getValue("aprov_imediato") == "nao" && form.getValue("desc_aprov_imediato") == "") message += "<br/>- Informe motivo da rejeição;";
		}
		if (numState == 21){
			if (form.getValue("aprov_dir_fin") == "nao" && form.getValue("desc_aprov_dir_fin") == "") message += "<br/>- Informe motivo da rejeição;";
		}
		if (numState == 27){
			if (form.getValue("aprov_finaceira") == "nao" && form.getValue("desc_rembolsa") == "") message += "<br/>- Informe motivo da rejeição;";
			if (form.getValue("aprov_finaceira") == "sim"){
				
				var vl_rembolsa = parseFloat(form.getValue("vl_rembolsa").replace(".","").replace(",","."));
				if (isNaN(vl_rembolsa)) vl_rembolsa = 0;
				var diferenca = parseFloat(form.getValue("vl_tot_dev").replace(".","").replace(",","."));
				if (isNaN(diferenca)) diferenca = 0;
				
				if (vl_rembolsa != diferenca) message += "<br/>- O valor do recebido/pago não pode ser diferente do valor total do RDV;";
			}
		}
		
		if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;
	}	
}