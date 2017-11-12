$(function () {
    $("#searchuserinfo").on('click', function () {
        var workNum = $('#workNum').val();
        var url = "api/user/userinfo?workNum=" + workNum;
        if(workNum){
            $.ajax({
                type: 'get',
                url: url,
                success: function (res) {
                    var result = JSON.parse(res);
                    var user = result.data;
                    if(result.code == 200){
                        $("#fWorkNum").textbox('setValue',user.workNum);
                        $("#fName").textbox('setValue',user.name);
                        $("#fMobile").textbox('setValue',user.mobile);
                        $("#fEmail").textbox('setValue',user.email);
                        $("#fDept").textbox('setValue',user.deptHier);
                    }else{
                        $.messager.alert('警告','查询失败：'+result.msg);
                    }
                }
            });
        }else{
            $.messager.alert('警告','工号不能为空！');
        }
    });
});
