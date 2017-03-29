function createDataset(fields, constraints, sortFields) {
		
	var cod_emit, cnpj, token, programa;
	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) { 
        	if (constraints[i].fieldName == 'cod_emit' ) cod_emit = parseInt(constraints[i].initialValue);
        	if (constraints[i].fieldName == 'cnpj' )  cnpj = String(constraints[i].initialValue).replace(/\D/g, ''); 
        	if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;  
        }
	}
	if (cod_emit == null){
		cod_emit = 1;
		token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");		
	}
	
	//cnpj = '61106043000140';
	
	var campo_chave = new Object();
	if (cnpj != null){
		campo_chave.dataType = "character";
	    campo_chave.name = "cnpj";
	    campo_chave.type = "input";
	    campo_chave.value = cnpj;
	    programa = 'getEmitenteCNPJ';
		
		
	}
	else {
		campo_chave.dataType = "integer";
	    campo_chave.name = "cod_emitente";
	    campo_chave.type = "input";
	    campo_chave.value = cod_emit;
	    programa = 'getEmitente'
	}
	
	
	
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("STATUS");
	
	try{
		log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 1");
		log.warn(">>>>>>>>>>>>>>>>>>>>>>>>Programa : " + programa);
		var serviceProvider = ServiceManager.getService('TOTVS');
		
		log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 2");
	    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    
	    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 3");
	    var service = serviceLocator.getWebServiceExecBOPort();
	     
	    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 4");	    
	    log.warn(token);	    
	    
	    //array para receber os campos da tabela
	   
	    //campos da tabelas
	    var cod_emitente = new Object();
	    cod_emitente.type = "integer";
	    cod_emitente.name = "cod_emitente";
	    cod_emitente.label = "codigo";
	    
	    var nome_emit = new Object();
	    nome_emit.type = "character";
	    nome_emit.name = "nome_emit";
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
	    ins_estadual.name = "ins_estadual";
	    ins_estadual.label = "insc_estadual";
	    
	    var tipo = new Object();
	    tipo.type = "character";
	    tipo.name = "tipo";
	    tipo.label = "tipo";
	    
	    var natureza = new Object();
	    natureza.type = "character";
	    natureza.name = "natureza";
	    natureza.label = "natureza";
	    
	    var nat_operacao = new Object();
	    nat_operacao.type = "character";
	    nat_operacao.name = "nat_operacao";
	    nat_operacao.label = "nat_operacao";
	          
	    //formador do paremetro value para temp-table
	    var tt_emitente = new Object();
	    tt_emitente.name = "tt_emitente";
	    tt_emitente.records = new Array();
	    tt_emitente.fields = [cod_emitente, nome_emit, cep, endereco, bairro, cidade, estado, cgc, ins_estadual, tipo, natureza, nat_operacao];
	    
	    
	    var tt_emitente_var = new Object();
		tt_emitente_var.dataType = "temptable";
		tt_emitente_var.name = "tt-emitente";
		tt_emitente_var.type = "input-output";
		tt_emitente_var.value = tt_emitente;
		
		 var params = [campo_chave, tt_emitente_var];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", programa, jsonParams);
	    
	    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 6");
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
	    		log.warn(callProcedureWithTokenResponse.records[i][j]);
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
		log.error(e.message);
       
    }   
       
   return newDataset;
 
}