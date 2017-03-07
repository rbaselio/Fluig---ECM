function afterTaskCreate(colleagueId) {
    var atividade = getValue('WKCurrentState');
    
    if (atividade == 20) {
        // Recuperando a data informada no campo do formulário
        var prazoFormulario = hAPI.getCardValue('dias_manut');
        if (prazoFormulario != undefined && prazoFormulario != '') {
            var numeroDaSolicitacao = getValue('WKNumProces');
            var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
            var responsavelPelaTarefa = colleagueId;
            
            var data = new Date();
            var dataStr = hAPI.getCardValue("data_sol").split("/");
            if (dataStr != undefined && dataStr != '') {
            	data.setDate(dataStr[0]);
				data.setMonth(dataStr[1] - 1);
				data.setFullYear(dataStr[2]);
            }
            
			var obj = hAPI.calculateDeadLineHours(data, 28800, prazoFormulario * 8, "Default");
			var dt = obj[0];
			var segundos = obj[1];
			//log.warn("-----------------------NOVA DATA: " + dt);
			//log.warn("------------------------SEGUNDOS: " + segundos);	   
             
            // Altera o prazo de conclusão
            hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dt, segundos);
        }
    }  
}