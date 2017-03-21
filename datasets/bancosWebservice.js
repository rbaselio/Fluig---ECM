function defineStructure() {
	addColumn("Cod_banco");
	addColumn("Banco");
	setKey([ "Cod_banco", "Banco"]);
	addIndex([ "Cod_banco" ]);
	addIndex([ "Cod_banco", "Banco"]);
}

function onSync(lastSyncDate) {
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO1");		
	var myApiConsumer =  oauthUtil.getGenericConsumer("","", "", "");  
	var result = myApiConsumer.get("https://www.pagueveloz.com.br/api/v1/Bancos");	
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO2");
	//log.warn(result);
	
	var dataset = DatasetBuilder.newDataset();
	if(result== null || result.isEmpty()){
		dataset.addOrUpdateRow(["NOK", "Erro ao comunicar ao consultar o BANCOS"]);	
		//log.warn("NOT FOUND: " + data);		
	}else{						
		try{		
			var objdata = JSON.parse(result);
		    for (var obj in objdata){
		    	//log.warn(objdata[obj].Codigo);
		    	//log.warn(objdata[obj].Nome);
		    	dataset.addOrUpdateRow([String(objdata[obj].Codigo), objdata[obj].Nome]);
		    };
		} catch (e) {
			dataset.addOrUpdateRow(["NOK", e.toString()]);
			//log.warn("JSON PARSE: " + result);
		}		
	}
	return dataset;	
}