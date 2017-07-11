function getTipoPedido(){
	
	log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>teste");
	
	var cardData = new java.util.HashMap();
	cardData = hAPI.getCardData(getValue("WKNumProces"));
	var keys = cardData.keySet().toArray();
	for ( var key in keys) {
		var field = keys[key];
		if (field.indexOf("tipoPedido___") > -1) {	
			log.warn(hAPI.getCardValue(field));
			return hAPI.getCardValue(field)
		}
	}
	return "";
}