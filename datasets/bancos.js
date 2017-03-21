function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("Cod_banco");
	newDataset.addColumn("Banco");

	newDataset.addRow(new Array('001','Banco do Brasil S.A.'));
	newDataset.addRow(new Array('003','Banco da Amazônia S.A.'));
	newDataset.addRow(new Array('004','Banco do Nordeste do Brasil S.A.'));
	newDataset.addRow(new Array('012','Banco INBURSA de Investimentos S.A.'));
	newDataset.addRow(new Array('017','BNY Mellon Banco S.A.'));
	newDataset.addRow(new Array('021','BANESTES S.A. Banco do Estado do Espírito Santo'));
	newDataset.addRow(new Array('024','Banco BANDEPE S.A.'));
	newDataset.addRow(new Array('025','Banco Alfa S.A.'));
	newDataset.addRow(new Array('029','Banco Itaú BMG Consignado S.A.'));
	newDataset.addRow(new Array('031','Banco Beg S.A.'));
	newDataset.addRow(new Array('033','Banco Santander (Brasil) S.A.'));
	newDataset.addRow(new Array('036','Banco Bradesco BBI S.A.'));
	newDataset.addRow(new Array('037','Banco do Estado do Pará S.A.'));
	newDataset.addRow(new Array('040','Banco Cargill S.A.'));
	newDataset.addRow(new Array('041','Banco do Estado do Rio Grande do Sul S.A.'));
	newDataset.addRow(new Array('045','Banco Opportunity de Investimento S.A.'));
	newDataset.addRow(new Array('047','Banco do Estado de Sergipe S.A.'));
	newDataset.addRow(new Array('062','Hipercard Banco Múltiplo S.A.'));
	newDataset.addRow(new Array('063','Banco Bradescard S.A.'));
	newDataset.addRow(new Array('064','Goldman Sachs do Brasil Banco Múltiplo S.A.'));
	newDataset.addRow(new Array('065','Banco Andbank (Brasil) S.A.'));
	newDataset.addRow(new Array('069','BPN Brasil Banco Múltiplo S.A.'));
	newDataset.addRow(new Array('070','BRB - Banco de Brasília S.A.'));
	newDataset.addRow(new Array('073','BB Banco Popular do Brasil S.A.'));
	newDataset.addRow(new Array('074','Banco J. Safra S.A.'));
	newDataset.addRow(new Array('075','Banco ABN AMRO S.A.'));
	newDataset.addRow(new Array('078','Haitong Banco de Investimento do Brasil S.A.'));
	newDataset.addRow(new Array('081','BBN Banco Brasileiro de Negócios S.A.'));
	newDataset.addRow(new Array('082','Banco Topázio S.A.'));
	newDataset.addRow(new Array('083','Banco da China Brasil S.A.'));
	newDataset.addRow(new Array('094','Banco Petra S.A.'));
	newDataset.addRow(new Array('095','Banco Confidence de Câmbio S.A.'));
	newDataset.addRow(new Array('096','Banco BM&FBOVESPA de Serviços de Liquidação e Custódia S.A'));
	newDataset.addRow(new Array('104','Caixa Econômica Federal'));
	newDataset.addRow(new Array('107','Banco BBM S.A.'));
	newDataset.addRow(new Array('118','Standard Chartered Bank (Brasil) S/A–Bco Invest.'));
	newDataset.addRow(new Array('119','Banco Western Union do Brasil S.A.'));
	newDataset.addRow(new Array('120','Banco Rodobens S.A.'));
	newDataset.addRow(new Array('125','Brasil Plural S.A. - Banco Múltiplo'));
	newDataset.addRow(new Array('128','MSB Bank S.A. Banco de Câmbio'));
	newDataset.addRow(new Array('129','UBS Brasil Banco de Investimento S.A.'));
	newDataset.addRow(new Array('184','Banco Itaú BBA S.A.'));
	newDataset.addRow(new Array('204','Banco Bradesco Cartões S.A.'));
	newDataset.addRow(new Array('208','Banco BTG Pactual S.A.'));
	newDataset.addRow(new Array('212','Banco Original S.A.'));
	newDataset.addRow(new Array('215','Banco Comercial e de Investimento Sudameris S.A.'));
	newDataset.addRow(new Array('217','Banco John Deere S.A.'));
	newDataset.addRow(new Array('218','Banco Bonsucesso S.A.'));
	newDataset.addRow(new Array('222','Banco Credit Agricole Brasil S.A.'));
	newDataset.addRow(new Array('224','Banco Fibra S.A.'));
	newDataset.addRow(new Array('233','Banco Cifra S.A.'));
	newDataset.addRow(new Array('237','Banco Bradesco S.A.'));
	newDataset.addRow(new Array('246','Banco ABC Brasil S.A.'));
	newDataset.addRow(new Array('248','Banco Boavista Interatlântico S.A.'));
	newDataset.addRow(new Array('249','Banco Investcred Unibanco S.A.'));
	newDataset.addRow(new Array('250','BCV - Banco de Crédito e Varejo S.A.'));
	newDataset.addRow(new Array('254','Paraná Banco S.A.'));
	newDataset.addRow(new Array('263','Banco Cacique S.A.'));
	newDataset.addRow(new Array('265','Banco Fator S.A.'));
	newDataset.addRow(new Array('318','Banco BMG S.A.'));
	newDataset.addRow(new Array('320','China Construction Bank (Brasil) Banco Múltiplo S.A.'));
	newDataset.addRow(new Array('341','Itaú Unibanco S.A.'));
	newDataset.addRow(new Array('356','Banco Real S.A.'));
	newDataset.addRow(new Array('366','Banco Société Générale Brasil S.A.'));
	newDataset.addRow(new Array('370','Banco Mizuho do Brasil S.A.'));
	newDataset.addRow(new Array('376','Banco J. P. Morgan S.A.'));
	newDataset.addRow(new Array('389','Banco Mercantil do Brasil S.A.'));
	newDataset.addRow(new Array('394','Banco Bradesco Financiamentos S.A.'));
	newDataset.addRow(new Array('399','HSBC Bank Brasil S.A. - Banco Múltiplo'));
	newDataset.addRow(new Array('422','Banco Safra S.A.'));
	newDataset.addRow(new Array('456','Banco de Tokyo-Mitsubishi UFJ Brasil S.A.'));
	newDataset.addRow(new Array('464','Banco Sumitomo Mitsui Brasileiro S.A.'));
	newDataset.addRow(new Array('473','Banco Caixa Geral - Brasil S.A.'));
	newDataset.addRow(new Array('477','Citibank N.A.'));
	newDataset.addRow(new Array('479','Banco ItaúBank S.A'));
	newDataset.addRow(new Array('487','Deutsche Bank S.A. - Banco Alemão'));
	newDataset.addRow(new Array('488','JPMorgan Chase Bank'));
	newDataset.addRow(new Array('492','ING Bank N.V.'));
	newDataset.addRow(new Array('505','Banco Credit Suisse (Brasil) S.A.'));
	newDataset.addRow(new Array('600','Banco Luso Brasileiro S.A.'));
	newDataset.addRow(new Array('604','Banco Industrial do Brasil S.A.'));
	newDataset.addRow(new Array('610','Banco VR S.A.'));
	newDataset.addRow(new Array('611','Banco Paulista S.A.'));
	newDataset.addRow(new Array('612','Banco Guanabara S.A.'));
	newDataset.addRow(new Array('623','Banco PAN S.A.'));
	newDataset.addRow(new Array('626','Banco Ficsa S.A.'));
	newDataset.addRow(new Array('633','Banco Rendimento S.A.'));
	newDataset.addRow(new Array('634','Banco Triângulo S.A.'));
	newDataset.addRow(new Array('641','Banco Alvorada S.A.'));
	newDataset.addRow(new Array('643','Banco Pine S.A.'));
	newDataset.addRow(new Array('652','Itaú Unibanco Holding S.A.'));
	newDataset.addRow(new Array('653','Banco Indusval S.A.'));
	newDataset.addRow(new Array('655','Banco Votorantim S.A.'));
	newDataset.addRow(new Array('707','Banco Daycoval S.A.'));
	newDataset.addRow(new Array('719','Banif-Banco Internacional do Funchal (Brasil)S.A.'));
	newDataset.addRow(new Array('739','Banco Cetelem S.A.'));
	newDataset.addRow(new Array('740','Banco Barclays S.A.'));
	newDataset.addRow(new Array('745','Banco Citibank S.A.'));
	newDataset.addRow(new Array('746','Banco Modal S.A.'));
	newDataset.addRow(new Array('747','Banco Rabobank International Brasil S.A.'));
	newDataset.addRow(new Array('748','Banco Cooperativo Sicredi S.A.'));
	newDataset.addRow(new Array('751','Scotiabank Brasil S.A. Banco Múltiplo'));
	newDataset.addRow(new Array('752','Banco BNP Paribas Brasil S.A.'));
	newDataset.addRow(new Array('755','Bank of America Merrill Lynch Banco Múltiplo S.A.'));
	newDataset.addRow(new Array('756','Banco Cooperativo do Brasil S.A. - BANCOOB'));
	
	
	
	if (constraints.length <= 1) return newDataset;
	else {		
		var DatasetFiltrado = DatasetBuilder.newDataset();
		DatasetFiltrado.addColumn("Cod_banco");
		DatasetFiltrado.addColumn("Banco");
		for (var j = 0; j < newDataset.rowsCount; j++) {
			for (var i in constraints) {
				var inicial = constraints[i].getInitialValue().toLowerCase();
				var campo =  newDataset.getValue(j, constraints[i].getFieldName()) ?  newDataset.getValue(j, constraints[i].getFieldName()).toLowerCase() : null;
				if (campo != null && campo.indexOf(inicial) >= 0){
					DatasetFiltrado.addRow(new Array(newDataset.getValue(j, "Cod_banco"),  newDataset.getValue(j, "Banco")));
					break;
				};       
		    }	
		}
		return DatasetFiltrado;
	}
	
}