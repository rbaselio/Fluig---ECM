function createDataset(fields, constraints, sortFields) {

	//Cria as colunas do dataset
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("produtos");
	
	//nome do dataset do Formulario
	var datasetDoFormulario = "cadastro_de_produtos";

	//nome da tabela do formulario
	var tablename = "tb_produtos";

	//Cria a constraint para buscar os formulários ativos
	var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var constraints = new Array(cst);

	var datasetPrincipal = DatasetFactory.getDataset(datasetDoFormulario, null, constraints, null);
	
	var filhos = new Array();
    var count = 0;

	for (var i = 0; i < datasetPrincipal.rowsCount; i++) {

		//encontrar documento e versão atual
		var documentId = datasetPrincipal.getValue(i, "metadata#id");
		var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

		//Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
		var c1 = DatasetFactory.createConstraint("tablename", tablename ,tablename, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
		var constraintsFilhos = new Array(c1, c2, c3);

		var datasetFilhos =  DatasetFactory.getDataset(datasetDoFormulario, null, constraintsFilhos, new Array("produtos"));
		for (var j = 0; j < datasetFilhos.rowsCount; j++) {
			filhos[count] = {Produto: datasetFilhos.getValue(j, "produtos")};
			count++;
		}
	}
	
	
	//Faz a ordenação
	filhos.sort(compare);
		
	//Depois de realizar a ordenação, adicionar os registros no dataset para serem apresentados
	filhos.forEach(function(filho) {
		dataset.addRow( new Array(filho.Produto));
		//log.warn("================filho.Produto: " + filho.Produto);
	});
	
	
	
	return dataset;
}

function compare(a,b) {
	if (a.Produto < b.Produto)  return -1;
	if (a.Produto > b.Produto)  return 1;
	return 0;
}