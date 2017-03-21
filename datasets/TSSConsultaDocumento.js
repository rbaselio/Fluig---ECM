function createDataset(fields, constraints, sortFields) {
	var chaveeletronica ;	
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) { 
        	if (constraints[i].fieldName == 'chaveeletronica' ) chaveeletronica = constraints[i].initialValue;        	
        }
	}
	if (chaveeletronica == null){		
		var chaveeletronica = "35170203658600000130570010000350591750350595";
	}
	
	//log.warn("------------------------------------------------------------------------------------------------------------");
	
	// Cria o dataset
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("STATUS");
    dataset.addColumn("DATA CONSULTA");
    dataset.addColumn("CHAVE");
    dataset.addColumn("MENSAGEM");
    dataset.addColumn("PROTOCOLO");
    dataset.addColumn("RECEBIMENTO");
    
   

    // Conecta o servico e busca os livros
    var periodicService = ServiceManager.getService('TSS');
    var serviceHelper = periodicService.getBean();
    var serviceLocator = periodicService.instantiate('br.com.totvs.webservices.nfsebra_apw.NFESBRALocator');
    var service = serviceLocator.getNFESBRASOAP();

    //
    try{	
    	var sm = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");    	
    	var result = service.CONSULTACHAVENFE("TOTVS", "000001", chaveeletronica);	
    	
    	dataset.addRow(new Array(	"OK", 
	    							sm.format(new Date()),
	    							result.ID,
	    							result.MSGRETNFE,
	    							result.PROTOCOLO,
	    							sm.format(result.RECBTO) 
	    			));
   
    } catch (erro) {
        dataset.addRow(new Array("ERRO", erro.toString()));
    }
    
    return dataset;	

}