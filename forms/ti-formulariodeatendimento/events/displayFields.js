function displayFields(form, customHTML) {
	form.setShowDisabledFields(true);
	form.setHideDeleteButton(true);	

	customHTML.append("<script>");
	customHTML.append("ativaPreencheCampos('" + form.getFormMode() + "','" +  getValue("WKNumState") + "','" + getValue("WKUser") + "','" +  getValue("WKNumProces") + "','" +  form.getDocumentId() + "');");
	customHTML.append("</script>");
}