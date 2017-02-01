function resolve(process,colleague){
	
	var user = colleague.colleaguePK.colleagueId;
	var userList = new java.util.ArrayList();
	userList.add(null);
	
	var processc1 = DatasetFactory.createConstraint("workflowProcessPK.companyId", process.workflowProcessPK.companyId, process.workflowProcessPK.companyId, ConstraintType.MUST);
	var processc2 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", process.workflowProcessPK.processInstanceId, process.workflowProcessPK.processInstanceId, ConstraintType.MUST);
    var processConstraints   = new Array(processc1, processc2);
	var processDataset = DatasetFactory.getDataset("workflowProcess", null, processConstraints, null);
	for(var i = 0; i < processDataset.rowsCount; i++) {
		/*//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>processo");
		//log.warn(process.workflowProcessPK.companyId);
		//log.warn(process.workflowProcessPK.processInstanceId);
		//log.warn(processDataset.getValue(i, "requesterId"));
		//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>processo");*/
		user = processDataset.getValue(i, "requesterId");
	}		
	
	
	/*//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>USUARIO");
	//log.warn(user);
	//log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>USUARIO");*/	
	
	var c1 = DatasetFactory.createConstraint("USER_CODE", user, user, ConstraintType.MUST);
    var constraints   = new Array(c1);
	var dataset = DatasetFactory.getDataset("aprovadores", null, constraints, null);
		
	for(var i = 0; i < dataset.rowsCount; i++) {
		userList.add(dataset.getValue(i, "DATA_VALUE"));
	}
	return userList;
}