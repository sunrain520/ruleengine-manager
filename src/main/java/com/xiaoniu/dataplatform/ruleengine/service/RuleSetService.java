package com.xiaoniu.dataplatform.ruleengine.service;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleSet;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/** 
 * @author  zhengjiajun
 * @date 2017年11月8日
 */
public interface RuleSetService {

	RuleEngineResponse<PageResult<RuleSet>> queryRuleSetsByPage(String appId, String ruleId, String bizClass, String remark, int startIndex, int pageSize);
    
    RuleEngineResponse<RuleSet> queryRuleSetById(Integer autoId);
    
    RuleEngineResponse<RuleSet> updateRuleSetById(RuleSet ruleSet);
    
    RuleEngineResponse<RuleSet> insertRuleSet(RuleSet ruleSet);
    
    RuleEngineResponse<RuleSet> deleteRuleSet(Integer autoId);
}
