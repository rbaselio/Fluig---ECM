function onNotify(subject, receivers, template, params) {

	if (template.match("TPLNEW_TASK") != null) {
		params.put("WDK_TaskComments", new String(hAPI.getCardValue("desc_chamado")).replace(new RegExp("\r?\n", "g"), "<br/>"));
	}

}