function beforeDocumentPublisher() {

	log.info("-----------------VALIDAÇÃO DE ARQUIVO----------------------");
	
	var doc = getValue("WKDocument");
	var name = String(new java.lang.String(doc.getPhisicalFile()));
	var array_extension = name.split(".");
	
	var permite = false;
	var extencao = array_extension[array_extension.length - 1];
	var extencoes_permitidas;	
	
	log.info("-----------------CONSULTANDO DATASET----------------------");
	var dataset = DatasetFactory.getDataset("consulta_extencao", null, null, null);
	if (dataset.rowsCount > 0){
		for(var i = 0; i < dataset.rowsCount; i++) {
			extencoes_permitidas = dataset.getValue(i, "extencao");
	        if(extencoes_permitidas.indexOf(extencao) != -1) {
	        	log.info("Arquivos com a extensão " + extencao + " são permitidos");
	            permite = true;
	            break;
	        }
	    }
	}	
	
	if (permite == false){
		log.info("Arquivos com a extensão " + extencao + " não são permitidos");
	       throw "Arquivos com a extensão " + extencao + " não são permitidos" ;
	}

}