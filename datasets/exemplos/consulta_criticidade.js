function createDataset(fields, constraints, sortFields) {
     
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("tipo_ocorrencia");
    dataset.addColumn("criticidade");
    dataset.addColumn("aprovacao_gestor");
     
    //Cria a constraint para buscar os formulários ativos
    var cst = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var constraints = new Array(cst);
     
    var datasetPrincipal = DatasetFactory.getDataset("criticidade", null, constraints, null);
     
    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
         
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var c1 = DatasetFactory.createConstraint("tablename", "tb_criticidade" ,"tb_criticidade", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
        var constraintsFilhos = new Array(c1, c2, c3);
 
        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("criticidade", null, constraintsFilhos, null);
        log.info("<<< QUANTIDADE COLUNAS " + datasetFilhos.rowsCount)
        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                    datasetFilhos.getValue(j, "tx_ocorrencia"),
                    datasetFilhos.getValue(j, "sl_criticidade"), 
                    datasetFilhos.getValue(j, "rd_aprov_gestor")));
        }
    }
     
    return dataset;
}