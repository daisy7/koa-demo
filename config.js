'use strict';
module.exports = {
	port: '5757',
	rootPathname: '',

	// 微信小程序 App ID
	appId: '',

	// 微信小程序 App Secret
	appSecret: '',

	// 是否使用腾讯云代理登录小程序
	useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
	mysql: {
		host: 'localhost',
		port: 3306,
		user: 'root',
		db: 'cAuth',
		pass: '',
		char: 'utf8mb4'
	},

	cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
		region: 'ap-guangzhou',
		// Bucket 名称
		fileBucket: 'qcloudtest',
		// 文件夹
		uploadFolder: ''
	},

	//服务器 Host
	serverHost: "",
	//信道服务器地址
	tunnelServerUrl: "",
	//信道服务签名
	tunnelSignatureKey: "",
	//腾讯云 AppId
	qcloudAppId: "",
	//腾讯云 SecretId
	qcloudSecretId: "",
	//腾讯云 SecretKey
	qcloudSecretKey: "",

	// 微信登录态有效期
	wxLoginExpires: 7200,
	wxMessageToken: 'abcdefgh',

	//mongodb配置
	mongodb: {
		host: "mongodb://10.185.67.136/demo"
	},

	//redis配置
	redis: {
		enable: false,
		host: "10.146.173.156",
		port: 6379,
		expired: 300
	},

	//短信配置
	sms: {
		enable: false,
		accessKeyId: '',
		secretAccessKey: '',
		expired: 5000
	}
}
