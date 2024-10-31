function saveAPIPushBIZData(){
	debugger;
	var inputData = {"requestData":getInputDataPushBIZ("PushBIZForm")};
	if(inputData.requestData!=undefined){
		if(inputData!=null ){
		ajaxCaller("POST", "https://www.pushbiz.in/api/pushBizSignup",
				inputData, "application/json").done(function(data) {
					showSignupResultInfo(data);
				});
	}
	}
}



function ajaxCaller(method,url,reqData,requestType){
	if(requestType == undefined){
		return jQuery.ajax({
			type:method,
			url:url,
			data:reqData,
			error: function (request, error) {
		        console.log(arguments);
		        alert(" Can't do because: " + error);
		    },
		    beforeSend:function(){
		    	showMessage("loading","Please wait...",jQuery('#appUrl').val());
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
		    	showMessage("loading","Please wait...",jQuery('#appUrl').val());
		    },
		    complete:function(){
		    	jQuery('.ajaxLoading').hide();
		    }
		});
	}
}


function showSignupResultInfo(data) {
	var response = data.response;
	if (response.Status == 1 && response.Result.result=="1") {
		showMessage("green", "Thank you for registering with PushBIZ API", "");
		
		var apikey = response.Result.apiKey;
		var RegUrl= response.Result.websiteUrl;
		
	window.location.replace("admin.php?page=pushBIZ&key=" +apikey+"&Url="+encodeURIComponent(RegUrl)); 
		
		
	} else if(response.Status == 1 && response.Result.result=="0"){
		showMessage("red", "An account already exists with this Email ID.", "");
				
	
	}
	else if(response.Status == 1 && response.Result.result=="2"){
		showMessage("red", "An account already exists with this URL. Contact Us!!", "");
		setTimeout(function(){
			window.location.replace("admin.php?page=PushBizSupport");
		},5000); 
		
	}
	else 
	{
		showMessage("red", response.Description, "");
	}
}


function getInputDataPushBIZ(form) {
	var  requestData =null;
	var contactPersonName = document.getElementById("contact-name").value;
	var contactPersonMobileNo = document.getElementById("input-number").value;
	var emailId = document.getElementById("input-email").value;
	var companyURL = document.getElementById("url").value;
	var subdomain=document.getElementById("idSubDomain").value;
	var ck_phoneno = /^\d{10}$/; 
	//var ck_name = /^[A-Za-z ]{1,20}$/;
	var ck_subdomain = /^[^.-][a-zA-Z0-9.-]+[^.-]$/;
	var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i  ;	//Supports alphabets and numbers no special characters except underscore('_') min 3 and max 20 characters.
	var ck_username = /^[A-Za-z0-9_]{1,20}$/;
	var ck_url=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

	if(contactPersonName=="null" || contactPersonName.length==0)
	{
		document.getElementById('contact-name').focus();
		showMessage("red","Enter your Contact Name","");
		return;
	} 
	/*if ( contactPersonName=="null" || !ck_username.test(contactPersonName)) {
		document.getElementById('contact-name').focus();
		showMessage("red", "Enter valid UserName (Hint:alphabet,Numeric, _ or $)", "");
		return;
	}*/
	if(contactPersonMobileNo=="null" || contactPersonMobileNo.length==0)
	{
		document.getElementById('input-number').focus();
		showMessage("red","Enter your Mobile No.","");
		return;
	}
	if (contactPersonMobileNo=="null" || !ck_phoneno.test(contactPersonMobileNo)) {
		document.getElementById('input-number').focus();
		showMessage("red", "Enter a valid Mobile no with 10 digits", "");
		return;
	}
	if(emailId=="null" || emailId.length==0)
	{
		document.getElementById('input-email').focus();
		showMessage("red","Enter your email address","");
		return;
	}
	if (emailId=="null" || !ck_email.test(emailId)) {
		document.getElementById('input-email').focus();
		showMessage("red", "Enter your valid Email Id", "");
		return;
	}

	if(companyURL=="null" || companyURL.length==0)
	{
		document.getElementById('url').focus();
		showMessage("red","Enter the Company URL","");
		return;
	}
	if (companyURL=="null" || !ck_url.test(companyURL)) {
		document.getElementById('url').focus();
		showMessage("red", "Enter valid Company URL", "");
		return;
	}
	
	if(subdomain=="null" || subdomain.length==0)
	{
		document.getElementById('idSubDomain').focus();
		showMessage("red","Enter your SubDomain","");
		return;
	} 
	if ( subdomain=="null" || !ck_subdomain.test(subdomain)) {
		document.getElementById('idSubDomain').focus();
		showMessage("red", "Enter valid SubDomain (Hint:alphanumeric)", "");
		return;
	}
	
	var registerData ={"requestData" :{ "userName": contactPersonName, "phone": contactPersonMobileNo,"email": emailId,"websiteURL":companyURL,"subDomain":subdomain,"pricingPlan":"1","source":"wordpress"}};
	return registerData;
}


function showMessage(messageCode, defaultMessage, messageParam) {

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