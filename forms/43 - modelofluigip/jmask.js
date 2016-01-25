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
function mValor(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d)(\d{9})$/,"$1.$2");
    v=v.replace(/(\d)(\d{6})$/,"$1.$2");   			
    v=v.replace(/(\d)(\d{3})$/,"$1,$2");  
    return v;
}
function mNumerico(v){
    v=v.replace(/[^0-9]+/g,'');
    return v;
}
function mNCM(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d)(\d{8})$/,"$1.$2");
    v=v.replace(/(\d)(\d{4})$/,"$1.$2"); 
    v=v.replace(/(\d)(\d{2})$/,"$1.$2");  
    return v;
}
function mCentro(v){
     v=v.replace(/[^0-9]+/g,'');
    return v;  
}
function mData(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/(\d{2})(\d)/,"$1.$2");       
    v=v.replace(/(\d{2})(\d)/,"$1.$2");                                                  
    v=v.replace(/(\d{2})(\d{2})$/,"$1$2");
    return v;
}
function mInt(v){
    v=v.replace(/[^0-9]+/g,'');
    v=v.replace(/(\d)(\d{9})$/,"$1.$2");
    v=v.replace(/(\d)(\d{6})$/,"$1.$2"); 
    v=v.replace(/(\d)(\d{3})$/,"$1.$2"); 
    return v;
}
function mChar(v){
    v=v.replace(/[^a-z,A-z,à-ú,À-Ú]+/g,'');
    return v;
}
function mAlfanum(v){
    v=v.replace(/[^a-z,A-z,0-9]+/g,'');
    return v;
}
function mMatForn(v){
    v=v.replace(/[^a-z,A-z,0-9,-]+/g,'');
    return v;
}

function mEstado(v){
    v= v.replace(/[^A-z]+/g,'').toUpperCase();
    return v;
}
function mNome(v){
    v=v.replace(/[^a-z,A-z, ]+/g,'');
    return v;
}
function mCpf(v){
    v=v.replace(/\D/g,"");                    
    v=v.replace(/(\d{3})(\d)/,"$1.$2");      
    v=v.replace(/(\d{3})(\d)/,"$1.$2");       
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); 
    return v;
}
function mCep(v){
    v=v.replace(/D/g,"");                
    v=v.replace(/^(\d{5})(\d)/,"$1-$2"); 
    return v;
}
function mCnpj(v){
    v=v.replace(/\D/g,"");                   
    v=v.replace(/^(\d{2})(\d)/,"$1.$2");     
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"); 
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2");           
    v=v.replace(/(\d{4})(\d)/,"$1-$2");              
    return v;
}

function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
    }
    return string;
}
$(document).ready(function(){
    
    ///// Validações Caracter class='mNumerico' /////
   $(document).on('keyup', '.mNumerico',function(){
          var valor = mNumerico($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mNumerico',function(){
          var valor = mNumerico($(this).val());
          $(this).val(valor);
    });
        ///// Validações Caracter class='mCentro' /////
   $(document).on('keyup', '.mCentro',function(){
          var valor = mCentro($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mCentro',function(){
        var valor = mCentro($(this).val());
        if (valor.length == 10){
          $(this).val(valor);
        }else{
          $(this).val("");
        }
    });
    ///// Validações Caracter class='mNCM' /////
    $(document).on('keyup', '.mNCM',function(){
          var valor = mNCM($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mNCM',function(){
        var valor = mNCM($(this).val());
        if (valor.length == 10){
          $(this).val(valor);
        }else{
          $(this).val("");
        }
    });
    
   ///// Validações Caracter class='mChar' /////
   $(document).on('keyup', '.mChar',function(){
          var valor = mChar($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mChar',function(){
          var valor = mChar($(this).val());
          $(this).val(valor);
    });
    
   ///// Validações Caracter class='mAlfanum' /////
   $(document).on('keyup', '.mAlfanum',function(){
          var valor = mAlfanum($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mAlfanum',function(){
          var valor = mAlfanum($(this).val());
          $(this).val(valor);
    });
   ///// Validações Caracter class='mMatForn' /////
   $(document).on('keyup', '.mMatForn',function(){
          var valor = mMatForn($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mMatForn',function(){
          var valor = mMatForn($(this).val());
          $(this).val(valor);
    });
       ///// Validações Caracter class='mChar' /////
   $(document).on('keyup', '.mEstado',function(){
          var valor = mEstado($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mEstado',function(){
          var valor = mEstado($(this).val());
          $(this).val(valor);
    });
   ///// Validações Caracter class='mChar' /////
   $(document).on('keyup', '.mNome',function(){
          var valor = mNome($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mNome',function(){
          var valor = mNome($(this).val());
          $(this).val(valor);
    });
   ///// Validações Inteiro class='mInt' /////
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
   ///// Validações Valor class='mValor' ///// 
   $(document).on('keyup', '.mValor',function(){
          var valor = mValor($(this).val());
          $(this).val(valor);
    });
   $(document).on('blur', '.mValor',function(){
          var valor = mValor($(this).val());
          $(this).val(valor);
    });
   ///// Validações Data class='mData' ///// 
   $(document).on('keyup', '.mData',function(){
          var valor = mData($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mData',function(){
          var valor = mData2($(this).val());
          $(this).val(valor);
   });
   ///// Validações CEP class='mCep' ///// 
   $(document).on('keyup', '.mCep',function(){
          var valor = mCep($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mCep',function(){
          var valor = mCep($(this).val());
          $(this).val(valor);
   });
   ///// Validações CPF class='mCpf' ///// 
   $(document).on('keyup', '.mCpf',function(){
          var valor = mCpf($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mCpf',function(){
          var valor = mCpf($(this).val());
          $(this).val(valor);
   });
   ///// Validações CNPJ class='mCnpj' ///// 
   $(document).on('keyup', '.mCnpj',function(){
          var valor = mCnpj($(this).val());
          $(this).val(valor);
   });
   $(document).on('blur', '.mCnpj',function(){
          var valor = mCnpj($(this).val());
          $(this).val(valor);
   }); 
});