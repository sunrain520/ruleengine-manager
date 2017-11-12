package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.ScoreCardDegree;

import java.util.List;
import java.util.Map;

public interface ScoreCardDegreeMapper {
    int deleteByPrimaryKey(Integer fAutoId);

    int insert(ScoreCardDegree record);

    int insertSelective(ScoreCardDegree record);

    ScoreCardDegree selectByPrimaryKey(Integer fAutoId);

    int updateByPrimaryKeySelective(ScoreCardDegree record);

    int updateByPrimaryKey(ScoreCardDegree record);

    List<ScoreCardDegree> queryScoreDegreesByPage(Map<String,Object> map);

    Integer queryScoreDegreesCount(Map<String,Object> map);
}