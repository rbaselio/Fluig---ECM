function createDataset(fields, constraints, sortFields) {
     
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Classe");    
     
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var constraints = new Array(cst);
     
    var datasetPrincipal = DatasetFactory.getDataset("classe_de_chamados", null, constraints, null);
    var filhos = new Array();
    var count = 0;
    
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tb_classe" ,"tb_classe", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("classe_de_chamados", null, constraintsFilhos, null);
		
		for (var j = 0; j < datasetFilhos.rowsCount; j++) {
			filhos[count] = {Classe: datasetFilhos.getValue(j, "classe")};
			count++;            
        }
    }
    
    //Faz a ordenação
	filhos.sort(compare);
		
	//Depois de realizar a ordenação, adicionar os registros no dataset para serem apresentados
	filhos.forEach(function(filho) {
		dataset.addRow( new Array(filho.Classe));
	});
    
	return dataset;
}

function compare(a,b) {
	if (a.Classe < b.Classe)  return -1;
	if (a.Classe > b.Classe)  return 1;
	return 0;
}

