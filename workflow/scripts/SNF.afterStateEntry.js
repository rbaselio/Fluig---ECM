function afterStateEntry(sequenceId){
	
	if (sequenceId == 6){
		
		

			log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 1");
			var serviceProvider = ServiceManager.getService('TOTVS');
			
			log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 2");
		    var serviceLocator = serviceProvider.instantiate('com.totvs.framework.ws.execbo.service.WebServiceExecBO');
		    
		    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 3");
		    var service = serviceLocator.getWebServiceExecBOPort();
		     
		    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 4");
		    var token = service.userLogin("super");   
		    
		    log.warn(token);	    
		    
		    //TEMP-TABLE DE PARAMETROS
		    var it_codigo = new Object();
		    it_codigo.type = "character";
		    it_codigo.name = "it_codigo";
		    it_codigo.label = "it_codigo";	    
		    
		    var quant = new Object();
		    quant.type = "decimal";
		    quant.name = "quant";
		    quant.label = "quant";
		    
		    var desc_item = new Object();
		    desc_item.type = "character";
		    desc_item.name = "desc_item";
		    desc_item.label = "desc_item";
		    
		    var class_fiscal = new Object();
		    class_fiscal.type = "character";
		    class_fiscal.name = "class_fiscal";
		    class_fiscal.label = "class_fiscal";
		    
		    var ipi = new Object();
		    ipi.type = "decimal";
		    ipi.name = "ipi";
		    ipi.label = "ipi";
		    
		    var nat_operacao = new Object();
		    nat_operacao.type = "character";
		    nat_operacao.name = "nat_operacao";
		    nat_operacao.label = "nat_operacao";
		    
		    var vl_init = new Object();
		    vl_init.type = "decimal";
		    vl_init.name = "vl_init";
		    vl_init.label = "vl_init";
		    
		    var tt_itens_fields = [it_codigo, quant, desc_item, class_fiscal, ipi, nat_operacao, vl_init];
		    
		    
		    var sigla_emb = new Object();
		    sigla_emb.type = "character";
		    sigla_emb.name = "sigla_emb";
		    sigla_emb.label = "sigla_emb";
		    
		    var qt_volumes = new Object();
		    qt_volumes.type = "integer";
		    qt_volumes.name = "qt_volumes";
		    qt_volumes.label = "qt_volumes";
		    
		    var tt_embalagem_fields = [sigla_emb, qt_volumes];
		    
		    var process = getValue("WKNumProces");
		    var tt_itens_valores = new Array() ;
		    var tt_embalagem_valores = new Array() ;
		    var i = 0;
		    var j = 0;
		    var cardData = new java.util.HashMap();
			cardData = hAPI.getCardData(process);
			var keys = cardData.keySet().toArray();
			log.warn("Verificando status dos subprocessos do processo: " + process);
			for ( var key in keys) {
				var field = keys[key];
				if (field.indexOf("quant_item___") > -1) {
					var row = field.replace("quant_item___", "");
					var valor = new Object();
			    	valor.it_codigo    = "" + hAPI.getCardValue("cod_item" + "___" + row);
					valor.quant        = parseFloat(String(hAPI.getCardValue("quant_item" + "___" + row)).replace(/\./g,'').replace(',','.'));
					valor.desc_item    = "" + hAPI.getCardValue("desc_item" + "___" + row);
					valor.class_fiscal = String(hAPI.getCardValue("ncm_item" + "___" + row)).replace(/\./g,'');
					valor.ipi          = parseFloat(String(hAPI.getCardValue("ipi_item" + "___" + row)).replace(/\./g,'').replace(',','.'));
					valor.nat_operacao = "" + hAPI.getCardValue("natOper_item" + "___" + row);    
					valor.vl_init      = parseFloat(String(hAPI.getCardValue("valor_item" + "___" + row)).replace(/\./g,'').replace(',','.'));
					tt_itens_valores[i] = valor;
					i++;
				}
				if (field.indexOf("embSigla___") > -1) {
					var row = field.replace("embSigla___", "");
					var valor = new Object();
					valor.sigla_emb    = "" + hAPI.getCardValue("embSigla" + "___" + row);
					valor.qt_volumes        = parseInt(String(hAPI.getCardValue("volumes" + "___" + row)).replace(/\./g,'').replace(',','.'));
					tt_embalagem_valores[j] = valor;
					j++;					
				}
			}		    
		    
		    //formador do paremetro value para temp-table
		    var tt_itens_tabela = new Object();
		    tt_itens_tabela.name = "tt_itens";
		    tt_itens_tabela.fields = tt_itens_fields;
		    tt_itens_tabela.records = tt_itens_valores;
		    
		    var tt_embalagem_tabela = new Object();
		    tt_embalagem_tabela.name = "tt_embalagem";
		    tt_embalagem_tabela.fields = tt_embalagem_fields;
		    tt_embalagem_tabela.records = tt_embalagem_valores;		   
		    
		    var tt_itens = new Object();
		    tt_itens.dataType = "temptable";
		    tt_itens.name = "tt_itens";
		    tt_itens.type = "input";
		    tt_itens.value = tt_itens_tabela;
		    
		    var tt_embalagem = new Object();
		    tt_embalagem.dataType = "temptable";
		    tt_embalagem.name = "tt_embalagem";
		    tt_embalagem.type = "input";
		    tt_embalagem.value = tt_embalagem_tabela;	   
		    
		    
		    
		    
		    //TEMP-TABLE DE RETORNO
		    var tipo = new Object();
		    tipo.type = "character";
		    tipo.name = "tipo";
		    tipo.label = "tipo";
		    
		    var mensagem = new Object();
		    mensagem.type = "character";
		    mensagem.name = "mensagem";
		    mensagem.label = "mensagem";
		    
		    var tt_retorno_fields = [tipo, mensagem];
		    //formador do paremetro value para temp-table
		    var tt_retorno_tabela = new Object();
		    tt_retorno_tabela.name = "tt_retorno";
		    tt_retorno_tabela.records = new Array();
		    tt_retorno_tabela.fields = tt_retorno_fields;
		    
		    
		    var tt_retorno = new Object();
		    tt_retorno.dataType = "temptable";
		    tt_retorno.name = "tt_retorno";
		    tt_retorno.type = "output";
		    tt_retorno.value = tt_retorno_tabela;
		    
		    //PAREMETROS
		    var documento = new Object();
		    documento.dataType = "integer";
		    documento.name = "documento";
		    documento.value = 0;
		    documento.type = "output";
		    
		    var cod_estabe = new Object();
		    cod_estabe.dataType = "character";
		    cod_estabe.name = "cod_estabe";
		    cod_estabe.value = "" + hAPI.getCardValue("estabNota");
		    cod_estabe.type = "input";
		    
		    var serie = new Object();
		    serie.dataType = "character";
		    serie.name = "serie";
		    serie.value = hAPI.getCardValue("estabNota") == "1" ? "11" : "8";
		    serie.type = "input";
		    
		    var cod_emitente = new Object();
		    cod_emitente.dataType = "character";
		    cod_emitente.name = "cod_emitente";
		    cod_emitente.value = String(hAPI.getCardValue("cod_emitente")).replace(/\./g,'');
		    cod_emitente.type = "input";
		    
		    var nat_operacao = new Object();
		    nat_operacao.dataType = "character";
		    nat_operacao.name = "nat_operacao";
		    nat_operacao.value = "" + hAPI.getCardValue("natOper_emitente");
		    nat_operacao.type = "input";
		    
		    var peso_liq = new Object();
		    peso_liq.dataType = "decimal";
		    peso_liq.name = "peso_liq";
		    peso_liq.value =  parseFloat(String(hAPI.getCardValue("pesoLiq")).replace(/\./g,'').replace(',','.'));
		    peso_liq.type = "input";  
		    	    
		    
		    var peso_bruto = new Object();
		    peso_bruto.dataType = "decimal";
		    peso_bruto.name = "peso_bruto";
		    peso_bruto.value = parseFloat(String(hAPI.getCardValue("pesoBruto")).replace(/\./g,'').replace(',','.'));
		    peso_bruto.type = "input";
		    
		    var cod_transp  = new Object();
		    cod_transp.dataType = "integer";
		    cod_transp.name = "cod_transp";
		    cod_transp.value = parseInt(String(hAPI.getCardValue("cod_transp")).replace(/\./g,''));
		    cod_transp.type = "input";
		    
		    var qt_volumes  = new Object();
		    qt_volumes.dataType = "integer";
		    qt_volumes.name = "qt_volumes";
		    qt_volumes.value = parseInt(String(hAPI.getCardValue("volumes")).replace(/\./g,''));
		    qt_volumes.type = "input";
		    
		    var mod_frete = new Object();
		    mod_frete.dataType = "character";
		    mod_frete.name = "mod_frete";
		    mod_frete.value = "" + hAPI.getCardValue("modNota");
		    mod_frete.type = "input";
		    
		    var sigla_emb = new Object();
		    sigla_emb.dataType = "character";
		    sigla_emb.name = "sigla_emb";
		    sigla_emb.value = "" + hAPI.getCardValue("embSigla");
		    sigla_emb.type = "input";
		    
		    var obs_nota = new Object();
		    obs_nota.dataType = "character";
		    obs_nota.name = "obs_nota";
		    obs_nota.value = "" + hAPI.getCardValue("desc_sol_nota");
		    obs_nota.type = "input";
		    
		    //array para receber os parametros input da chamada da função
		    var params = [cod_estabe, serie, cod_emitente, nat_operacao, peso_liq, peso_bruto, cod_transp, mod_frete, obs_nota, tt_itens, tt_embalagem, tt_retorno, documento];
			
			//conversor dos parametros de input para Json
			var jsonParams = JSON.stringify(params);
			
			log.warn(jsonParams);
			
		    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 5");	
		    var resp = service.callProcedureWithToken(token, "webservices/esws0002.r", "geraFT4003", jsonParams);
		    
		    log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 6");
		    var respObj = JSON.parse(resp);
		    
		    var callProcedureWithTokenResponse = JSON.parse(respObj[0].value);
		    var documento = JSON.parse(respObj[1].value)
		    
		    hAPI.setCardValue('nrDocto', documento);
		    
		    var aux = "";
		    for (var i in callProcedureWithTokenResponse.records){
		    	for (var j in callProcedureWithTokenResponse.records[i]){
		    		aux = aux + " - " + callProcedureWithTokenResponse.records[i][j]; 
		    		log.warn(callProcedureWithTokenResponse.records[i][j]);
		    		log.warn(callProcedureWithTokenResponse.records[i]);
		    	}
		    	aux = aux  + "\n";
		    }
		    hAPI.setCardValue('des_geraDocto', aux);
		  
		/*}catch (e) {
			hAPI.setCardValue('des_geraDocto', e.message);
			log.error(e.message);       
	    }*/
		
	} 
	
	
}