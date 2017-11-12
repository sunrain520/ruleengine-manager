package com.xiaoniu.dataplatform.ruleengine.mapper.manage;

import com.xiaoniu.dataplatform.ruleengine.entity.OperateLog;

import java.util.List;
import java.util.Map;

public interface OperateLogMapper {
    int deleteByPrimaryKey(Integer fAutoId);

    int insert(OperateLog record);

    int insertSelective(OperateLog record);

    OperateLog selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(OperateLog record);

    int updateByPrimaryKeyWithBLOBs(OperateLog record);

    int updateByPrimaryKey(OperateLog record);

    List<OperateLog> queryOperateLogsByPage(Map<String,Object> map);

    Integer queryOperateLogsCount(Map<String,Object> map);
}