function validateForm(form){
	loading.setMessage("Validando campos de formulário");
	
	//var token = DatasetFactory.getDataset('tokens', null, null, null).getValue(0, "tokenTOTVSDatasul");	
	
	var numState = getValue("WKNumState");	
	
	var message = ""; 	
	if (numState == 0 || numState == 1){
		if (form.getValue("cod_transp") == "") message += "<br/>- Cod. do transportador;";
		if (form.getValue("nome_transp") == "") message += "<br/>- Nome do transportador;";
		if (form.getValue("cnpj_transp") == "") message += "<br/>- CNPJ do transportador;";
		if (form.getValue("cpf_motorista") == "") message += "<br/>- CPF do motorista;";
		if (form.getValue("nome_motorista") == "") message += "<br/>- Nome do motoristado transportador;";
		if (form.getValue("tel_motorista") == "") message += "<br/>- Telefone de contato;";
		if (form.getValue("cnh_motorista") == "") message += "<br/>- CNH;";
		if (form.getValue("cnh_validade") == "") message += "<br/>- Validade da CNH;";
		if (form.getValue("cat_cnh") == "") message += "<br/>- Categoria CNH;";
		if (form.getValue("modNota") == "") message += "<br/>- Pagamento;";
		if (form.getValue("contratante") == "") message += "<br/>- Contratante;";
		if (form.getValue("placa_cavalo") == "") message += "<br/>- Placa do cavalo;";
		if (form.getValue("cid_cavalo") == "") message += "<br/>- Cidade do cavalo;";
		if (form.getValue("uf_cavalo") == "") message += "<br/>- Estado do cavalo;";
		if (form.getValue("estab") == "") message += "<br/>- Estabelecimento;";
		if (form.getValue("tipoVeiculo") == "") message += "<br/>- Tipo do veículo;";
		if (form.getValue("prop_veic") == "") message += "<br/>- Propriedade do veículo;";
		if (form.getValue("email_transp") == "") message += "<br/>- E-mail da transportadora;";
		if (form.getValue("unid_negocio") == "") message += "<br/>- Unidade de Negócio;";
		if (form.getValue("dt_chegada") == "") message += "<br/>- Data de Chegada;";
		if (!verifica_Hora(form.getValue("hora_chegada"))) message += "<br/>- Horario de Entrada;";
		if (form.getValue("dt_entrada") == "") message += "<br/>- Data de Entrada;";
		if (!verifica_Hora(form.getValue("hora_entrada"))) message += "<br/>- Horario de Entrada;";	
		
		var dt_chegada = form.getValue("dt_chegada").split("/");
		var hora_chegada = form.getValue("hora_chegada").split(":");		
		var dataChegada = new Date(dt_chegada[2], dt_chegada[1] - 1, dt_chegada[0], hora_chegada[0], hora_chegada[1], '00')
		if (isNaN(dataChegada.getTime()))  message += "<br/>- Data ou hora de chegada;"; 
		
		var dt_entrada = form.getValue("dt_entrada").split("/");
		var hora_entrada = form.getValue("hora_entrada").split(":");		
		var dataEntrada = new Date(dt_entrada[2], dt_entrada[1] - 1, dt_entrada[0], hora_entrada[0], hora_entrada[1], '00')
		if (isNaN(dataEntrada.getTime()))  message += "<br/>- Data ou hora de entrada;"; 
		
		if (dataEntrada < dataChegada) message += "<br/>- A data e hora de entrada não pode ser maior que a de chegada;";
		
		
		
		
	}
	
	if (numState == 2){
		if (form.getValue("cod_dest") == "") message += "<br/>- Cod. do Cliente;";
		if (form.getValue("nome_dest") == "") message += "<br/>- Nome do Cliente;";
		if (form.getValue("cidade_cli") == "") message += "<br/>- Cidade do Cliente;";
		if (form.getValue("pneus") == "") message += "<br/>- Estado dos Pneus;";
		if (form.getValue("i_assoalho") == "") message += "<br/>- Frestas no Assoalho;";
		if (form.getValue("i_assoalho_buraco") == "") message += "<br/>- Buracos no Assoalho;";
		if (form.getValue("i_assoalho_limpo") == "") message += "<br/>- Limpeza do Assoalho;";
		if (form.getValue("i_assoalho_molhado") == "") message += "<br/>- Umidade no Assoalho;";
		if (form.getValue("i_assoalho_tampas") == "") message += "<br/>- Tampas do Assoalho;";
		if (form.getValue("i_cobertura_imper") == "") message += "<br/>- Cobertura Impermeável;";
		if (form.getValue("i_cobertura_furo") == "") message += "<br/>- Furos na Cobertura;";
		if (form.getValue("i_cobertura_limpo") == "") message += "<br/>- Limpeza da Cobertura;";
		if (form.getValue("i_cobertura_molhado") == "") message += "<br/>- Umidade da cobertura;";
		if (form.getValue("i_corda") == "") message += "<br/>- Quantidade de corda;";
	}
	
	if (numState == 12){
		if (form.getValue("entrega") == "") message += "<br/>- Única entrega;";
		if (form.getValue("i_carregamento") == "") message += "<br/>- Local de carregamento;";
		if (form.getValue("i_clima") == "") message += "<br/>- Clima;";
		if (form.getValue("i_fechamento") == "") message += "<br/>- Fechamento da carga;";
		
		
	}
	
	if (numState == 9){
		if (form.getValue("nr_nf") == "") message += "<br/>- Nr. Nota Fiscal;";
		
		if (form.getValue("dt_saida") == "") message += "<br/>- Data de Entrada;";
		if (!verifica_Hora(form.getValue("hora_saida"))) message += "<br/>- Horario de Entrada;";	
		
		var dt_saida = form.getValue("dt_saida").split("/");
		var hora_saida = form.getValue("hora_saida").split(":");		
		var dataSaida = new Date(dt_saida[2], dt_saida[1] - 1, dt_saida[0], hora_saida[0], hora_saida[1], '00')
		if (isNaN(dataSaida.getTime()))  message += "<br/>- Data ou hora de chegada;"; 
		
		var dt_entrada = form.getValue("dt_entrada").split("/");
		var hora_entrada = form.getValue("hora_entrada").split(":");		
		var dataEntrada = new Date(dt_entrada[2], dt_entrada[1] - 1, dt_entrada[0], hora_entrada[0], hora_entrada[1], '00')
		if (isNaN(dataEntrada.getTime()))  message += "<br/>- Data ou hora de entrada;"; 
		
		if (dataEntrada > dataSaida) message += "<br/>- A data e hora de entrada não pode ser maior que a de chegada;";
	
	}
	
	if (message != "") throw "<br/><strong>Os campos abaixo são de preencimento obrigatório:</strong><br/>" + message;	
	
	function verifica_Hora(campo){
		hrs = campo.split(":")[0];
		min = campo.split(":")[1];
		if ((hrs >= 00 ) && (hrs <= 23) && ( min >= 00) &&  (min <= 59)) {
			return true;
		}
		return false;
	}
	
}