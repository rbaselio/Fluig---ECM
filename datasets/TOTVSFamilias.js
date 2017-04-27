function defineStructure() {
	addColumn("fm_codigo");
	addColumn("fm_descricao");
	setKey([ "fm_codigo", "fm_descricao" ]);
	addIndex([ "fm_codigo" ]);
	addIndex([ "fm_codigo", "fm_descricao"]);
	
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
	    var fm_codigo = new Object();
	    fm_codigo.type = "character";
	    fm_codigo.name = "fm_codigo";
	    fm_codigo.label = "fm_codigo";	    
	    
	    var fm_descricao = new Object();
	    fm_descricao.type = "character";
	    fm_descricao.name = "fm_descricao";
	    fm_descricao.label = "fm_descricao";
	    tt_fields = [fm_codigo, fm_descricao];    
	   
	    
	    //formador do paremetro value para temp-table
	    var valores1 = new Object();
	    valores1.name = "tt_familia";
	    valores1.records = new Array();
	    valores1.fields = tt_fields;
	    
	    //array para receber os parametros input da chamada da função
	    var params = new Array();
		var param1 = new Object();
		param1.dataType = "temptable";
		param1.name = "tt_familia";
		param1.type = "output";
		param1.value = valores1;
		params[0] = param1;
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0003.r", "getFamilias", jsonParams);
	    
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
		for (i in e){
			log.warn(e[i]);
			
		}
		
		      
    } 
    return newDataset;
}