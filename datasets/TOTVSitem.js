function createDataset(fields, constraints, sortFields) {

	var cod_item = '01083050 ';
	var estab = '1';

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == 'cod_item')
				cod_item = constraints[i].initialValue;
			if (constraints[i].fieldName == 'estab')
				estab = constraints[i].initialValue;
		}
	}

	var newDataset = DatasetBuilder.newDataset();

	var QueryPrincipal = 'select "it-codigo", "desc-item", "cod-destaq" as NCM, "aliquota-ipi" from PUB.ITEM where "it-codigo" = \''
			+ cod_item + '\'';

	var QuerySUB = 'select "it-codigo", "item-estab"."val-unit-mat-m", "item-estab"."val-unit-mob-m", "item-estab"."val-unit-ggf-m" from PUB."item-estab" where "cod-estabel" = '
			+ estab + ' and "it-codigo" = \'' + cod_item + '\'';

	log.warn("QUERY: " + QueryPrincipal);
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 01");
	var dataSourceMGCAD = "/jdbc/ProgressMGCAD";
	var dataSourceMGMOV = "/jdbc/ProgressMGMOV";

	var ic = new javax.naming.InitialContext();
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 02");
	log.warn("ic: " + ic);
	var dsMGCAD = ic.lookup(dataSourceMGCAD);
	var dsMGMOV = ic.lookup(dataSourceMGMOV);
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 03");
	log.warn("dsMGCAD: " + dsMGCAD);
	log.warn("dsMGMOV: " + dsMGMOV);
	var created = false;
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>> PASSO 04");

	try {
		var conn = dsMGCAD.getConnection();
		log.warn("conn: " + conn);
		var stmt = conn.createStatement();
		log.warn("stmt: " + stmt);
		var rs = stmt.executeQuery(QueryPrincipal);
		log.warn(">>>>>>>>>>>>>>>>>>>>>>>>PASSO 05");

		var connMGMOV = dsMGMOV.getConnection();
		log.warn("conn: " + connMGMOV);
		var stmtMGMOV = connMGMOV.createStatement();

		var columnCount = rs.getMetaData().getColumnCount();

		while (rs.next()) {
			var Arr = new Array();
			if (!created) {
				for (var i = 1; i <= columnCount; i++) {
					newDataset.addColumn(rs.getMetaData().getColumnName(i));
					log.warn(rs.getMetaData().getColumnName(i));
				}
				newDataset.addColumn("val-unit-mat-m");
				newDataset.addColumn("val-unit-mob-m");
				newDataset.addColumn("val-unit-ggf-m");
				created = true;
			}

			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if (null != obj) {
					Arr[i - 1] = rs
							.getObject(rs.getMetaData().getColumnName(i))
							.toString();
					log.warn(rs.getObject(rs.getMetaData().getColumnName(i))
							.toString());
				} else {
					Arr[i - 1] = "null";
				}
			}

			log.warn("stmtMGMOV: " + stmtMGMOV);
			var rsMGMOV = stmtMGMOV.executeQuery(QuerySUB);
			if (rsMGMOV.getMetaData().getColumnCount() > 0) {
				rsMGMOV.next();
				Arr[columnCount] = rsMGMOV.getObject("val-unit-mat-m")
						.toString().split(';')[0];
				Arr[columnCount + 1] = rsMGMOV.getObject("val-unit-mob-m")
						.toString().split(';')[0];
				Arr[columnCount + 2] = rsMGMOV.getObject("val-unit-ggf-m")
						.toString().split(';')[0];

				log.warn(rsMGMOV.getObject("val-unit-mat-m").toString().split(
						';')[0]);
				log.warn("connMGMOV: " + connMGMOV);

			}
			newDataset.addRow(Arr);
		}
	} catch (e) {
		log.error("DATASET_SQL_ERRO==============> " + e.message);
	} finally {
		if (stmt != null) {
			stmt.close();
			stmtMGMOV.close();
		}
		if (conn != null) {
			conn.close();
			connMGMOV.close();
		}

	}

	return newDataset;

}