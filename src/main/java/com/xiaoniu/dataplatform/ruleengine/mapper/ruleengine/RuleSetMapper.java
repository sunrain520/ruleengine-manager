package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import java.util.List;
import java.util.Map;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleSet;

public interface RuleSetMapper {

    int deleteByPrimaryKey(Integer fAutoId);

    int insert(RuleSet record);

    int insertSelective(RuleSet record);

    RuleSet selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(RuleSet record);

    int updateByPrimaryKey(RuleSet record);

    List<RuleSet> queryRuleSetsByPage(Map<String,Object> map);

    Integer queryRuleSetCount(Map<String,Object> map);
}