function createDataset(fields, constraints, sortFields) {
	
	 	var newDataset = DatasetBuilder.newDataset();
	 	newDataset.addColumn("Modo_Falha");	   
	    
	    newDataset.addRow(new Array('Amassados/danos/riscos causadas por fixação/dispositivo ou máquina'));
	    newDataset.addRow(new Array('Aquisição em desacordo com especificações do produto'));
	    newDataset.addRow(new Array('Armazenamento inadequado / incorreto'));
	    newDataset.addRow(new Array('Atendimento ineficaz ao cliente'));
	    newDataset.addRow(new Array('Chapas/peças armazenadas em obra de maneira inadequada'));
	    newDataset.addRow(new Array('Concessão'));
	    newDataset.addRow(new Array('Danos na montagem'));
	    newDataset.addRow(new Array('Danos no transporte / manuseio'));
	    newDataset.addRow(new Array('Embalagem inadequada'));
	    newDataset.addRow(new Array('Entrega fora do prazo'));
	    newDataset.addRow(new Array('Envio incorreto'));
	    newDataset.addRow(new Array('Erro de estrutura'));
	    newDataset.addRow(new Array('Erro de estrutura'));
	    newDataset.addRow(new Array('Erro de projeto'));
	    newDataset.addRow(new Array('Erro manuais / esquemas elétricos'));
	    newDataset.addRow(new Array('Falha de identificação / separação de materiais'));
	    newDataset.addRow(new Array('Falha em desenho / publicação'));
	    newDataset.addRow(new Array('Falha em normas regulamentadoras'));
	    newDataset.addRow(new Array('Falha na definição de preços e/ou prazos'));
	    newDataset.addRow(new Array('Falha na elaboração da narrativa'));
	    newDataset.addRow(new Array('Falha na elaboração do pedido'));
	    newDataset.addRow(new Array('Falha na identificaçâo dos itens durante processo'));
	    newDataset.addRow(new Array('Falha na montagem de componentes / sub conjuntos'));
	    newDataset.addRow(new Array('Falha no ante projeto'));
	    newDataset.addRow(new Array('Falha no cumprimento dos procedimentos internos'));
	    newDataset.addRow(new Array('Falha no envio de desenhos/manuais/procedimentos a montadores/empreiteiras'));
	    newDataset.addRow(new Array('Falta de operação (total ou parcial)'));
	    newDataset.addRow(new Array('Falta ou sobra de peças'));
	    newDataset.addRow(new Array('Ferramental/dispositivos/gabaritos não garante dimensões de desenho'));
	    newDataset.addRow(new Array('Improcedente'));
	    newDataset.addRow(new Array('Indefinido'));
	    newDataset.addRow(new Array('Montagem em desacordo com projeto ou manual'));
	    newDataset.addRow(new Array('Outros'));
	    newDataset.addRow(new Array('Peças com dimensional fora do especificado em desenho'));
	    newDataset.addRow(new Array('Perda / extravio de material'));
	    newDataset.addRow(new Array('Processo com alto risco de falha / manual'));
	    newDataset.addRow(new Array('Tempo de processo/cura não cumprido'));	    
	    
	    
	    return newDataset;	
	

}

