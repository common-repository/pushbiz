
<script>
jQuery(document).ready(function($){
  //you can now use $ as your jQuery object.
a();
b();
c();

});
function b(){
var inputBoxOne = document.getElementById('input-title');

inputBoxOne.onkeyup = function(){
	
	if(inputBoxOne.value != 0)
	{
		document.getElementById('notification-title').innerHTML = inputBoxOne.value;
	}
	else
	{
		document.getElementById('notification-title').innerHTML = "Notification Title";	
	}
}
}
function c(){
var inputBoxTwo = document.getElementById('message-textarea');
inputBoxTwo.onkeyup = function(){
	
	if(inputBoxTwo.value != 0)
	{
		 document.getElementById('notification-body').innerHTML = inputBoxTwo.value;
	}
	else
	{
		document.getElementById('notification-body').innerHTML = "Notification Message";	
	}
   
}
}
function a(){
var inputBoxThree = document.getElementById('location_url');
inputBoxThree.onkeyup = function(){
	
	if(inputBoxThree.value != 0)
	{
		 document.getElementById('url-preview').innerHTML = inputBoxThree.value;
	}
	else
	{
		document.getElementById('url-preview').innerHTML = "";	
	}
    
}}

</script>




<div class="row" id="main-container">
				<div class="col-md-12">


					<div class="panel panel-default col-md-12" style="padding: 0px 0px 20px;">
												<div class="widget bg-grey-light ">
												<div class="col-md-6 col-xs-12">
													
													<div class="widget-details">
														<div class="widget-icon bg-white pull-left fa fa-envelope"></div>
														<div class="overflow-hidden">
															<span style="line-height: 2.1" class="h4">Send New
																PushBIZ Notification</span>
														</div>
													</div>
													</div>	
					
					<div class="col-md-6 col-xs-12">					
						<form class="col-md-8 " id="Emailform" role="form"     style="margin-left: 120px;">
						
								
									<div class="input-group">
									  <input type="email" id="friend_email_id" name="friend_email_id" class="form-control"  placeholder="Refer magical PushBIZ to your friend">
									  <span class="input-group-btn">
									  <input type="hidden" value="<?php echo $api=get_option( 'VarPushBIZapikey');?>" id="apikey">
									<input type="hidden" value="<?php echo $api=get_option( 'PushBIZRegUrl');?>" id="RegUrl">
									  <button type="button" class="btn  btn-action btn-success text-center " onclick="send_mail()" id="btsubmit2" style="background-color: black;border: 1px solid black;">Email</button>
									 
									  </span>
									</div><!-- /input-group -->

							
						</form >
						
													
					</div>
												</div>
												
												
                        
                        
										  <div class="col-lg-6 dummy-notification shadow ">
															<p class="h4">Preview</p>
															<div class=" shadow dummy-notification-inner-wrapper">
																<div class="overflow-hidden">
																	<div class="notification-demo">
																		<div class="row" >
																			<div style="width: 18%; background-color: rgb(77, 157, 224);  margin: 7px 0 0 22px; height: 75px;" class="col-md-3 col-xs-3">
																				
																			</div>
																			<div style="position:static" class="col-md-9 col-xs-9 notification-demo-wrapper">
																				<p class="notification-title  notification-display-title h4 pb10" id="notification-title" data-bind="Title">
																				Notification Title
																				</p>
																				<p class="notification-body  notification-display-message notification-demo-wrapper__message h5 " 
																				id="notification-body" data-bind="Message">
																				Notification Body
																				</p>
																				<p class="notification-display notification-display-url notification-demo-wrapper__url h6" data-bind="url">https://pushbiz.in
																				</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="widget">
																<p class="h5">URL to open when user clicks the notification:</p>
																<p data-bind="offerPageURL" class="url-preview " id="url-preview"></p>
															</div>
											</div>


						<div class="col-md-6">
											<form role="form" name="Notification-details" id="sendnotificationForm" >
												<div class="form-group">
													<label for="title">Title</label> 
													<input type="input"  autocomplete="off" class="form-control input-title" id="input-title"
													 placeholder="36 Characters max" maxlength = "36">
												</div>
												<div class="form-group">
													<label for="message">Message</label>
													<textarea class="form-control message-textarea"  autocomplete="off" id="message-textarea" rows="2" 
													placeholder="80 Characters max" maxlength = "80" pattern=".{0,80}" title="Max 80 Characters"></textarea>
												</div>
												<div class="form-group">
													<label for="url">URL</label> <input type="text" autocomplete="off"
														class="form-control url" id="location_url"  placeholder="Enter URL with http:// or https://">
												</div>
												
											   <input type="hidden" value="<?php echo $api=get_option( 'VarPushBIZapikey');?>" id="apikey">
											   <input type="hidden" value="<?php echo $api=get_option( 'PushBIZRegUrl');?>" id="RegUrl">
												<div class="accordion" id="accordion2">
												
												<div class="accordion-group">
															<div class="accordion-heading">
																
											 <button type="button" class="btn  btn-action btn-success text-center " onclick="send_notification()" style="background-color: #EF6262;border-color: #EF6262;" id="btsubmit" >Send Notification</button>
											</form>
									</div>
                        
						<!--.col-md-6 -->

					</div>
					<!--<center><img  class="img-responsive" src="../wp-content/plugins/pushbiz/image/main.png" height="250" width="600" /></center>-->
				</div>
            </div>





</div>
</div>
<div class="col-md-12">
<center><h3>To Change subscription text, icon and notification icon Login at...<a href="https://www.pushbiz.in/" target="_blank">PushBIZ.IN</a></h3></center>
</div>
</div>