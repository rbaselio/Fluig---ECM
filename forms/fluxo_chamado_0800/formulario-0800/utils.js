 //$('#tb_interacao td:nth-child(1), th:nth-child(1)').hide();  comando para apagar esconder coluna de tabela

	function getData() {
		var d = new Date();

		return d.getFullYear() + '-' + //ano
				((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + // Mês
				((d.getDate()) < 10 ? '0' : '') + (d.getDate()); // dia
	}
	
	function zoomECM(dataset, colunasExibir, colunasRetorno, titulo) {
		window.open("/webdesk/zoom.jsp?"+
								"datasetId="+ dataset +
								"&dataFields=" + colunasExibir +
								"&resultFields=" +  colunasRetorno +
								"&type=" +  dataset + 
								"&title=" + titulo,
							"zoom",
							"status , scrollbars=no ,width=600, height=350 , top=0 , left=0");
	}