function validateForm(form) {

	if (form.getFormMode() == "ADD") {
		throw "Não é posivel gerar novas fichas desse formulário."
	}

}