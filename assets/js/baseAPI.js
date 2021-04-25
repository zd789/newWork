//ajax的预处理函数
$.ajaxPrefilter(function(options) {
    // 统一设置请求的url地址，根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        // ---------------------------
        // 设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // ------------------------------------
    options.complete = function(res) {
        console.log(res);
        console.log(res.responseJSON);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清除本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html'
        }
    }

});