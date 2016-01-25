function displayFields(form,customHTML){ 
	/*
	customHTML.append("<script language='javascript'> \n");
	customHTML.append("		preencheTabela()");
	customHTML.append("</script> \n");
	*/
	form.setValue("dt_data",dateBase());
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