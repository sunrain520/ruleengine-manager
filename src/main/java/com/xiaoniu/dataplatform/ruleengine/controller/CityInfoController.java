package com.xiaoniu.dataplatform.ruleengine.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.xiaoniu.dataplatform.ruleengine.common.ModuleDef;
import com.xiaoniu.dataplatform.ruleengine.entity.CityInfo;
import com.xiaoniu.dataplatform.ruleengine.service.CityInfoService;
import com.xiaoniu.dataplatform.ruleengine.utils.PageResult;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;

/** 
 * @author  zhengjiajun
 * @date 2017年11月7日
 */
@Controller
@RequestMapping("/cityInfo")
public class CityInfoController {

	@Autowired
	private CityInfoService cityInfoService;
	
	@ModuleDef(subModule = "参数配置",module = "城市信息", operate = "查询")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public String queryCityInfos(
            @RequestParam(value= "cityName", required = false) String cityName,
            @RequestParam(value= "cityCode", required = false) Integer cityCode,
            @RequestParam(value= "classification",required = false) String classification,
            @RequestParam("startIndex") int startIndex,
            @RequestParam("rows") int pageSize
    ) {
        String appId = RuleUtils.getAppId();
        if (StringUtils.isEmpty(appId)) {
            appId = "credit-ndf";
        }
        RuleEngineResponse<PageResult<CityInfo>> resp = cityInfoService.queryCityInfosByPage(appId, cityCode, cityName, classification, startIndex, pageSize);
        if (resp.getCode() == RuleEngineErrorCode.C200.getCode()) {
            return resp.getData().toString();
        }
        return resp.toString();
    }
	
	@ModuleDef(subModule = "参数配置",module = "城市信息", operate = "查看")
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView updateCityInfo(@RequestParam(value= "cityCode", required = false) Integer cityCode,
    		@RequestParam(value= "opt", required = false) String opt) {
        ModelAndView model = new ModelAndView();
		if (cityCode != null) {
	        RuleEngineResponse<CityInfo> resp = cityInfoService.queryCityInfoByCode(cityCode);
	        model.addObject("cityInfo", resp.getData());
		}
		model.addObject("opt", opt);
        model.addObject("itemId", cityCode);
        model.setViewName("jsp/cityInfo/cityInfoItem");
        return model;
    }
	
    @ModuleDef(subModule = "参数配置",module = "城市信息", operate = "更新")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public String updateCityInfo(CityInfo cityInfo) {
        String appId = RuleUtils.getAppId();
        cityInfo.setfAppId(appId);
        if (StringUtils.isEmpty(cityInfo.getfAppId())) {
            cityInfo.setfAppId("credit-ndf");
        }
        RuleEngineResponse<CityInfo> resp = cityInfoService.updateClassifcationByCode(cityInfo);
        resp = cityInfoService.updateCityInfoByCityCode(cityInfo);
        return resp.toString();
    }
    
    @ModuleDef(subModule = "参数配置",module = "城市信息", operate = "新增")
    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insertCityInfo(CityInfo cityInfo) {
        String appId = RuleUtils.getAppId();
        cityInfo.setfAppId(appId);
        if (StringUtils.isEmpty(cityInfo.getfAppId())) {
            cityInfo.setfAppId("credit-ndf");
        }
        RuleEngineResponse<CityInfo> resp = cityInfoService.insertCityInfo(cityInfo);
        return resp.toString();
    }
}
