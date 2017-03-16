function createDataset(fields, constraints, sortFields) {
	var uf , cnpj, cpf, IE;
	
	if (constraints != null) {
		uf = null;
		cnpj = null;
		cpf = null; 
		IE = null;
		
        for (var i = 0; i < constraints.length; i++) { 
        	if (constraints[i].fieldName == 'uf' ) uf = constraints[i].initialValue;
        	if (constraints[i].fieldName == 'cnpj' ) cnpj = String(constraints[i].initialValue).replace(/\D/g, '');
        	if (constraints[i].fieldName == 'cpf' ) cpf = String(constraints[i].initialValue).replace(/\D/g, '');
        	if (constraints[i].fieldName == 'IE' ) IE = constraints[i].initialValue;
        }
	}
	if (uf == null){		
		var uf = "PI";
		var cnpj = "07228083000110";
		var cpf = null; /* "22696091820";*/
		var IE = null; /* "P0152052070001";*/
	}
	
	log.warn("------------------------------------------------------------------------------------------------------------");
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + cnpj);
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + cpf);
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + uf);
	
	
	// Cria o dataset
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("STATUS");
    dataset.addColumn("DATA CONSULTA");
    dataset.addColumn("FANTASIA");
    dataset.addColumn("UF");
    dataset.addColumn("CPF");
    dataset.addColumn("ULTIMASITUACAO");
    dataset.addColumn("RAZAOSOCIAL");
    dataset.addColumn("CNPJ");
    dataset.addColumn("INICIOATIVIDADE");
    dataset.addColumn("IEATUAL");
    dataset.addColumn("BAIXA");
    dataset.addColumn("REGIMEAPURACAO");
    dataset.addColumn("IE");
    dataset.addColumn("IEUNICA");
    dataset.addColumn("SITUACAO");
    dataset.addColumn("CNAE");
    dataset.addColumn("LOGRADOURO");
    dataset.addColumn("NUMERO" );
    dataset.addColumn("COMPLEMENTO");
    dataset.addColumn("BAIRRO");
    dataset.addColumn("MUNICIPIO");
    dataset.addColumn("CEP");
    dataset.addColumn("CODIGOMUNICIPIO");
   

    // Conecta o servico e busca os livros
    var periodicService = ServiceManager.getService('TSS');
    var serviceHelper = periodicService.getBean();
    var serviceLocator = periodicService.instantiate('br.com.totvs.webservices.nfsebra_apw.NFESBRALocator');
    var service = serviceLocator.getNFESBRASOAP();

    
    try{	
    	var sm = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");    	
		var result = service.CONSULTACONTRIBUINTE("TOTVS", "000001", uf, cnpj, cpf, IE).getNFECONSULTACONTRIBUINTE(0);
		var endereco = result.getENDERECO();
		
		var situacao = result.getSITUACAO() == 1 ? "Habilitado" : "Não habilitado";
		
		log.warn(result.getRAZAOSOCIAL());
		
	    dataset.addRow(new Array(	"OK", 
	    							sm.format(new Date()), 
	    							result.getFANTASIA(),
						    		result.getUF(),
						    		result.getCPF(),
						    		sm.format(result.getULTIMASITUACAO()),
						    		result.getRAZAOSOCIAL(),
						    		result.getCNPJ(),
						    		result.getINICIOATIVIDADE(),
						    		result.getIEATUAL(),
						    		result.getBAIXA(),
						    		result.getREGIMEAPURACAO(),
						    		result.getIE(),
						    		result.getIEUNICA(),
						    		situacao,
						    		result.getCNAE(),
						    		endereco.getLOGRADOURO(),
						    		endereco.getNUMERO(), 
						    		endereco.getCOMPLEMENTO(),
						    		endereco.getBAIRRO(),
						    		endereco.getMUNICIPIO(),
						    		endereco.getCEP(),
						    		endereco.getCODIGOMUNICIPIO()
	    		));
   
    } catch (erro) {
    	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + erro.toString());
        dataset.addRow(new Array("ERRO", sm.format(new Date()), erro.toString()));
        
    }
    
    return dataset;	

}