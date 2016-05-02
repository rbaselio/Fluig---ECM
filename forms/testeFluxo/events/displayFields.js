function displayFields(form, customHTML) {
	form.setShowDisabledFields(true);
	form.setHidePrintLink(false);

	customHTML.append("<script>");
	customHTML.append("exibeCampos('" + form.getFormMode() + "'," + getValue("WKNumState") + ",'" + getValue("WKUser") + "','" + getValue("WKNumProces") + "');");
	customHTML.append("</script>");

}