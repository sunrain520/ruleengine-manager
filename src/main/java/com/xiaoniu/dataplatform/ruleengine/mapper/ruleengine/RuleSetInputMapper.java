package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import java.util.List;
import java.util.Map;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleSetInput;

public interface RuleSetInputMapper {

    int deleteByPrimaryKey(Integer fAutoId);

    int insert(RuleSetInput record);

    int insertSelective(RuleSetInput record);

    RuleSetInput selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(RuleSetInput record);

    int updateByPrimaryKey(RuleSetInput record);

    List<RuleSetInput> queryRuleSetInputsByPage(Map<String,Object> map);

    Integer queryRuleSetInputCount(Map<String,Object> map);
}