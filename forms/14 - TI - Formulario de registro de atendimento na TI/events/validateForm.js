function validateForm(form){
	loading.setMessage("Validando campos de formulário");
	
	var numState = getValue("WKNumState");
	var message = ""; 	
	if (numState == 0 || numState == 1){
		if (form.getValue("ramal") == "") message += "<br/>- Ramal ou telefone para contato;";
		if (form.getValue("tipo") == "") message += "<br/>- Tipo do Chamado";
		if (form.getValue("tipo") == "sistema" && form.getValue("sistema") == "") message += "<br/>- Tipo do Chamado";
		
		if (form.getValue("criticidade") == "") message += "<br/>- Criticidade do Chamado;";
		if (form.getValue("desc_chamado") == "") message += "<br/>- Descrição do Chamado;";
		
	}
	if (numState == 2){
		var indexes = form.getChildrenIndexes("tb_interacao");
		if (form.getValue("desc_interacao___" + indexes[indexes.length - 1]) == "") message += "<br/>- Descreva o atendimento prestado";
	}
	
	if (numState == 4){
		var indexes = form.getChildrenIndexes("tb_interacao");
		if (form.getValue("desc_interacao___" + indexes[indexes.length - 1]) == "") message += "<br/>- Descreva o atendimento recebido";
		
		if (form.getValue("conclusao") == "") message += "<br/>- Informe se o atendimento foi concluido;";
		if (form.getValue("conclusao") == "sim"){
			if (form.getValue("nota") == "") message += "<br/>- Avalie o chamado;";
			if (form.getValue("nota") == "3" || form.getValue("nota") == "4" ){
				if (form.getValue("comentarios") == "") message += "<br/>- Justifique sua avaliação;";
				
				
			}
			
			
		}
		
		
	}
	
	if (message != "") throw "<br/><br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;	
	
	
	
}