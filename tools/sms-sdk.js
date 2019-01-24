/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const sms_conf = require('../config').sms
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = sms_conf.accessKeyId
const secretAccessKey = sms_conf.secretAccessKey
//初始化sms_client
if (sms_conf.enable) {
    const SMSClient = require('@alicloud/sms-sdk')
    let smsClient = new SMSClient({ accessKeyId, secretAccessKey })
}
const Model = require('../db/schemas/sms')
/**
 * 检查验证码是否过期
 * @param {*} phone 
 * @param {*} challengecode 
 */
const CheckChallengecode = (phone, challengecode) => {
    let result = Model.findOne({ phone: phone, challengecode: challengecode })
    if (!result)
        return false
    let diff = Date.now() - parseInt(result.createTime)
    let minutes = (diff / (1000 * 60));
    if (minutes > sms_conf.expired) {
        return false
    }
    return true
}

/**
 * 生成指定位数位随机验证码
 * @param {*} maxLength 
 */
const GenerateChallengecode = (maxLength) => {
    var Challengecode = "";
    for (var i = 0; i < maxLength; i++) {
        Challengecode += Math.floor(Math.random() * 10);
    }
    return Challengecode;
}

/**
 * 发送短信验证码
 * @param {*} phone 
 */
const SendPhoneMessage = phone => {
    let generateChallengecode = GenerateChallengecode(5);
    let model = new Model({
        username: null,
        phone: phone,
        challengecode: generateChallengecode,
        Status: 0
    })
    let result = smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: '阿威',
        TemplateCode: 'SMS_117520206',
        TemplateParam: JSON.stringify({ code: generateChallengecode })
    })
    if (result === 'OK') {
        //处理返回参数
        model.save()
        setTimeout(() => {
            Model.remove({ phone: phone, challengecode: GenerateChallengecode })
        }, sms_conf.expired)//过期
    }
}

module.exports = {
    SendPhoneMessage,
    CheckChallengecode
}
