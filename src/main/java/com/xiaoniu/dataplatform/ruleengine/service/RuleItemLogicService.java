package com.xiaoniu.dataplatform.ruleengine.service;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItemLogic;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/** 
 * @author  zhengjiajun
 * @date 2017年11月9日
 */
public interface RuleItemLogicService {
	
	RuleEngineResponse<PageResult<RuleItemLogic>> queryRuleItemLogicsByPage(Integer id, String ruleExpression, String remark, int startIndex, int pageSize);
    
    RuleEngineResponse<RuleItemLogic> queryRuleItemLogicById(Integer id);
    
    RuleEngineResponse<RuleItemLogic> updateRuleItemLogicById(RuleItemLogic ruleItemLogic);
    
    RuleEngineResponse<RuleItemLogic> insertRuleItemLogic(RuleItemLogic ruleItemLogic);
    
    RuleEngineResponse<RuleItemLogic> deleteRuleItemLogic(Integer id);
}
