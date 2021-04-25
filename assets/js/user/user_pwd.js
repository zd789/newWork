// 设置入口函数
$(function() {
    // alert('ok');
    // 1.定义保单校验规则
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须是6-12位的非空字符'
        ],
        samePwd: function(value) {
            //新旧密码不能一致
            // value是新密码
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        rePwd: function(value) {
            // value确认密码
            if (value != $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    });
    // 2.完成密码更改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    $('.layui-form')[0].reset()
                })
            },

        });
    });
})