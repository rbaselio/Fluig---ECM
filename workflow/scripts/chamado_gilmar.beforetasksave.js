function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	var docs = hAPI.listAttachments();
	
	
	var doc;
	var name;
	var extencao;
	var array_extension;
	var extencoes_permitidas;
	var permite;
	
	log.info('docs.size() = ' +  docs.size());
	for (var i = 0; i < docs.size(); i++) {
		doc = docs.get(i);
   	 	name = String(new java.lang.String(doc.getPhisicalFile()));
   	 	
   	 	log.info("-------------VALIDANDO ARQUIVO " + name + "----------------");
   	 	
   	 	array_extension = name.split(".");
   	 	extencao = array_extension[array_extension.length - 1];
   		permite = false;
   		log.info('name = ' +  name);
   		log.info('extencao = ' +  extencao);
   	 
		log.info("-----------------CONSULTANDO DATASET = consulta_extencao----------------------");
		var dataset = DatasetFactory.getDataset("consulta_extencao", null, null, null);
		if (dataset.rowsCount > 0){
			for(var j = 0; j < dataset.rowsCount; j++) {
				extencoes_permitidas = dataset.getValue(j, "extencao");
				log.info('extencoes_permitidas = ' +  extencoes_permitidas);
		        if(extencoes_permitidas.indexOf(extencao) != -1) {
		        	log.info("Arquivos com a extensão " + extencao + " são permitidos");
		            permite = true;		            
		        }		        
		    }
		}
		
		log.info('permite = ' +  permite);
		if (permite == false){
			log.error("Arquivos com a extensão " + extencao + " não são permitidos");
		    throw "Arquivos com a extensão " + extencao + " não são permitidos" ;
		}

	   
    }  
}

