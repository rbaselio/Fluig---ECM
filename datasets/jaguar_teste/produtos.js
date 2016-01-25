function createDataset(fields, constraints, sortFields) {
	
	 var dataset = DatasetBuilder.newDataset();
	    dataset.addColumn("Produto");
	    dataset.addColumn("Descricao");
	   
	    
	    dataset.addRow(new Array("Fluig", "Controle de Workflow"));
	    dataset.addRow(new Array("Drummer", "Planejamento de Produção"));
	    dataset.addRow(new Array("PCFactory", "MES"));
	    dataset.addRow(new Array("Logix", "ERP"));
	    dataset.addRow(new Array("Email", "Mensagens"));
	    dataset.addRow(new Array("Messenger", "Mensagens"));
	    dataset.addRow(new Array("Telefonia", "Telefonia"));
	    dataset.addRow(new Array("Hardware", "Maquinas e equipamentos"));
	    dataset.addRow(new Array("Diversos", "Sistemas não previstos"));
	    
	    
	    
	    return dataset;
	
	

}