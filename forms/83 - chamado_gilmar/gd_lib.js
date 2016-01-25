// FUNCOES GENERICAS P/ DESENVOLVIMENTO DE FORMULARIOS FLUIG

//FORMATA DATA
function mData2(v){
   v=v.replace(/\D/g,"");   
   v=v.replace(/(\d{2})(\d)/,"$1/$2");       
   v=v.replace(/(\d{2})(\d)/,"$1/$2");                                                    
   v=v.replace(/(\d{2})(\d{2})$/,"$1$2");	
   if (v.length == 8)
   {
       v1 = v.substring(0,6);
       v2 = v.substring(6);
       v= v1+"20"+v2;
   }
   if (v.length > 10)
   {
       v = v.substring(0,10);
   }
   return v;
}

//FORMATA VALOR 2 CADAS DECIMAIS
function mValor(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d)(\d{8})$/,"$1.$2");
    v=v.replace(/(\d)(\d{5})$/,"$1.$2");   			
    v=v.replace(/(\d)(\d{2})$/,"$1,$2");  
    return v;
}

//SOMENTE NUMERICOS
function mNumerico(v){
    v=v.replace(/[^0-9]+/g,'');
    return v;
}

//MASCARA DE DATA DD/MM/YYYY
function mData(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{2})(\d)/,"$1/$2");       
    v=v.replace(/(\d{2})(\d)/,"$1/$2");                                                  
    v=v.replace(/(\d{2})(\d{2})$/,"$1$2");
    return v;
}

//PERMITE SOMENTE NUMEROS INTEIROS
function mInt(v){
    v=v.replace(/[^0-9]+/g,'');
    v=v.replace(/(\d)(\d{9})$/,"$1.$2");
    v=v.replace(/(\d)(\d{6})$/,"$1.$2"); 
    v=v.replace(/(\d)(\d{3})$/,"$1.$2"); 
    return v;
}
//PERMITE SOMENTE CARECTERES
function mChar(v){
    v=v.replace(/[^a-z,A-z,à-ú,À-Ú]+/g,'');
    return v;
}
//PERMITE SOMENTE CARECTERES
function mAlfanum(v){
    v=v.replace(/[^a-z,A-z,0-9]+/g,'');
    return v;
}
//FORMATA CPF
function mCpf(v){
    v=v.replace(/\D/g,"");                    
    v=v.replace(/(\d{3})(\d)/,"$1.$2");      
    v=v.replace(/(\d{3})(\d)/,"$1.$2");       
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); 
    return v;
}
//FORMATA CEP
function mCep(v){
    v=v.replace(/D/g,"");                
    v=v.replace(/^(\d{5})(\d)/,"$1-$2"); 
    return v;
}
//FORMATA CNPJ
function mCnpj(v){
    v=v.replace(/\D/g,"");                   
    v=v.replace(/^(\d{2})(\d)/,"$1.$2");     
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"); 
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2");           
    v=v.replace(/(\d{4})(\d)/,"$1-$2");              
    return v;
}
//FAZ REPLACE DE TODAS AS OCORRENCIAS EM UMA STRING
function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
    }
    return string;
}
// RECEBE VALOR COMO CARACTER DE CAMPO (2,30) E RETORNA O VALOR COMO FLOAT(2.30).
function retornaFloat(string){
	string = replaceAll(string, ".", "");
	string = replaceAll(string, ",", ".");
	return parseFloat(string)
}
//RECEBE VALOR COMO FLOAR (2.30) E RETORNA O VALOR COMO CARACTER DE CAMPO(2,30).
function retornaString(float){
	float = float.toFixed(2).toString();
	float = replaceAll(float, ".", ",");
	float = mValor(float);
	return float	
}
// RETRONA DATA DO DIA
function dateBase()
{
    var now = new Date();
    var year = "" + now.getFullYear();
    var month = "" + (now.getMonth() + 1); //Deve somar um no mes pois a funcao getMonth retorna valores entre 0 e 11 
    var day = "" + now.getDate();
    
    return FormattedDateTime(day) +"/" + FormattedDateTime(month) +"/"+ year;
}
// AJUSTA O FORMATO DA DATA QUANDO A MESMA NAO POSSUI 2 CARACTERES
function FormattedDateTime(dateTime)
{
    if (dateTime.length == 1) 
    {
                   dateTime = "0" + dateTime; 
    }
    return dateTime;
}
//RETRONA HORA
function hourBase()
{
    var now = new Date();
    var hour = "" + now.getHours();
    var minute = "" + now.getMinutes(); 
    
    return FormattedDateTime(hour) +":" + FormattedDateTime(minute);
}
$(document).ready(function(){
    /////Validacao Caracter class='mNumerico' /////
   $(document).on('keyup', '.mNumerico',function(){
          var valor = mNumerico($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mNumerico',function(){
          var valor = mNumerico($(this).val());
          $(this).val(valor);
    });

    
   /////Validacao Caracter class='mChar' /////
   $(document).on('keyup', '.mChar',function(){
          var valor = mChar($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mChar',function(){
          var valor = mChar($(this).val());
          $(this).val(valor);
    });
    
   /////Validacao Caracter class='mAlfanum' /////
   $(document).on('keyup', '.mAlfanum',function(){
          var valor = mAlfanum($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mAlfanum',function(){
          var valor = mAlfanum($(this).val());
          $(this).val(valor);
    });

   /////Validacao Inteiro class='mInt' /////
   $(document).on('keyup', '.mInt',function(){
          var valor = mInt($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mInt',function(){    
          var valor2 = 0;
          var valor  = $(this).val();
          valor  = replaceAll(valor,'.','');
          valor2 = parseInt(valor);
          valor  = mInt(valor2.toString());
          $(this).val(valor);
    });
   /////Validacao Valor class='mValor' ///// 
   $(document).on('keyup', '.mValor',function(){
          var valor = mValor($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mValor',function(){
          var valor = mValor($(this).val());
          $(this).val(valor);
    });
   /////Validacao Data class='mData' ///// 
   $(document).on('keyup', '.mData',function(){
          var valor = mData($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mData',function(){
          var valor = mData2($(this).val());
          $(this).val(valor);
   });
   /////Validacao CEP class='mCep' ///// 
   $(document).on('keyup', '.mCep',function(){
          var valor = mCep($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mCep',function(){
          var valor = mCep($(this).val());
          $(this).val(valor);
   });
   /////Validacao CPF class='mCpf' ///// 
   $(document).on('keyup', '.mCpf',function(){
          var valor = mCpf($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mCpf',function(){
          var valor = mCpf($(this).val());
          $(this).val(valor);
   });
   /////Validacao CNPJ class='mCnpj' ///// 
   $(document).on('keyup', '.mCnpj',function(){
          var valor = mCnpj($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mCnpj',function(){
          var valor = mCnpj($(this).val());
          $(this).val(valor);
   }); 
});