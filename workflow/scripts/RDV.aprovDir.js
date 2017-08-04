function aprovDir(){
	
	var limite = 1500;
	
	var vl_adiant = parseFloat(hAPI.getCardValue("vl_prestacao").replace(".","").replace(",","."));
	if (isNaN(vl_adiant)) vl_adiant = 0;
	var tot_desp = parseFloat(hAPI.getCardValue("vl_tot_geral").replace(".","").replace(",","."));
	if (isNaN(tot_desp)) tot_desp = 0;
	
	if (vl_adiant >= limite || tot_desp >= limite) return "1";
	
	hAPI.setCardValue("desc_aprov_dir_fin", "Aprovação não necessária para movimentações no referido valor");
	return "0"
	
}