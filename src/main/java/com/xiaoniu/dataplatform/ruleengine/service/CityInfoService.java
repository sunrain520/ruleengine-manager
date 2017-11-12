package com.xiaoniu.dataplatform.ruleengine.service;

import com.xiaoniu.dataplatform.ruleengine.entity.CityInfo;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;

/** 
 * @author  zhengjiajun
 * @date 2017年11月7日
 */
public interface CityInfoService {
	
	RuleEngineResponse<PageResult<CityInfo>> queryCityInfosByPage(String appId, Integer cityCode, String cityName, String classification, int startIndex, int pageSize);

    RuleEngineResponse<CityInfo> updateClassifcationByCode(CityInfo cityInfo);
    
    RuleEngineResponse<CityInfo> queryCityInfoByCode(Integer cityCode);
    
    RuleEngineResponse<CityInfo> updateCityInfoByCityCode(CityInfo cityInfo);
    
    RuleEngineResponse<CityInfo> insertCityInfo(CityInfo cityInfo);
}
