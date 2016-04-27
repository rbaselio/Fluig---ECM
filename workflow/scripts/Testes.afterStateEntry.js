function afterStateEntry(sequenceId) {
	
	if (sequenceId == 8) {
		log.info("Entrei-------------------");
		var process = getValue("WKNumProces");
		var hpForm = new java.util.HashMap();
		
		try {		

			var cardData = new java.util.HashMap();
			cardData = hAPI.getCardData(process);
			var keys = cardData.keySet().toArray();
			for ( var key in keys) {
				var field = keys[key];
				if (field.indexOf("matricula___") > -1) {
					
					var row = field.replace("matricula___", "");
					
					if (hAPI.getCardValue("processo___" + row) == ""){					
					
						var matricula = hAPI.getCardValue("matricula___" + row);
						
						var userList = new java.util.ArrayList();
						userList.add(matricula);
						
						hpForm.put("processo_pai", "" + process);
						hpForm.put("dtprazoativ", "" + hAPI.getCardValue("dtprazoativ___" + row));
						hpForm.put("descAtividade", "" + hAPI.getCardValue("descAtividade___" + row));
						hpForm.put("responsavel", "" + hAPI.getCardValue("matricula___" + row));
						
						var resposta = hAPI.startProcess("subteste", 0, userList, hAPI.getCardValue("descAtividade___" + row), true, hpForm, false);
						hAPI.setCardValue("processo___" + row, resposta.get("iProcess"));
						hAPI.setCardValue("status___" + row,"Iniciado");
					}
					
				}
			}

		} catch (e) {
			log.error("----------------ERRO:");
			log.error(e);
		}

	}
}