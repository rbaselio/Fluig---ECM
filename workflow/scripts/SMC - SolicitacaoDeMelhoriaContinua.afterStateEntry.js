function afterStateEntry(sequenceId){
	
	log.info("Entrei-------------------" + sequenceId);
	
	var process = getValue("WKNumProces");
	
	var resposta;
	var row;

	var cardData = new java.util.HashMap();
	cardData = hAPI.getCardData(process);
	var keys = cardData.keySet().toArray();
	
	if (sequenceId == 14) {
		
		try {	
			
			var cardData = new java.util.HashMap();
			cardData = hAPI.getCardData(process);
			var keys = cardData.keySet().toArray();
			for ( var key in keys) {
				var field = keys[key];
				if (field.indexOf("mat_acoes___") > -1) {
					
					row = field.replace("mat_acoes___", "");
					
					if (hAPI.getCardValue("fluxo_acoes___" + row) == ""){					
						var userList = new java.util.ArrayList();
						userList.add(hAPI.getCardValue("mat_acoes___" + row));
						
						var hpForm = new java.util.HashMap();						
						hpForm.put("process_pai", "" + process);
						hpForm.put("prazo_conclusao", "" + hAPI.getCardValue("dtprazoativ_acoes___" + row));
						hpForm.put("descAtividade", "" + hAPI.getCardValue("descAtividade_acoes___" + row));
						hpForm.put("responsavel", "" + hAPI.getCardValue("mat_acoes___" + row));
						
						resposta = hAPI.startProcess("Sub-RNC", 0, userList, hAPI.getCardValue("descAtividade_acoes___" + row), true, hpForm, false);
						hAPI.setCardValue("fluxo_acoes___" + row, resposta.get("iProcess"));
						hAPI.setCardValue("status_acoes___" + row,"Iniciado");
					}					
				}
			}

		} catch (e) {
			log.error("----------------ERRO:");
			log.error(e);
		}
	}	
	
}