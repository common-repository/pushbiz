function send_post(){
	debugger;
	var inputData = getInputPostData("sendpostForm");
	if(inputData!=undefined){
		if(inputData!=null ){
		ajaxCallerSendPost("POST", "https://www.pushbiz.in/saveSendNotification",
				JSON.stringify(inputData), undefined).done(function(data) {
					showPostResultInfo(data);
				});
	}
	}
}



function ajaxCallerSendPost(method,url,reqData,requestType){
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
		    	showPostMessage("loading","Please wait...",jQuery('#appUrl').val());
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
		    	showPostMessage("loading","Please wait...",jQuery('#appUrl').val());
		    },
		    complete:function(){
		    	jQuery('.ajaxLoading').hide();
		    }
		});
	}
}


function showPostResultInfo(data) {
	var response = data.response;

	if (response.Status == "1") {
		showPostMessage("green", "Your Notification has been sent", "");
		
		
		
	} else if(response.Status == 1){
		showPostMessage("red", "Error.. try again", "");
	}
	else 
	{
		showPostMessage("red", response.Description, "");
	}
}


function getInputPostData(form) {
	var  requestData =null;
	
	var title = document.getElementById("input-title").value;
	var message = document.getElementById("message-textarea").value;
	var locationURL = document.getElementById("location_url").value;
	var Apikey = document.getElementById("apikey").value;
	
	var originurl= window.location.origin;
	var Regurl=  document.getElementById("RegUrl").value;
	
	

	if(title=="null" || title.length==0)
	{
		document.getElementById('input-title').focus();
		showPostMessage("red","Please publish this post before sending PushBIZ Notification.","");
		return;
	} 

	if(message=="null" || message.length==0)
	{
		document.getElementById('message-textarea').focus();
		showPostMessage("red","Please publish this post.","");
		return;
	}
	if(locationURL=="null" || locationURL.length==0)
	{
		document.getElementById('location_url').focus();
		showPostMessage("red","Please publish this post.","");
		return;
	}
	
	
	if (originurl!=Regurl)
	{
		showPostMessage("red", "You have registered with "+Regurl+ "  Please reactivate the plugin and Sing Up with your website URL", "");
		return;
	}
	
	var registerData ={"uuID":Apikey,"notifTitle":title, "notifBody":message,"redirectUrl":locationURL,"notifIconUrl":"","notifyToFlag":"INDIV","source":"API"};
	return registerData;
}


function showPostMessage(messageCode, defaultMessage, messageParam) {

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