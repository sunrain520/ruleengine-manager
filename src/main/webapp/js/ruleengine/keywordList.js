$(function () {
    $("#tt_keyword").edatagrid({
        url: "api/ruleengine/keyword/list",
        destroyUrl:'api/ruleengine/keyword/delete',
        height: $("#keyword_body").height() - $('#keyword_search_area').height() - 5,
        width: $("#keyword_body").width(),
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
                field: 'fType',
                title: '类型',
                width: 250,
                halign: "center",
                align: "left",
                editor: {type: 'validatebox', options: {required: true}}
            },
            {
                field: 'fKeywordList',
                title: '关键字列表',
                width: 250,
                halign: "center",
                align: "left",
                editor: {type: 'validatebox', options: {required: true}}
            }
        ]],
        toolbar: '#tt_keyword_btn',
        pagination: true
    });
    $("#searchKeyword").on('click', function () {
        var type = $('#keywordType').val().trim();
        var keyword = $("#keyword").val().trim();
        $('#tt_keyword').edatagrid('load', {
            type:type,
            keyword:keyword
        });
    });
    $("#savekeyword").on('click', function () {
        var row = $('#tt_keyword').datagrid('getSelected');
        var rowIndex = $('#tt_keyword').datagrid('getRowIndex', $("#tt_keyword").datagrid('getSelected'));
        $('#tt_keyword').datagrid("endEdit", rowIndex);
        var url = "api/ruleengine/keyword/add";
        if(row.fAutoId){ //更新
            url = "api/ruleengine/keyword/update";
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
    $('#tt_keyword').edatagrid('resize', {
        height: $("#keyword_body").height() - $('#keyword_search_area').height() - 5,
        width: $("#keyword_body").width()
    });
}
