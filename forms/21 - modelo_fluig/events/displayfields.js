function displayFields(form,customHTML){
	
	
	
	var state    = getValue("WKNumState");
	customHTML.append("<script language='javascript'> \n");;
	customHTML.append("	 $('.obgAcomp select option:not(:selected)').attr('disabled', true); \n");
	if (state == 4 || form.getFormMode() == "ADD")
	{
		preencheDadosSolicitante(form,customHTML);
		customHTML.append("		$('.obgGest select option:not(:selected)').attr('disabled', true); \n");
    } 
	customHTML.append("</script> \n");
}

function preencheDadosSolicitante(form,customHTML)
{
	var user = getValue("WKUser");
	var b1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",user , user, ConstraintType.MUST);
    var constraints = new Array(b1); 
    var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
    if (dataset.rowsCount > 0)
    {
    	form.setValue("nm_solic",user);
      	form.setValue("nm_nome",dataset.getValue(0, "colleagueName"));
    }
    form.setValue("dt_solic",dateBase());
    form.setValue("nm_hora",hourBase());
    
}

function dateBase()
{
    var now = new Date();
    var year = "" + now.getFullYear();
    var month = "" + (now.getMonth() + 1); //Deve somar um no mês pois a função getMonth retorna valores entre 0 e 11 
    var day = "" + now.getDate();
    
    return FormattedDateTime(day) +"/" + FormattedDateTime(month) +"/"+ year;
}

function hourBase()
{
    var now = new Date();
    var hour = "" + now.getHours();
    var minute = "" + now.getMinutes(); 
    
    return FormattedDateTime(hour) +":" + FormattedDateTime(minute);
}

function FormattedDateTime(dateTime)
{
    if (dateTime.length == 1) 
    {
                   dateTime = "0" + dateTime; 
    }
    return dateTime;
}
