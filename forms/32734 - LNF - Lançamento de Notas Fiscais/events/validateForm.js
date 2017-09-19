function validateForm(form){
	
	var numState = getValue("WKNumState");
	var process = getValue("WKNumProces");
	var message = "";
	
	if (numState == 0 || numState == 1){
		if (form.getValue("vlDisp") == "") message += "<br/>- Informe o valor disponível;";
		if (form.getValue("nrPedCli") == "") message += "<br/>- Informe numero do pedido;";
		if (form.getValue("codCliente") == "") message += "<br/>- Informe o codigo do cliente;";
		if (form.getValue("nomeCliente") == "") message += "<br/>- Informe o nome do cliente;";
		if (form.getValue("unid_negocio") == "") message += "<br/>- Informe a unidade de negócio;";
		if (form.getValue("vlDocto") == "") message += "<br/>- Informe o valor do documento;";			
		
	}
	
	if (numState == 2){
		if (form.getValue("pagto") == "") message += "<br/>- Informe pagamento;";
		if (form.getValue("pagto") == "sim"){
			if (form.getValue("data_pagto") == "") message += "<br/>- Informe a data de pagamento;";
		}
	}
	
	if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;
	
	
}