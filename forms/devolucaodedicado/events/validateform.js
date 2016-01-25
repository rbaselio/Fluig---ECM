	function validateForm(form){
   var numAtividade = getValue("WKNumState"); 

 if(form.getValue('motivos')=='1'){
      throw "O campo [MOTIVO] não foi selecionado, campo obrigatório"; 
   }  
     if(form.getValue('ger_motivos')==''){
      throw "Descrever o Motivo e Obrigatorio, campo obrigatório"; 
   }  
 if(form.getValue('inicio_cliente')==''){
      throw "O campo [CLIENTE] não foi preenchido, campo obrigatório"; 
   }  
if(numAtividade == 2){
       
        if(form.getValue('dir_aprova')!='2' &&  form.getValue('dir_aprova')!='1'){
       throw "Não foi Selecionado [SIM ou NÃO], campo obrigatório"; 
   }     
     
       if(form.getValue('dir_aprova')=='2' &&  form.getValue('dir_jutificativa')==''){
       throw "Foi Selecionado a Opção [NÃO],Por favor Justificar, campo obrigatório"; 
   } 
} 
if(numAtividade == 4){
    if(form.getValue('ger_motivos2')==''){
      throw "Descrever as [INSTRUÇÕES] e Obrigatorio, campo obrigatório"; 
   } 
       
        if(form.getValue('ger_venda2')!='2' &&  form.getValue('ger_venda2')!='1'){
       throw "Não foi Selecionado [FATURAMENTO ou TROCA], campo obrigatório"; 
  }
}
if(numAtividade == 6){
    if(form.getValue('comer_pedido')==''){
      throw "Informar o [NÚMERO DO PEDIDO], campo obrigatório"; 
   } 
    if(form.getValue('comer_cliente')==''){
      throw "Informar o [NOME DO CLIENTE], campo obrigatório"; 
   } 
    if(form.getValue('comer_cliente')==''){
      throw "Informar o [NOME DO CLIENTE], campo obrigatório"; 
   } 
    if(form.getValue('comer_data')==''){
      throw "Informar o [DATA DE ENTREGA], campo obrigatório"; 
   }
    if(form.getValue('comer_valor')==''){
      throw "Informar o [VALOR DO PEDIDO], campo obrigatório"; 
   }
   if(form.getValue('comer_telefone')==''){
      throw "Informar o [NÚMERO DO TELEFONE], campo obrigatório"; 
   }

   if(form.getValue('comer_operacao')==''){
      throw "Informar o [NÚMERO Da NATUREZA DA OPRAÇÃO], campo obrigatório"; 
   }
   if(form.getValue('troca_jutificativa')==''){
      throw "Informar o [MOTIVO DA TROCA], campo obrigatório"; 
   }
}

if(numAtividade == 7){
    if(form.getValue('comer_pedido2')==''){
      throw "Informar o [NÚMERO DO PEDIDO], campo obrigatório"; 
   } 
    if(form.getValue('comer_cliente2')==''){
      throw "Informar o [NOME DO CLIENTE], campo obrigatório"; 
   } 
    if(form.getValue('comer_cliente2')==''){
      throw "Informar o [NOME DO CLIENTE], campo obrigatório"; 
   } 
    if(form.getValue('datepicker2')==''){
      throw "Informar o [DATA DE ENTREGA], campo obrigatório"; 
   }
    if(form.getValue('comer_valor2')==''){
      throw "Informar o [VALOR DO PEDIDO], campo obrigatório"; 
   }
   if(form.getValue('comer_telefone2')==''){
      throw "Informar o [NÚMERO DO TELEFONE], campo obrigatório"; 
   }

   if(form.getValue('comer_operacao2')==''){
      throw "Informar o [NÚMERO Da NATUREZA DA OPRAÇÃO], campo obrigatório"; 
   }
   if(form.getValue('fatu_jutificativa')==''){
      throw "Informar o [MOTIVO], campo obrigatório"; 
   }
}
if(numAtividade == 8){

    if(form.getValue('contato')==''){
      throw "Informar o [CONTATO], campo obrigatório"; 
   } 
    if(form.getValue('datepicker3')==''){
      throw "Informar o [DATA AGENDAMENTO], campo obrigatório"; 
   }
    if(form.getValue('hora')==''){
      throw "Informar a [HORA], campo obrigatório"; 
   }
    if(form.getValue('transp_jutificativa')==''){
      throw "Informar a [OBSERVAÇÔES], campo obrigatório"; 
   }
}
if(numAtividade == 9){
    if(form.getValue('recebe_radio')=='2' &&  form.getValue('recebe_jutificativa3')==''){
      throw "Informar as [JUSTIFICAVAS], campo obrigatório"; 
   } 

   if(form.getValue('recebe_jutificativa')==''){
      throw "Informar o [RESUMO DAS NCs], campo obrigatório"; 
   }
    if(form.getValue('recebe_radio2')!='1' && form.getValue('recebe_radio2')!='2'){
      throw "Não foi Selecionado [TOTAL NCs , SIM ou NÃO], campo obrigatório"; 
   } 
    if(form.getValue('recebe_radio2')=='1' &&  form.getValue('recebe_jutificativa2')==''){
      throw "Informar as [JUSTIFICAVAS], campo obrigatório"; 
   } 
}
if(numAtividade == 10){
    if(form.getValue('fiscal_radio')!='1' &&  form.getValue('fiscal_radio')!='2' &&  form.getValue('fiscal_radio')!='3'){
     throw "Não foi Selecionado [CORRIGIDO , SIM , NÃO, REJITADO], campo obrigatório"; 
   } 


}
if(numAtividade == 12){
    if(form.getValue('nf_radio')!='1' &&  form.getValue('nf_radio')!='2'){
      throw "Não foi Selecionado [DIVERGENCIA DE QUANTIDADE , SIM ou NÃO], campo obrigatório"; 
   } 
}
if(numAtividade == 15){
   if(form.getValue('log_jutificativa')==''){
      throw "Informar as [JUSTIFICATIVAS], campo obrigatório"; 
   }
}
 
if(numAtividade == 16){
       
        if(form.getValue('ger_radio')!='2' &&  form.getValue('ger_radio')!='1'){
       throw "Não foi Selecionado [HAVERÁ DÉBITO, SIM ou NÃO], campo obrigatório"; 
   }  
   if(form.getValue('ger_jutificativa')==''){
      throw "Informar as [JUSTIFICATIVAS], campo obrigatório"; 
   }  
}
 
if(numAtividade == 19){
       
   if(form.getValue('transp2_jutificativa')==''){
      throw "Informar os [VALORES E SEREM COBRADOS], campo obrigatório"; 
   }  
}
if(numAtividade == 20){
       
   if(form.getValue('fince_jutificativa')==''){
      throw "COBRA AS DESPESAS ESTÁ VAZIO, campo obrigatório"; 
   }  
}
}