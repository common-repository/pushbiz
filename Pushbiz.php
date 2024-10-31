<?php
/*
Plugin Name: PushBIZ.IN
Plugin URI: https://www.pushbiz.in/
Description: Make your Business Visible - Earn 10X More using PushBIZ.IN Best SEO / CTA / Push Notification Wordpress Plugin to Push Business in front of your clients.
Version: 1.0
Author: PushBIZ.IN Developers 
Author URI: https://www.pushbiz.in/

*/
define('PushBiz_APPNAME', 'pushbiz');
define('WPPUSH_APPNAME_FRIENDLY', 'Pushbiz');
define( 'PushBIZ_DIR',dirname( __FILE__ ) );
define( 'PushBIZ_DIR_URL',plugins_url('/',__FILE__) );

$pushBIZ_header_script = '
<script>
(function(doc, script) {
var pushBIZIN, 
_pushBIZ_In = doc.getElementsByTagName(script)[0], 
addPushBIZVisibility = function(url, id) { 
if (doc.getElementById(id)) {return;} 
pushBIZIN = doc.createElement(script); 
pushBIZIN.src = url;
 id && (pushBIZIN.id = id);
 _pushBIZ_In.parentNode.insertBefore(pushBIZIN, _pushBIZ_In); }; 
addPushBIZVisibility(\'https://cdn.pushbiz.in/cdn/push10xvisibility_main.js\',\'pushBIZ.IN\');
 }(document, \'script\'));
 </script>
';

class Push_Bizclass{
static private $class = null;

  	function __construct()
	{
	  	$this->init();
	  	add_action('init', array($this, 'init'), 1);
		add_action( 'admin_menu',  array($this, 'pushbiz_plugin_menu'),9 );	
		add_action( 'admin_enqueue_scripts', array($this, 'Pushbiz_css_and_js' ),1 );

	if(get_option( 'PushBIZ_firstCreation' ) == "1")
		
	{
		//add_action('publish_post', array($this, 'getpostdata' ),2);
		add_action ( 'wp_head', array($this, 'push_10xvisibility'));
		add_action('add_meta_boxes', array($this, 'adding_meta_box'));	
	}	
		
	}	
	
	function init()
	{		 
	}
	
function push_10xvisibility(){
  // runs in the header
  global $pushBIZ_header_script;
   $pushbiz_option_apikey = get_option('VarPushBIZapikey');

  if($pushbiz_option_apikey){
      echo str_replace('push10xvisibility', $pushbiz_option_apikey, $pushBIZ_header_script); 
  }
}
	
	
function adding_meta_box() 
{
  add_meta_box(
   'pnfw-meta-box',
   __('Send PushBIZ Notification', 'pnfw'),
   array($this, 'render_meta_box_post'),
   'post',
   'side',
   'high'
  );
 }
 function render_meta_box_post() {
	 
$id=$_GET['post'];
$sql="SELECT post_content, post_title FROM wp_posts WHERE post_status = 'publish' AND post_type='post' AND ID='".$id."'";
$posts = $GLOBALS['wpdb']->get_results($sql);
$outputdata = json_encode($posts);
$permalink=get_permalink($id);

 ?>
 <p>You can send this post as <b>PushBIZ</b> Notification<p> 
	<form role="form" name="Notification-details" id="sendpostForm" >
	
	<input type="hidden" value='<?php echo $outputdata;?>' id="content_title">
	
	<input type="hidden" value='<?php echo $permalink;?>' id="location_url">
	<input type="hidden" value='' id="message-textarea">
	<input type="hidden" value='' id="input-title">
	<input type="hidden" value="<?php echo $api=get_option( 'VarPushBIZapikey');?>" id="apikey">
	<input type="hidden" value="<?php echo $api=get_option( 'PushBIZRegUrl');?>" id="RegUrl">
	
	<script>
	var content=jQuery("#content_title").val();
	content=JSON.parse(content);
	var post_content=content[0].post_content;
	var post_title=content[0].post_title;
	jQuery("#message-textarea").val(post_content);
	jQuery("#input-title").val(post_title);
	</script>
	
	
	
  <button type="button" class="btn  btn-action btn-success text-center " onclick="send_post()" style="background-color: #EF6262;border-color: #EF6262;" id="btsubmitpost" >Send Notification</button>
 </form>


<?php }

	
	 

function PushBIZ_login() {
	
include plugin_dir_path( __FILE__ ).'admin/login.php';
}
function PushBiz_Support() {
	
include plugin_dir_path( __FILE__ ).'admin/support.php';
}
function BIZ_Message() {

	
include plugin_dir_path( __FILE__ ).'admin/bizmessage.php';
}
function business_analytics() {
	
include plugin_dir_path( __FILE__ ).'admin/BIZAnalytics.php';
}


/* -- Registering forms --*/
		

function pushbiz_plugin_menu(){
		
		$page_title = "PushBIZ.IN";
		$menu_title = "PushBIZ.IN";
		$capability = 'activate_plugins';
		$menu_slug  = "pushBIZ";
	
		
		$GLOBALS['pushbiz_my_page'] = array();
		
		if(get_option( 'PushBIZ_firstCreation' ) == "")
		{ 
		$GLOBALS['pushbiz_my_page'][] = add_menu_page( __('Getting Started'), $menu_title, $capability, $menu_slug, array($this, 'PushBIZ_login'), plugins_url( PushBiz_APPNAME.'/admin/image/pb.jpg' ), 99 ); 	
		$GLOBALS['pushbiz_my_page'][] = add_submenu_page( $menu_slug, __('PushBiz Support'), __(''), $capability, 'PushBizSupport', array($this, 'PushBiz_Support') );
		}
		else
		{
		$GLOBALS['pushbiz_my_page'][] = add_menu_page( __('PushBIZ Message'), $menu_title, $capability, $menu_slug, array($this, 'BIZ_Message'), plugins_url( PushBiz_APPNAME.'/admin/image/pb.jpg' ), 99 ); 
		$GLOBALS['pushbiz_my_page'][] = add_submenu_page( $menu_slug, __('PushBIZ Overview'), __('PushBIZ Overview'), $capability, 'PushBIZ_Overview', array($this, 'business_analytics') );
		$GLOBALS['pushbiz_my_page'][] = add_submenu_page( $menu_slug, __('PushBIZ Support'), __('PushBiz Support'), $capability, 'PushBizSupport', array($this, 'PushBiz_Support') );
		}
		
	}
/* ----  /Admin Menu ------ */

function Pushbiz_css_and_js() {
wp_register_style('bootstrap_min', plugins_url( '/admin/css/bootstrap.min.css',__FILE__ ));
wp_enqueue_style('bootstrap_min');
wp_register_style('font_awesome', plugins_url( '/admin/css/font-awesome.css',__FILE__ ));
wp_enqueue_style('font_awesome');

wp_register_style('signupCustom', plugins_url( '/admin/css/signupCustom.css',__FILE__ ));
wp_enqueue_style('signupCustom');
wp_register_style('support', plugins_url( '/admin/css/support.css',__FILE__ ));
wp_enqueue_style('support');
wp_register_style('AnalysisBizClick', plugins_url( '/admin/css/AnalysisBizClick.css',__FILE__ ));
wp_enqueue_style('AnalysisBizClick');
wp_register_style('send_notification', plugins_url( '/admin/css/send-notification.css',__FILE__ ));
wp_enqueue_style('send_notification');	


wp_register_script('bootstrap_min_js', plugins_url( '/admin/js/bootstrap.min.js',__FILE__ ) );
wp_enqueue_script( 'bootstrap_min_js' );

wp_register_script( 'custom_script_admin', plugins_url( '/admin/js/script.admin.js', __FILE__ ));
wp_enqueue_script( 'custom_script_admin' );
wp_register_script( 'send_notification', plugins_url( '/admin/js/send-notification.js', __FILE__ ));
wp_enqueue_script( 'send_notification' );
wp_register_script( 'send_post', plugins_url( '/admin/js/send-post.js', __FILE__ ));
wp_enqueue_script( 'send_post' );
wp_register_script( 'send_mail', plugins_url( '/admin/js/sendmail.js', __FILE__ ));
wp_enqueue_script( 'send_mail' );
wp_register_script( 'Support_js', plugins_url( '/admin/js/Support.js', __FILE__ ));
wp_enqueue_script( 'Support_js' );

}



}//END CLASS
register_activation_hook(__FILE__,'Pushbiz_install'); 

/* Runs on plugin deactivation*/
register_deactivation_hook( __FILE__, 'Pushbiz_remove' );

function Pushbiz_install() {
/* Creates new database field */
add_option("PushBIZ_firstCreation");
add_option("VarPushBIZapikey");
add_option("PushBIZRegUrl");
}

function Pushbiz_remove() {
/* Deletes the database field */

delete_option('PushBIZ_firstCreation');
delete_option('VarPushBIZapikey');
delete_option('PushBIZRegUrl');



}
	function Push_Bizclass(){
		global $Push_Bizclass;

		if( !isset($Push_Bizclass) ){
			$Push_Bizclass = new Push_Bizclass();
		}

		return $Push_Bizclass;
	}


	if (class_exists("Push_Bizclass")){
		$PushBiz_mobile = new Push_Bizclass();
	}

