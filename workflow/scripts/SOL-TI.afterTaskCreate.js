function afterTaskCreate(colleagueId) {
    var atividade = getValue('WKCurrentState');
    
    log.warn(">>>>>>>>>>>>>>>>>>>> atividade " +  atividade);
    
    if (atividade == 2 || atividade == 4) {
        // Recuperando a data informada no campo do formulário
        var prazoFormulario = hAPI.getCardValue('criticidade');
        if (prazoFormulario != undefined && prazoFormulario != '') {
        	var numEmpresa = getValue("WKCompany");
            var numeroDaSolicitacao = getValue('WKNumProces');
            var threadDaSolicitacao = hAPI.getActualThread(numEmpresa, numeroDaSolicitacao, atividade);
            var responsavelPelaTarefa = colleagueId;
            
            log.warn(">>>>>>>>>>>>>>>>>>>> responsavelPelaTarefa " +  responsavelPelaTarefa);
            log.warn(">>>>>>>>>>>>>>>>>>>> prazoFormulario " +  prazoFormulario);
            
            var data = new Date();           
            
            var segundos = (data - new Date().setHours(0,0,0,0)) / 1000;
            
             log.warn(">>>>>>>>>>>>>>>>>>>> segundos " +  segundos);
            
			var obj = hAPI.calculateDeadLineHours(data, segundos, prazoFormulario, "Default");
			var dt = obj[0];
			segundos = obj[1];
			log.warn("-----------------------NOVA DATA: " + dt);
			log.warn("------------------------SEGUNDOS: " + segundos);	   
             
            // Altera o prazo de conclusão
            hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dt, segundos);
        }
    }  
}