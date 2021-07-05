import axios from "axios";

const getWechatJsConfig = (params) => {
	return axios.get(
		`https://projects.archisense.cn/wechat/api/share-proxy2.php`,
		{ params }
	);
};

export const setWechatConfig = (meta) => {
	getWechatJsConfig({ url: window.location.href.split("#")[0] }).then(
		(res) => {
			try {
				res = res.data;
				wx.config({
					debug: false,
					appId: res.appId,
					timestamp: res.timestamp,
					nonceStr: res.nonceStr,
					signature: res.signature,
					jsApiList: [
						"onMenuShareTimeline",
						"onMenuShareAppMessage",
						"openLocation",
					],
				});
			} catch (err) {
				return false;
			}
			const metaData = {
				title: meta["title"] || "",
				desc: meta["desc"] || "",
				img: meta["img"] || "",
				link: meta["link"] || "",
			};
			wx.ready(function () {
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: metaData.title, // 分享标题fxtitle
					link: metaData.link, // 分享链接
					imgUrl: metaData.img, // 分享图标
					type: "", // 分享类型,music、video或link，不填默认为link
					dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {},
					cancel: function () {},
				});
				//分享给单个朋友
				wx.onMenuShareAppMessage({
					title: metaData.title, // 分享标题
					desc: metaData.desc, // 分享描述
					link: metaData.link, // 分享链接
					imgUrl: metaData.img, // 分享图标
					type: "", // 分享类型,music、video或link，不填默认为link
					dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {},
					cancel: function () {
						// alert('123')
					},
				});
			});
		}
	);
};
