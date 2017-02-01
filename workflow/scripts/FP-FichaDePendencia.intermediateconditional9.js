function intermediateconditional9() {
 	
 	var process = getValue("WKNumProces");
 	
 	//log.warn("----------------------STATUS DE PROCESSOS-------------------------------")
 	//log.warn("----------------------numProcesso: " + process);
 	
 
 	var status = true;
 	
 	var cardData = new java.util.HashMap();
 	cardData = hAPI.getCardData(process);
 	var keys = cardData.keySet().toArray();
 	log.warn("Verificando status dos subprocessos do processo: " + process);
 	for ( var key in keys) {
 		var field = keys[key];
 		if (field.indexOf("nr_item___") > -1) {
 
 			var row = field.replace("nr_item___", "");
 			var processo = hAPI.getCardValue("fluxo_fp___" + row);				
 
 			var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", processo, processo, ConstraintType.MUST);
 			var c2 = DatasetFactory.createConstraint("processTaskPK.companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
 			var constraints = new Array(c1, c2);
 			
 			var sortingFields = new Array("processTaskPK.movementSequence");
 			
 			var datasetPrincipal = DatasetFactory.getDataset("processTask", null, constraints, sortingFields);
 			
 			var i = datasetPrincipal.rowsCount - 1;
 			
 			if (datasetPrincipal.getValue(i, "active") == true){				
 				var childCardData = hAPI.getCardData(processo);
 				hAPI.setCardValue("status_fp___" + row, "Em andamento");
 				status = false;
 				
 			} else if(datasetPrincipal.getValue(i, "status") == 4){
 				hAPI.setCardValue("status_fp___" + row, "Cancelado");
 				log.warn("O Processo " + processo + " foi cancelado");				
 			} else {				
 				var cardDataFilho = hAPI.getCardData(processo);
 				
 				hAPI.setCardValue("vl_conserto___" + row, cardDataFilho.get("vl_conserto"));
 				hAPI.setCardValue("def_inf___" + row, cardDataFilho.get("def_inf"));
 				hAPI.setCardValue("def_const___" + row, cardDataFilho.get("def_const"));
 				hAPI.setCardValue("serv_envio___" + row, cardDataFilho.get("serv_envio"));
 				hAPI.setCardValue("status_fp___" + row, datasetPrincipal.getValue(i, "taskCompletionDate"));
 				log.warn("O Processo " + processo + " foi concluído");										
 			}				
 		}
 	}	
 	
 	return status;
 
 }