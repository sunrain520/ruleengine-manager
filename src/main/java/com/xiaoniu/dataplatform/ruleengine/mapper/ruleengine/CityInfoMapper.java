package com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine;

import com.xiaoniu.dataplatform.ruleengine.entity.CityInfo;

import java.util.List;
import java.util.Map;

public interface CityInfoMapper {
    int insert(CityInfo record);

    int insertSelective(CityInfo record);

    List<CityInfo> queryCityInfosByPage(Map<String,Object> map);

    Integer queryCityInfoCount(Map<String,Object> map);

    int updateClassifcationByCode(CityInfo cityInfo);

    CityInfo queryCityInfoByCode(Integer cityCode);
    
    int updateCityInfoByCityCode(CityInfo cityInfo);
    
    int insertCityClassification(CityInfo cityInfo);
}