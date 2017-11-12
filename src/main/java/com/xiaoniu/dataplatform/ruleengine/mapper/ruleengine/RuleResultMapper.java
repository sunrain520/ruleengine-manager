package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleResult;

import java.util.List;
import java.util.Map;

public interface RuleResultMapper {
    int deleteByPrimaryKey(Integer fAutoId);

    int insert(RuleResult record);

    int insertSelective(RuleResult record);

    RuleResult selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(RuleResult record);

    int updateByPrimaryKey(RuleResult record);

    List<RuleResult> queryRuleResultsByPage(Map<String,Object> map);

    Integer queryRuleResultsCount(Map<String,Object> map);
}