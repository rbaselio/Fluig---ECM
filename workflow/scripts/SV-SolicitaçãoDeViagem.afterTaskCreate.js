function afterTaskCreate(colleagueId) {
    var atividade = getValue('WKCurrentState');
    
    if (atividade == 71) {
        // Recuperando a data informada no campo do formulário
        var dataStr = hAPI.getCardValue("data_retirada").split("/");
	    if (dataStr != undefined && dataStr != '') {
	    	
	    	var data = new Date();
	    	data.setDate(dataStr[0]);
			data.setMonth(dataStr[1] - 1);
			data.setFullYear(dataStr[2]);
	    
			var numEmpresa = getValue("WKCompany");
	        var numeroDaSolicitacao = getValue('WKNumProces');
	        var threadDaSolicitacao = hAPI.getActualThread(numEmpresa, numeroDaSolicitacao, atividade);
	        
	        // Altera o prazo de conclusão
	        hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, colleagueId, data, 28800);
	    }
    }  
}