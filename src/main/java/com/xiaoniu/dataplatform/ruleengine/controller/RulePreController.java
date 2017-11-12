package com.xiaoniu.dataplatform.ruleengine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xiaoniu.dataplatform.ruleengine.common.ModuleDef;
import com.xiaoniu.dataplatform.ruleengine.entity.RulePre;
import com.xiaoniu.dataplatform.ruleengine.service.RulePreService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/** 
 * @author  zhengjiajun
 * @date 2017年11月9日
 */
@Controller
@RequestMapping("/rulePre")
public class RulePreController {
	
	@Autowired
	private RulePreService rulePreService;
	
	@ModuleDef(subModule = "规则参数配置",module = "预处理", operate = "查询")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryRulePres(
            @RequestParam(value= "ruleVariable", required = false) String ruleVariable,
            @RequestParam(value= "preClass", required = false) String preClass,
            @RequestParam(value= "remark",required = false) String remark,
            @RequestParam("startIndex") int startIndex,
            @RequestParam("rows") int pageSize
    ) {
        RuleEngineResponse<PageResult<RulePre>> resp = rulePreService.queryRulePresByPage(ruleVariable, preClass, remark, startIndex, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
	
	@ModuleDef(subModule = "规则参数配置",module = "预处理", operate = "查看")
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView updateRulePre(@RequestParam(value= "ruleVariable", required = false) String ruleVariable,
    		@RequestParam(value= "opt", required = false) String opt) {
        ModelAndView model = new ModelAndView();
		if (ruleVariable != null) {
	        RuleEngineResponse<RulePre> resp = rulePreService.queryRulePreById(ruleVariable);
	        model.addObject("rulePre", resp.getData());
		}
		model.addObject("opt", opt);
        model.addObject("itemId", ruleVariable);
        model.setViewName("jsp/rulePre/rulePreItem");
        return model;
    }
	
    @ModuleDef(subModule = "规则参数配置",module = "预处理", operate = "更新")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateRulePre(RulePre rulePre) {
        RuleEngineResponse<RulePre> resp = rulePreService.updateRulePreById(rulePre);
        return resp.toString();
    }
    
    @ModuleDef(subModule = "规则参数配置",module = "预处理", operate = "新增")
    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insertRulePre(RulePre rulePre) {
        RuleEngineResponse<RulePre> resp = rulePreService.insertRulePre(rulePre);
        return resp.toString();
    }
    
    @ModuleDef(subModule = "规则参数配置",module = "预处理", operate = "删除")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String deleteRulePre(@RequestParam(value= "ruleVariable", required = false) String ruleVariable,
    		@RequestParam(value= "opt", required = false) String opt) {
        RuleEngineResponse<RulePre> resp = rulePreService.deleteRulePre(ruleVariable);
        return resp.toString();
    }
}
