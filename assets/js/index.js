$(function() {
    // 获取用户信息
    getUserInfo();

    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            // 请求头
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success: function(res) {
                console.log(res);
                // 判断是否获取成功
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 渲染用户信息
                renderAvatar(res.data);
            }
        });
    }
    // ----------------------------------
    // 渲染用户信息
    function renderAvatar(user) {
        console.log(user);
        // 获取用户的名称 有nickname就用nickname，没有就用username
        var name = user.nickname || user.username;
        // 渲染欢迎语
        $('#welcome').html('欢迎 ' + name);
        // 渲染头像
        if (user.user_pic !== null) {
            // 渲染图片头像 隐藏文字
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            // 渲染文字头像 隐图片
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
            $('.layui-nav-img').hide();
        }
    };









});