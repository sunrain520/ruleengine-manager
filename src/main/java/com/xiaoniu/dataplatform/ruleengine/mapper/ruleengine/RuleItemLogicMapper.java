package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import java.util.List;
import java.util.Map;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleItemLogic;

public interface RuleItemLogicMapper {
    int deleteByPrimaryKey(Integer fAutoId);

    int insert(RuleItemLogic record);

    int insertSelective(RuleItemLogic record);

    RuleItemLogic selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(RuleItemLogic record);

    int updateByPrimaryKey(RuleItemLogic record);

    List<RuleItemLogic> queryRuleItemLogicsByPage(Map<String,Object> map);

    Integer queryRuleItemLogicCount(Map<String,Object> map);
}