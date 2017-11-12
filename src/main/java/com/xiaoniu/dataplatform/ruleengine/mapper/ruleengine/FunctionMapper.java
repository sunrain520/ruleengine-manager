package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import java.util.List;
import java.util.Map;

import com.xiaoniu.dataplatform.ruleengine.entity.Function;

public interface FunctionMapper {
	List<Function> selectAll();
	
	List<Function> selectByType(Map<String, Object> params);
	
    int deleteByPrimaryKey(Integer id);

    int insert(Function record);

    int insertSelective(Function record);

    Function selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Function record);

    int updateByPrimaryKey(Function record);
}