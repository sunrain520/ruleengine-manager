<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>城市信息列表</title>
    <link rel="stylesheet" type="text/css" href="css/default.css">
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.5/themes/gray/easyui.css">
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.5/themes/icon.css"/>
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.5//themes/color.css">
    <script type="text/javascript" src="js/jquery-easyui-1.5/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-easyui-1.5/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/jquery-easyui-1.5/jquery.edatagrid.js"></script>
    <script type="text/javascript" src="js/jquery-easyui-1.5/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="js/extends.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/ruleengine/cityinfoList.js"></script>
</head>
<body class="easyui-layout">
<div id="cityinfo_body" region="center">
    <!-- 查询条件区域 -->
    <div id="cityinfo_search_area">
        <div id="cityinfo_conditon" align="center">
            <table border="0">
                <tr>
                    <td>城市编码：</td>
                    <td><input name="cityCode" id="cityCode"/></td>
                    <td>&nbsp;&nbsp;&nbsp;城市名称：</td>
                    <td><input name="cityName" id="cityName"/></td>
                    <td>&nbsp;&nbsp;&nbsp;城市级别：</td>
                    <td><input name="classification" id="classification"/></td>
                    <td>
                        <a id="searchCityInfo" href="javascript:void(0)" class="easyui-linkbutton my-search-button"
                           iconCls="icon-search"
                           plain="true">查询</a>
                    </td>
                </tr>
            </table>
        </div>
        <span id="cityinfo_OpenOrClose" class="openOrClose"></span>
    </div>
    <!-- 数据表格区域 -->
    <table id="tt_cityinfo" style="table-layout:fixed;">
    </table>
    <!-- 表格顶部工具按钮 -->
    <div id="tt_cityinfo_btn">
        <a id="saveCityInfo" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-save" plain="true">保存</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" plain="true"
           onclick="javascript:$('#tt_cityinfo').edatagrid('cancelRow')">取消</a>
    </div>
</div>
</body>
</html>
