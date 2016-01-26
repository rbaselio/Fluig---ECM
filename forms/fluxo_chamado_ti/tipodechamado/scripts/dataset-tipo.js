function createDataset(fields, constraints, sortFields) {

	//Cria as colunas do dataset
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Classe");
	dataset.addColumn("Tipo");
	dataset.addColumn("Texto");
	dataset.addColumn("Matricula");
	dataset.addColumn("Responsável");

	//nome do dataset do Formulario
	var datasetDoFormulario = "tipo_de_chamados";

	//nome da tabela do formulario
	var tablename = "tb_tipo";

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

		var datasetFilhos =  DatasetFactory.getDataset(datasetDoFormulario, null, constraintsFilhos, new Array("tipo", "classe"));
		for (var j = 0; j < datasetFilhos.rowsCount; j++) {
			//Adiciona os valores nas colunas respectivamente.
			dataset.addRow(
				new Array(
					datasetFilhos.getValue(j, "classe"),
					datasetFilhos.getValue(j, "tipo"), 
					datasetFilhos.getValue(j, "sugestao"), 
					datasetFilhos.getValue(j, "matricula_user"),
					datasetFilhos.getValue(j, "responsavel")
				)
			);
		}
	}
	return dataset;
}