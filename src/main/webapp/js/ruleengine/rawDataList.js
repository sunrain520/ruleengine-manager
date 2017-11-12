$(function () {
    $("#tt_rawdata").datagrid({
        url: "api/ruleengine/rawdata/list",
        height: $("#rawdata_body").height() - $('#rawdata_search_area').height() - 5,
        width: $("#rawdata_body").width(),
        method: "get",
        singleSelect: true,
        nowrap: false,
        fitColumns: false,
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
                width: 100,
                halign: "center",
                align: "left"
            },
            {
                field: 'fInterfaceName',
                title: '接口名称',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fRespRetcode',
                title: '返回码',
                width: 100,
                halign: "center",
                align: "left"
            },
            // {
            //     field: 'fReqContent',
            //     title: '请求体',
            //     width: 350,
            //     halign: "center",
            //     align: "left"
            // },
            // {
            //     field: 'fRespContent',
            //     title: '返回结果',
            //     width: 350,
            //     halign: "center",
            //     align: "left"
            // },
            {
                field: 'fCostTime',
                title: '耗时(毫秒)',
                width: 100,
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
                field: 'fDataSource',
                title: '数据源',
                width: 120,
                halign: "center",
                align: "left"
            }
        ]],
        onDblClickRow: function (rowIndex, row) {
            if (row){
                $("#fAutoId").textbox('setValue',row.fAutoId);
                $("#fReqId").textbox('setValue',row.fReqId);
                $("#fInterfaceName").textbox('setValue',row.fInterfaceName);
                $("#fReqContent").textbox('setValue',row.fReqContent);
                $("#fRespContent").textbox('setValue',row.fRespContent);
                $("#fRemark").textbox('setValue',row.fRemark);
            }
            $('#dlg').dialog('open').dialog('setTitle','原始数据信息');
        },
        pagination: true
    });
    $("#searchrawdata").on('click', function () {
        var tableName = $('#rawdataTableMonth').val();
        if(tableName == ''){
            $.messager.alert('警告','月份不能为空！');
            return;
        }
        var ruleId = $('#rawdataRuleId').combobox('getValue').trim();
        var reqId = $('#rawdataReqId').val().trim();
        var interfaceName = $('#rawdataInterfaceName').val().trim();
        $('#tt_rawdata').edatagrid('load', {
            tableName:tableName,
            ruleId:ruleId,
            reqId:reqId,
            interfaceName:interfaceName
        });
    });
});
//监听窗口大小变化
window.onresize = function () {
    setTimeout(domresize, 300);
};
//改变表格宽高
function domresize() {
    $('#tt_rawdata').datagrid('resize', {
        height: $("#rawdata_body").height() - $('#rawdata_search_area').height() - 5,
        width: $("#rawdata_body").width()
    });
}
