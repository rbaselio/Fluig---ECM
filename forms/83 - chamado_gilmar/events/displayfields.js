function displayFields(form,customHTML){ 
	
	var state =  getValue("WKNumState");
	var complete   = getValue("WKCompletTask");
	var user = getValue("WKUser");
	
	customHTML.append("<script>");
	customHTML.append("mode = '"+ form.getFormMode()+"';");
	customHTML.append("state = "+ state + ";");
	customHTML.append("complete = "+ complete + ";");
	customHTML.append("user = '"+ user + "';");
	customHTML.append(" exibeCampos(mode, state, user , complete);");
	customHTML.append("</script>");	
}
