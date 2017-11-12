package com.xiaoniu.dataplatform.ruleengine.service.impl;

import static com.google.common.base.Preconditions.checkArgument;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xiaoniu.dataplatform.ruleengine.entity.CityInfo;
import com.xiaoniu.dataplatform.ruleengine.mapper.ruleengine.CityInfoMapper;
import com.xiaoniu.dataplatform.ruleengine.service.CityInfoService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.PageUtil;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.ServiceUtil;

/** 
 * @author  zhengjiajun
 * @date 2017年11月7日
 */
@Service
public class CityInfoServiceImpl implements CityInfoService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CityInfoServiceImpl.class);
	
	@Autowired
	private CityInfoMapper cityInfoMapper;
	
	@Override
    public RuleEngineResponse<PageResult<CityInfo>> queryCityInfosByPage(String appId, Integer cityCode, String cityName, String classification, int startIndex, int pageSize) {
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("appId",appId);
        params.put("cityCode",cityCode);
        params.put("cityName",cityName);
        params.put("classification",classification);
        return ServiceUtil.queryDataByPage(params, startIndex, pageSize, CityInfo.class, CityInfoMapper.class);
    }

    @Override
    public RuleEngineResponse<CityInfo> updateClassifcationByCode(CityInfo cityInfo) {
        RuleEngineResponse<CityInfo> resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C200);
        try {
            checkCityInfo(cityInfo);
            cityInfoMapper.updateClassifcationByCode(cityInfo);
            resp.setData(cityInfo);
        } catch (Exception e) {
            resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C500);
            LOGGER.error("updateClassifcationByCode fail,reason:{}", e);
        }
        return resp;
    }

	@Override
	public RuleEngineResponse<CityInfo> queryCityInfoByCode(Integer cityCode) {
		RuleEngineResponse<CityInfo> resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C200);
		try {
			CityInfo cityInfo = cityInfoMapper.queryCityInfoByCode(cityCode);
			resp.setData(cityInfo);
		} catch (Exception e) {
			resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C500);
            LOGGER.error("queryCityInfoByCode fail,reason:{}", e);
		}
		return resp;
	}

	@Override
	public RuleEngineResponse<CityInfo> updateCityInfoByCityCode(CityInfo cityInfo) {
		RuleEngineResponse<CityInfo> resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C200);
        try {
            checkCityInfo(cityInfo);
            cityInfoMapper.updateCityInfoByCityCode(cityInfo);
            resp.setData(cityInfo);
        } catch (IllegalArgumentException e) {
        	LOGGER.error("updateClassifcationByCode params error,reason:{}", e);
            return new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C500);
            LOGGER.error("updateClassifcationByCode fail,reason:{}", e);
        }
        return resp;
	}

	@Override
	public RuleEngineResponse<CityInfo> insertCityInfo(CityInfo cityInfo) {
		RuleEngineResponse<CityInfo> resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C200);
        try {
            checkCityInfo(cityInfo);
            cityInfoMapper.insert(cityInfo);
            cityInfoMapper.insertCityClassification(cityInfo);
            resp.setData(cityInfo);
        } catch (IllegalArgumentException e) {
        	LOGGER.error("updateClassifcationByCode params error,reason:{}", e);
            return new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C400);
        } catch (Exception e) {
            resp = new RuleEngineResponse<CityInfo>(RuleEngineErrorCode.C500);
            LOGGER.error("updateClassifcationByCode fail,reason:{}", e);
        }
        return resp;
	}
    
    private void checkCityInfo(CityInfo cityInfo) throws Exception {
        checkArgument(cityInfo != null, "城市信息不能为空");
        checkArgument(StringUtils.isNotEmpty(cityInfo.getfAppId()), "业务ID不能为空");
        checkArgument((cityInfo.getfCityCode() != null), "城市编码不能为空");
        checkArgument(StringUtils.isNotEmpty(cityInfo.getfClassification()), "城市级别定义不能为空");
    }
}
