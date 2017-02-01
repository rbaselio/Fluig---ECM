function afterStateEntry(sequenceId){
 	
 //log.warn("Entrei-------------------" + sequenceId);
 
 
 	var process = getValue("WKNumProces");
 	
 	var resposta;
 	var row;
 
 	var cardData = new java.util.HashMap();
 	cardData = hAPI.getCardData(process);
 	var keys = cardData.keySet().toArray();
 	
 	if (sequenceId == 9) {
 		hAPI.setCardValue("num_processo", process);
 			
 		var cardData = new java.util.HashMap();
 		cardData = hAPI.getCardData(process);
 		
 		var keys = cardData.keySet().toArray();
 		for ( var key in keys) {
 			var field = keys[key];
 			if (field.indexOf("nr_item___") > -1) {
 				
 				row = field.replace("nr_item___", "");
 				
 				if (hAPI.getCardValue("fluxo_fp___" + row) == ""){	
 					hAPI.setCardValue("nr_item___" + row, process + hAPI.getCardValue("nr_item___" + row));
 					
 					
 					var userList = new java.util.ArrayList();
 					userList.add(hAPI.getCardValue("mat_fp___" + row));
 					
 					var hpForm = new java.util.HashMap();						
 					hpForm.put("process_pai", "" + process);
 					hpForm.put("fp_pai", "" + hAPI.getCardValue("nr_item___" + row));
 					hpForm.put("data_pai", "" + hAPI.getCardValue("data_sol"));
 					hpForm.put("cliente", "" + hAPI.getCardValue("cliente"));
 					hpForm.put("desc_mat", "" + hAPI.getCardValue("desc_mat___" + row));
 					hpForm.put("it_nr_serie", "" + hAPI.getCardValue("it_nr_serie___" + row));
 					hpForm.put("def_inf", "" + hAPI.getCardValue("def_inf___" + row));
 					hpForm.put("matricula_emissor", "" + hAPI.getCardValue("mat_fp___" + row));
 					
 					resposta = hAPI.startProcess("FP-subprocesso", 0, userList, hAPI.getCardValue("nr_item___" + row), true, hpForm, false);
 					hAPI.setCardValue("fluxo_fp___" + row, resposta.get("iProcess"));
 					hAPI.setCardValue("status_fp___" + row,"Iniciado");
 				}					
 			}
 		}	
 	}
 	
 	
 		
 }