function displayFields(form, customHTML) {
	form.setShowDisabledFields(true);
	

	customHTML.append("<script>");
	customHTML.append("ativaPreencheCampos('" + form.getFormMode() + "','" +  getValue("WKNumState") + "','" + getValue("WKUser") + "','" +  getValue("WKNumProces") + "');");
	customHTML.append("</script>");

}