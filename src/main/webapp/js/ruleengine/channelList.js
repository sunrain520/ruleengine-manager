$(function () {
    var datagrid = $("#tt_channel").edatagrid({
        url: "api/ruleengine/channel/list",
        // updateUrl: 'api/ruleengine/channel/update',
        // saveUrl: 'api/ruleengine/channel/add',
        height: $("#channel_body").height() - 5,
        width: $("#channel_body").width(),
        method: "get",
        singleSelect: true,
        fitColumns: true,
        nowrap:false,
        rownumbers: true,
        idField:"fAutoId",
        pageSize: 20,
        showPageList: true,
        columns: [[
            {
                field: 'fChannelId',
                title: '渠道ID',
                width: 150,
                halign: "center",
                align: "center",
                editor: {type: 'validatebox', options: {required: true}}
            },
            {
                field: 'fChannelName',
                title: '渠道名称',
                width: 150,
                halign: "center",
                align: "center",
                editor: {type: 'validatebox', options: {required: true}}
            },
            {
                field: 'fCoefficient',
                title: '系数',
                width: 100,
                halign: "center",
                align: "center",
                editor: {type: 'numberbox', options: {required: true,precision:2}}
            }
        ]],
        toolbar: '#tt_channel_btn',
        pagination: true
    });
    $("#saveChannel").on('click', function () {
        var row = $('#tt_channel').datagrid('getSelected');
        var rowIndex = $('#tt_channel').datagrid('getRowIndex', $("#tt_channel").datagrid('getSelected'));
        $('#tt_channel').datagrid("endEdit", rowIndex);
        var url = "api/ruleengine/channel/add";
        if(row.fAutoId){ //更新
            url = "api/ruleengine/channel/update";
            row.fCreateTime = new Date(row.fCreateTime); //解决spring mvc 接收日期格式问题
            row.fUpdateTime = new Date(row.fUpdateTime);
        }
        $.ajax({
            type: 'post',
            url: url,
            data:row,
            success: function (res) {
                var result = JSON.parse(res);
                if(result.code == 200){
                    $.messager.alert('提示','保存成功');
                }else{
                    $.messager.alert('警告','保存失败：'+result.msg);
                }
            }
        });
    });
});

//监听窗口大小变化
window.onresize = function () {
    setTimeout(domresize, 300);
};
//改变表格宽高
function domresize() {
    $('#tt_channel').edatagrid('resize', {
        height: $("#channel_body").height()- 5,
        width: $("#channel_body").width()
    });
}
