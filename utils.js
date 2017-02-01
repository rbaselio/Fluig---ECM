// FUNCOES GENERICAS P/ DESENVOLVIMENTO DE FORMULARIOS FLUIG

/******************************************************************************************/
/**************************************CALCULO COM DATAS***********************************/
/******************************************************************************************/
 
/*CALCULO COM DATAS*/
var dataAtual = new Date();

//obter data atual no formato dd/mm/aaaa
var getData = function() { return ("0" + dataAtual.getDate()).substr(-2) + "/" + ("0" + (dataAtual.getMonth() + 1)).substr(-2) + "/" + dataAtual.getFullYear();}

//obter hora atual no formato hh:mm
var getHora = function() { return ("0" + dataAtual.getHours()).substr(-2) + ":" + ("0" + (dataAtual.getMinutes())).substr(-2); }

//calcular a data da pascoa de um ano
var pascoa = function ( a ){
	c = parseInt (a/100);
	n = parseInt (a - 19* parseInt (a/19));
	k = parseInt ((c - 17)/25);
	i = parseInt (c - parseInt (c/4) - parseInt ((c-k)/3) +19*n + 15);
	i = parseInt (i - 30* parseInt (i/30));
	i = parseInt (i - parseInt (i/28)*(1-parseInt (1/28)*parseInt (29/(i+1))*parseInt ((21-n)/11)));
	j = parseInt (a + parseInt (a/4) + i + 2 -c + parseInt (c/4));
	j = parseInt (j - 7*parseInt (j/7));
	l = parseInt (i - j);
	m = parseInt (3 + parseInt ((l+40)/44));
	d = parseInt (l + 28 - 31*parseInt (m/4));
	return new Date (a, m - 1, d);
}

//calcular o dia de corpus crist
var corpusCrist = function(year){ return new Date(pascoa(year).getTime() + (60 * 24 * 60 * 60 * 1000));}

//calcular a sexta feira santa
var paixao = function(year){ return new Date(pascoa(year).getTime() - (2 * 24 * 60 * 60 * 1000));}

var diasFeriados = new Array (	'01/01',  // Ano Novo
								'08/04',  // Padroeira de Amparo
								'21/04',  // Tiradentes  
								'01/05',  // Trabalho  
								'09/07',  // Revolução 1932  
								'07/09',  // Patria  
								'08/09',  // Aniversario Amparo
								'12/10',  // Nossa Senhora
								'02/11',  // Finados
								'15/11',  // Proclamação da Republica
								'20/11',  // Conciência Negra
								'25/12'); // Natal

//obter array dos feriados nos proximos X anos
var feriados = function(anos){
	var datas = new Array();
	var ano = dataAtual.getFullYear();
	for (var j = 0; j <= anos; j++, ano++){
		for (i in diasFeriados){
			var retorno = diasFeriados[i].split('/');
			datas.push(new Date(ano, retorno[1] - 1, retorno[0]));
		}
		datas.push(paixao(ano));
		datas.push(corpusCrist(ano));
	} 
	return datas;
}

//soma dias uteis a uma data
function somaDiasUteis(date, diasUteis){
	var novaData = date.getTime();
	for (dias = 0; dias < diasUteis; ) {
		novaData = novaData + (1 * 24 * 60 * 60 * 1000);
		if (isDiaUtil(new Date(novaData)))dias++
	}	
	return new Date(novaData);
}	

//verifica se a data é um dia util
function isDiaUtil(date) {	
	if (date.getDay() == 0 || date.getDay() == 6 ) return false;
	feriados(3).forEach(function(item, index){
		if(date.getTime() == item.getTime()) return false;
	});
	return true;
}




/******************************************************************************************/
/************************************FUNÇÕES COM STRINGS***********************************/
/******************************************************************************************/ 

//FAZ REPLACE DE TODAS AS OCORRENCIAS EM UMA STRING
function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
    }
    return string;
}

/******************************************************************************************/
/************************************ESPECIFICAS*******************************************/
/******************************************************************************************/ 

