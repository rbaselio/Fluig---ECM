function preencheTabela(){
      
    var dataset = DatasetFactory.getDataset("veiculos", null, null, null);
    var i = 0;
    for(i=0; i < dataset.values.length; i++){
    	var linha = wdkAddChild('veiculos');
    	$("#res_placa___"+linha).val(dataset.values[i].Placa); 
    	$("#veiculo___"+linha).val(dataset.values[i].Veiculo);
		$("#motorista___"+linha).val(dataset.values[i].Usuario);
    }
}