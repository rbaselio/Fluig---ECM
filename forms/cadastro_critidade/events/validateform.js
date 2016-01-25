function validateForm(form){
	
	if ( form.getFormMode() == "ADD" ) {
		throw "Não é possivel criar nova ficha";
	}
	
	
}