function createDataset(fields, constraints, sortFields) {
	log.info("<<< PASSO 0");
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("Status");
	
	// WEBSERVICE
	var servico = ServiceManager.getService("teste");
	var serviceHelper = servico.getBean();
	log.info("<<< PASSO 1");
	var service = serviceHelper.instantiate('testes.Services'); 
	log.info("<<< PASSO 2");
	var metodos = service.getServicesSoap();
	log.info("<<< PASSO 3");
	var retorno = metodos.isValidUser("1");
	log.info("<<< PASSO 4");
	newDataset.addRow(new Array(retorno));
	
	return newDataset;
}