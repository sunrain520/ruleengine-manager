Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
function formatDatebox(value) {
    if (value == null || value == '') {
        return '';
    }
    var dt;
    if (value instanceof Date) {
        dt = value;
    } else {
        dt = new Date(value);
    }
    return dt.format("yyyy-MM-dd hh:mm:ss"); //扩展的Date的format方法(上述插件实现)
}
$(function () {
    $("#tt_reject").edatagrid({
        url: "api/ruleengine/reject/list",
        height: $("#reject_body").height() - $('#reject_search_area').height() - 5,
        width: $("#reject_body").width(),
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
                field: 'fAutoId',
                title: 'ID',
                width: 150,
                halign: "center",
                align: "center"
            },
            {
                field: 'fRuleId',
                title: '规则类型',
                width: 250,
                halign: "center",
                align: "center",
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
                field: 'fIdNum',
                title: '身份证号',
                width: 250,
                halign: "center",
                align: "center"
            },
            {
                field: 'fName',
                title: '姓名',
                width: 150,
                halign: "center",
                align: "center"
            },
            {
                field: 'fMobile',
                title: '手机号',
                width: 150,
                halign: "center",
                align: "center"
            },
            {
                field: 'fReason',
                title: '拒绝理由',
                width: 300,
                halign: "center",
                align: "left"
            },
            {
                field: 'fExpireDate',
                title: '拒绝到期日期',
                width: 150,
                halign: "center",
                align: "center",
                formatter:function (value) {
                    return formatDatebox(value);
                }
            },
            {
                field: 'fState',
                title: '状态',
                width: 150,
                halign: "center",
                align: "center",
                formatter: function (value, row) {
                    if(value == 1){
                        return "有效";
                    }else if(value == 2){
                        return "删除";
                    }
                    return value;
                }
            },
            {
                field: 'fType',
                title: '类型',
                width: 250,
                halign: "center",
                align: "center",
                formatter: function (value, row) {
                    if(value == 1){
                        return "不受理名单";
                    }else if(value == 2){
                        return "黑名单";
                    }
                    return value;
                }
            },
            {
                field: 'fSubType',
                title: '子类型',
                width: 250,
                halign: "center",
                align: "center",
                formatter: function (value, row) {
                    if(value == 0){
                        return "无分类";
                    }else if(value == 1){
                        return "外部机构输入";
                    }else if(value == 2){
                        return "牛贷系严重逾期";
                    }else if(value == 3){
                        return "骗贷中介";
                    }else if(value == 4){
                        return "非法失信";
                    }else if(value == 5){
                        return "集团线下黑名单";
                    }else if(value == 6){
                        return "贷后提报欺诈";
                    }else if(value == 7){
                        return "其它";
                    }
                    return value;
                }
            }
        ]],
        toolbar: '#tt_reject_btn',
        pagination: true
    });
    $("#searchreject").on('click', function () {
        var ruleId = $('#rejectRuleId').combobox('getValue').trim();
        var idNum = $('#idNum').val().trim();
        var reason = $('#rejectReason').val().trim();
        if(idNum){
            $('#tt_reject').edatagrid('load', {
                ruleId:ruleId,
                idNum:idNum,
                reason:reason
            });
        }else{
            $.messager.alert('警告','身份证号不能为空！');
        }
    });
    
    $("#deleteReject").on('click', function () {
    	var row = $('#tt_reject').datagrid('getSelected');
    	var data = {
    			fIdNum:row.fIdNum,
    			fAutoId:row.fAutoId
    	};
    	
    	var url = "api/ruleengine/rejectlist/delete";
    	$.ajax({
    		type: 'post',
    		url: url,
    		data:data,
    		success: function (res) {
    			var result = JSON.parse(res);
    			if(result.code == 200){
    				$.messager.alert('提示','删除成功');
    			}else{
    				$.messager.alert('警告','删除失败：'+result.msg);
    			}
    			$('#tt_reject').edatagrid('reload')
    		}
    	});
    });
    
    $("#saveReject").on('click', function () {
        var row = $('#fm').serialize()
        var url = "api/ruleengine/rejectlist/save";
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
                $('#dlg').dialog('close');
            }
        });
    });
});
function saveReject(){
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','拒绝名单录入');
    $('#fm').form('clear');
}
//监听窗口大小变化
window.onresize = function () {
    setTimeout(domresize, 300);
};
//改变表格宽高
function domresize() {
    $('#tt_reject').edatagrid('resize', {
        height: $("#reject_body").height() - $('#reject_search_area').height() - 5,
        width: $("#reject_body").width()
    });
}
