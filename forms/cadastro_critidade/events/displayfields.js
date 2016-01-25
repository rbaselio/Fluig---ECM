function displayFields(form,customHTML){ 
	
	
if ( form.getFormMode() == "MOD" ) {
		
		//usuario corrente
		var filter = new java.util.HashMap();
		filter.put("colleaguePK.colleagueId",getValue("WKUser"));
		var colaborador = getDatasetValues('colleague',filter).get(0).get("colleagueName");
		
		//data atual
		var dtNow = new java.util.Date();
		var sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
		var today = sdf.format(dtNow);
		
		
	     form.setValue('usuario', colaborador);
	     form.setValue('textbox', today);
	   }
	
	
	
}