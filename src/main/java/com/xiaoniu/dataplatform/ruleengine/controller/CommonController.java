package com.xiaoniu.dataplatform.ruleengine.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.xiaoniu.dataplatform.ruleengine.entity.Function;
import com.xiaoniu.dataplatform.ruleengine.service.CommonService;

/** 
 * @author  zhengjiajun
 * @date 2017年11月6日
 */
@Controller
@RequestMapping("/common")
public class CommonController {

	@Autowired
	private CommonService commonService;
	
	@RequestMapping(value = "/loadNav", method = RequestMethod.GET)
    @ResponseBody
    public String queryUserNav() {
    	List<Function> functions = commonService.queryNav();
    	Map<String, Object> params = new HashMap<String, Object>();
    	params.put("data", functions);
        return JSON.toJSONString(params);
    }
	
    @RequestMapping(value = "/setting", method = RequestMethod.GET)
    @ResponseBody
    public String queryUserTree() {
    	List<Function> functions = commonService.queryFunctionByPermission();
    	Map<String, Object> params = new HashMap<String, Object>();
    	params.put("data", functions);
        return JSON.toJSONString(params);
    }
    
    @RequestMapping(value = "/null", method = RequestMethod.GET)
    @ResponseBody
    public String queryNull() {
    	Map<String, Object> params = new HashMap<String, Object>();
    	params.put("data", new ArrayList<Function>());
        return JSON.toJSONString(params);
    }
}
