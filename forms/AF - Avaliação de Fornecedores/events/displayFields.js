function displayFields(form, customHTML) {
	form.setShowDisabledFields(true);
	//form.setHidePrintLink(false);

	customHTML.append("<script>");
	customHTML.append("ativaPreencheCampos('" + form.getFormMode() + "','" +  getValue("WKNumState") + "','" +  getValue("WKNumProces") + "','" +  form.getDocumentId() + "');");
	customHTML.append("</script>");

}