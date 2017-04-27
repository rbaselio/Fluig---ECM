function defineStructure() {
		
	addColumn("cgc");
	addColumn("via_transp");
	addColumn("nat_operacao");
	addColumn("bairro");
	addColumn("cidade");
	addColumn("cep");
	addColumn("estado");
	addColumn("ins_estadual");
	addColumn("natureza");
	addColumn("tipo");
	addColumn("cod_transp");
	addColumn("nome_transp");
	addColumn("endereco");
		
	
	
	setKey([ "cod_transp", "nome_transp" ]);
	addIndex([ "cod_transp" ]);
	addIndex([ "cod_transp", "nome_transp"]);	
	
	
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
	    var token = service.userLogin("super");   
	    
	    //log.warn(token);	    
	    
	   
	    //campos da tabelas
	    var cod_transp = new Object();
	    cod_transp.type = "integer";
	    cod_transp.name = "cod_transp";
	    cod_transp.label = "codigo";
	    
	    var nome = new Object();
	    nome.type = "character";
	    nome.name = "nome";
	    nome.label = "descricao";
	    
	    var cgc = new Object();
	    cgc.type = "character";
	    cgc.name = "cgc";
	    cgc.label = "CNPJ_CPF";	    
	    
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
	    
	    var ins_estadual = new Object();
	    ins_estadual.type = "character";
	    ins_estadual.name = "ins_estadual";
	    ins_estadual.label = "insc_estadual";
	    
	    var tipo = new Object();
	    tipo.type = "character";
	    tipo.name = "tipo";
	    tipo.label = "tipo";
	    
	    var via_transp = new Object();
	    via_transp.type = "character";
	    via_transp.name = "via_transp";
	    via_transp.label = "via_transp";
	    
	    var natureza = new Object();
	    natureza.type = "character";
	    natureza.name = "natureza";
	    natureza.label = "natureza";
	    
	    var nat_operacao = new Object();
	    nat_operacao.type = "character";
	    nat_operacao.name = "nat_operacao";
	    nat_operacao.label = "nat_operacao";
	    
	    //formador do paremetro value para temp-table
	    var tt_transportador = new Object();
	    tt_transportador.name = "tt-transportador";
	    tt_transportador.records = new Array();
	    tt_transportador.fields = [cod_transp, nome, cgc, cep, endereco, bairro, cidade, estado, ins_estadual, tipo, via_transp, natureza, nat_operacao];
	    
	    //array para receber os parametros input da chamada da função
	   
		var tt_transportador_var = new Object();
		tt_transportador_var.dataType = "temptable";
		tt_transportador_var.name = "tt-transportador";
		tt_transportador_var.type = "input-output";
		tt_transportador_var.value = tt_transportador;
		
		 var params = [tt_transportador_var];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", "getTransportador", jsonParams);
	    
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 6");
	    
	    //log.warn(resp);
	    var respObj = JSON.parse(resp);
	    var callProcedureWithTokenResponse = JSON.parse(respObj[0].value);
	    
        for (var i in callProcedureWithTokenResponse.records){
	    	var Arr = new Array();
	    	var p = 0;
	    	for (var j in callProcedureWithTokenResponse.records[i]){
	    		Arr[p] = "" + callProcedureWithTokenResponse.records[i][j];
	    		////log.warn(callProcedureWithTokenResponse.records[i][j]);
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

