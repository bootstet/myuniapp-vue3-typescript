// const CaptchaAppId = '191830319' 
const CaptchaAppId = '194430043' // VTT

let captcha = ''
    /**
     * 定义验证码触发
     * @params 
     * sliderCallBack 外部自定义回调函数处理成功or失败后的逻辑
     */
    //  
export function createTxCaptcha(sliderCallBack) {
    try {
        // 生成一个验证码对象tx
        // CaptchaAppId：登录验证码控制台，从【验证管理】页面进行查看。如果未创建过验证，请先新建验证。注意：不可使用客户端类型为小程序的CaptchaAppId，会导致数据统计错误。
        //callback：定义的回调函数
        captcha = new TencentCaptcha(CaptchaAppId, sliderCallBack, {});
        // 调用方法，显示验证码
        captcha.show();
    } catch (error) {
        console.error(error)
        // 加载异常，调用验证码js加载错误处理函数
        // loadErrorCallback(sliderCallBack);
        let appid = CaptchaAppId
        // 生成容灾票据或自行做其它处理
        let ticket = 'terror_1001_' + appid + '_' + Math.floor(new Date().getTime() / 1000);

        // res（用户主动关闭验证码）= {ret: 2, ticket: null}
        // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        // res（请求验证码发生错误，验证码自动返回terror_前缀的容灾票据） = {ret: 0, ticket: "String", randstr: "String",  errorCode: Number, errorMessage: "String"}
        sliderCallBack({
            ret: 0,
            randstr: '@'+ Math.random().toString(36).substr(2),
            ticket: ticket,
            errorCode: 1001,
            errorMessage: 'jsload_error'
        });
    }
}
