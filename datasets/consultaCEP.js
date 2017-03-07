function createDataset(fields, constraints, sortFields) {
	
	var cep;	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) { 
        	if (constraints[i].fieldName == 'cep' ) cep = String(constraints[i].initialValue);        	
        }
	}
	if (cep == null){	
		cep = "13904904";
	}
	
	log.warn("--------------------CONSULTA CEP----------------------------------------------------------------------");
	
	var dataset = DatasetBuilder.newDataset(); 
	dataset.addColumn('STATUS');
	dataset.addColumn('message');
	dataset.addColumn('retorno');	
	
	try{
		
		var clientService = fluigAPI.getAuthorizeClientService();
		var data = {
				serviceCode : 'viaCEP',
				 endpoint : '/ws/' + cep.replace(/\D/g, '') + '/json/',
				 method : 'get'
			 }
		
		var vo = clientService.invoke(JSON.stringify(data));
		var result = vo.getResult();
		
		if(result== null || result.isEmpty()){
			dataset.addRow(new Array("NOK", "Erro ao comunicar ao consultar o CEP", data));	
			log.warn("NOT FOUND: " + data);		
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
				log.warn("RETORNO: " + result);
				var i = 3;
				for (var obj in objdata){	
					log.warn(obj + " - " + objdata[obj]);
					array[i] = objdata[obj].toString();
					i++;
				};
				
				dataset.addRow(array);
			} catch (e) {
				dataset.addRow(new Array("NOK", e.toString(), result));
				log.warn("JSON PARSE: " + result);
			}
			
		}
	} catch (e) {
		dataset.addRow(new Array("NOK", e.toString(), vo));
		log.warn("Client Service: " + vo);
	}
	return dataset;	
		
    

}