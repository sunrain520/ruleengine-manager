package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.RejectList;

import java.util.List;
import java.util.Map;

public interface RejectListMapper {
    int deleteByPrimaryKey(Map<String,Object> map);

    int insert(RejectList record);

    int insertSelective(RejectList record);

    RejectList selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(RejectList record);

    int updateByPrimaryKey(RejectList record);

    List<RejectList> queryRejectsByPage(Map<String,Object> map);

    Integer queryRejectsCount(Map<String,Object> map);
}