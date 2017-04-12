function createDataset(fields, constraints, sortFields) {

	var cod_matricula, token;

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == 'cod_matricula') cod_matricula = String(constraints[i].initialValue);
			if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;  
		}
	}
	if (cod_matricula == null){		
		cod_matricula = 4055;
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
	    var matricula = new Object();
	    matricula.type = "integer";
	    matricula.name = "matricula";
	    matricula.label = "matricula";
	    
	    var nome = new Object();
	    nome.type = "character";
	    nome.name = "nome";
	    nome.label = "nome";
	    
	    var nascimento = new Object();
	    nascimento.type = "date";
	    nascimento.name = "nascimento";
	    nascimento.label = "nascimento";
	    
	    var aniversario = new Object();
	    aniversario.type = "date";
	    aniversario.name = "aniversario";
	    aniversario.label = "aniversario";
	    
	    var idade = new Object();
	    idade.type = "integer";
	    idade.name = "idade";
	    idade.label = "idade";
	    
	    var ativo = new Object();
	    ativo.type = "logical";
	    ativo.name = "ativo";
	    ativo.label = "ativo";
	          
	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "tt_funcionario";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [matricula, nome, nascimento, aniversario, idade, ativo];
	    
	    var tt_funcionario = new Object();
	    tt_funcionario.dataType = "temptable";
	    tt_funcionario.name = "tt_funcionario";
	    tt_funcionario.type = "output";
	    tt_funcionario.value = campos_tabela;
	   
	    var usr_matricula = new Object();
	    usr_matricula.dataType = "integer";
	    usr_matricula.name = "matricula";
	    usr_matricula.label = "matricula";
	    usr_matricula.type = "input";
	    usr_matricula.value = cod_matricula;
	    
	    var params = [usr_matricula, tt_funcionario];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0003.r", "getColaborador", jsonParams);
	    
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