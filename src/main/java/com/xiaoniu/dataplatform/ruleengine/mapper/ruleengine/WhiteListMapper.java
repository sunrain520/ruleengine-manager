package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.WhiteList;
import com.xiaoniu.dataplatform.ruleengine.entity.WhiteListKey;

import java.util.List;
import java.util.Map;

public interface WhiteListMapper {
    int deleteByPrimaryKey(WhiteListKey key);

    int insert(WhiteList record);

    int insertSelective(WhiteList record);

    WhiteList selectByPrimaryKey(WhiteListKey key);

    int updateByPrimaryKeySelective(WhiteList record);

    int updateByPrimaryKey(WhiteList record);

    List<WhiteList> queryWhiteListByPage(Map<String,Object> map);

    Integer queryWhiteListCount(Map<String,Object> map);
}