function send_mail(){
	debugger;
	var inputData = get_Email_id("Emailform");
	if(inputData!=undefined){
		if(inputData!=null ){
		ajaxCallerSendmail("POST", "https://www.pushbiz.in/api/referralWordPress",
				JSON.stringify(inputData), undefined).done(function(data) {
					showEmailResult(data);
				});
	}
	}
}



function ajaxCallerSendmail(method,url,reqData,requestType){
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
		    	showEmailMessage("loading","Please wait...",jQuery('#appUrl').val());
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
		    	showEmailMessage("loading","Please wait...",jQuery('#appUrl').val());
		    },
		    complete:function(){
		    	jQuery('.ajaxLoading').hide();
		    }
		});
	}
}


function showEmailResult(data) {
	var response = data.response;
	if (response.Status == "1") {
		showEmailMessage("green", "Thank You. Email has been sent to your friend.", "");
		jQuery('#friend_email_id').val('');
		
	} else if(response.Status == 1){
		showEmailMessage("red", "Error.. try again", "");
	}
	else 
	{
		showEmailMessage("red", response.Description, "");
	}
}


function get_Email_id(form) {
	var  requestData =null;
	
	var emailId = document.getElementById("friend_email_id").value;
	var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i  
	var Apikey = document.getElementById("apikey").value;
	var originurl= window.location.origin;
	
	var Regurl=  document.getElementById("RegUrl").value;
	
		if(emailId=="null" || emailId.length==0)
	{
		document.getElementById('friend_email_id').focus();
		showMessage("red","Enter your friend Email Id","");
		return;
	}
	if (emailId=="null" || !ck_email.test(emailId)) {
		document.getElementById('friend_email_id').focus();
		showMessage("red", "Enter a valid Email Id", "");
		return;
	}


	
	
	if (originurl!=Regurl)
	{
		showEmailMessage("red", "You have registered with "+Regurl+ "  Please reactivate the plugin and Sing Up with your website URL", "");
		return;
	}
	
	var registerData ={"uuID":Apikey,"email":emailId,"source":"API"};
	return registerData;
}


function showEmailMessage(messageCode, defaultMessage, messageParam) {

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