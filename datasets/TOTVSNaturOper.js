function createDataset(fields, constraints, sortFields) {
	
	var nat_oper, token;
	
	if (constraints != null) {
	    for (var i = 0; i < constraints.length; i++) { 
	    	if (constraints[i].fieldName == 'nat_oper' ) nat_oper = String(constraints[i].initialValue);
	    	if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;
        }
	}	
	if (nat_oper == null){
		nat_oper = '5999kd';
		token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");
	}
	
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 1" + nat_oper);
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 1" + token);
		
   var newDataset = DatasetBuilder.newDataset();
   
   newDataset.addColumn("STATUS");
   	
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
   	   
   	    //campos da tabelas
   	    var nat_operacao = new Object();
   	    nat_operacao.type = "character";
   	    nat_operacao.name = "nat_operacao";
   	    nat_operacao.label = "nat_operacao";
   	    
   	    var denominacao = new Object();
		denominacao.type = "character";
		denominacao.name = "denominacao";
		denominacao.label = "denominacao";
   	    
   	    var aliquota_icm = new Object();
   	    aliquota_icm.type = "decimal";
   	    aliquota_icm.name = "aliquota_icm";
   	    aliquota_icm.label = "aliquota_icm";
   	     
	    var tipo = new Object();
	    tipo.type = "character";
		tipo.name = "tipo";
		tipo.label = "tipo";
   	          
   	    //formador do paremetro value para temp-table
   	    var campos_tabela = new Object();
   	    campos_tabela.name = "tt-natur-oper";
   	    campos_tabela.records = new Array();
   	    campos_tabela.fields = [nat_operacao, denominacao, aliquota_icm, tipo];
   	    
   	    var tt_natur_oper = new Object();
   	    tt_natur_oper.dataType = "temptable";
   	    tt_natur_oper.name = "tt-natur-oper";
   	    tt_natur_oper.type = "input-output";
   	    tt_natur_oper.value = campos_tabela;
   	    
   		var nat_operacao = new Object();
   		nat_operacao.dataType = "character";
   		nat_operacao.name = "nat_operacao";
   		nat_operacao.type = "input";
   		nat_operacao.value = nat_oper;				
   		
   		var params = [nat_operacao, tt_natur_oper];
   		
   		//conversor dos parametros de input para Json
   		var jsonParams = JSON.stringify(params);
       	
   	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
   	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", "getNatureza", jsonParams);
   	    
   	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 6");
   	    var respObj = JSON.parse(resp);
   	    var callProcedureWithTokenResponse = JSON.parse(respObj[0].value);    
   	   	   
   	    
   	    var created = false;
           for (var i in callProcedureWithTokenResponse.records){
   	    	var Arr = new Array();
   	    	var p = 1;
   	    	for (var j in callProcedureWithTokenResponse.records[i]){
   	    		if (!created) {
   		    		newDataset.addColumn("" + j);
   		    	}
   	    		Arr[0] = "OK"
   	    		Arr[p] = callProcedureWithTokenResponse.records[i][j];
   	    		//log.warn(callProcedureWithTokenResponse.records[i][j]);
   	    		p++;    		
   	    	}
   	    	created = true;
   	    	newDataset.addRow(Arr);
   	    }
   	} catch (e) {
   		var Arr = new Array();
   		newDataset.addColumn("MENSAGEM");
   		Arr[0] = "NOK"
       	Arr[1] = e.message;
   		newDataset.addRow(Arr);
   		//log.error(e.message);       
       }   
       
       return newDataset;
 
}