package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.RawData;

import java.util.List;
import java.util.Map;

public interface RawDataMapper {
    RawData selectByPrimaryKey(Integer fAutoId);

    List<RawData> queryRawDatasByPage(Map<String,Object> map);

    Integer queryRawDatasCount(Map<String,Object> map);
}