function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("CentrosDeCustos");
	newDataset.addColumn("Descricao");
	

	newDataset.addRow(new Array('101.101','101.101 - Diretoria Executiva'));
	newDataset.addRow(new Array('102.101','102.101 - Marketing'));
	newDataset.addRow(new Array('103.102','103.102 - Controladoria'));
	newDataset.addRow(new Array('103.103','103.103 - Tesouraria'));
	newDataset.addRow(new Array('103.104','103.104 - Fiscal'));
	newDataset.addRow(new Array('103.106','103.106 - Comex'));
	newDataset.addRow(new Array('103.201','103.201 - Recursos Humanos'));
	newDataset.addRow(new Array('103.202','103.202 - Segurança do Trabalho'));
	newDataset.addRow(new Array('103.203','103.203 - Segurança Patrimonial'));
	newDataset.addRow(new Array('103.204','103.204 - Serviços Gerais'));
	newDataset.addRow(new Array('103.301','103.301 - Infraestrutura'));
	newDataset.addRow(new Array('200.101','200.101 - Engenharia Armazenagem'));
	newDataset.addRow(new Array('200.102','200.102 - Engenharia Matrizes'));
	newDataset.addRow(new Array('200.103','200.103 - Engenharia Incubação'));
	newDataset.addRow(new Array('200.104','200.104 - Engenharia Corte'));
	newDataset.addRow(new Array('200.105','200.105 - Engenharia Suinocultura'));
	newDataset.addRow(new Array('200.106','200.106 - P&D'));
	newDataset.addRow(new Array('300.101','300.101 - Comercial - Armazenagem'));
	newDataset.addRow(new Array('300.102','300.102 - Pós Venda Armazenagem'));
	newDataset.addRow(new Array('300.103','300.103 - Administração de Vendas - Armazenagem'));
	newDataset.addRow(new Array('300.104','300.104 - Engenharia de Aplicação - Armazenagem'));
	newDataset.addRow(new Array('300.201','300.201 - Administrativo - Armazenagem'));
	newDataset.addRow(new Array('300.202','300.202 - Supervisores de Campo - Armazenagem'));
	newDataset.addRow(new Array('300.203','300.203 - Assitência Técnica - Armazenagem'));
	newDataset.addRow(new Array('300.204','300.204 - Montagem'));
	newDataset.addRow(new Array('300.301','300.301 - Comercia - Exporção Armazenagem'));
	newDataset.addRow(new Array('400.101','400.101 - Comercial Matrizes'));
	newDataset.addRow(new Array('400.102','400.102 - Pós Venda Matrizes'));
	newDataset.addRow(new Array('400.201','400.201 - Comercial Incubação'));
	newDataset.addRow(new Array('400.202','400.202 - Pós Venda Incubação'));
	newDataset.addRow(new Array('400.204','400.204 - Engenharia de Aplicação'));
	newDataset.addRow(new Array('400.301','400.301 - Comercial Corte'));
	newDataset.addRow(new Array('400.302','400.302 - Pós Venda Corte'));
	newDataset.addRow(new Array('400.303','400.303 - Administração de Vendas'));
	newDataset.addRow(new Array('400.401','400.401 - Comercial Suinocultura'));
	newDataset.addRow(new Array('400.402','400.402 - Pós Venda Suinocultura'));
	newDataset.addRow(new Array('400.501','400.501 - Comercial Exportação'));
	newDataset.addRow(new Array('400.502','400.502 - Pós Venda Exportação'));
	newDataset.addRow(new Array('500.101','500.101 - Gerencia de Fabril'));
	newDataset.addRow(new Array('500.102','500.102 - Engenharia de Processo'));
	newDataset.addRow(new Array('500.201','500.201 - Linha de Corte'));
	newDataset.addRow(new Array('500.202','500.202 - Corte de Chapas'));
	newDataset.addRow(new Array('500.203','500.203 - Corte a Laser'));
	newDataset.addRow(new Array('500.204','500.204 - Puncionadeiras'));
	newDataset.addRow(new Array('500.205','500.205 - Estamparia'));
	newDataset.addRow(new Array('500.206','500.206 - Transformação de Chapas'));
	newDataset.addRow(new Array('500.207','500.207 - Fábrica de Silos'));
	newDataset.addRow(new Array('500.208','500.208 - Solda'));
	newDataset.addRow(new Array('500.209','500.209 - Pintura'));
	newDataset.addRow(new Array('500.210','500.210 - Montagem Armazenagem'));
	newDataset.addRow(new Array('500.211','500.211 - Montagem Proteína Animal'));
	newDataset.addRow(new Array('500.212','500.212 - Montagem Incubação'));
	newDataset.addRow(new Array('500.213','500.213 - Embalagem'));
	newDataset.addRow(new Array('500.214','500.214 - Corte de Perfis'));
	newDataset.addRow(new Array('500.216','500.216 - Solda Ponto'));
	newDataset.addRow(new Array('500.217','500.217 - Helicoide'));
	newDataset.addRow(new Array('500.301','500.301 - Reporte de Produção'));
	newDataset.addRow(new Array('500.302','500.302 - Movimentação de Materiais'));
	newDataset.addRow(new Array('500.303','500.303 - Manutenção'));
	newDataset.addRow(new Array('500.304','500.304 - Ferramentaria'));
	newDataset.addRow(new Array('500.305','500.305 - Almoxarifado Manufatura'));
	newDataset.addRow(new Array('600.101','600.101 - Planejamento e Programação'));
	newDataset.addRow(new Array('600.102','600.102 - Almoxarifado'));
	newDataset.addRow(new Array('600.103','600.103 - Expedição'));
	newDataset.addRow(new Array('600.201','600.201 - Planejamento e Programação'));
	newDataset.addRow(new Array('600.202','600.202 - Almoxarifado'));
	newDataset.addRow(new Array('600.203','600.203 - Expedição'));
	newDataset.addRow(new Array('700.101','700.101 - Planejamento de Controle da Produção'));
	newDataset.addRow(new Array('700.201','700.201 - Compras'));
	newDataset.addRow(new Array('800.101','800.101 - Controle da Qualidade'));
	newDataset.addRow(new Array('900.113','900.113 - Rateio de despesas'));
	
	if (constraints.length <= 1) return newDataset;
	else {		
		var DatasetFiltrado = DatasetBuilder.newDataset();
		DatasetFiltrado.addColumn("CentrosDeCustos");
		DatasetFiltrado.addColumn("Descricao");
		for (var j = 0; j < newDataset.rowsCount; j++) {
			for (var i in constraints) {
				var inicial = constraints[i].getInitialValue().toLowerCase();
				var campo =  newDataset.getValue(j, constraints[i].getFieldName()) ?  newDataset.getValue(j, constraints[i].getFieldName()).toLowerCase() : null;
				if (campo != null && campo.indexOf(inicial) >= 0){
					DatasetFiltrado.addRow(new Array(newDataset.getValue(j, "CentrosDeCustos"),  newDataset.getValue(j, "Descricao")));
					break;
				}  
		    }	
		}
		return DatasetFiltrado;
	}	
}