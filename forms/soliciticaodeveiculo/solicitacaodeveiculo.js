 function zoomVeiculo() {

    window.open("/webdesk/zoom.jsp?" +
      "datasetId=placa_veiculos" +
      "&dataFields=Placa,Placa,Veiculo,Veiculo" +
      "&resultFields=Placa,Veiculo,Motorista" +
      "&type=veiculo", 
      "zoom", "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");

}
 
 

 
 
 
 function setSelectedZoomItem(selectedItem) {
	 alert("");
	    /*if (selectedItem['type'] == "veiculo") {
	        $("#res_placa").val(selectedItem['Placa']);
	        $("#desc_veiculo").val(selectedItem['Veiculo']);
	        $("#desc_usuario").val(selectedItem['Motorista']);
	    }*/
	} 