function resolve(process,colleague){
	
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>USUARIO");
	
	
	var user = hAPI.getCardValue("matricula_user");
	/*var user = 4599;*/
	log.warn(user);
	var userList = new java.util.ArrayList();
	userList.add(null);
	
	var c1 = DatasetFactory.createConstraint("USER_CODE", user, user, ConstraintType.MUST);
    var constraints   = new Array(c1);
	var dataset = DatasetFactory.getDataset("aprovadores", null, constraints, null);
		
	for(var i = 0; i < dataset.rowsCount; i++) {
		log.warn(dataset.getValue(i, "DATA_VALUE"));
		userList.add(dataset.getValue(i, "DATA_VALUE"));
	}
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>USUARIO");
	return userList;
}