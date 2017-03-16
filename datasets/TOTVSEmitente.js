function createDataset(fields, constraints, sortFields) {
		
	var cod_emit, token;
	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) { 
        	if (constraints[i].fieldName == 'cod_emit' ) cod_emit = parseInt(constraints[i].initialValue);
        	if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;  
        }
	}
	if (cod_emit == null){
		cod_emit = 1
		token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");		
	}
	
	
	
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
	    //log.warn(token);	    
	    
	    //array para receber os campos da tabela
	   
	    //campos da tabelas
	    var cod_emitente = new Object();
	    cod_emitente.type = "integer";
	    cod_emitente.name = "cod-emitente";
	    cod_emitente.label = "codigo";
	    
	    var nome_emit = new Object();
	    nome_emit.type = "character";
	    nome_emit.name = "nome-emit";
	    nome_emit.label = "nome";
	    
	    var cep = new Object();
	    cep.type = "character";
	    cep.name = "cep";
	    cep.label = "cep";
	    
	    var endereco = new Object();
	    endereco.type = "character";
	    endereco.name = "endereco";
	    endereco.label = "endereco";
	    
	    var bairro = new Object();
	    bairro.type = "character";
	    bairro.name = "bairro";
	    bairro.label = "bairro";
	    
	    var cidade = new Object();
	    cidade.type = "character";
	    cidade.name = "cidade";
	    cidade.label = "cidade";
	    
	    var estado = new Object();
	    estado.type = "character";
	    estado.name = "estado";
	    estado.label = "estado";
	    
	    var cgc = new Object();
	    cgc.type = "character";
	    cgc.name = "cgc";
	    cgc.label = "CNPJ_CPF";
	    
	    var ins_estadual = new Object();
	    ins_estadual.type = "character";
	    ins_estadual.name = "ins-estadual";
	    ins_estadual.label = "insc_estadual";
	    
	    var natureza = new Object();
	    natureza.type = "character";
	    natureza.name = "natureza";
	    natureza.label = "tipo";
	    
	    var nat_operacao = new Object();
	    nat_operacao.type = "character";
	    nat_operacao.name = "nat-operacao";
	    nat_operacao.label = "nat_operacao";
	          
	    //formador do paremetro value para temp-table
	    var tt_emitente = new Object();
	    tt_emitente.name = "tt-emitente";
	    tt_emitente.records = new Array();
	    tt_emitente.fields = [cod_emitente, nome_emit, cep, endereco, bairro, cidade, estado, cgc, ins_estadual, natureza, nat_operacao];
	    
	    //array para receber os parametros input da chamada da função
	    var params = new Array();
	    
	    var cod_emitente = new Object();
	    cod_emitente.dataType = "integer";
	    cod_emitente.name = "cod_emitente";
	    cod_emitente.type = "input";
	    cod_emitente.value = cod_emit;
		params[0] = cod_emitente; 
	    
		var tt_emitente_var = new Object();
		tt_emitente_var.dataType = "temptable";
		tt_emitente_var.name = "tt-emitente";
		tt_emitente_var.type = "input-output";
		tt_emitente_var.value = tt_emitente;
		params[1] = tt_emitente_var;
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", "getEmitente", jsonParams);
	    
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