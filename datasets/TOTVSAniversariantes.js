function createDataset(fields, constraints, sortFields) {
	
	var data_base, token;

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == 'data_base') data_base = String(constraints[i].initialValue);
			if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;  
		}
	}
	if (data_base == null){
		 var dataAtual = new Date();
		data_base = ("0" + dataAtual.getDate()).substr(-2) + "/" + ("0" + (dataAtual.getMonth() + 1)).substr(-2) + "/" + dataAtual.getFullYear()
		token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");
	}

	data_base = "20/05/2017";
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
	    
	    var semana = new Object();
	    semana.type = "integer";
	    semana.name = "semana";
	    semana.label = "semana";
	    
	    var nomeSemana = new Object();
	    nomeSemana.type = "character";
	    nomeSemana.name = "nomeSemana";
	    nomeSemana.label = "nomeSemana"
	    
	          
	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "tt_aniversario";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [matricula, nome, nascimento, aniversario, idade, semana, nomeSemana];
	    
	    var tt_aniversario = new Object();
	    tt_aniversario.dataType = "temptable";
	    tt_aniversario.name = "tt_aniversario";
	    tt_aniversario.type = "output";
	    tt_aniversario.value = campos_tabela;
	   
	    var data = new Object();
	    data.dataType = "character";
	    data.name = "data";
	    data.label = "data";
	    data.type = "input";
	    data.value = data_base;
	    
	    var params = [data, tt_aniversario];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0003.r", "getAniversariantes", jsonParams);
	    
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