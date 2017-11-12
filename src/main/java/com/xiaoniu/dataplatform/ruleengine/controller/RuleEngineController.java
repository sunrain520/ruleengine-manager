package com.xiaoniu.dataplatform.ruleengine.controller;

import com.xiaoniu.dataplatform.ruleengine.common.ModuleDef;
import com.xiaoniu.dataplatform.ruleengine.dto.ImportCount;
import com.xiaoniu.dataplatform.ruleengine.entity.*;
import com.xiaoniu.dataplatform.ruleengine.service.ManageService;
import com.xiaoniu.dataplatform.ruleengine.service.RuleEngineService;
import com.xiaoniu.dataplatform.ruleengine.utils.*;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

/**
 * Created by tanhui on 2016/10/31.
 */
@Controller
@RequestMapping("/api/ruleengine")
public class RuleEngineController {

    private static final Logger logger = LoggerFactory.getLogger(RuleEngineController.class);

    @Autowired
    private RuleEngineService ruleEngineService;

    @Autowired
    private ManageService manageService;
    
//    @RequiresPermissions("route/ruleengine/item/list")
    @ModuleDef(subModule = "",module = "规则项", operate = "查询")
    @RequestMapping(value = "/item/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryRuleItems(
                                 @RequestParam(value = "ruleId", required = false) String ruleId,
                                 @RequestParam(value = "itemId", required = false) Integer itemId,
                                 @RequestParam(value = "expression", required = false) String expression,
                                 @RequestParam(value = "remark", required = false) String remark,
                                 @RequestParam(value = "paramList", required = false) String paramList,
                                 @RequestParam("startIndex") int startIndex,
                                 @RequestParam("rows") int pageSize) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        int pageNum = startIndex / pageSize + 1;
        RuleEngineResponse<PageResult<RuleItem>> resp = ruleEngineService.queryRuleItemsByPage(appId, ruleId, itemId, expression, remark, paramList, pageNum, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
    
//    @RequiresPermissions("route/ruleengine/param/list")
//    @ModuleDef(subModule = "参数配置",module = "规则参数", operate = "查询")
//    @RequestMapping(value = "/param/list", method = RequestMethod.GET)
//    @ResponseBody
//    public String queryRuleParams(
//                                  @RequestParam(value = "ruleId", required = false) String ruleId,
//                                  @RequestParam(value = "itemId", required = false) Integer itemId,
//                                  @RequestParam(value = "paramName", required = false) String paramName,
//                                  @RequestParam(value = "remark", required = false) String remark,
//                                  @RequestParam(value = "paramValue", required = false) String paramValue,
//                                  @RequestParam("page") int pageNum,
//                                  @RequestParam("rows") int pageSize) {
//        String appId = RuleUtils.getAppId();
//        if (StringUtils.isEmpty(appId)) {
//            appId = "credit-ndf";
//        }
//        RuleEngineResponse<PageResult<RuleParam>> resp = ruleEngineService.queryRuleParamsByPage(appId, ruleId, itemId, paramName, remark, paramValue, pageNum, pageSize);
//        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
//            return resp.getData().toString();
//        }
//        return resp.toString();
//    }
//    
//    @RequestMapping(value = "item/params", method = RequestMethod.GET)
//    @ResponseBody
//    public String queryRuleParams(@RequestParam(value = "ruleId", required = false) String ruleId,
//                                  @RequestParam(value = "itemId", required = false) Integer itemId) {
//        String appId = RuleUtils.getAppId();
//        if (StringUtils.isEmpty(appId)) {
//            appId = "credit-ndf";
//        }
//        RuleEngineResponse<PageResult<RuleParam>> resp = ruleEngineService.queryParamsByItem(appId, ruleId, itemId);
//        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
//            return resp.getData().toString();
//        }
//        return resp.toString();
//    }


    @ModuleDef(subModule = "参数配置",module = "评分等级", operate = "查询")
//    @RequiresPermissions("route/ruleengine/scoredegree/list")
    @RequestMapping(value = "scoredegree/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryScoreDegrees(
            @RequestParam(value = "ruleId", required = false) String ruleId,
            @RequestParam(value = "itemId", required = false) Integer itemId,
            @RequestParam(value = "degree", required = false) String degree,
            @RequestParam(value = "remark", required = false) String remark,
            @RequestParam("page") int pageNum,
            @RequestParam("rows") int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<ScoreCardDegree>> resp = ruleEngineService.queryScoreDegreesByPage(appId, ruleId, itemId, degree, remark, pageNum, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
    @RequestMapping(value = "/item", method = RequestMethod.GET)
    public ModelAndView queryRuleItemDetail(@RequestParam(value = "ruleId", required = false) String ruleId,
                                      @RequestParam(value = "itemId", required = false) Integer itemId) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<RuleItem> resp = ruleEngineService.queryRuleItem(appId, ruleId, itemId);
        ModelAndView model = new ModelAndView();
        model.addObject("ruleItem", resp.getData());
        model.addObject("itemId", itemId);
        model.setViewName("jsp/ruleItemDetail");
        return model;
    }

    @ModuleDef(subModule = "",module = "规则项", operate = "更新")
    @RequestMapping(value = "/item/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateRuleItem(RuleItem item) {
        String appId = RuleUtils.getAppId();
        item.setfAppId(appId);
        if (StringUtils.isEmpty(item.getfAppId())) {
            item.setfAppId("credit-ndf");
        }
        RuleEngineResponse<RuleItem> resp = ruleEngineService.updateRuleItem(item);
        return resp.toString();
    }

    @ModuleDef(subModule = "",module = "规则项", operate = "新增")
    @RequestMapping(value = "/item/add", method = RequestMethod.POST)
    @ResponseBody
    public String addRuleItem(RuleItem item) {
        String appId = RuleUtils.getAppId();
        item.setfAppId(appId);
        if (StringUtils.isEmpty(item.getfAppId())) {
            item.setfAppId("credit-ndf");
        }
        RuleEngineResponse<RuleItem> resp = ruleEngineService.addRuleItem(item);
        return resp.toString();
    }

//    @ModuleDef(subModule = "参数配置",module = "规则参数", operate = "更新")
//    @RequestMapping(value = "/param/update", method = RequestMethod.POST)
//    @ResponseBody
//    public String updateRuleParam(RuleParam param) {
//        String appId = RuleUtils.getAppId();
//        param.setfAppId(appId);
//        if (StringUtils.isEmpty(param.getfAppId())) {
//            param.setfAppId("credit-ndf");
//        }
//        RuleEngineResponse<RuleParam> resp = ruleEngineService.updateRuleParam(param);
//        return resp.toString();
//    }
//
//    @ModuleDef(subModule = "参数配置",module = "规则参数", operate = "新增")
//    @RequestMapping(value = "/param/add", method = RequestMethod.POST)
//    @ResponseBody
//    public String saveRuleParam(RuleParam param) {
//        String appId = RuleUtils.getAppId();
//        param.setfAppId(appId);
//        if (StringUtils.isEmpty(param.getfAppId())) {
//            param.setfAppId("credit-ndf");
//        }
//        RuleEngineResponse<RuleParam> resp = ruleEngineService.addRuleParam(param);
//        return resp.toString();
//    }

    // ----------------------------------------------------配置类 --------------------------------------------------------
    @ModuleDef(subModule = "参数配置",module = "评分等级", operate = "更新")
    @RequestMapping(value = "/scoredegree/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateScoreDegree(ScoreCardDegree score) {
        String appId = RuleUtils.getAppId();
        score.setfAppId(appId);
        if (StringUtils.isEmpty(score.getfAppId())) {
            score.setfAppId("credit-ndf");
        }
        RuleEngineResponse<ScoreCardDegree> resp = ruleEngineService.updateScoreDegree(score);
        return resp.toString();
    }

    @ModuleDef(subModule = "参数配置",module = "评分等级", operate = "修改")
    @RequestMapping(value = "/scoredegree/add", method = RequestMethod.POST)
    @ResponseBody
    public String saveScoreDegree(ScoreCardDegree score) {
        String appId = RuleUtils.getAppId();
        score.setfAppId(appId);
        if (StringUtils.isEmpty(score.getfAppId())) {
            score.setfAppId("credit-ndf");
        }
        RuleEngineResponse<ScoreCardDegree> resp = ruleEngineService.addScoreDegree(score);
        return resp.toString();
    }

    @ModuleDef(subModule = "参数配置",module = "评分等级", operate = "删除")
    @RequestMapping(value = "/scoredegree/delete", method = RequestMethod.POST)
    @ResponseBody
    public String deleteScoreById(@RequestParam(value = "id", required = false) Integer fAutoId) {
        RuleEngineResponse<String> resp = ruleEngineService.deleteScoreById(fAutoId);
        return resp.toString();
    }

//    @ModuleDef(subModule = "参数配置",module = "规则参数", operate = "删除")
//    @RequestMapping(value = "/param/delete", method = RequestMethod.POST)
//    @ResponseBody
//    public String deleteParamById(@RequestParam(value = "id", required = false) Integer fAutoId) {
//        RuleEngineResponse<String> resp = ruleEngineService.deleteParamById(fAutoId);
//        return resp.toString();
//    }

    //--------------------------渠道--------------------------------------------------------------------
//    @RequiresPermissions("route/ruleengine/channel/list")
    @ModuleDef(subModule = "参数配置",module = "渠道", operate = "查询")
    @RequestMapping(value = "channel/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryChannels(
            @RequestParam("page") int pageNum,
            @RequestParam("rows") int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<Channel>> resp = manageService.queryChannelsByPage(appId, pageNum, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }

    @ModuleDef(subModule = "参数配置",module = "渠道列表", operate = "更新")
    @RequestMapping(value = "/channel/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateChannel(Channel channel) {
        String appId = RuleUtils.getAppId();
        channel.setfAppId(appId);
        if (StringUtils.isEmpty(channel.getfAppId())) {
            channel.setfAppId("credit-ndf");
        }
        RuleEngineResponse<Channel> resp = manageService.updateChannel(channel);
        return resp.toString();
    }

    @ModuleDef(subModule = "参数配置",module = "渠道列表", operate = "新增")
    @RequestMapping(value = "/channel/add", method = RequestMethod.POST)
    @ResponseBody
    public String saveChannel(Channel channel) {
        String appId = RuleUtils.getAppId();
        channel.setfAppId(appId);
        if (StringUtils.isEmpty(channel.getfAppId())) {
            channel.setfAppId("credit-ndf");
        }
        RuleEngineResponse<Channel> resp = manageService.addChannel(channel);
        return resp.toString();
    }
    //-------------------------------------------关键字---------------------------------------------------
//    @RequiresPermissions("route/ruleengine/keyword/list")
    @ModuleDef(subModule = "参数配置",module = "关键字", operate = "查询")
    @RequestMapping(value = "keyword/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryKeywords(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam("page") int pageNum,
            @RequestParam("rows") int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<Keyword>> resp = manageService.queryKeywordsByPage(appId, type, keyword, pageNum, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }

    @ModuleDef(subModule = "参数配置",module = "关键字配置", operate = "更新")
    @RequestMapping(value = "/keyword/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateKeyword(Keyword keyword) {
        String appId = RuleUtils.getAppId();
        keyword.setfAppId(appId);
        if (StringUtils.isEmpty(keyword.getfAppId())) {
            keyword.setfAppId("credit-ndf");
        }
        RuleEngineResponse<Keyword> resp = manageService.updateKeyword(keyword);
        return resp.toString();
    }

    @ModuleDef(subModule = "参数配置",module = "关键字配置", operate = "新增")
    @RequestMapping(value = "/keyword/add", method = RequestMethod.POST)
    @ResponseBody
    public String saveChannel(Keyword keyword) {
        String appId = RuleUtils.getAppId();
        keyword.setfAppId(appId);
        if (StringUtils.isEmpty(keyword.getfAppId())) {
            keyword.setfAppId("credit-ndf");
        }
        RuleEngineResponse<Keyword> resp = manageService.addKeyword(keyword);
        return resp.toString();
    }
    @ModuleDef(subModule = "参数配置",module = "关键字配置", operate = "删除")
    @RequestMapping(value = "/keyword/delete", method = RequestMethod.POST)
    @ResponseBody
    public String deleteKeywordById(@RequestParam(value = "id", required = false) Integer fAutoId) {
        RuleEngineResponse<String> resp = manageService.deleteKeywordById(fAutoId);
        return resp.toString();
    }

    //----------------------------------------------------拒绝名单录入-----------------------------------------------------
    @ModuleDef(subModule = "参数配置",module = "拒绝名单", operate = "录入")
    @RequestMapping(value = "/rejectlist/save", method = RequestMethod.POST)
    @ResponseBody
    public String saveRejectList(RejectList rejectList) {
        String appId = RuleUtils.getAppId();
        rejectList.setfAppId(appId);
        if (StringUtils.isEmpty(rejectList.getfAppId())) {
            rejectList.setfAppId("credit-ndf");
        }
        RuleEngineResponse<RejectList> resp = manageService.saveRejectList(rejectList);
        return resp.toString();
    }
//    @RequiresPermissions("route/ruleengine/reject/list")
    @ModuleDef(subModule = "参数配置",module = "拒绝名单", operate = "查询")
    @RequestMapping(value = "reject/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryRejects(
            @RequestParam(value= "ruleId", required = false) String ruleId,
            @RequestParam(value= "idNum", required = false) String idNum,
            @RequestParam(value= "reason",required = false) String reason,
            @RequestParam("page") int pageNum,
            @RequestParam("rows") int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<RejectList>> resp = manageService.queryRejectsByPage(appId, idNum, ruleId, reason, pageNum, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
    //---------------------------------------------------规则结果-----------------------------------------------------------
//    @RequiresPermissions("route/ruleengine/ruleresult/list")
    @ModuleDef(subModule = "参数配置",module = "规则结果", operate = "查询")
    @RequestMapping(value = "ruleresult/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryRuleResults(
            @RequestParam(value= "tableName", required = false) String tableName,
            @RequestParam(value= "ruleId", required = false) String ruleId,
            @RequestParam(value= "reqId", required = false) String reqId,
            @RequestParam(value= "idNum",required = false) String idNum,
            @RequestParam("page") int pageNum,
            @RequestParam("rows") int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<RuleResult>> resp = manageService.queryRuleResultsByPage(tableName,appId,reqId, ruleId, idNum, pageNum, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
    //---------------------------------------------------原始数据-----------------------------------------------------------
//    @RequiresPermissions("route/ruleengine/rawdata/list")
    @ModuleDef(subModule = "参数配置",module = "原始数据", operate = "查询")
    @RequestMapping(value = "rawdata/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryRawDatas(
            @RequestParam(value= "tableName", required = false) String tableName,
            @RequestParam(value= "ruleId", required = false) String ruleId,
            @RequestParam(value= "reqId", required = false) String reqId,
            @RequestParam(value= "interfaceName",required = false) String interfaceName,
            @RequestParam("page") int pageNum,
            @RequestParam("rows") int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<RawData>> resp = manageService.queryRawDatasByPage(tableName, appId, reqId, ruleId, interfaceName, pageNum,pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
    //----------------------------------------------------白名单录入-----------------------------------------------------
    @ModuleDef(subModule = "参数配置",module = "白名单", operate = "录入")
    @RequestMapping(value = "/whitelist/save", method = RequestMethod.POST)
    @ResponseBody
    public String saveWhiteList(WhiteList whiteList) {
        RuleEngineResponse<WhiteList> resp = manageService.saveWhiteList(whiteList);
        return resp.toString();
    }

    //----------------------------------------------------白名单录入-----------------------------------------------------
    @ModuleDef(subModule = "参数配置",module = "白名单", operate = "批量导入")
    @RequestMapping(value = "/whitelist/import", method = RequestMethod.POST)
    @ResponseBody
    public String importWhiteList(HttpServletRequest request) {
        RuleEngineResponse<ImportCount> resp = null;
        try {
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            InputStream in =null;
            List<List<Object>> listob = null;
            MultipartFile file = multipartRequest.getFile("file");
            if(file.isEmpty()){
                resp = new RuleEngineResponse<ImportCount>(10001,"文件不存在");
            }else{
                in = file.getInputStream();
                String fileName = file.getOriginalFilename();
                if(fileName.endsWith(".xls") || fileName.endsWith(".xlsx")){
                    listob = new ImportExcelUtil().getWhiteListByExcel(in,file.getOriginalFilename());
                    resp = manageService.importWhiteList(listob);
                }else{
                    resp = new RuleEngineResponse<ImportCount>(10002,"文件格式不对");
                }
                in.close();
            }
        } catch (Exception e) {
            resp = new RuleEngineResponse<ImportCount>(RuleEngineErrorCode.C500);
        }
        return resp.toString();
    }
    //----------------------------------------------------白名单查询-----------------------------------------------------
//    @RequiresPermissions("route/ruleengine/whitelist")
    @ModuleDef(subModule = "参数配置",module = "白名单", operate = "查询")
    @RequestMapping(value = "/whitelist", method = RequestMethod.GET)
    @ResponseBody
    public String queryWhiteList(
            @RequestParam(value= "idNum", required = false) String idNum,
            @RequestParam(value= "name",required = false) String name,
            @RequestParam(value= "mobile",required = false) String mobile,
            @RequestParam(value="page",required = false) int pageNum,
            @RequestParam(value="rows",required = false) int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<WhiteList>> resp = manageService.queryWhiteListByPage(appId, idNum, name,mobile, pageNum, pageSize);
        if(resp!=null && resp.getCode() == 200){
            return resp.getData().toString();
        }
        return resp.toString();
    }
    //----------------------------------------------------白名单excel下载-----------------------------------------------------
    @ModuleDef(subModule = "参数配置",module = "白名单", operate = "批量导入")
    @RequestMapping(value = "/whitelist/down", method = RequestMethod.GET)
    @ResponseBody
    public String downloadWhiteListExcel(HttpServletRequest request, HttpServletResponse response) {
        String fileName = "template.xlsx";
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="
                + fileName);
        try {
            String path = request.getSession().getServletContext().getRealPath("/") + "download";//这个download目录为啥建立在classes下的
            InputStream inputStream = new FileInputStream(new File(path + File.separator + fileName));
            OutputStream os = response.getOutputStream();
            byte[] b = new byte[2048];
            int length;
            while ((length = inputStream.read(b)) > 0) {
                os.write(b, 0, length);
            }
            // 这里主要关闭。
            os.close();
            inputStream.close();
        } catch (FileNotFoundException e) {
            logger.error("downloadWhiteListExcel fail,reason:{}",e);
        } catch (IOException e) {
            logger.error("downloadWhiteListExcel fail,reason:{}",e);
        }
        return null;
    }
    
    //----------------------------------------------------白名单删除-----------------------------------------------------
    @ModuleDef(subModule = "参数配置",module = "白名单", operate = "删除")
    @RequestMapping(value = "/whitelist/delete", method = RequestMethod.POST)
    @ResponseBody
    public String deleteWhiteListById(WhiteListKey key) {
    	RuleEngineResponse<String> resp = manageService.deleteWhiteList(key);
    	return resp.toString();
    }
    
    //----------------------------------------------------拒绝名单删除----------------------------------------------------
    @ModuleDef(subModule = "参数配置",module = "拒绝名单", operate = "删除")
    @RequestMapping(value = "/rejectlist/delete", method = RequestMethod.POST)
    @ResponseBody
    public String deleteRejectListById(@RequestParam(value = "fAutoId") Integer fAutoId,@RequestParam(value = "fIdNum") String fIdNum) {
    	RuleEngineResponse<String> resp = manageService.deleteRejectListById(fAutoId, fIdNum);
    	return resp.toString();
    }

}
