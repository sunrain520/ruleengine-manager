package com.xiaoniu.dataplatform.ruleengine.service;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItem;
import com.xiaoniu.dataplatform.ruleengine.entity.RuleParam;
import com.xiaoniu.dataplatform.ruleengine.entity.ScoreCardDegree;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/**
 * 规则引擎service层 接口
 * Created by tanhui on 2016/11/1.
 */
public interface RuleEngineService {

    RuleEngineResponse<PageResult<RuleItem>> queryRuleItemsByPage(String appId, String ruleId, Integer itemId,String express,String remark,String paramList,int pageNum, int pageSize);

    RuleEngineResponse<RuleItem> queryRuleItem(String appId, String ruleId, Integer itemId);

    RuleEngineResponse<RuleItem> updateRuleItem(RuleItem item);

    RuleEngineResponse<RuleItem> addRuleItem(RuleItem item);

    RuleEngineResponse<PageResult<ScoreCardDegree>> queryScoreDegreesByPage(String appId,String ruleId,Integer itemId,String degree,String remark ,int pageNum, int pageSize);

    RuleEngineResponse<ScoreCardDegree> updateScoreDegree(ScoreCardDegree score);

    RuleEngineResponse<ScoreCardDegree> addScoreDegree(ScoreCardDegree score);

    RuleEngineResponse<String> deleteScoreById(Integer fAutoId);



}