/*Exibir zoom centralizado na tela do ECM*/
function zoomEcmTipo(dataset, colunasExibir, colunasRetorno, titulo, tipo, filtro){
	var width = colunasExibir.split(',').length * 80;
	
	if (width < 400) width = 400;
	
	var height = 400;
	var left = (screen.width/2)-(width/2);
	var top = (screen.height/2)-(height/2);	

	dataset = dataset ? "datasetId="+ dataset : "";
	colunasExibir = colunasExibir ? "&dataFields="+ colunasExibir : "";
	colunasRetorno = colunasRetorno ? "&resultFields="+ colunasRetorno : "";
	titulo = titulo ? "&title="+ titulo : "";
	tipo = tipo ? "&type="+ tipo : "";
	filtro = filtro ? "&filterValues="+ filtro : "";

	var janela = window.open("/webdesk/zoom.jsp?"+ dataset + colunasExibir + colunasRetorno + filtro + tipo + titulo,
						"zoom",
						"status,scrollbars=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left + ",modal=true,dialog=yes");
	self.focus();
}

// gera uma função dianmicamente com o nome passado no parametro tipo do zoomECM
function setSelectedZoomItem(selectedItem) {
	var str = selectedItem['type'] + "(selectedItem)";
	eval(str);
}

/******************************************************************************************/
/************************************VALIDADORES*******************************************/
/******************************************************************************************/ 

//validar CNPJ
var isCNPJValid = function (cnpj){	
	cnpj = cnpj.replace(/[^\d]+/g, '');
	if (cnpj == '') return false;
	if (cnpj.length != 14) return false;
	// Elimina CNPJs invalidos conhecidos
	if (cnpj == "00000000000000" ||
		cnpj == "11111111111111" ||
		cnpj == "22222222222222" ||
		cnpj == "33333333333333" ||
		cnpj == "44444444444444" ||
		cnpj == "55555555555555" ||
		cnpj == "66666666666666" ||
		cnpj == "77777777777777" ||
		cnpj == "88888888888888" ||
		cnpj == "99999999999999") return false;

	// Valida DVs
	tamanho = cnpj.length - 2
	numeros = cnpj.substring(0, tamanho);
	digitos = cnpj.substring(tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(0)) return false;

	tamanho = tamanho + 1;
	numeros = cnpj.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(1)) return false;

	return true
}

//validar CPF
var isCPFValid = function(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf == '') return false; 
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;       
    // Valida 1o digito 
    add = 0;    
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11) 
        rev = 0;    
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
    return true;
}

//validar telefone
var isTelValid = function(telefone){	
	telefone = telefone.replace(/[^\d]+/g,'');  
	if (telefone.length >= 10 && telefone.length <= 13) return true;
	return false;
}

/******************************************************************************************/
/*************************FORMATADORES DE CAMPOS*******************************************/
/******************************************************************************************/ 


