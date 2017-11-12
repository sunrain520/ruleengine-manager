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
    $("#tt_operatelog").datagrid({
        url: "api/user/operatelogs",
        height: $("#operatelog_body").height() - $('#operatelog_search_area').height() - 5,
        width: $("#operatelog_body").width(),
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
                width: 100,
                halign: "center",
                align: "left"
            },
            {
                field: 'fLocalAddress',
                title: '本地IP',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fRemoteAddress',
                title: '请求IP',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fUrl',
                title: '请求地址',
                width: 250,
                halign: "center",
                align: "left"
            },
            {
                field: 'fMethod',
                title: '请求方法',
                width: 100,
                halign: "center",
                align: "left"
            },
            {
                field: 'fSubModule',
                title: '父模块',
                width: 120,
                halign: "center",
                align: "left"
            },
            {
                field: 'fModule',
                title: '模块',
                width: 120,
                halign: "center",
                align: "left"
            },
            {
                field: 'fOperate',
                title: '操作',
                width: 120,
                halign: "center",
                align: "left"
            },
            {
                field: 'fData',
                title: '请求数据',
                width: 350,
                halign: "center",
                align: "left"
            },
            {
                field: 'fOperator',
                title: '操作人',
                width: 120,
                halign: "center",
                align: "left"
            },
            {
                field: 'fCreateTime',
                title: '操作时间',
                width: 150,
                halign: "center",
                align: "left",
                formatter: formatDatebox
            }
        ]],
        pagination: true
    });
    $("#searchoperatelog").on('click', function () {
        var module = $('#module').val().trim();
        var operator = $('#operator').val().trim();
        $('#tt_operatelog').edatagrid('load', {
            module:module,
            operator:operator
        });
    });
});
//监听窗口大小变化
window.onresize = function () {
    setTimeout(domresize, 300);
};
//改变表格宽高
function domresize() {
    $('#tt_operatelog').datagrid('resize', {
        height: $("#operatelog_body").height() - $('#operatelog_search_area').height() - 5,
        width: $("#operatelog_body").width()
    });
}
