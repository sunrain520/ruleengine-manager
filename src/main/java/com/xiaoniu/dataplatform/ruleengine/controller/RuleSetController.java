package com.xiaoniu.dataplatform.ruleengine.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xiaoniu.dataplatform.ruleengine.common.ModuleDef;
import com.xiaoniu.dataplatform.ruleengine.entity.RuleSet;
import com.xiaoniu.dataplatform.ruleengine.service.RuleSetService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;

/** 
 * @author  zhengjiajun
 * @date 2017年11月8日
 */
@Controller
@RequestMapping("/ruleSet")
public class RuleSetController {

	@Autowired
	private RuleSetService ruleSetService;
	
	@ModuleDef(subModule = "规则参数配置",module = "规则集", operate = "查询")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryRuleSets(
            @RequestParam(value= "appId", required = false) String appId,
            @RequestParam(value= "ruleId", required = false) String ruleId,
            @RequestParam(value= "bizClass",required = false) String bizClass,
            @RequestParam(value= "remark",required = false) String remark,
            @RequestParam("startIndex") int startIndex,
            @RequestParam("rows") int pageSize
    ) {
//        String appId = RuleUtils.getAppId();
//        if (StringUtils.isEmpty(appId)) {
//            appId = "credit-ndf";
//        }
        RuleEngineResponse<PageResult<RuleSet>> resp = ruleSetService.queryRuleSetsByPage(appId, ruleId, bizClass, remark, startIndex, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
	
	@ModuleDef(subModule = "规则参数配置",module = "规则集", operate = "查看")
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView updateRuleSet(@RequestParam(value= "autoId", required = false) Integer autoId,
    		@RequestParam(value= "opt", required = false) String opt) {
        ModelAndView model = new ModelAndView();
		if (autoId != null) {
	        RuleEngineResponse<RuleSet> resp = ruleSetService.queryRuleSetById(autoId);
	        model.addObject("ruleSet", resp.getData());
		}
		model.addObject("opt", opt);
        model.addObject("itemId", autoId);
        model.setViewName("jsp/ruleSet/ruleSetItem");
        return model;
    }
	
    @ModuleDef(subModule = "规则参数配置",module = "规则集", operate = "更新")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateRuleSet(RuleSet ruleSet) {
        String appId = RuleUtils.getAppId();
        ruleSet.setfAppId(appId);
        if (StringUtils.isEmpty(ruleSet.getfAppId())) {
            ruleSet.setfAppId("credit-ndf");
        }
        RuleEngineResponse<RuleSet> resp = ruleSetService.updateRuleSetById(ruleSet);
        return resp.toString();
    }
    
    @ModuleDef(subModule = "规则参数配置",module = "规则集", operate = "新增")
    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insertRuleSet(RuleSet ruleSet) {
        String appId = RuleUtils.getAppId();
        ruleSet.setfAppId(appId);
        if (StringUtils.isEmpty(ruleSet.getfAppId())) {
            ruleSet.setfAppId("credit-ndf");
        }
        RuleEngineResponse<RuleSet> resp = ruleSetService.insertRuleSet(ruleSet);
        return resp.toString();
    }
    
    @ModuleDef(subModule = "规则参数配置",module = "规则集", operate = "删除")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String deleteRuleSet(@RequestParam(value= "autoId", required = false) Integer autoId,
    		@RequestParam(value= "opt", required = false) String opt) {
        RuleEngineResponse<RuleSet> resp = ruleSetService.deleteRuleSet(autoId);
        return resp.toString();
    }
}