//formatação de de comportamento dos campos do formulario
$(document).ready(function(){

	//aceitar somente inteiros
	$('.integer').number( true, 0, ',' ,'.', '');
	
	//textarea auto dimencionavel
	$("textarea").on('keyup input keypress keydown change', function(e) {
		var tamanhoMin =  $(this).attr('rows') * $(this).css('line-height').replace(/[^0-9\.]+/g, '');
		$(this).css({'height': 'auto'});
		var novoTamanho = this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"));
		if (tamanhoMin > novoTamanho) novoTamanho = tamanhoMin;
		$(this).css({'height': novoTamanho});
	}).css({
		'overflow':'hidden', 
		'resize':'none'
	}).delay(0).show(0, function() {
		var el = $(this);
		setTimeout(function () {
			el.trigger('keyup');
		}, 100);		
    });

	//mascara par CNPJ
	$(".mCnpj").on('keypress', function() {
		var v = $(this).val().replace(/\D/g, "").substring(0, 14);
		v = v.replace(/^(\d{2})(\d)/, "$1.$2");
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
		v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
		v = v.replace(/(\d{4})(\d)/, "$1-$2");
		$(this).val(v);
	}).on('focusout',function(e) {
		var obj = $(this);
		obj.trigger('keypress');
		if (!isCNPJValid($(this).val())){
			FLUIGC.message.alert({
				message: 'CNPJ Invalido, insira um CNPJ correto!!',
				title: 'Erro CNPJ: ',
				label: 'OK'
			}, function(el, ev) {
			});
		}
	}).attr("maxlength", 18);

	//mascara para CPF
	$(".mCPF").on('keypress', function() {
		var v = $(this).val().replace(/\D/g, "").substring(0, 11);
		v=v.replace(/\D/g,"");                    
		v=v.replace(/(\d{3})(\d)/,"$1.$2");      
		v=v.replace(/(\d{3})(\d)/,"$1.$2");       
		v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); 
		$(this).val(v);
	}).on('focusout',function(e) {
		var obj = $(this);
		obj.trigger('keypress');
		if (!isCPFValid($(this).val())){
			FLUIGC.message.alert({
				message: 'CPF Invalido, insira um CPF correto!!',
				title: 'Erro CPF: ',
				label: 'OK'
			}, function(el, ev) {
			});
		}
	}).attr("maxlength", 11);

	//marcara para telefone
	$('.mTel').on('keypress', function() {
		v = $(this).val().replace(/\D/g, "").substring(0,11);
		v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
		v = v.replace(/(\d)(\d{4})$/, "$1-$2");
		$(this).val(v);
	}).on('blur',function() {
		$(this).trigger('keypress');
		if (!isTelValid($(this).val())){
			FLUIGC.message.alert({
				message: 'Telefone inválido, insira um telefone correto',
				title: 'Erro Telefone: ',
				label: 'OK'
			});
		}
	}).attr("maxlength", 15);

	$(".isProcessLink").each(function(i) {
		if ($(this).val() != ""){
			$(this).css('pointer-events', 'all');
			$(this).removeAttr('disabled');
			$(this).click(function() {
				window.open("/portal/p/Casp/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + $(this).val(), '_blank');
				self.focus()
			});
		}
	});
});


