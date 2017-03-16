function createDataset(fields, constraints, sortFields) {
	
	var ncm, uf;	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) { 
        	if (constraints[i].fieldName == 'ncm' ) ncm =  String(constraints[i].initialValue);
        	if (constraints[i].fieldName == 'uf' ) uf =  String(constraints[i].initialValue);
        	
        }
	}
	if (ncm == null){	
		ncm = "84369100";
		uf = "RJ"		
	}
	
	//log.warn("--------------------fasfasdfas----------------------------------------------------------------------------------------");
	
	
	var dadosValidacao = DatasetFactory.getDataset('tokens', null, null, null);
	
	var url = "/api/deolhonoimposto/Produtos?" +
	 		"token=" + dadosValidacao.getValue(0, "tokenIBPT") + 
	 		"&cnpj=" + dadosValidacao.getValue(0, "cnpjCASP") + 
	 		"&codigo=" + ncm + 
	 		"&uf=" + uf + 
	 		"&ex=0";
	 
	//log.warn("--------------------CONSULTA NCM---------------------------------------------------------------");
	
	var dataset = DatasetBuilder.newDataset(); 
	dataset.addColumn('STATUS');
	dataset.addColumn('message');
	dataset.addColumn('retorno');
	
	//log.warn("urL: " + url);	
	
	try{		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
				 		serviceCode : 'IBPT',
				 		endpoint : url,
				 		method : 'get'
			 		}
		
		var vo = clientService.invoke(JSON.stringify(data));
		var result = vo.getResult();	
		
		
		
		if(result == null || result.isEmpty()){
			dataset.addRow(new Array("NOK", "Erro ao comunicar ao consultar o IBPT", data));	
			//log.warn("NOT FOUND: " + data);		
		}else if (result.indexOf("Produto não encontrado") !=-1){
			dataset.addRow(new Array("NOK", "Produto não encontrado", result));	
			//log.warn("Não Encontrado: " + result);	
		}else{
			try{		
				var objdata = JSON.parse(result);
			    for (var obj in objdata){
			    	dataset.addColumn(obj.toString());
				};						
				var array = new Array();
				array[0] = "OK";
				array[1] = "Consulta OK";
				array[2] = result;
				var i = 3;
				for (var obj in objdata){	
					//log.warn(obj + " - " + objdata[obj]);
					array[i] = objdata[obj].toString();
					i++;
				};				
				dataset.addRow(array);
			} catch (e) {
				dataset.addRow(new Array("NOK", e.toString(), result));
				//log.warn("JSON PARSE: " + result);
			}			
		}
	} catch (e) {
		dataset.addRow(new Array("NOK", e.toString(), vo));
		//log.warn("Client Service: " + vo);
	}
	
	
    return dataset;	

}