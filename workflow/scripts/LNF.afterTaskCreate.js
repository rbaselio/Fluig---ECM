function afterTaskCreate(colleagueId){
var atividade = getValue('WKCurrentState');
    
    if (atividade == 2) {
        // Recuperando a data informada no campo do formulário
        var prazoFormulario = hAPI.getCardValue('prazo_pagto');
        if (prazoFormulario != undefined && prazoFormulario != '') {
            var numeroDaSolicitacao = getValue('WKNumProces');
            var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
            var responsavelPelaTarefa = colleagueId;
            
            var data = new Date();            
            
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