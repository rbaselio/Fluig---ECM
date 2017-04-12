function defineStructure() {
	addColumn("cidade");
	addColumn("estado");
	setKey([ "cidade", "estado"]);
	addIndex([ "cidade" ]);
	addIndex([ "cidade", "estado"]);
	
}

function onSync(lastSyncDate) {
	var newDataset = DatasetBuilder.newDataset();	
	
	try{
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 1");
		var serviceProvider = ServiceManager.getService('TOTVS');
		
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 2");
	    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 3");
	    var service = serviceLocator.getWebServiceExecBOPort();
	     
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 4");
	    //log.warn(token);	    
	    
	    //array para receber os campos da tabela
	   
	    //campos da tabelas
	    var cidade = new Object();
	    cidade.type = "character";
	    cidade.name = "cidade";
	    cidade.label = "cidade";
	    
	    var estado = new Object();
	    estado.type = "character";
	    estado.name = "estado";
	    estado.label = "estado";  
	    
	          
	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "tt_cidade";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [cidade, estado];
	    
	    var tt_cidade = new Object();
	    tt_cidade.dataType = "temptable";
	    tt_cidade.name = "tt_cidade";
	    tt_cidade.type = "output";
	    tt_cidade.value = campos_tabela;
	    
	    var params = [tt_cidade];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
		
		var token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0003.r", "getCidades", jsonParams);
	    
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 6");
	    var respObj = JSON.parse(resp);
	    var callProcedureWithTokenResponse = JSON.parse(respObj[0].value);    
	   	   
	    
	    var created = false;
        for (var i in callProcedureWithTokenResponse.records){
	    	var Arr = new Array();
	    	var p = 0;
	    	for (var j in callProcedureWithTokenResponse.records[i]){
	    		if (!created) {
		    		newDataset.addColumn("" + j);
		    	}
	    		Arr[p] = '' + callProcedureWithTokenResponse.records[i][j];
	    		//log.warn(callProcedureWithTokenResponse.records[i][j]);
	    		p++;    		
	    	}
	    	created = true;
	    	newDataset.addRow(Arr);
	    }
	} catch (e) {
		var Arr = new Array();
		newDataset.addColumn("STATUS");
		newDataset.addColumn("MENSAGEM");
		Arr[0] = "NOK"
    	Arr[1] = e.message;
		newDataset.addRow(Arr);
		//log.error(e.message);       
    }    

	return newDataset;
}