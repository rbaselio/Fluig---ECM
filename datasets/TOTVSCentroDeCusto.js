function defineStructure() {
	addColumn("cod_ccusto");
	addColumn("descricao");
	setKey([ "cod_ccusto", "descricao" ]);
	addIndex([ "cod_ccusto" ]);
	addIndex([ "cod_ccusto", "descricao"]);
	
}

function onSync(lastSyncDate) {
	/**/
	var newDataset = DatasetBuilder.newDataset();	
	try{
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 1");
		var serviceProvider = ServiceManager.getService('TOTVS');
		
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 2");
	    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 3");
	    var service = serviceLocator.getWebServiceExecBOPort();
	     
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 4");
	    var token = service.userLogin("super");   
	    
	    //log.warn(token);	    
	    
	    //array para receber os campos da tabela
	    var tt_fields = new Array();
	    //campos da tabelas
	    var fields1 = new Object();
	    fields1.type = "character";
	    fields1.name = "cod_ccusto";
	    fields1.label = "cod_ccusto";
	    tt_fields[0] = fields1;
	    
	    var fields2 = new Object();
	    fields2.type = "character";
	    fields2.name = "descricao";
	    fields2.label = "descricao";
	    tt_fields[1] = fields2;    
	   
	    
	    //formador do paremetro value para temp-table
	    var valores1 = new Object();
	    valores1.name = "tt-ccusto";
	    valores1.records = new Array();
	    valores1.fields = tt_fields;
	    
	    //array para receber os parametros input da chamada da função
	    var params = new Array();
		var param1 = new Object();
		param1.dataType = "temptable";
		param1.name = "tt-ccusto";
		param1.type = "input-output";
		param1.value = valores1;
		params[0] = param1;
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", "getCentroCusto", jsonParams);
	    
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 6");
	    var respObj = JSON.parse(resp);
	    var callProcedureWithTokenResponse = JSON.parse(respObj[0].value);
	    
	    for (var i in callProcedureWithTokenResponse.records){
	    	var Arr = new Array();
	    	var p = 0;
	    	for (var j in callProcedureWithTokenResponse.records[i]){
	    		//log.warn(callProcedureWithTokenResponse.records[i][j]);
	    		//log.warn(callProcedureWithTokenResponse.records[i]);
	    		//log.warn(p);	    		
	    		Arr[p] = "" + callProcedureWithTokenResponse.records[i][j];
	    		p++;    		
	    	}    	
	    	newDataset.addOrUpdateRow(Arr);
	    }
	} catch (e) {
		Arr[0] = "NOK"
    	Arr[1] = e.message;
		newDataset.addRow(Arr);       
    } 
    return newDataset;
}