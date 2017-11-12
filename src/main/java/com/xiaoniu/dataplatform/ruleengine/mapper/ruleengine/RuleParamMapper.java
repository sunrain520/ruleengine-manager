package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.RuleParam;

public interface RuleParamMapper {

    int deleteByPrimaryKey(Integer fAutoId);

    int insert(RuleParam record);

    int insertSelective(RuleParam record);

    RuleParam selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(RuleParam record);

    int updateByPrimaryKey(RuleParam record);
}