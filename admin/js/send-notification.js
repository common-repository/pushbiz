function send_notification(){
	debugger;
	var inputData = getInputNotificationData("sendnotificationForm");
	if(inputData!=undefined){
		if(inputData!=null ){
		ajaxCallerSendNotification("POST", "https://www.pushbiz.in/saveSendNotification",
				JSON.stringify(inputData), undefined).done(function(data) {
					showNotificationResultInfo(data);
				});
	}
	}
}



function ajaxCallerSendNotification(method,url,reqData,requestType){
	if(requestType == undefined){
		return jQuery.ajax({
			type:method,
			url:url,
			data:{
				requestData:reqData
			},
			error: function (request, error) {
		        console.log(arguments);
		        alert(" Can't do because: " + error);
		    },
		    beforeSend:function(){
		    	showNotificationMessage("loading","Please wait...",jQuery('#appUrl').val());
		    },
		    complete:function(){
		    	jQuery('.ajaxLoading').hide();
		    }
		});
	}
	else{
		return jQuery.ajax({
			type:method,
			url:url,
			data:JSON.stringify(reqData),
			contentType: "application/json",
			error: function (request, error) {
		        console.log(arguments);
		        alert(" Can't do because: " + error);
		    },
		    beforeSend:function(){
		    	showNotificationMessage("loading","Please wait...",jQuery('#appUrl').val());
		    },
		    complete:function(){
		    	jQuery('.ajaxLoading').hide();
		    }
		});
	}
}


function showNotificationResultInfo(data) {
	var response = data.response;

	if (response.Status == "1") {
		showNotificationMessage("green", "Your Notification has been sent", "");
		jQuery('#input-title').val('');
		jQuery('#message-textarea').val(''); 
		jQuery('#location_url').val('');
		document.getElementById('url-preview').innerHTML="";
		document.getElementById('notification-title').innerHTML = "Notification Title"; 
		document.getElementById('notification-body').innerHTML = "Notification Message";
		
		
		
	} else if(response.Status == 1){
		showNotificationMessage("red", "Error.. try again", "");
	}
	else 
	{
		showNotificationMessage("red", response.Description, "");
	}
}


function getInputNotificationData(form) {
	var  requestData =null;
	
	var title = document.getElementById("input-title").value;
	var message = document.getElementById("message-textarea").value;
	var locationURL = document.getElementById("location_url").value;
	var Apikey = document.getElementById("apikey").value;
	
	var originurl= window.location.origin;
	var Regurl=  document.getElementById("RegUrl").value;
	
	var ck_url=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

	if(title=="null" || title.length==0)
	{
		document.getElementById('input-title').focus();
		showNotificationMessage("red","Enter your Notification title","");
		return;
	} 

	if(message=="null" || message.length==0)
	{
		document.getElementById('message-textarea').focus();
		showNotificationMessage("red","Enter your Message.","");
		return;
	}
	if(locationURL=="null" || locationURL.length==0)
	{
		document.getElementById('location_url').focus();
		showNotificationMessage("red","Enter the URL","");
		return;
	}
	if (locationURL=="null" || !ck_url.test(locationURL)) {
		document.getElementById('location_url').focus();
		showNotificationMessage("red", "Enter valid URL", "");
		return;
	}
	
	if (originurl!=Regurl)
	{
		showNotificationMessage("red", "You have registered with "+Regurl+ "  Please reactivate the plugin and Sing Up with your website URL", "");
		return;
	}
	
	var registerData ={"uuID":Apikey,"notifTitle":title, "notifBody":message,"redirectUrl":locationURL,"notifIconUrl":"","notifyToFlag":"INDIV","source":"API"};
	return registerData;
}


function showNotificationMessage(messageCode, defaultMessage, messageParam) {

	jQuery(".ajaxLoading").hide();

	if (messageCode == "red") {
	var msg = defaultMessage;
		jQuery("<div style='z-index:2000;' class='messageCommonProp'>")
				.appendTo(document.body).text(msg).addClass(
						"notificationRed1 ")
				.delay(5000).hide({
					effect : "blind",
					duration : "slow"
				}, function() {
					jQuery(this).remove();
				});
		
		var positionFromLeft = calculatePositionFromLeft(jQuery(".notificationRed1").last().width());
		jQuery(".notificationRed1").last().css('left',positionFromLeft);
		jQuery(".notificationRed1").last().css('display','inline-block');		
	}

	else if (messageCode =="green") {
		var msg = defaultMessage;
		jQuery("<div style='z-index:2000;' class='messageCommonProp'>")
				.appendTo(document.body).text(msg).addClass(
						"notificationGreen ")
				.delay(5000).hide({
					effect : "blind",
					duration : "slow"
				}, function() {
					jQuery(this).remove();
				});
		
		var positionFromLeft = calculatePositionFromLeft(jQuery(".notificationGreen").last().width());
		jQuery(".notificationGreen").last().css('left',positionFromLeft);
		jQuery(".notificationGreen").last().css('display','inline-block');
	}
	else if (messageCode =="yellow") {
		var msg = defaultMessage;
		jQuery("<div style='z-index:2000;' class='messageCommonProp'>")
				.appendTo(document.body).text(msg).addClass(
						"notificationYellow ")
				.delay(5000).hide({
					effect : "blind",
					duration : "slow"
				}, function() {
					jQuery(this).remove();
				});
		
		var positionFromLeft = calculatePositionFromLeft(jQuery(".notificationGreen").last().width());
		jQuery(".notificationYellow").last().css('left',positionFromLeft);
		jQuery(".notificationYellow").last().css('display','inline-block');
	}

	else if (messageCode == "loading") {
		var msg = defaultMessage;
		jQuery("<div class='ajaxLoading' style='border:0px solid;z-index:2000;background-color: #5BC0DE;'>")
				.appendTo(document.body)
				.html(
						"<img style='float:left;' id='ajaxCallLoadingImage' src='../wp-content/plugins/pushbiz/admin/image/loding.gif' width='50' height='45'><div style='float:left;margin: 10px;'>"
								+ msg)
								.addClass("notificationLoading ")
		
				
		var positionFromLeft = calculatePositionFromLeft(jQuery(".notificationLoading").last().width());
		jQuery(".notificationLoading").last().css('left',positionFromLeft);
		jQuery(".notificationLoading").last().css('display','inline-block');
				
	}

	else {
		var msg = defaultMessage;
		jQuery("<div style='z-index:2000;' class='messageCommonProp'>")
				.appendTo(document.body).html(msg).addClass("notification")
				.delay(5000).hide({
					effect : "blind",
					duration : "slow"
				}, function() {
					jQuery(this).remove();
				});
		
		var positionFromLeft = calculatePositionFromLeft(jQuery(".notification").last().width());
		jQuery(".notification").last().css('left',positionFromLeft);
		jQuery(".notification").last().css('display','inline-block');
	}

}


function calculatePositionFromLeft(elementWidth){
 var windowWidth = jQuery(window).width();
 var positionFromleft = (windowWidth-elementWidth)/2;
 return positionFromleft;
}