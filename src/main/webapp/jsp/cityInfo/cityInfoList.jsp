<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>城市信息列表</title>    
    <!-- Bootstrap Core CSS -->
    <link href="<%=basePath%>/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="<%=basePath%>/vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- DataTables CSS -->
    <link href="<%=basePath%>/vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="<%=basePath%>/vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="<%=basePath%>/vendor/sb-admin/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="<%=basePath%>/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    
    <link href="<%=basePath%>/css/dataTableCustom.css" rel="stylesheet" type="text/css">
</head>
<body >
<div id="body" region="center">
    <!-- 查询条件区域 -->
    <div class="row">
    	<div class="col-lg-12">
			<div class="row-fluid" id="div-advanced-search">
				<form class="form-inline well">
					<span>代码：</span>
					<input type="text" class="input-medium form-control" placeholder="代码" id="code-search">
					<span>名称：</span>
					<input type="text" class="input-medium form-control" placeholder="名称" id="name-search">
					<span>分类：</span>
					<input type="text" class="input-medium form-control" placeholder="分类" id="classification-search">
					<button type="button" class="btn" id="btn-advanced-search"><i class="fa fa-search"></i> 查询</button>
					<button type="button" class="btn" id="btn-empty-search"><i class="fa fa-search"></i> 重置</button>
				</form>
			</div>
		</div>
	</div>
    <!-- 数据表格区域 -->
    <div class="row" style="margin:1px">
    	<div class="col-lg-12">
		    <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
		        <thead>
		            <tr>
		                <th>代码</th>
		                <th>名称</th>
		                <th>分类</th>
		                <th>操作</th>
		            </tr>
		        </thead>
		    </table>
	    </div>
    </div>
    <!-- 表格顶部工具按钮 -->
    <div id="modal" class="modal fade bs-example-modal-sm" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm"  style="width:800px;">
	    <div class="modal-content" id="modal-content-ss">
		    
	    </div>
	  </div>
	</div>
</div>

        <!-- jQuery -->
    <script src="<%=basePath%>/vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="<%=basePath%>/vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="<%=basePath%>/vendor/metisMenu/metisMenu.min.js"></script>

    <!-- DataTables JavaScript -->
    <script src="<%=basePath%>/vendor/datatables/js/jquery.dataTables.min.js"></script>
    <script src="<%=basePath%>/vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
    <script src="<%=basePath%>/vendor/datatables-responsive/dataTables.responsive.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="<%=basePath%>/vendor/sb-admin/js/sb-admin-2.js"></script>
    <script src="<%=basePath%>js/ruleengine/cityInfo/cityInfoList.js"></script>
    <script src="<%=basePath%>js/ruleengine/list.js"></script>
    <script src="<%=basePath%>js/dataTableConstant.js"></script>
</body>
</html>
