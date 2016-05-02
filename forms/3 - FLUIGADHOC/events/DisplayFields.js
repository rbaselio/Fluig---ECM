function displayFields(form, customHTML) {
	if (getValue("WKNumState") == null || getValue("WKNumState") == '') {
		customHTML.append("<script>");
		customHTML.append("document.getElementById('addActivityButton').style.display = 'none'");
		customHTML.append("</script>");
	}
}