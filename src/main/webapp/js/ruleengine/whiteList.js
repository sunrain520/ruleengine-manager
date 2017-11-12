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
    $("#tt_whiteList").edatagrid({
        // url: "api/ruleengine/whitelist",
        height: $("#whiteList_body").height() - $('#whiteList_search_area').height() - 5,
        width: $("#whiteList_body").width(),
        method: "get",
        singleSelect: true,
        fitColumns: false,
        nowrap:false,
        rownumbers: true,
        pageSize: 20,
        idField:"fIdNum",
        showPageList: true,
        columns: [[
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
                align: "center",
                editor: {type: 'validatebox', options: {required: false}}
            },
            {
                field: 'fMobile',
                title: '手机号',
                width: 150,
                halign: "center",
                align: "center",
                editor: {type: 'validatebox', options: {required: false}}
            },
            {
                field: 'fCompany',
                title: '公司',
                width: 300,
                halign: "center",
                align: "center",
                editor: {type: 'validatebox', options: {required: false}}
            },
            {
                field: 'fPosition',
                title: '职位',
                width: 150,
                halign: "center",
                align: "center",
                editor: {type: 'validatebox', options: {required: false}}
            },
            {
                field: 'fState',
                title: '状态',
                width: 150,
                halign: "center",
                align: "center",
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'state',
                        textField: 'desc',
                        data: [{
                            desc: "有效",
                            state: "1"
                        },{
                            desc: "删除",
                            state: "2"
                        }],
                        required: true
                    }
                },
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
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'state',
                        textField: 'desc',
                        data: [{
                            desc: "集团白名单",
                            state: "1"
                        }],
                        required: true
                    }
                },
                formatter: function (value, row) {
                    if(value == 1){
                        return "集团白名单";
                    }else {
                        return "集团白名单";
                    }
                }
            },
            {
                field: 'fCreateUser',
                title: '创建人',
                width: 150,
                halign: "center",
                align: "center"
            },
            {
                field: 'fCreateTime',
                title: '创建时间',
                width: 150,
                halign: "center",
                align: "center",
                formatter:function (value) {
                    return formatDatebox(value);
                }
            }
        ]],
        toolbar: '#tt_whiteList_btn',
        pagination: true
    });
    $("#searchwhiteList").on('click', function () {
        var mobile = $('#mobile').val().trim();
        var idNum = $('#idNum').val().trim();
        var name = $('#name').val().trim();

        if (idNum == '') {
            $.messager.alert('警告', '身份证号不能为空！');
            return;
        }
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(idNum) === false)
        {
            $.messager.alert('警告', '身份证输入不合法！');
            return;
        }

        var opts=$("#tt_whiteList").datagrid("options");
        opts.url="api/ruleengine/whitelist?t="+formatDatebox(new Date());
        opts.queryParams = {
            mobile:mobile,
            idNum:idNum,
            name:name
        };
        var p = $('#tt_whiteList').datagrid('getPager');
        if (p){
            $(p).pagination({ //设置分页功能栏
                showRefresh:false
            });
        }
        if(idNum){
            $("#tt_whiteList").datagrid("load");
        }else{
            $.messager.alert('警告','身份证号不能为空！');
        }
    });

    $("#deleteWhiteList").on('click', function () {
    	var row = $('#tt_whiteList').datagrid('getSelected');
    	var data = {
    			fIdNum:row.fIdNum,
    			fAppId:row.fAppId,
    			fIdIndex:row.fIdIndex
    	};
    	
    	var url = "api/ruleengine/whitelist/delete";
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
    			$('#tt_whiteList').edatagrid('reload')
    		}
    	});
    });
    
    $("#savewhiteList").on('click', function () {
        var row = $('#fm').serialize();

        var mobile = $("#fMobile").val();
        var idNum = $("#fIdNum").val();
        var name = $("#fName").val();
        var type = $('#fType').combobox('getValue').trim();;

        if (idNum == '') {
            $.messager.alert('警告', '身份证号不能为空！');
            return;
        }

        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(idNum) === false)
        {
            $.messager.alert('警告', '身份证输入不合法！');
            return;
        }

        if (mobile == '') {
            $.messager.alert('警告', '手机号不能为空！');
            return;
        }

        if(!(/^1[34578]\d{9}$/.test(mobile))){
            $.messager.alert('警告', '手机号格式不对！');
            return;
        }

        if (name == '') {
            $.messager.alert('警告', '姓名不能为空！');
            return;
        }

        if(type =='' || type != '1' ){
            $.messager.alert('警告', '名单类型输入不符合要求！');
            return;
        }

        var url = "api/ruleengine/whitelist/save";
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

    $("#saveWhiteListBtn").on('click', function () {
        var row = $('#tt_whiteList').datagrid('getSelected');
        var rowIndex = $('#tt_whiteList').datagrid('getRowIndex', $("#tt_whiteList").datagrid('getSelected'));
        $('#tt_whiteList').datagrid("endEdit", rowIndex);

        var mobile = row.fMobile;
        var name = row.fName;
        var type = row.fType;

        if (mobile == '') {
            $.messager.alert('警告', '手机号不能为空！');
            $("#tt_whiteList").datagrid("load");
            return;
        }

        if(!(/^1[34578]\d{9}$/.test(mobile))){
            $.messager.alert('警告', '手机号格式不对！');
            $("#tt_whiteList").datagrid("load");
            return;
        }

        if (name == '') {
            $.messager.alert('警告', '姓名不能为空！');
            $("#tt_whiteList").datagrid("load");
            return;
        }

        if(type =='' || type != '1' ){
            $.messager.alert('警告', '名单类型输入不符合要求！');
            $("#tt_whiteList").datagrid("load");
            return;
        }

        var url = "api/ruleengine/whitelist/save";
        row.fCreateTime = new Date(row.fCreateTime); //解决spring mvc 接收日期格式问题
        row.fUpdateTime = new Date(row.fUpdateTime);
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

    $("#importBtn").on('click', function () {
        if($("#file").val()==""){
            $.messager.alert("提示","请选择文件夹");
            return false;
        }
        $('#dlg').dialog('close');
        $("#whiteList_body").showLoading();
        $("#uploadForm").ajaxSubmit({
            type:"post",  //提交方式
            url:"api/ruleengine/whitelist/import", //请求url
            success:function(res){ //提交成功的回调函数
                var result = JSON.parse(res);
                $("#whiteList_body").hideLoading();
                if(result.code == 200){
                    var data = result.data;
                    $.messager.alert('提示','导入成功：'+ data.successCount +"条，失败："+data.failCount);
                }else{
                    $.messager.alert('警告','导入失败：'+result.msg);
                }
            }
        });
    });
});
function resetFileInput(file){ file.after(file.clone().val("")); file.remove(); }

function savewhiteList(){
    $('#dlg').dialog('open').dialog('center').dialog('setTitle','白名单录入');
    var file = $("#file") ;
    resetFileInput(file);
    $('#fm').form('clear');
}

//监听窗口大小变化
window.onresize = function () {
    setTimeout(domresize, 300);
};
//改变表格宽高
function domresize() {
    $('#tt_whiteList').edatagrid('resize', {
        height: $("#whiteList_body").height() - $('#whiteList_search_area').height() - 5,
        width: $("#whiteList_body").width()
    });
}
