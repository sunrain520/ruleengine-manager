var paramFactory = {
	table : null,
	getQueryCondition : function(data) {
		var param = {};
		//组装排序参数
		//组装查询参数
		param.ruleSet = $("#rule-set-search").val();
		param.fieldName = $("#field-name-search").val();
		param.remark = $("#remark-search").val();
		param.isRequired = $("#is-required-search").val();
		//组装分页参数
		param.startIndex = data.start;
		param.rows = data.length;
		return param;
	},
	getChangeCondition : function() {
		var param = {};
		param.fAutoId = $("#fAutoId").val();
		param.fRuleSetId = $("#fRuleSetId").val();
		param.fFieldName = $("#fFieldName").val();
		param.fRemark = $("#fRemark").val();
		param.fIsRequired = $("#fIsRequired").val();
		return param;
	}
};

$(function () {
    var _table = $('#dataTables-example').DataTable($.extend(true,{},CONSTANT.DATA_TABLES.DEFAULT_OPTION, {
        ajax: function(data, callback, settings) {//ajax配置为function,手动调用异步查询
			//手动控制遮罩
        	var param = paramFactory.getQueryCondition(data);
			$.ajax({
		            type: "GET",
		            url: "ruleSetInput/list",
		            cache : false,	//禁用缓存
		            data: param,	//传入已封装的参数
		            dataType: "json",
		            success: function(result) {
	            		//封装返回数据，这里仅演示了修改属性名
	            		var returnData = {};
		            	returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
		            	returnData.recordsTotal = result.total;
		            	returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
		            	returnData.data = result.data;
		            	//关闭遮罩
		            	//调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
		            	//此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
		            	callback(returnData);
		            },
		            error: function(XMLHttpRequest, textStatus, errorThrown) {
		                alert("查询失败");
		            }
		        });
		},
        columns: [{
            data: "fRuleSetName" ,
            width : "80px"
        },
        {
            data: "fFieldName" ,
            width : "120px"
        },
        {
            data: "fRemark" 
        },
        {
            data: "fIsRequired"  ,
            width : "60px"
        },
		 {
			className : "td-operation",
			data: null,
			defaultContent:"",
			orderable : false,
			width : "120px"
		}],
        createdRow: function ( row, data, index ) {
        	//行渲染回调,在这里可以对该行dom元素进行任何操作
        	//不使用render，改用jquery文档操作呈现单元格
        	var param = {};
        	param.cityCode = data.fCityCode;
        	makeRowOperation(row, 4, 'ruleSetInput/check', 'ruleSetInput/update', param);
        },
    }));
    
    paramFactory.table = _table;
    
    var paramW = {};
    makeTable('ruleSetInput/check', 'ruleSetInput/insert', paramW);
    initSearchArea();
    bindModalEvent();
});