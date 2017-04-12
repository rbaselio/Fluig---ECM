function createDataset(fields, constraints, sortFields) {

	var cod_item, estab, token;

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == 'cod_item') cod_item = String(constraints[i].initialValue);
			if (constraints[i].fieldName == 'estab') estab = String(constraints[i].initialValue);
			if (constraints[i].fieldName == 'token' ) token = constraints[i].initialValue;  
		}
	}
	if (cod_item == null){
		cod_item = '31271083';
		var estab = '1';
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
	    var it_codigo_tt = new Object();
	    it_codigo_tt.type = "character";
	    it_codigo_tt.name = "it_codigo";
	    it_codigo_tt.label = "it_codigo";
	    
	    var desc_item = new Object();
	    desc_item.type = "character";
	    desc_item.name = "desc_item";
	    desc_item.label = "desc_item";
	    
	    var un = new Object();
	    un.type = "character";
	    un.name = "un";
	    un.label = "un";
	    
	    var un_descricao = new Object();
	    un_descricao.type = "character";
	    un_descricao.name = "un_descricao";
	    un_descricao.label = "un_descricao";
	    
	    var narrativa = new Object();
	    narrativa.type = "character";
	    narrativa.name = "narrativa";
	    narrativa.label = "narrativa";
	    
	    var ge_codigo = new Object();
	    ge_codigo.type = "integer";
	    ge_codigo.name = "ge_codigo";
	    ge_codigo.label = "ge_codigo";
	    
	    var ge_descricao = new Object();
	    ge_descricao.type = "character";
	    ge_descricao.name = "ge_descricao";
	    ge_descricao.label = "ge_descricao";	    
	    
	    var ncm = new Object();
	    ncm.type = "character";
	    ncm.name = "ncm";
	    ncm.label = "ncm";
	    
	    var ipi = new Object();
	    ipi.type = "decimal";
	    ipi.name = "ipi";
	    ipi.label = "ipi";
	    
	    var m_mat = new Object();
	    m_mat.type = "decimal";
	    m_mat.name = "m_mat";
	    m_mat.label = "m_mat";
	    
	    var m_mob = new Object();
	    m_mob.type = "decimal";
	    m_mob.name = "m_mob";
	    m_mob.label = "m_mob";
	    
	    var m_ggf = new Object();
	    m_ggf.type = "decimal";
	    m_ggf.name = "m_ggf";
	    m_ggf.label = "m_ggf";
	          
	    //formador do paremetro value para temp-table
	    var campos_tabela = new Object();
	    campos_tabela.name = "tt-item";
	    campos_tabela.records = new Array();
	    campos_tabela.fields = [it_codigo_tt, desc_item, un, un_descricao, narrativa, ge_codigo, ge_descricao,  ncm, ipi, m_mat, m_mob, m_ggf];
	    
	    var tt_itens = new Object();
	    tt_itens.dataType = "temptable";
	    tt_itens.name = "tt-item";
	    tt_itens.type = "input-output";
	    tt_itens.value = campos_tabela;
	    
	    var it_codigo = new Object();
	    it_codigo.dataType = "character";
	    it_codigo.name = "it_codigo";
	    it_codigo.type = "input";
	    it_codigo.value = cod_item;		
		
		var cod_estabel = new Object();
		cod_estabel.dataType = "character";
		cod_estabel.name = "cod_estabel";
		cod_estabel.type = "input";
		cod_estabel.value = estab;				
		
		var params = [it_codigo, cod_estabel, tt_itens];
		
		//conversor dos parametros de input para Json
		var jsonParams = JSON.stringify(params);
    	
	    //log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
	    var resp = service.callProcedureWithToken(token, "webservices/esws0001.r", "getItem", jsonParams);
	    
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
		Arr[0] = "NOK"
    	Arr[1] = e.message;
		newDataset.addRow(Arr);
		//log.error(e.message);       
    }    

	return newDataset;

}