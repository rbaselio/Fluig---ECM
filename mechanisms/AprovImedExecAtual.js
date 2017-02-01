function resolve(process,colleague){
	
	var user = colleague.colleaguePK.colleagueId;
	var userList = new java.util.ArrayList();
	userList.add(null);
	
	var c1 = DatasetFactory.createConstraint("USER_CODE", user, user, ConstraintType.MUST);
    var constraints   = new Array(c1);
	var dataset = DatasetFactory.getDataset("aprovadores", null, constraints, null);
		
	for(var i = 0; i < dataset.rowsCount; i++) {
		userList.add(dataset.getValue(i, "DATA_VALUE"));
	}
	return userList;
}