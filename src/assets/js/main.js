import $ from "jquery";
import qs from 'qs';
import nprogress from 'nprogress';

// Setup
window.jQuery = window.$ = $;


const qsRes = qs.parse(location.search, {ignoreQueryPrefix: true})

const clientName = qsRes['clientName'] || "客户";


$('#clientName').text(clientName)

// Environmental
if(process.env.NODE_ENV === 'development'){
	require("./devonly/dev");
}

// Components & Modules
require("./modules/lazyload");
require("./modules/validation");
require("./modules/mobilemenu");


