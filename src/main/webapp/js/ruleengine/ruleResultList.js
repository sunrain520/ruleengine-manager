$(function () {
    $("#tt_ruleResult").edatagrid({
        url: "api/ruleengine/ruleresult/list",
        height: $("#ruleResult_body").height() - $('#ruleResult_search_area').height() - 5,
        width: $("#ruleResult_body").width(),
        method: "get",
        singleSelect: true,
        nowrap: true,
        fitColumns: false,
        nowrap:false,
        rownumbers: true,
        idField:"fAutoId",
        pageSize: 20,
        showPageList: true,
        columns: [[
            {
                field: 'fAutoId',
                title: 'ID',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fReqId',
                title: '流水ID',
                width: 250,
                halign: "center",
                align: "left"
            },
            {
                field: 'fRuleId',
                title: '规则类型',
                width: 150,
                halign: "center",
                align: "left",
                formatter: function (value, row) {
                    if(value == '' || value ==null){
                        value = "手工录入";
                    }else{
                        if(value.indexOf("PreSimpleAccess")!=-1){
                            return "预审批-简单准入";
                        }else if(value.indexOf("PreAccess")!=-1){
                            return "预审批-准入";
                        }else if(value.indexOf("PreBlackList")!=-1){
                            return "预审批-黑名单";
                        }else if(value.indexOf("PreAntiFraud")!=-1){
                            return "预审批-反欺诈";
                        }else if(value.indexOf("PreApprove")!=-1){
                            return "预审批-审批";
                        }else if(value.indexOf("PreScoreCard")!=-1){
                            return "预审批-评分卡";
                        }else if(value.indexOf("PreCreditLimit")!=-1){
                            return "预审批-额度";
                        }else if(value.indexOf("SimpleAccess")!=-1){
                            return "简单准入";
                        }else if(value.indexOf("Access")!=-1){
                            return "准入";
                        }else if(value.indexOf("BlackList")!=-1){
                            return "黑名单";
                        }else if(value.indexOf("AntiFraud")!=-1){
                            return "反欺诈";
                        }else if(value.indexOf("Approve")!=-1){
                            return "审批";
                        }else if(value.indexOf("ScoreCard")!=-1){
                            return "评分卡";
                        }else if(value.indexOf("CreditLimit")!=-1){
                            return "额度规则";
                        }else if(value.indexOf("PostLoan")!=-1){
                            return "贷后规则";
                        }
                    }
                    return value;
                }
            },
            {
                field: 'fRuleItemId',
                title: '规则项ID',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fIdNum',
                title: '身份证号',
                width: 250,
                halign: "center",
                align: "left"
            },
            {
                field: 'fCostTime',
                title: '耗时(毫秒)',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fRuleResult',
                title: '是否通过',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fRuleScore',
                title: '分数',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fRemark',
                title: '备注',
                width: 300,
                halign: "center",
                align: "left"
            },
            {
                field: 'fVersion',
                title: '规则项版本号',
                width: 120,
                halign: "center",
                align: "left"
            }
        ]],
        pagination: true
    });
    $("#searchRuleResult").on('click', function () {
        var tableName = $('#ruleResultTableMonth').val().trim();
        if(tableName == ''){
            $.messager.alert('警告','月份不能为空！');
            return;
        }
        var ruleId = $('#ruleResultRuleId').combobox('getValue').trim();
        var reqId = $('#ruleResultReqId').val().trim();
        var idNum = $('#ruleResultIdNum').val().trim();

        $('#tt_ruleResult').edatagrid('load', {
            tableName:tableName,
            ruleId:ruleId,
            reqId:reqId,
            idNum:idNum
        });
    });
});
//监听窗口大小变化
window.onresize = function () {
    setTimeout(domresize, 300);
};
//改变表格宽高
function domresize() {
    $('#tt_ruleResult').edatagrid('resize', {
        height: $("#ruleResult_body").height() - $('#ruleResult_search_area').height() - 5,
        width: $("#ruleResult_body").width()
    });
}
