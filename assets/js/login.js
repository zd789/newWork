$(function() {
    // alert('ok');
    // 1.登录表单和注册表单之间的切换
    // 单击“ 去注册”
    // $('#link_reg').on('click', function() {
    //     // 注册表单显示
    //     $('.reg-box').show();
    //     // 登录表单隐藏
    //     $('.login-box').hide();
    // });
    // // 单击“ 去登录”
    // $('#link_login').on('click', function() {
    //     // 登录表单显示
    //     $('.login-box').show();
    //     // 注册表单隐藏
    //     $('.reg-box').hide();
    // });
    $('#link_reg,#link_login').on('click', function() {
        $('.login-box,.reg-box').toggle();

    });
    // 2.自定义表单校验规则
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须是6-12位的非空字符'
        ],
        repwd: function(value, item) {
            var pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码必须一致'
            }
        }
    });
    // 3.注册功能
    // (1)给注册表单绑定submit事件
    $('#form_reg').on('submit', function(e) {
        // （2）阻止表单默认行为
        e.preventDefault();
        // （3）.手机表单数据
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password: $('#form_reg [name=password]').val().trim()
        };
        // （4）发送ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,

            success: function(res) {
                console.log(res);
                // （5）.判断是否成功
                if (res.status !== 0) {
                    // return alert('注册失败');
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // (6)触发“去登录”按钮的点击事件
                return layui.layer.msg('注册用户成功', { icon: 6 }, function() {
                    //弹窗关闭后执行的回调函数
                    $('#link_login').click();
                });

            }
        })
    });
    // 4.登录功能
    // (1)给登录表单绑定submit事件
    $('#form_login').on('submit', function(e) {
        // （2）阻止表单默认行为
        e.preventDefault();
        // （3）收集表单数据
        var data = $(this).serialize();
        // （4）发送ajax数据
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                };
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 把token保存到本地存储
                    localStorage.setItem('token', res.token);
                    // 跳转到后台首页
                    location.href = '/index.html';
                })
            }
        })
    })









})