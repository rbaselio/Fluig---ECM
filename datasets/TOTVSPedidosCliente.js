function createDataset(fields, constraints, sortFields) {

	var cod_emit, token;

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == 'cod_emit') cod_emit = String(constraints[i].initialValue).replace(/\D/g, ''); 
			if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;
			
			//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + i);
			//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + constraints[i].fieldName);
			//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + constraints[i].initialValue);
			
			
		}
	}
	if (cod_emit == null){
		cod_emit = '1';
		token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");
	}
	
	
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> cod_emit " + cod_emit);
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> token " + token);

	var newDataset = DatasetBuilder.newDataset();
	
	try{
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 1");
		var serviceProvider = ServiceManager.getService('TOTVS');
		
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 2");
	    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
	    
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 3");
	    var service = serviceLocator.getWebServiceExecBOPort();
	     
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 4");
	    	    
	    
	    //array para receber os campos da tabela
	   
	    //campos da tabelas
	    var cod_emitente = new Object();
	    cod_emitente.type = "integer";
	    cod_emitente.name = "cod_emitente";
	    cod_emitente.label = "cod_emitente";
	    
	    var nome_emit = new Object();
	    nome_emit.type = "character";
	    nome_emit.name = "nome_emit";
	    nome_emit.label = "nome_emit";
	    
	    var nr_pedcli = new Object();
	    nr_pedcli.type = "character";
	    nr_pedcli.name = "nr_pedcli";
	    nr_pedcli.label = "nr_pedcli";
	    
	    var nr_pedido = new Object();
	    nr_pedido.type = "integer";
	    nr_pedido.name = "nr_pedido";
	    nr_pedido.label = "nr_pedido";
	    
	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "tt_pedido_cliente";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [cod_emitente, nome_emit, nr_pedcli,nr_pedido];
	    
	    var  tt_pedido_cliente = new Object();
	    tt_pedido_cliente.dataType = "temptable";
	    tt_pedido_cliente.name = "tt_pedido_cliente";
	    tt_pedido_cliente.type = "input-output";
	    tt_pedido_cliente.value = campos_tabela;
	    
	    var cod_emitente = new Object();
	    cod_emitente.dataType = "integer";
	    cod_emitente.name = "cod_emitente";
	    cod_emitente.type = "input";
	    cod_emitente.value = cod_emit;		
		
		var params = [cod_emitente, tt_pedido_cliente];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", "getPedidoCliente", jsonParams);
	    
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