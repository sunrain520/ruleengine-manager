$(function () {
    $("#tt_score").edatagrid({
        url: "api/ruleengine/scoredegree/list",
        destroyUrl:'api/ruleengine/scoredegree/delete',
        height: $("#score_body").height() - $('#score_search_area').height() - 5,
        width: $("#score_body").width(),
        method: "get",
        singleSelect: true,
        fitColumns: false,
        nowrap:false,
        rownumbers: true,
        idField:"fAutoId",
        pageSize: 20,
        showPageList: true,
        columns: [[
            {
                field: 'fRuleId',
                title: '规则类型',
                width: 150,
                halign: "center",
                align: "left",
                editor: {type: 'validatebox', options: {required: true}}
            },
            {
                field: 'fRuleItemId',
                title: '规则项ID',
                width: 150,
                halign: "center",
                align: "left",
                editor: {type: 'numberbox', options: {required: true}}
            },
            {
                field: 'fDegree',
                title: '等级',
                width: 100,
                halign: "center",
                align: "left",
                editor: {type: 'validatebox', options: {required: true}}
            },
            {
                field: 'fLeftInterval',
                title: '分值左区间',
                width: 100,
                halign: "center",
                align: "left",
                editor: {type: 'numberbox', options: {required: true}}
            },
            {
                field: 'fRightInterval',
                title: '分值右区间',
                width: 200,
                halign: "center",
                align: "left",
                editor: {type: 'numberbox', options: {required: true}}
            },
            {
                field: 'fPeriod',
                title: '期限',
                width: 100,
                halign: "center",
                align: "left",
                editor: {type: 'numberbox', options: {required: false}}
            },
            {
                field: 'fCoefficient',
                title: '系数',
                width: 100,
                halign: "center",
                align: "left",
                editor: {type: 'numberbox', options: {required: true,precision:3}}
            },
            {
                field: 'fCreditLimit',
                title: '授信额度',
                width: 100,
                halign: "center",
                align: "left",
                editor: {type: 'numberbox', options: {required: true}}
            },
            {
                field: 'fRemark',
                title: '备注',
                width: 250,
                halign: "center",
                align: "left",
                editor: {type: 'validatebox', options: {required: false}}
            }
        ]],
        toolbar: '#tt_score_btn',
        pagination: true
    });
    $("#searchScore").on('click', function () {
        var ruleId = $('#scoreRuleId').combobox('getValue').trim();
        var itemId = $("#scoreItemId").val().trim();
        var degree = $("#scoreDegree").val().trim();
        var remark = $("#scoreRemark").val().trim();
        $('#tt_score').edatagrid('load', {
            ruleId:ruleId,
            itemId:itemId,
            degree: degree,
            remark: remark
        });
    });

    $("#saveScore").on('click', function () {
        var row = $('#tt_score').datagrid('getSelected');
        var rowIndex = $('#tt_score').datagrid('getRowIndex', $("#tt_score").datagrid('getSelected'));
        $('#tt_score').datagrid("endEdit", rowIndex);
        var url = "api/ruleengine/scoredegree/add";
        if(row.fAutoId){ //更新
            url = "api/ruleengine/scoredegree/update";
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
    $('#tt_score').edatagrid('resize', {
        height: $("#score_body").height() - $('#score_search_area').height() - 5,
        width: $("#score_body").width()
    });
}
