function createDataset(fields, constraints, sortFields) {

	//Cria as colunas do dataset
	var dataset = DatasetBuilder.newDataset();
	var datasetDoFormulario = "cadastro_de_servicos";
	var tablename = "tb_servicos";
	var created = false;
	
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO1");
	
	var datasetPrincipal = DatasetFactory.getDataset(datasetDoFormulario, null, [DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST)], null);
	for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
		//encontrar documento e versão atual
		var documentId = datasetPrincipal.getValue(i, "metadata#id");
		var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO2");
		//Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
		var c1 = DatasetFactory.createConstraint("tablename", tablename ,tablename, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
		var constraintFilho = [c1, c2, c3];
		
		var datasetFilhos =  DatasetFactory.getDataset(datasetDoFormulario, null, constraintFilho, null);
		
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO4");		
		for (var j = 0; j < datasetFilhos.rowsCount; j++) {
			var filtro = false;	
			for (constr in constraints){
				if (constraints[constr].fieldName == "sqlLimit") continue;				
				var ini = constraints[constr].initialValue;
				var fim = constraints[constr].finalValue;
				var aux = datasetFilhos.getValue(j, '' + constraints[constr].fieldName);
				//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO4 " + ini);
				//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO4 " + fim);
				//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PASSO4 " + aux);
				if (aux < ini || aux > fim){
					filtro = true;
					continue ;
				}				
			}
			if (filtro) continue ;			
			var array = [];
			if (fields == null) 
				for(var k = 0; k < datasetFilhos.getColumnsCount();k++){
					if (!created) dataset.addColumn(datasetFilhos.getColumnName(k));
					array[k] = datasetFilhos.getValue(j,k);
				}			
			else for (field in fields){
					if (!created) dataset.addColumn(fields[field]);
					array[field] = datasetFilhos.getValue(j, fields[field]);					
				}			
			created = true;
			dataset.addRow(array);
		}
	}
	
	return dataset;
	
}

