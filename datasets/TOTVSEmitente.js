function createDataset(fields, constraints, sortFields) {
		
       var newDataset = DatasetBuilder.newDataset();
       
       var minhaQuery = "select \"cod-emitente\",\"nome-emit\",cep,endereco,bairro,cidade,estado,cgc,\"ins-estadual\",\"natureza\",\"nat-operacao\" FROM \"PUB\".\"emitente\" where \"cod-emitente\" = " + constraints[0].initialValue;
       
       log.warn("QUERY: " + minhaQuery);
       log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 01");
       var dataSource = "/jdbc/ProgressMGCAD";
       var ic = new javax.naming.InitialContext();
       log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 02");
       log.warn("ic: " + ic);
       var ds = ic.lookup(dataSource);
       log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 03");
       log.warn("ds: " + ds);
       var created = false;
       log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>> PASSO 04");
       
       try {
    	   var conn = ds.getConnection();
           log.warn("conn: " + conn);
           var stmt = conn.createStatement();
           log.warn("stmt: " + stmt);
           var rs = stmt.executeQuery(minhaQuery);
           log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 05");           
           
           var columnCount = rs.getMetaData().getColumnCount();       
            
            
             while (rs.next()) {           	 
            	            	 
                    if (!created) {
                    	
                           for (var i = 1; i <= columnCount; i++) {
                                  newDataset.addColumn(rs.getMetaData().getColumnName(i));
                                  log.warn(rs.getMetaData().getColumnName(i));
                           }
                           created = true;
                    }
                    var Arr = new Array();
                    for (var i = 1; i <= columnCount; i++) {
                           var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                           if (null != obj) {
                                  Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                                  log.warn(rs.getObject(rs.getMetaData().getColumnName(i)).toString());
                           } else {
                                  Arr[i - 1] = "null";
                           }
                    }
                    newDataset.addRow(Arr);
             }
       } catch (e) {
             log.error("DATASET_SQL_ERRO==============> " + e.message);
       } finally {
             if (stmt != null)
                    stmt.close();
             if (conn != null)
                    conn.close();
       }
       
      /*
 
       if (constraints != null) {
             for (var i = 0; i < constraints.length; i++) { 
                    newDataset = newDataset.getSubDataset(constraints[i].fieldName, constraints[i].initialValue);
 
             }
       }
 
 */
       return newDataset;
 
}