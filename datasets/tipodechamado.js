function createDataset(fields, constraints, sortFields) {
	
	var er = /[^a-z0-9]/gi;
	
	//log.warn("----------------------------------------contraint");
	
	var classe = "";
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
        	//log.warn(constraints[i].getFieldName());
        	//log.warn(constraints[i].initialValue);
        	if (constraints[i].getFieldName() == "Classe")  classe = new String(constraints[i].initialValue).replace(er, "");
        }
	}
	
	//log.warn("----------------------------------------dataset");
	// Cria as colunas do dataset
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Classe");
	dataset.addColumn("Tipo");
	dataset.addColumn("Texto");
	dataset.addColumn("Matricula");
	dataset.addColumn("Responsável");

	// nome do dataset do Formulario
	var datasetDoFormulario = "tipo_de_chamados";

	// nome da tabela do formulario
	var tablename = "tb_tipo";

	
	// Cria a constraint para buscar os formulários ativos
	var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cst);

	var datasetPrincipal = DatasetFactory.getDataset(datasetDoFormulario, null, constraints, null);

	var filhos = new Array();
	var count = 0;

	//log.warn("----------------------------------------loop");
	for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
		

		// encontrar documento e versão atual
		var documentId = datasetPrincipal.getValue(i, "metadata#id");
		var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

		// Cria as constraints para buscar os campos filhos, passando o
		// tablename, número da formulário e versão
		var c1 = DatasetFactory.createConstraint("tablename", tablename, tablename, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
		var constraintsFilhos = new Array(c1, c2, c3);

		var datasetFilhos = DatasetFactory.getDataset(datasetDoFormulario, null, constraintsFilhos, new Array("tipo", "classe"));
		//log.warn("----------------------------------------filhos");
		for (var j = 0; j < datasetFilhos.rowsCount; j++) {
			//log.warn(datasetFilhos.getValue(j, "classe"));
			//log.warn(new String(datasetFilhos.getValue(j, "classe")).replace(er, ""));
			//log.warn(classe);
			if (classe != "" && new String(datasetFilhos.getValue(j, "classe")).replace(er, "") != classe) continue;
			
			
			filhos[count] = {
				Classe : datasetFilhos.getValue(j, "classe"),
				Tipo : datasetFilhos.getValue(j, "tipo"),
				Sugestao : datasetFilhos.getValue(j, "sugestao"),
				Matricula : datasetFilhos.getValue(j, "matricula_user"),
				Responsavel : datasetFilhos.getValue(j, "responsavel")
			};
			count++;
		}
	}

	// Faz a ordenação
	filhos.sort(compare);

	// Depois de realizar a ordenação, adicionar os registros no dataset para serem apresentados
	filhos.forEach(function(filho) {
		
		dataset.addRow(new Array(filho.Classe, 
				filho.Tipo, 
				filho.Sugestao,
				filho.Matricula, 
				filho.Responsavel));
	});
	
	
	return dataset;
}

function compare(a, b) {
	
	if (a.Classe < b.Classe) return -1;
	if (a.Classe > b.Classe) return 1;

	// Caso não tenha caído em nenhuma condição, são iguais. Valida o segundo campo
	if (a.Tipo < b.Tipo) return -1;
	if (a.Tipo > b.Tipo) return 1;

	return 0;
}