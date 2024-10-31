function btnClicksupport(){
	debugger;
	var inputData = getInputSupportData("support_form");
	if(inputData!=undefined){
		if(inputData!=null ){
		ajaxCallerSupport("POST", "https://www.pushbiz.in/sendProblem",
				JSON.stringify(inputData), undefined).done(function(data) {
					showSupportInfo(data);
				});
	}
	}
}



function ajaxCallerSupport(method,url,reqData,requestType){
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
		    	showSupportMessage("loading","Please wait...",jQuery('#appUrl').val());
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
		    	showSupportMessage("loading","Please wait...",jQuery('#appUrl').val());
		    },
		    complete:function(){
		    	jQuery('.ajaxLoading').hide();
		    }
		});
	}
}


function showSupportInfo(data) {
	var response = data.response;
	if (response.Status == "1") {
		showSupportMessage("green", "Your Problem has been sent.", "");
		jQuery('#phone-no').val('');
		jQuery('#email-id').val('');
		jQuery('#subject').val('');
		jQuery('#problem').val('');
		
	} else if(response.Status == 1){
		showSupportMessage("red", "Error.. try again", "");
	}
	else 
	{
		showSupportMessage("red", response.Description, "");
	}
}


function getInputSupportData(form) {
	var  requestData =null;
	


		var emailID=document.getElementById('email-id').value;
		var phoneNo=document.getElementById('phone-no').value;
		var subject=document.getElementById('subject').value;
		var textBody=document.getElementById('problem').value;
		
		
		var ck_phoneno = /^\d{10}$/; 
			var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i  ;	
		
		if(phoneNo=="null" || phoneNo.length==0)
		{
			document.getElementById('phone-no').focus();
			showMessage("red","Enter your Phone No.","");
			return;
		} 
		if (phoneNo=="null" || !ck_phoneno.test(phoneNo)) {
		document.getElementById('phone-no').focus();
		showMessage("red", "Enter a valid Mobile no with 10 digits", "");
		return;
	}
		if(emailID=="null" || emailID.length==0)
		{
			document.getElementById('email-id').focus();
			showMessage("red","Enter your Email Id","");
			return;
		} 
		if (emailID=="null" || !ck_email.test(emailID)) {
		document.getElementById('email-id').focus();
		showMessage("red", "Enter your valid Email Id", "");
		return;
	}
		if(subject=="null" || subject.length==0)
		{
			document.getElementById('subject').focus();
			showMessage("red","Enter the Subject","");
			return;
		} 
		if(textBody=="null" || textBody.length==0)
		{
			document.getElementById('problem').focus();
			showMessage("red","Enter your Problem","");
			return;
		} 
	
	var registerData ={"phoneNo": phoneNo, "emailID": emailID, "subject": subject,"textBody": textBody};
	return registerData;
}


function showSupportMessage(messageCode, defaultMessage, messageParam) {

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