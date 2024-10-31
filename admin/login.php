
<?php

if(isset($_GET['key']))
{
$apikey=$_GET['key'];	
$regurl=$_GET['Url'];
	
update_option( 'PushBIZRegUrl', $regurl );
update_option( 'VarPushBIZapikey', $apikey );
update_option( 'PushBIZ_firstCreation', '1');
include plugin_dir_path( __FILE__ ).'bizmessage.php';

					echo '<script type="text/javascript">';
      				echo 'window.location.href="admin.php?page=pushBIZ";';
     				echo '</script>';
exit;
}

?>
<style>
#intRefer{
	float:right;
	margin-top:25px;
}
#head-title{
	margin-left:30px;
	color:#fff;
	padding:0px;
	margin-top:0px;
}
@media (min-width: 768px) and (max-width: 991px) {
	
}
@media (max-width:767px){
	.col-xs-12 h1{
		font-size:24px;
		text-align:center;
	}
	h4{
		font-size:12px;
	}
	#intRefer{
		float:right;
		margin-top:10px;
	}
	#head-title{
		margin-left:5px;
		color:#fff;
		padding:0px;
		margin-top:10px;
		text-align:center;
		
	}
}


</style>
				
        <!-- Top content -->
        <div class="top-content" style="margin-left: -20px;">
        	
        	<!-- Top menu -->
			<nav class="navbar navbar-inverse navbar-no-bg" role="navigation" style='background-color: #EF6262; border-color: #EF6262; height: 80px;'>
				<div class="container">
					<div class="navbar-header">
					<div class="col-md-12 col-xs-12" style="color: white">
						<h1 class="col-md-12">PushBIZ.IN-Be Visible Earn 10X More</h1>						
					</div>	
				
					</div>
					<!-- Collect the nav links, forms, and other content for toggling -->
					
				</div>
			</nav>
        	
            <div class="inner-bg">
                <div class="container">
                	<div class="row">
                        <div class="col-sm-8 col-sm-offset-2 text wow fadeInUp">
                            <h1>Promote <strong>Your Business</strong> Using PushBIZ</h1>
                            <div class="description">
                            	<h4>
	                            	Best SEO / CTA / Push Notification Wordpress Plugin to Push Business in front of your clients.
									</h4>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                    	<div class="col-sm-6 phone wow fadeInLeft">
                        	<img src="../wp-content/plugins/pushbiz/admin/image/main.png" alt="" style="width: 100%; margin-top: 45px;">
                        </div>                        
                        <div class="col-sm-5 form-box wow fadeInUp">
                        	<div class="form-top">
                        		<div class="form-top-left">
                        			<h3>Sign Up your business with us.</h3>
                            		<p>Make your Business Visible - Earn 10X More using PushBIZ.IN</p>
                        		</div>
                        		<div class="form-top-right">
                        			<span aria-hidden="true" class="typcn typcn-pencil"></span>
                        		</div>
                            </div>
                            <div class="form-bottom">
			    <form role="form" name="Notification-details" id="PushBIZForm" 
      style="margin:auto; background:#F1F1F1;width: 450px;">
		  <div style="padding:20px; border: 5px solid;">
   
				<div class="form-group">             
						 <input type="input" autocomplete="off" class="form-control " id="contact-name"  placeholder="Contact Name" >
					</div>
					<div class="form-group">               
						<input type="input"  autocomplete="off" class="form-control input-number" id="input-number"
						 placeholder="Phone Number" maxlength = "15"  >
					</div>
					<div class="form-group">               
						<input type="email" autocomplete="off" class="form-control input-email" id="input-email"
						 placeholder="Email..."  >
					</div> 
					<div class="form-group">               
						<input type="url" autocomplete="off" class="form-control input-website"  id="url"
						 placeholder="Enter URL with http:// or https://"  >
					</div>
					<div class="form-group">
					
					<div class="col-md-3" style="padding:0px" >
									<input type="text" class="form-control col-md-3" placeholder="https://" disabled="disabled" aria-label="">
					</div>
					<div class="col-md-5" style="padding:0px" >
  									<input autocomplete="off" id="idSubDomain" type="text" data-parsley-errors-messages-disabled="true" placeholder="subdomain" data-parsley-class-handler="#password-handler" class="form-control col-md-7">
					</div>
					<div class="col-md-4" style="padding:0px" >
                                  	<input type="text" class="form-control col-md-3" placeholder=".pushbiz.in" disabled="disabled" aria-label="">
					</div>				
					
					</div>
					           				
					  <center>  <button type="button"
						class="btn btn-primary active text-center" id="btn-signup"
						onclick="saveAPIPushBIZData()" style="margin-top: 15px;     background-color: #EF6262; border-color: #EF6262;">
						<lable>Sign Up For PushBIZ</lable>
					</button> </center>
						</div>
      </form>
		                    </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
      
		<!-- More features -->
        
        

        
  
 



        <!-- Footer -->
        <footer>
	        <div class="container" style="margin-top:-10px;">
	            <div class="row">
                    <div class="col-sm-12 footer-copyright">
                    	&copy;2016 by <a href="http://pushbiz.in" target="_blank">PushBIZ.IN</a>
                    </div>
                </div>
	        </div>
        </footer>
        


