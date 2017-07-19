function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("Cod_banco");
	newDataset.addColumn("Nome_ext");
	newDataset.addColumn("Banco");
	
	newDataset.addRow(['001','BCO DO BRASIL S.A.','Banco do Brasil S.A.']);
    newDataset.addRow(['003','BCO DA AMAZONIA S.A.','Banco da Amazônia S.A.']);
    newDataset.addRow(['004','BCO DO NORDESTE DO BRASIL S.A.','Banco do Nordeste do Brasil S.A.']);
    newDataset.addRow(['007','BNDES','Banco Nacional de Desenvolvimento Econômico e Social BNDES']);
    newDataset.addRow(['010','CREDICOAMO','Credicoamo Crédito Rural Cooperativa']);
    newDataset.addRow(['011','C.SUISSE HEDGING-GRIFFO CV S/A','Credit Suisse Hedging-Griffo Corretora de Valores S.A.']);
    newDataset.addRow(['012','BANCO INBURSA DE INVESTIMENTOS S.A.','Banco Inbursa de Investimentos S.A.']);
    newDataset.addRow(['014','NATIXIS BRASIL S.A. BM','Natixis Brasil S.A. Banco Múltiplo']);
    newDataset.addRow(['015','UBS BRASIL CCTVM S.A.','UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A.']);
    newDataset.addRow(['016','CCM DESP TRÂNS SC E RS','Coop de Créd. Mútuo dos Despachantes de Trânsito de SC e Rio Grande do Sul']);
    newDataset.addRow(['017','BNY MELLON BCO S.A.','BNY Mellon Banco S.A.']);
    newDataset.addRow(['018','BCO TRICURY S.A.','Banco Tricury S.A.']);
    newDataset.addRow(['021','BCO BANESTES S.A.','Banestes S.A. Banco do Estado do Espírito Santo']);
    newDataset.addRow(['024','BCO BANDEPE S.A.','Banco Bandepe S.A.']);
    newDataset.addRow(['025','BCO ALFA S.A.','Banco Alfa S.A.']);
    newDataset.addRow(['029','BANCO ITAÚ CONSIGNADO S.A.','Banco Itaú Consignado S.A.']);
    newDataset.addRow(['033','BCO SANTANDER (BRASIL) S.A.','Banco Santander (Brasil) S. A.']);
    newDataset.addRow(['036','BCO BBI S.A.','Banco Bradesco BBI S.A.']);
    newDataset.addRow(['037','BCO DO EST. DO PA S.A.','Banco do Estado do Pará S.A.']);
    newDataset.addRow(['040','BCO CARGILL S.A.','Banco Cargill S.A.']);
    newDataset.addRow(['041','BCO DO ESTADO DO RS S.A.','Banco do Estado do Rio Grande do Sul S.A.']);
    newDataset.addRow(['047','BCO DO EST. DE SE S.A.','Banco do Estado de Sergipe S.A.']);
    newDataset.addRow(['060','CONFIDENCE CC S.A.','Confidence Corretora de Câmbio S.A.']);
    newDataset.addRow(['062','HIPERCARD BM S.A.','Hipercard Banco Múltiplo S.A.']);
    newDataset.addRow(['063','BANCO BRADESCARD','Banco Bradescard S.A.']);
    newDataset.addRow(['064','GOLDMAN SACHS DO BRASIL BM S.A','Goldman Sachs do Brasil Banco Múltiplo S. A.']);
    newDataset.addRow(['065','BANCO ANDBANK (BRASIL) S.A.','Banco AndBank (Brasil) S.A.']);
    newDataset.addRow(['066','BCO MORGAN STANLEY S.A.','Banco Morgan Stanley S. A.']);
    newDataset.addRow(['069','BCO CREFISA S.A.','Banco Crefisa S.A.']);
    newDataset.addRow(['070','BRB - BCO DE BRASILIA S.A.','Banco de Brasília S.A.']);
    newDataset.addRow(['074','BCO. J.SAFRA S.A.','Banco J. Safra S.A.']);
    newDataset.addRow(['075','BCO ABN AMRO S.A.','Banco ABN Amro S.A.']);
    newDataset.addRow(['076','BCO KDB BRASIL S.A.','Banco KDB do Brasil S.A.']);
    newDataset.addRow(['077','BANCO INTERMEDIUM S/A','Banco Intermedium S.A.']);
    newDataset.addRow(['078','HAITONG BI DO BRASIL S.A.','Haitong Banco de Investimento do Brasil S.A.']);
    newDataset.addRow(['079','BCO ORIGINAL DO AGRO S/A','Banco Original do Agronegócio S.A.']);
    newDataset.addRow(['080','B & T ASSOCIADOS CC LTDA.','BT Associados Corretora de Câmbio Ltda']);
    newDataset.addRow(['081','BBN BCO BRASILEIRO DE NEGOCIOS S.A.','BBN Banco Brasileiro de Negocios S.A.']);
    newDataset.addRow(['082','BANCO TOPÁZIO S.A.','Banco Topazio S.A.']);
    newDataset.addRow(['083','BCO DA CHINA BRASIL S.A.','Banco da China Brasil S.A.']);
    newDataset.addRow(['084','UNIPRIME NORTE DO PARANÁ','Uniprime Norte do Paraná - Coop. de Econ e Crédito Mútuo dos Medicos,...']);
    newDataset.addRow(['085','CCC URBANO','Cooperativa Central de Crédito Urbano - Cecred']);
    newDataset.addRow(['089','CCR REG MOGIANA','Cooperativa de Crédito Rural da Região da Mogiana']);
    newDataset.addRow(['090','CCCM SICOOB UNIMAIS','Cooperativa Central de Economia e Crédito Mútuo - Sicoob Unimais']);
    newDataset.addRow(['091','CCCM UNICRED CENTRAL RS','Central de Cooperativas de Economia e Crédito Mútuo do Est RS - Unicred']);
    newDataset.addRow(['092','BRICKELL S.A. CFI','Brickell S.A. Crédito, Financiamento e Investimento']);
    newDataset.addRow(['093','PÓLOCRED SCMEPP LTDA.','Pólocred Sociedade de Crédito ao Microempreendedor e à Empresa de Pequeno Porte']);
    newDataset.addRow(['094','BANCO FINAXIS','Banco Finaxis S.A.']);
    newDataset.addRow(['095','BCO CONFIDENCE DE CÂMBIO S.A.','Banco Confidence de Câmbio S.A.']);
    newDataset.addRow(['096','BANCO BM&FBOVESPA','Banco BMFBovespa de Serviços de Liquidação e Custódia S/A']);
    newDataset.addRow(['097','CCC NOROESTE BRASILEIRO LTDA.','Cooperativa Central de Crédito Noroeste Brasileiro Ltda - CentralCredi']);
    newDataset.addRow(['098','CREDIALIANÇA CCR','Credialiança Cooperativa de Crédito Rural']);
    newDataset.addRow(['099','UNIPRIME CENTRAL CCC LTDA.','Uniprime Central – Central Interestadual de Cooperativas de Crédito Ltda.']);
    newDataset.addRow(['100','PLANNER CV S.A.','Planner Corretora de Valores S.A.']);
    newDataset.addRow(['101','RENASCENCA DTVM LTDA','Renascença Distribuidora de Títulos e Valores Mobiliários Ltda.']);
    newDataset.addRow(['102','XP INVESTIMENTOS CCTVM S/A','XP Investimentos Corretora de Câmbio Títulos e Valores Mobiliários S.A.']);
    newDataset.addRow(['104','CAIXA ECONOMICA FEDERAL','Caixa Econômica Federal']);
    newDataset.addRow(['105','LECCA CFI S.A.','Lecca Crédito, Financiamento e Investimento S/A']);
    newDataset.addRow(['107','BCO BBM S.A.','Banco BBM S.A.']);
    newDataset.addRow(['108','PORTOCRED S.A. - CFI','PortoCred S.A. Crédito, Financiamento e Investimento']);
    newDataset.addRow(['111','OLIVEIRA TRUST DTVM S.A.','Oliveira Trust Distribuidora de Títulos e Valores Mobiliários S.A.']);
    newDataset.addRow(['113','MAGLIANO S.A. CCVM','Magliano S.A. Corretora de Cambio e Valores Mobiliarios']);
    newDataset.addRow(['114','CENTRAL CECM ESP. SANTO','Central das Cooperativas de Economia e Crédito Mútuo do Estado do Espírito Santo']);
    newDataset.addRow(['117','ADVANCED CC LTDA','Advanced Corretora de Câmbio Ltda.']);
    newDataset.addRow(['118','STANDARD CHARTERED BI S.A.','Standard Chartered Bank (Brasil) S.A. Banco de Investimento']);
    newDataset.addRow(['119','BCO WESTERN UNION','Banco Western Union do Brasil S.A.']);
    newDataset.addRow(['120','BCO RODOBENS S.A.','Banco Rodobens SA']);
    newDataset.addRow(['121','BCO AGIPLAN S.A.','Banco Agiplan S.A.']);
    newDataset.addRow(['122','BCO BRADESCO BERJ S.A.','Banco Bradesco BERJ S.A.']);
    newDataset.addRow(['124','BCO WOORI BANK DO BRASIL S.A.','Banco Woori Bank do Brasil S.A.']);
    newDataset.addRow(['125','BRASIL PLURAL S.A. BCO.','Brasil Plural S.A. Banco Múltiplo']);
    newDataset.addRow(['126','BR PARTNERS BI','BR Partners Banco de Investimento S.A.']);
    newDataset.addRow(['127','CODEPE CVC S.A.','Codepe Corretora de Valores e Câmbio S.A.']);
    newDataset.addRow(['128','MS BANK S.A. BCO DE CÂMBIO','MS Bank S.A. Banco de Câmbio']);
    newDataset.addRow(['129','UBS BRASIL BI S.A.','UBS Brasil Banco de Investimento S.A.']);
    newDataset.addRow(['130','CARUANA SCFI','Caruana S.A. Sociedade de Crédito, Financiamento e Investimento']);
    newDataset.addRow(['131','TULLETT PREBON BRASIL CVC LTDA','Tullett Prebon Brasil Corretora de Valores e Câmbio Ltda.']);
    newDataset.addRow(['132','ICBC DO BRASIL BM S.A.','ICBC do Brasil Banco Múltiplo S.A.']);
    newDataset.addRow(['133','CONFEDERACAO NAC DAS CCC SOL','Confederação Nacional Coop. Centrais Créd. Econ. Familiar Solidária – CONFESOL']);
    newDataset.addRow(['134','BGC LIQUIDEZ DTVM LTDA','BGC Liquidez Distribuidora de Títulos e Valores Mobiliários Ltda.']);
    newDataset.addRow(['135','GRADUAL CCTVM S.A.','Gradual Corretora de Câmbio, Títulos e Valores Mobiliários S.A.']);
    newDataset.addRow(['136','CONF NAC COOP CENTRAIS UNICRED','Confederação Nacional das Cooperativas Centrais Unicred Ltda – Unicred do Brasil']);
    newDataset.addRow(['137','MULTIMONEY CC LTDA.','Multimoney Corretora de Câmbio Ltda']);
    newDataset.addRow(['138','GET MONEY CC LTDA','Get Money Corretora de Câmbio S.A.']);
    newDataset.addRow(['139','INTESA SANPAOLO BRASIL S.A. BM','Intesa Sanpaolo Brasil S.A. - Banco Múltiplo']);
    newDataset.addRow(['140','EASYNVEST - TÍTULO CV SA','Easynvest - Título Corretora de Valores SA']);
    newDataset.addRow(['142','BROKER BRASIL CC LTDA.','Broker Brasil Corretora de Câmbio Ltda.']);
    newDataset.addRow(['143','TREVISO CC S.A.','Treviso Corretora de Câmbio S.A.']);
    newDataset.addRow(['144','BEXS BCO DE CAMBIO S.A.','Bexs Banco de Câmbio S.A.']);
    newDataset.addRow(['145','LEVYCAM CCV LTDA','Levycam - Corretora de Câmbio e Valores Ltda.']);
    newDataset.addRow(['146','GUITTA CC LTDA','Guitta Corretora de Câmbio Ltda.']);
    newDataset.addRow(['147','RICO CTVM S.A.','Rico Corretora de Títulos e Valores Mobiliários S.A.']);
    newDataset.addRow(['149','FACTA S.A. CFI','Facta Financeira S.A. - Crédito Financiamento e Investimento']);
    newDataset.addRow(['157','ICAP DO BRASIL CTVM LTDA.','ICAP do Brasil Corretora de Títulos e Valores Mobiliários Ltda.']);
    newDataset.addRow(['163','COMMERZBANK BRASIL S.A. - BCO MÚLTIPLO','Commerzbank Brasil S.A. - Banco Múltiplo']);
    newDataset.addRow(['167','S. HAYATA CC S.A.','S. Hayata Corretora de Câmbio S.A.']);
    newDataset.addRow(['169','BCO OLÉ BONSUCESSO CONSIGNADO S.A.','Banco Olé Bonsucesso Consignado S.A.']);
    newDataset.addRow(['173','BRL TRUST DTVM SA','BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A.']);
    newDataset.addRow(['177','GUIDE','Guide Investimentos S.A. Corretora de Valores']);
    newDataset.addRow(['180','CM CAPITAL MARKETS CCTVM LTDA','CM Capital Markets Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.']);
    newDataset.addRow(['183','SOCRED S.A. SCM','Socred S.A. - Sociedade de Crédito ao Microempreendedor']);
    newDataset.addRow(['184','BCO ITAÚ BBA S.A.','Banco Itaú BBA S.A.']);
    newDataset.addRow(['189','HS FINANCEIRA','HS Financeira S/A Crédito, Financiamento e Investimentos']);
    newDataset.addRow(['191','NOVA FUTURA CTVM LTDA.','Nova Futura Corretora de Títulos e Valores Mobiliários Ltda.']);
    newDataset.addRow(['204','BCO BRADESCO CARTOES S.A.','Banco Bradesco Cartões S.A.']);
    newDataset.addRow(['208','BANCO BTG PACTUAL S.A.','Banco BTG Pactual S.A.']);
    newDataset.addRow(['212','BANCO ORIGINAL','Banco Original S.A.']);
    newDataset.addRow(['213','BCO ARBI S.A.','Banco Arbi S.A.']);
    newDataset.addRow(['217','BANCO JOHN DEERE S.A.','Banco John Deere S.A.']);
    newDataset.addRow(['218','BANCO BONSUCESSO S.A.','Banco Bonsucesso S.A.']);
    newDataset.addRow(['222','BCO CRÉDIT AGRICOLE BR S.A.','Banco Credit Agrícole Brasil S.A.']);
    newDataset.addRow(['224','BCO FIBRA S.A.','Banco Fibra S.A.']);
    newDataset.addRow(['233','BANCO CIFRA','Banco Cifra S.A.']);
    newDataset.addRow(['237','BCO BRADESCO S.A.','Banco Bradesco S.A.']);
    newDataset.addRow(['241','BCO CLASSICO S.A.','Banco Clássico S.A.']);
    newDataset.addRow(['243','BCO MÁXIMA S.A.','Banco Máxima S.A.']);
    newDataset.addRow(['246','BCO ABC BRASIL S.A.','Banco ABC Brasil S.A.']);
    newDataset.addRow(['248','BCO BOAVISTA INTERATLANTICO S.A.','Banco Boavista Interatlântico S.A.']);
    newDataset.addRow(['249','BANCO INVESTCRED UNIBANCO S.A.','Banco Investcred Unibanco S.A.']);
    newDataset.addRow(['250','BCV','BCV - Banco de Crédito e Varejo S/A']);
    newDataset.addRow(['253','BEXS CC S.A.','Bexs Corretora de Câmbio S/A']);
    newDataset.addRow(['254','PARANA BCO S.A.','Parana Banco S. A.']);
    newDataset.addRow(['263','BCO CACIQUE S.A.','Banco Cacique S. A.']);
    newDataset.addRow(['265','BCO FATOR S.A.','Banco Fator S.A.']);
    newDataset.addRow(['266','BCO CEDULA S.A.','Banco Cédula S.A.']);
    newDataset.addRow(['300','BCO LA NACION ARGENTINA','Banco de la Nacion Argentina']);
    newDataset.addRow(['318','BCO BMG S.A.','Banco BMG S.A.']);
    newDataset.addRow(['320','BCO CCB BRASIL S.A.','China Construction Bank (Brasil) Banco Múltiplo S/A']);
    newDataset.addRow(['341','ITAÚ UNIBANCO BM S.A.','Itaú Unibanco S.A.']);
    newDataset.addRow(['366','BCO SOCIETE GENERALE BRASIL','Banco Société Générale Brasil S.A.']);
    newDataset.addRow(['370','BCO MIZUHO S.A.','Banco Mizuho do Brasil S.A.']);
    newDataset.addRow(['376','BCO J.P. MORGAN S.A.','Banco J. P. Morgan S. A.']);
    newDataset.addRow(['389','BCO MERCANTIL DO BRASIL S.A.','Banco Mercantil do Brasil S.A.']);
    newDataset.addRow(['394','BCO BRADESCO FINANC. S.A.','Banco Bradesco Financiamentos S.A.']);
    newDataset.addRow(['399','KIRTON BANK','Kirton Bank S.A. - Banco Múltiplo']);
    newDataset.addRow(['412','BCO CAPITAL S.A.','Banco Capital S. A.']);
    newDataset.addRow(['422','BCO SAFRA S.A.','Banco Safra S.A.']);
    newDataset.addRow(['456','BCO TOKYO-MITSUBISHI UFJ S.A.','Banco de Tokyo-Mitsubishi UFJ Brasil S.A.']);
    newDataset.addRow(['464','BCO SUMITOMO MITSUI BRASIL S.A.','Banco Sumitomo Mitsui Brasileiro S.A.']);
    newDataset.addRow(['473','BCO CAIXA GERAL BRASIL S.A.','Banco Caixa Geral - Brasil S.A.']);
    newDataset.addRow(['477','CITIBANK N.A.','Citibank N.A.']);
    newDataset.addRow(['479','BCO ITAUBANK S.A.','Banco ItauBank S.A.']);
    newDataset.addRow(['487','DEUTSCHE BANK S.A.BCO ALEMAO','Deutsche Bank S.A. - Banco Alemão']);
    newDataset.addRow(['488','JPMORGAN CHASE BANK','JPMorgan Chase Bank, National Association']);
    newDataset.addRow(['492','ING BANK N.V.','ING Bank N.V.']);
    newDataset.addRow(['494','BCO REP ORIENTAL URUGUAY BCE','Banco de La Republica Oriental del Uruguay']);
    newDataset.addRow(['495','BCO LA PROVINCIA B AIRES BCE','Banco de La Provincia de Buenos Aires']);
    newDataset.addRow(['505','BCO CREDIT SUISSE (BRL) S.A.','Banco Credit Suisse (Brasil) S.A.']);
    newDataset.addRow(['545','SENSO CCVM S.A.','Senso Corretora de Câmbio e Valores Mobiliários S.A.']);
    newDataset.addRow(['600','BCO LUSO BRASILEIRO S.A.','Banco Luso Brasileiro S.A.']);
    newDataset.addRow(['604','BCO INDUSTRIAL DO BRASIL S.A.','Banco Industrial do Brasil S.A.']);
    newDataset.addRow(['610','BCO VR S.A.','Banco VR S.A.']);
    newDataset.addRow(['611','BCO PAULISTA S.A.','Banco Paulista S.A.']);
    newDataset.addRow(['612','BCO GUANABARA S.A.','Banco Guanabara S.A.']);
    newDataset.addRow(['613','BCO PECUNIA S.A.','Banco Pecúnia S. A.']);
    newDataset.addRow(['623','BANCO PAN','Banco Pan S.A.']);
    newDataset.addRow(['626','BCO FICSA S.A.','Banco Ficsa S. A.']);
    newDataset.addRow(['630','BCO INTERCAP S.A.','Banco Intercap S.A.']);
    newDataset.addRow(['633','BCO RENDIMENTO S.A.','Banco Rendimento S.A.']);
    newDataset.addRow(['634','BCO TRIANGULO S.A.','Banco Triângulo S.A.']);
    newDataset.addRow(['637','BCO SOFISA S.A.','Banco Sofisa S. A.']);
    newDataset.addRow(['641','BCO ALVORADA S.A.','Banco Alvorada S.A.']);
    newDataset.addRow(['643','BCO PINE S.A.','Banco Pine S.A.']);
    newDataset.addRow(['652','ITAÚ UNIBANCO HOLDING BM S.A.','Itaú Unibanco Holding S.A.']);
    newDataset.addRow(['653','BCO INDUSVAL S.A.','Banco Indusval S. A.']);
    newDataset.addRow(['654','BCO A.J. RENNER S.A.','Banco A. J. Renner S.A.']);
    newDataset.addRow(['655','BCO VOTORANTIM S.A.','Banco Votorantim S.A.']);
    newDataset.addRow(['707','BCO DAYCOVAL S.A','Banco Daycoval S.A.']);
    newDataset.addRow(['712','BCO OURINVEST S.A.','Banco Ourinvest S.A.']);
    newDataset.addRow(['719','BANIF BRASIL BM S.A.','Banif - Bco Internacional do Funchal (Brasil) S.A.']);
    newDataset.addRow(['735','BANCO NEON S.A.','Banco Neon S.A.']);
    newDataset.addRow(['739','BCO CETELEM S.A.','Banco Cetelem S.A.']);
    newDataset.addRow(['741','BCO RIBEIRAO PRETO S.A.','Banco Ribeirão Preto S.A.']);
    newDataset.addRow(['743','BANCO SEMEAR','Banco Semear S.A.']);
    newDataset.addRow(['745','BCO CITIBANK S.A.','Banco Citibank S.A.']);
    newDataset.addRow(['746','BCO MODAL S.A.','Banco Modal S.A.']);
    newDataset.addRow(['747','BCO RABOBANK INTL BRASIL S.A.','Banco Rabobank International Brasil S.A.']);
    newDataset.addRow(['748','BCO COOPERATIVO SICREDI S.A.','Banco Cooperativo Sicredi S. A.']);
    newDataset.addRow(['751','SCOTIABANK BRASIL','Scotiabank Brasil S.A. Banco Múltiplo']);
    newDataset.addRow(['752','BCO BNP PARIBAS BRASIL S A','Banco BNP Paribas Brasil S.A.']);
    newDataset.addRow(['753','NOVO BCO CONTINENTAL S.A. - BM','Novo Banco Continental S.A. - Banco Múltiplo']);
    newDataset.addRow(['754','BANCO SISTEMA','Banco Sistema S.A.']);
    newDataset.addRow(['755','BOFA MERRILL LYNCH BM S.A.','Bank of America Merrill Lynch Banco Múltiplo S.A.']);
    newDataset.addRow(['756','BANCOOB','Banco Cooperativo do Brasil S/A - Bancoob']);
    newDataset.addRow(['757','BCO KEB HANA DO BRASIL S.A.','Banco Keb Hana do Brasil S. A.']);
	return newDataset;	
}