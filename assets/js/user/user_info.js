$(function() {
    // alert('ok');
    // 1.获取用户信息
    // （1）获取信息
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                // 判断是否获取成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 把信息展示到表单
                // $('[name=username]').val(res.data.username);
                // $('[name=nickname]').val(res.data.nickname);
                // $('[name=email]').val(res.data.email);
                // $('[name=id]').val(res.data.id);
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    // --------------------------
    // 2.重置表单数据
    $('#btnReset').on('click', function(e) {
        // 阻止默认行为 （重置按钮的默认行为是情况表单项）
        e.preventDefault();
        // 重新获取用户信息 重新赋值
        initUserInfo();
    });
    //自定义一个验证昵称长度的规则
    layui.form.verify({
        nickname: function(value, item) {
            // value是昵称的值
            // 判断value的长度，不能超过六个字符
            if (value.length > 6) {
                return '昵称不能超过6个字符'
            }
        }
    });
    // ---------------------------------
    // 3.完成用户的修改功能
    $('.layui-form').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 获得所有的表单信息
        var data = $(this).serialize();
        console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                console.log(res);
                // 判断是否获取成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 });
                //window.parent 父页面对应的window对象
                window.parent.getUserInfo();
            }
        });






    })











});