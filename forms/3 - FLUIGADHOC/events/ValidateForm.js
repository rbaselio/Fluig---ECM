function validateForm(form) {
	if (form.getValue('meeting') == null || form.getValue('meeting').trim().length() == 0) {
		throw "O assunto da lista de tarefas deve ser informado";
	}

	var indexes = form.getChildrenIndexes("tbatividades");
	var taskData = form.getChildrenFromTable("tbatividades");

	for ( var index = 0; index < indexes.length; index++) {
		if (taskData.get('nomeativ___' + indexes[index]) == null
			|| taskData.get('nomeativ___' + indexes[index]).trim().length() == 0) {
			throw "A ação deve ser informada";
		}
		if (taskData.get("hdnrespativ___" + indexes[index]) == null
			|| taskData.get('hdnrespativ___' + indexes[index]).trim().length() == 0) {
			throw "O responsável pela ação deve ser informado";
		}
	}

}