//função para textfield aceita numeros decimais, inteiros e moeda ex: $('meu campo').number( somenteNumeros, casasDecimais, separadorDecimal , separadorMilhar, prefixoMonetario);
(function ($) {
	function setSelectionRange(rangeStart, rangeEnd) {
		if (this.createTextRange) {
			var range = this.createTextRange();
			range.collapse(true);
			range.moveStart('character', rangeStart);
			range.moveEnd('character', rangeEnd - rangeStart);
			range.select();
		} else if (this.setSelectionRange) {
			this.focus();
			this.setSelectionRange(rangeStart, rangeEnd);
		}
	}

	function getSelection(part) {
		var pos = this.value.length;
		part = (part.toLowerCase() == 'start' ? 'Start' : 'End');
		if (document.selection) {
			var range = document.selection.createRange(),
				stored_range, selectionStart, selectionEnd;
			stored_range = range.duplicate();
			stored_range.expand('textedit');
			stored_range.setEndPoint('EndToEnd', range);
			selectionStart = stored_range.text.length - range.text.length;
			selectionEnd = selectionStart + range.text.length;
			return part == 'Start' ? selectionStart : selectionEnd;
		} else if (typeof (this['selection' + part]) != "undefined") {
			pos = this['selection' + part];
		}
		return pos;
	}
	var _keydown = {
		codes: {
			188: 44,
			109: 45,
			190: 46,
			191: 47,
			192: 96,
			220: 92,
			222: 39,
			221: 93,
			219: 91,
			173: 45,
			187: 61,
			186: 59,
			189: 45,
			110: 44
		},
		shifts: {
			96: "~",
			49: "!",
			50: "@",
			51: "#",
			52: "$",
			53: "%",
			54: "^",
			55: "&",
			56: "*",
			57: "(",
			48: ")",
			45: "_",
			61: "+",
			91: "{",
			93: "}",
			92: "|",
			59: ":",
			39: "\"",
			44: "<",
			46: ">",
			47: "?"
		}
	};
	$.fn.number = function (number, decimals, dec_point, thousands_sep, prefix) {
		thousands_sep = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep;
		dec_point = (typeof dec_point === 'undefined') ? ',' : dec_point;
		decimals = (typeof decimals === 'undefined') ? 0 : decimals;
		prefix = (typeof prefix === 'undefined') ? '' : prefix;

		var u_dec = ('\\u' + ('0000' + (dec_point.charCodeAt(0).toString(16))).slice(-4)),
			regex_dec_num = new RegExp('[^' + u_dec + '0-9]', 'g'),
			regex_dec = new RegExp(u_dec, 'g');
		if (number === true) {
			if (this.is('input:text')) {
				return this.on({
					'keydown.format': function (e) {
						var $this = $(this),
							data = $this.data('numFormat'),
							code = (e.keyCode ? e.keyCode : e.which),
							chara = '',
							start = getSelection.apply(this, ['start']),
							end = getSelection.apply(this, ['end']),
							val = '',
							setPos = false;
						if (_keydown.codes.hasOwnProperty(code)) {
							code = _keydown.codes[code];
						}
						if (!e.shiftKey && (code >= 65 && code <= 90)) {
							code += 32;
						} else if (!e.shiftKey && (code >= 69 && code <= 105)) {
							code -= 48;
						} else if (e.shiftKey && _keydown.shifts.hasOwnProperty(code)) {
							chara = _keydown.shifts[code];
						}
						if (chara == '') chara = String.fromCharCode(code);
						if (code !== 8 && chara != dec_point && !chara.match(/[0-9]/)) {
							var key = (e.keyCode ? e.keyCode : e.which);
							if (key == 46 || key == 8 || key == 9 || key == 27 || key == 13 || ((key == 65 || key == 82) && (e.ctrlKey || e.metaKey) === true) || ((key >= 35 && key <= 39))) {
								return;
							}
							e.preventDefault();
							return false;
						}
						if ((start == 0 && end == this.value.length || $this.val() == 0) && !e.metaKey && !e.ctrlKey && !e.altKey && chara.length === 1 && chara != 0) {
							start = end = 1;
							this.value = '';
							data.init = (decimals > 0 ? -1 : 0);
							data.c = (decimals > 0 ? -(decimals + 1) : 0);
							setSelectionRange.apply(this, [0, 0]);
						} else {
							data.c = end - this.value.length;
						}
						if (decimals > 0 && chara == dec_point && start == this.value.length - decimals - 1) {
							data.c++;
							data.init = Math.max(0, data.init);
							e.preventDefault();
							setPos = this.value.length + data.c;
						} else if (chara == dec_point) {
							data.init = Math.max(0, data.init);
							e.preventDefault();
						} else if (decimals > 0 && code == 8 && start == this.value.length - decimals) {
							e.preventDefault();
							data.c--;
							setPos = this.value.length + data.c;
						} else if (decimals > 0 && code == 8 && start > this.value.length - decimals) {
							if (this.value === '') return;
							if (this.value.slice(start - 1, start) != '0') {
								val = this.value.slice(0, start - 1) + '0' + this.value.slice(start);
								$this.val(val.replace(regex_dec_num, '').replace(regex_dec, dec_point));
							}
							e.preventDefault();
							data.c--;
							setPos = this.value.length + data.c;
						} else if (code == 8 && this.value.slice(start - 1, start) == thousands_sep) {
							e.preventDefault();
							data.c--;
							setPos = this.value.length + data.c;
						} else if (decimals > 0 && start == end && this.value.length > decimals + 1 && start > this.value.length - decimals - 1 && isFinite(+chara) && !e.metaKey && !e.ctrlKey && !e.altKey && chara.length === 1) {
							if (end === this.value.length) {
								val = this.value.slice(0, start - 1);
							} else {
								val = this.value.slice(0, start) + this.value.slice(start + 1);
							}
							this.value = val;
							setPos = start;
						}
						if (setPos !== false) {
							setSelectionRange.apply(this, [setPos, setPos]);
						}
						$this.data('numFormat', data);
					},
					'keyup.format': function (e) {
						var $this = $(this),
							data = $this.data('numFormat'),
							code = (e.keyCode ? e.keyCode : e.which),
							start = getSelection.apply(this, ['start']),
							setPos;
						if (this.value === '' || (code < 48 || code > 57) && (code < 96 || code > 105) && code !== 8) return;
						$this.val($this.val());
						if (decimals > 0) {
							if (data.init < 1) {
								start = this.value.length - decimals - (data.init < 0 ? 1 : 0);
								data.c = start - this.value.length;
								data.init = 1;
								$this.data('numFormat', data);
							} else if (start > this.value.length - decimals && code != 8) {
								data.c++;
								$this.data('numFormat', data);
							}
						}
						setPos = this.value.length + data.c;
						setSelectionRange.apply(this, [setPos, setPos]);
					},
					'paste.format': function (e) {
						var $this = $(this),
							original = e.originalEvent,
							val = null;
						if (window.clipboardData && window.clipboardData.getData) {
							val = window.clipboardData.getData('Text');
						} else if (original.clipboardData && original.clipboardData.getData) {
							val = original.clipboardData.getData('text/plain');
						}
						$this.val(val);
						e.preventDefault();
						return false;
					}
				}).each(function () {
					var $this = $(this).data('numFormat', {
						c: -(decimals + 1),
						decimals: decimals,
						thousands_sep: thousands_sep,
						dec_point: dec_point,
						regex_dec_num: regex_dec_num,
						regex_dec: regex_dec,
						prefix: prefix,
						init: false
					});
					if (this.value === '') return;
					$this.val($this.val());
				});
			} else {
				return this.each(function () {
					var $this = $(this),
						num = +$this.text().replace(regex_dec_num, '').replace(regex_dec, '.');
					$this.number(!isFinite(num) ? 0 : +num, decimals, dec_point, thousands_sep);
				});
			}
		}
		return this.text($.number.apply(window, arguments));
	};
	var origHookGet = null,
		origHookSet = null;
	if ($.valHooks.text) {
		origHookGet = $.valHooks.text.get;
		origHookSet = $.valHooks.text.set;
	} else {
		$.valHooks.text = {};
	}
	$.valHooks.text.get = function (el) {
		var $this = $(el),
			num, data = $this.data('numFormat');
		if (!data) {
			if ($.isFunction(origHookGet)) {
				return origHookGet(el);
			} else {
				return undefined;
			}
		} else {
			if (el.value === '') return '';
			num = +(el.value.replace(data.regex_dec_num, '').replace(data.regex_dec, '.'));
			return '' + (isFinite(num) ? num : 0);
		}
	};
	$.valHooks.text.set = function (el, val) {
		var $this = $(el),
			data = $this.data('numFormat');
		if (!data) {
			if ($.isFunction(origHookSet)) {
				return origHookSet(el, val);
			} else {
				return undefined;
			}
		} else {
			return el.value = $.number(val, data.decimals, data.dec_point, data.thousands_sep, data.prefix)
		}
	};
	$.number = function (number, decimals, dec_point, thousands_sep, prefix) {
		thousands_sep = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep;
		dec_point = (typeof dec_point === 'undefined') ? ',' : dec_point;
		decimals = !isFinite(+decimals) ? 0 : Math.abs(decimals);
		prefix = (typeof prefix === 'undefined') ? '' : prefix;
		var u_dec = ('\\u' + ('0000' + (dec_point.charCodeAt(0).toString(16))).slice(-4));
		number = (number + '').replace(new RegExp(u_dec, 'g'), '.').replace(new RegExp('[^0-9+\-Ee.]', 'g'), '');
		var n = !isFinite(+number) ? 0 : +number,
			s = '',
			toFixedFix = function (n, decimals) {
				var k = Math.pow(10, decimals);
				return '' + Math.round(n * k) / k;
			};
		s = (decimals ? toFixedFix(n, decimals) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
		}
		if ((s[1] || '').length < decimals) {
			s[1] = s[1] || '';
			s[1] += new Array(decimals - s[1].length + 1).join('0');
		}
		return prefix + s.join(dec_point);
	}
})(jQuery);