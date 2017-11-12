package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.Keyword;

import java.util.List;
import java.util.Map;

public interface KeywordMapper {
    int deleteByPrimaryKey(Integer fAutoId);

    int insert(Keyword record);

    int insertSelective(Keyword record);

    Keyword selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(Keyword record);

    int updateByPrimaryKey(Keyword record);

    List<Keyword> queryKeywordsByPage(Map<String,Object> map);

    Integer queryKeywordsCount(Map<String,Object> map);
}