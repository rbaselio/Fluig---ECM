function createDataset(fields, constraints, sortFields) {

	//Cria as colunas do dataset
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Unidade_de_negocio");
	
	//nome do dataset do Formulario
	var datasetDoFormulario = "cadastro_de_uni_negocio";

	//nome da tabela do formulario
	var tablename = "tb_uni-negocio";

	//Cria a constraint para buscar os formulários ativos
	var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cst);

	var datasetPrincipal = DatasetFactory.getDataset(datasetDoFormulario, null, constraints, null);

	for (var i = 0; i < datasetPrincipal.rowsCount; i++) {

		//encontrar documento e versão atual
		var documentId = datasetPrincipal.getValue(i, "metadata#id");
		var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

		//Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
		var c1 = DatasetFactory.createConstraint("tablename", tablename ,tablename, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
		var constraintsFilhos = new Array(c1, c2, c3);

		var datasetFilhos =  DatasetFactory.getDataset(datasetDoFormulario, null, constraintsFilhos, new Array("uni-negocio"));
		for (var j = 0; j < datasetFilhos.rowsCount; j++) {
			//Adiciona os valores nas colunas respectivamente.
			dataset.addRow(
				new Array(
					datasetFilhos.getValue(j, "uni-negocio")
				)
			);
		}
	}
	return dataset;
}