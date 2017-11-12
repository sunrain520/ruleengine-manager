package com.xiaoniu.dataplatform.ruleengine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xiaoniu.dataplatform.ruleengine.common.ModuleDef;
import com.xiaoniu.dataplatform.ruleengine.entity.RuleItemLogic;
import com.xiaoniu.dataplatform.ruleengine.service.RuleItemLogicService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/** 
 * @author  zhengjiajun
 * @date 2017年11月9日
 */
@Controller
@RequestMapping("/ruleItemLogic")
public class RuleItemLogicController {
	
	@Autowired
	private RuleItemLogicService ruleItemLogicService;
	
	@ModuleDef(subModule = "规则参数配置",module = "规则逻辑", operate = "查询")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryRuleItemLogics(
            @RequestParam(value= "id", required = false) Integer id,
            @RequestParam(value= "ruleExpression", required = false) String ruleExpression,
            @RequestParam(value= "remark",required = false) String remark,
            @RequestParam("startIndex") int startIndex,
            @RequestParam("rows") int pageSize
    ) {
        RuleEngineResponse<PageResult<RuleItemLogic>> resp = ruleItemLogicService.queryRuleItemLogicsByPage(id, ruleExpression, remark, startIndex, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
	
	@ModuleDef(subModule = "规则参数配置",module = "规则逻辑", operate = "查看")
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView updateRuleItemLogic(@RequestParam(value= "id", required = false) Integer id,
    		@RequestParam(value= "opt", required = false) String opt) {
        ModelAndView model = new ModelAndView();
		if (id != null) {
	        RuleEngineResponse<RuleItemLogic> resp = ruleItemLogicService.queryRuleItemLogicById(id);
	        model.addObject("ruleItemLogic", resp.getData());
		}
		model.addObject("opt", opt);
        model.addObject("itemId", id);
        model.setViewName("jsp/ruleItemLogic/ruleItemLogicItem");
        return model;
    }
	
    @ModuleDef(subModule = "规则参数配置",module = "规则逻辑", operate = "更新")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateRuleItemLogic(RuleItemLogic ruleItemLogic) {
        RuleEngineResponse<RuleItemLogic> resp = ruleItemLogicService.updateRuleItemLogicById(ruleItemLogic);
        return resp.toString();
    }
    
    @ModuleDef(subModule = "规则参数配置",module = "规则逻辑", operate = "新增")
    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insertRuleItemLogic(RuleItemLogic ruleItemLogic) {
        RuleEngineResponse<RuleItemLogic> resp = ruleItemLogicService.insertRuleItemLogic(ruleItemLogic);
        return resp.toString();
    }
    
    @ModuleDef(subModule = "规则参数配置",module = "规则逻辑", operate = "删除")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String deleteRuleItemLogic(@RequestParam(value= "id", required = false) Integer id,
    		@RequestParam(value= "opt", required = false) String opt) {
        RuleEngineResponse<RuleItemLogic> resp = ruleItemLogicService.deleteRuleItemLogic(id);
        return resp.toString();
    }
}
