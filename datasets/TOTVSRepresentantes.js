function defineStructure() {
		
	addColumn("cgc");
	addColumn("cidade");
	addColumn("bairro");
	addColumn("estado");
	addColumn("cep");
	addColumn("natureza");
	addColumn("ins_estadual");
	addColumn("nome");
	addColumn("endereco");
	addColumn("cod_rep");
	
	setKey([ "cod_rep", "nome" ]);
	addIndex([ "cod_rep" ]);
	addIndex([ "cod_rep", "nome"]);	
	
	
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
	    var cod_rep = new Object();
	    cod_rep.type = "integer";
	    cod_rep.name = "cod_rep";
	    cod_rep.label = "codigo";
	    
	    var nome = new Object();
	    nome.type = "character";
	    nome.name = "nome";
	    nome.label = "nome";
	    
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
	    
	    var natureza = new Object();
	    natureza.type = "character";
	    natureza.name = "natureza";
	    natureza.label = "natureza";
	    
	    //formador do paremetro value para temp-table
	    var tt_repres = new Object();
	    tt_repres.name = "tt_repres";
	    tt_repres.records = new Array();
	    tt_repres.fields = [cod_rep, nome, cep, endereco, bairro, cidade, estado, cgc, ins_estadual, natureza];
	    
	    var tt_repres_var = new Object();
		tt_repres_var.dataType = "temptable";
		tt_repres_var.name = "tt-emitente";
		tt_repres_var.type = "output";
		tt_repres_var.value = tt_repres;
		
		var params = [tt_repres_var];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
		var resp = service.callProcedureWithToken(token, "webservices/esws0003.r", "getRepresentantes", jsonParams);
	    
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

