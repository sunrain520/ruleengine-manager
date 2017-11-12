$(function () {
    $("#tt_cityinfo").edatagrid({
        url: "api/ruleengine/cityinfo/list",
        height: $("#cityinfo_body").height() - $('#cityinfo_search_area').height() - 5,
        width: $("#cityinfo_body").width(),
        method: "get",
        singleSelect: true,
        fitColumns: true,
        nowrap:false,
        rownumbers: true,
        idField:"fCityCode",
        pageSize: 20,
        showPageList: true,
        columns: [[
            {
                field: 'fCityCode',
                title: '城市编码',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fCityName',
                title: '城市名称',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fCityNameAbbreviate',
                title: '城市简称',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fProvinceCode',
                title: '省份编码',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fProvinceName',
                title: '所在省',
                width: 150,
                halign: "center",
                align: "left"
            },
            {
                field: 'fAdministrationLevel',
                title: '行政级别',
                width: 150,
                halign: "center",
                align: "left"
            }
            ,
            {
                field: 'fClassification',
                title: '分类',
                width: 150,
                halign: "center",
                align: "left",
                editor: {type: 'validatebox', options: {required: true}}
            }
        ]],
        toolbar: '#tt_cityinfo_btn',
        pagination: true
    });
    $("#searchCityInfo").on('click', function () {
        var cityCode = $('#cityCode').val().trim();
        var classification = $('#classification').val().trim();
        var cityName = $('#cityName').val().trim();
        $('#tt_cityinfo').edatagrid('load', {
            cityCode:cityCode,
            classification:classification,
            cityName:cityName
        });
    });
    $("#saveCityInfo").on('click', function () {
        var row = $('#tt_cityinfo').datagrid('getSelected');
        var rowIndex = $('#tt_cityinfo').datagrid('getRowIndex', $("#tt_cityinfo").datagrid('getSelected'));
        $('#tt_cityinfo').datagrid("endEdit", rowIndex);
        var url = "api/ruleengine/cityinfo/update";
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
    $('#tt_cityinfo').edatagrid('resize', {
        height: $("#cityinfo_body").height() - $('#cityinfo_search_area').height() - 5,
        width: $("#cityinfo_body").width()
    });
}
