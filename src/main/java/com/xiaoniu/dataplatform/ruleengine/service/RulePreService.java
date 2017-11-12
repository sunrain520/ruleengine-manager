package com.xiaoniu.dataplatform.ruleengine.service;

import com.xiaoniu.dataplatform.ruleengine.entity.RulePre;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/** 
 * @author  zhengjiajun
 * @date 2017年11月9日
 */
public interface RulePreService {

	RuleEngineResponse<PageResult<RulePre>> queryRulePresByPage(String ruleVariable, String preClass, String remark, int startIndex, int pageSize);
    
    RuleEngineResponse<RulePre> queryRulePreById(String ruleVariable);
    
    RuleEngineResponse<RulePre> updateRulePreById(RulePre rulePre);
    
    RuleEngineResponse<RulePre> insertRulePre(RulePre rulePre);
    
    RuleEngineResponse<RulePre> deleteRulePre(String ruleVariable);
}
