package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import java.util.List;
import java.util.Map;

import com.xiaoniu.dataplatform.ruleengine.entity.RulePre;

public interface RulePreMapper {

    int deleteByPrimaryKey(String fRuleVariable);

    int insert(RulePre record);

    int insertSelective(RulePre record);

    RulePre selectByPrimaryKey(String fRuleVariable);

    int updateByPrimaryKeySelective(RulePre record);

    int updateByPrimaryKey(RulePre record);

    List<RulePre> queryRulePresByPage(Map<String,Object> map);

    Integer queryRulePreCount(Map<String,Object> map);
}