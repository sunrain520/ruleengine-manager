/*
	公共方法文件
	@eric
*/
var $parent = self.parent.$;

$(function(){
	//隐藏显示查询条件区域
	$('#openOrClose').on("click",function(){
		$('#conditon').toggle(80);
	});

	//隐藏显示查询条件区域
	$('#param_OpenOrClose').on("click",function(){
		$('#param_conditon').toggle(80);
	});

	//隐藏显示查询条件区域
	$('#score_OpenOrClose').on("click",function(){
		$('#score_conditon').toggle(80);
	});

	//隐藏显示查询条件区域
	$('#keyword_OpenOrClose').on("click",function(){
		$('#keyword_conditon').toggle(80);
	});

	//隐藏显示查询条件区域
	$('#cityinfo_OpenOrClose').on("click",function(){
		$('#cityinfo_conditon').toggle(80);
	});

	//隐藏显示查询条件区域
	$('#reject_OpenOrClose').on("click",function(){
		$('#reject_conditon').toggle(80);
	});

	//隐藏显示查询条件区域
	$('#ruleResult_OpenOrClose').on("click",function(){
		$('#ruleresult_conditon').toggle(80);
	});

	//隐藏显示查询条件区域
	$('#rawdata_OpenOrClose').on("click",function(){
		$('#rawdata_conditon').toggle(80);
	});
	//隐藏显示查询条件区域
	$('#userinfo_OpenOrClose').on("click",function(){
		$('#userinfo_conditon').toggle(80);
	});
	//隐藏显示查询条件区域
	$('#operatelog_OpenOrClose').on("click",function(){
		$('#operatelog_conditon').toggle(80);
	});
	//隐藏显示查询条件区域
	$('#whiteList_OpenOrClose').on("click",function(){
		$('#whiteList_conditon').toggle(80);
	});
})