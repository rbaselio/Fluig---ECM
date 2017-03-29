function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	var atividade = getValue('WKCurrentState');
	
	if ((atividade == 0 || atividade == 1) && nextSequenceId == 4) {
		var constraintWorkflowColleagueRole1 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', 'CoordManut', 'CoordManut', ConstraintType.MUST);
		var constraintWorkflowColleagueRole2 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', colleagueId, colleagueId, ConstraintType.MUST);
		var datasetWorkflowColleagueRole = DatasetFactory.getDataset('workflowColleagueRole', null, new Array(constraintWorkflowColleagueRole1, constraintWorkflowColleagueRole2), null);
		if (datasetWorkflowColleagueRole.rowsCount == 0)  throw "<br/>Este usuario não pode enviar atividades para avaliação" +
																"<br/>Selecione a opção Definição do Responsável!";
	}	
	
	
}