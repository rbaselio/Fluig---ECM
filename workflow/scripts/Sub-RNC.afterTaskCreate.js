function afterTaskCreate(colleagueId){
	
	var numEmpresa = getValue("WKCompany");
	var numeroDaSolicitacao = getValue("WKNumProces");
	var nrProxAtividade = getValue("WKNextState");
	var numAtividade = getValue('WKCurrentState');
	var threadDaSolicitacao = hAPI.getActualThread(numEmpresa, numeroDaSolicitacao, numAtividade);
	
	if (numAtividade == 5) {
		var prazoFormulario = hAPI.getCardValue('prazo_conclusao');
		if (prazoFormulario != undefined && prazoFormulario != '') {
			var dataStr = hAPI.getCardValue("prazo_conclusao").split("/");
			if (dataStr != undefined && dataStr != '') {
				var data = new Date();
            	data.setDate(dataStr[0]);
				data.setMonth(dataStr[1] - 1);
				data.setFullYear(dataStr[2]);
				
				hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, colleagueId, data, 61200);			
				
			}
		}
	}	
}