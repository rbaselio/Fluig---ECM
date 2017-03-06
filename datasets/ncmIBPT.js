function createDataset(fields, constraints, sortFields) {
	
	var ncm, uf;	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) { 
        	if (constraints[i].fieldName == 'ncm' ) ncm = constraints[i].initialValue;
        	if (constraints[i].fieldName == 'uf' ) uf = constraints[i].initialValue; 
        }
	}
	if (ncm == null){	
		ncm = "09012100";
		uf = "SP"		
	}
	
	log.warn("--------------------fasfasdfas----------------------------------------------------------------------------------------");
	
	
	var dadosValidacao = DatasetFactory.getDataset('tokens', null, null, null);
	
	var url = "http://iws.ibpt.org.br/api/deolhonoimposto/Produtos?" +
	 		"token=" + dadosValidacao.getValue(0, "tokenIBPT") + 
	 		"&cnpj=" + dadosValidacao.getValue(0, "cnpjCASP") + 
	 		"&codigo=" + ncm + 
	 		"&uf=" + uf + 
	 		"&ex=0";
	 
	var dataset = DatasetBuilder.newDataset(); 
	dataset.addColumn('STATUS');
	dataset.addColumn('message');
	dataset.addColumn('retorno');
	
	var myApiConsumer =  oauthUtil.getGenericConsumer("","", "", "");  
	var data = myApiConsumer.get(url);
	
	if(data.contains("Not Found")) {		
		dataset.addRow(new Array("NOK", "Erro ao comunicar com o site do IBPT", data));		
	}
	else{
		try{		
			var objdata = JSON.parse(data);
		    for (var obj in objdata){
		    	dataset.addColumn(obj.toString());
			};						
			var array = new Array();
			array[0] = "OK";
			array[1] = "Consulta OK";
			array[2] = data;
			var i = 3;
			for (var obj in objdata){	
				//log.warn(objdata[obj]);
				array[i] = objdata[obj].toString();
				i++;
			};
			dataset.addRow(array);
		} catch (e) {
			dataset.addRow(new Array("NOK", e.toString(), data));			
		}
	}
    return dataset;	

}