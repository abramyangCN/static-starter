import $ from "jquery";
import qs from "qs";
import NProgress from "nprogress";
import { setWechatConfig } from "./wechatJSSDK";

NProgress.configure({
	easing: "ease",
	speed: 500,
	parent: "#loadingBar",
	showSpinner: false,
});

window.onload = () => {
	setTimeout(() => {
		NProgress.done();
		setTimeout(() => {
			$("#loading").fadeOut(500);
		}, 500);
	}, 1000);
};

$(document).ready(() => {
	NProgress.start();
});

const shareData = {
	title: $("title").html(),
	desc: $("meta[name=description]").attr("content"),
	img: $("meta[property=wximg]").attr("content"),
	link: window.location.href.split("#")[0],
};

console.log(shareData)

setWechatConfig(shareData);

// Setup
window.jQuery = window.$ = $;

const qsRes = qs.parse(location.search, { ignoreQueryPrefix: true });

const clientName = qsRes["clientName"] || "客户";

$("#clientName").text(clientName);

// Environmental
if (process.env.NODE_ENV === "development") {
	require("./devonly/dev");
}

// Components & Modules
require("./modules/lazyload");
require("./modules/validation");
require("./modules/mobilemenu");
