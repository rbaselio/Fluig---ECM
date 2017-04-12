function createDataset(fields, constraints, sortFields) {

	var classFiscal, token;

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == 'classFiscal') classFiscal = String(constraints[i].initialValue).replace(/\D/g, ''); 
			if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;  
		}
	}
	if (classFiscal == null){
		classFiscal = '72085200';
		token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");
	}

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
	    var class_fiscal = new Object();
	    class_fiscal.type = "character";
	    class_fiscal.name = "class_fiscal";
	    class_fiscal.label = "class_fiscal";
	    
	    var descricao = new Object();
	    descricao.type = "character";
	    descricao.name = "descricao";
	    descricao.label = "descricao";
	    
	    var aliquota_ipi = new Object();
	    aliquota_ipi.type = "decimal";
	    aliquota_ipi.name = "aliquota_ipi";
	    aliquota_ipi.label = "aliquota_ipi";
	    
	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "tt-item";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [class_fiscal, descricao, aliquota_ipi];
	    
	    var  tt_classif_fisc = new Object();
	    tt_classif_fisc.dataType = "temptable";
	    tt_classif_fisc.name = "tt-item";
	    tt_classif_fisc.type = "input-output";
	    tt_classif_fisc.value = campos_tabela;
	    
	    var cod_ncm = new Object();
	    cod_ncm.dataType = "character";
	    cod_ncm.name = "cod_ncm";
	    cod_ncm.type = "input";
	    cod_ncm.value = classFiscal;		
		
		var params = [cod_ncm, tt_classif_fisc];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", "getNcm", jsonParams);
	    
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
		newDataset.addColumn("MENSAGEM");
		Arr[0] = e.message;
		newDataset.addRow(Arr);
		//log.error(e.message);       
    }
		

	return newDataset;

}