package com.xiaoniu.dataplatform.ruleengine.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 路由控制器 页面跳转
 * Created by tanhui on 2016/11/1.
 */
@Controller
@RequestMapping("/route/ruleengine")
public class RouterController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RouterController.class);

    /**
     * 规则列表页面跳转
     * @return
     */
    @RequestMapping(value = "/item/list", method = RequestMethod.GET)
    public ModelAndView queryRuleItems(@RequestParam(value = "ruleId", required = false) String ruleId) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("ruleId", ruleId);
        modelAndView.setViewName("jsp/ruleList");
        return modelAndView;
    }

    /**
     * 规则集列表页面跳转
     * @return
     */
    @RequestMapping(value = "/rule-set/list", method = RequestMethod.GET)
    public ModelAndView queryRuleSet() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/ruleSet/ruleSetList");
        return modelAndView;
    }

    /**
     * 规则集输入参数列表页面跳转
     * @return
     */
    @RequestMapping(value = "/rule-set-input/list", method = RequestMethod.GET)
    public ModelAndView queryRuleSetInput() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/ruleSetInput/ruleSetInputList");
        return modelAndView;
    }

    /**
     * 预处理列表页面跳转
     * @return
     */
    @RequestMapping(value = "/rule-pre/list", method = RequestMethod.GET)
    public ModelAndView queryRulePre() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/rulePre/rulePreList");
        return modelAndView;
    }

    /**
     * 常量参数列表页面跳转
     * @return
     */
    @RequestMapping(value = "/rule-param/list", method = RequestMethod.GET)
    public ModelAndView queryRuleParam() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/ruleParam/ruleParamList");
        return modelAndView;
    }

    /**
     * 规则逻辑列表页面跳转
     * @return
     */
    @RequestMapping(value = "/rule-item-logic/list", method = RequestMethod.GET)
    public ModelAndView queryRuleItemLogic() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/ruleItemLogic/ruleItemLogicList");
        return modelAndView;
    }

    /**
     * 评分卡列表页面跳转
     * @return
     */
    @RequestMapping(value = "/scoredegree/list", method = RequestMethod.GET)
    public ModelAndView queryScoreDegrees() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/scoreList");
        return modelAndView;
    }

    /**
     * 渠道列表页面跳转
     * @return
     */
    @RequestMapping(value = "/channel/list", method = RequestMethod.GET)
    public ModelAndView queryChannels() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/channelList");
        return modelAndView;
    }
    
    /**
     * 关键字列表页面跳转
     * @return
     */
    @RequestMapping(value = "/keyword/list", method = RequestMethod.GET)
    public ModelAndView queryKeywords() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/keywordList");
        return modelAndView;
    }
    
    /**
     * 城市信息列表页面跳转
     * @return
     */
    @RequestMapping(value = "/cityinfo/list", method = RequestMethod.GET)
    public ModelAndView queryCityInfos() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/cityInfo/cityInfoList");
        return modelAndView;
    }
    
    /**
     * 拒绝名单录入页面跳转
     * @return
     */
    @RequestMapping(value = "/reject/list", method = RequestMethod.GET)
    public ModelAndView rejectForm() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/rejectList");
        return modelAndView;
    }
    
    /**
     * 规则结果页面跳转
     * @return
     */
    @RequestMapping(value = "/ruleresult/list", method = RequestMethod.GET)
    public ModelAndView queryRuleResults() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/ruleResultList");
        return modelAndView;
    }
    
    /**
     * 原始数据页面跳转
     * @return
     */
    @RequestMapping(value = "/rawdata/list", method = RequestMethod.GET)
    public ModelAndView queryRawDatas() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/rawDataList");
        return modelAndView;
    }
    
    /**
     * 员工信息查询
     * @return
     */
    @RequestMapping(value = "/userinfo", method = RequestMethod.GET)
    public ModelAndView queryUserInfo() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/userInfo");
        return modelAndView;
    }
    
    /**
     * 操作日志
     * @return
     */
    @RequestMapping(value = "/operatelogs", method = RequestMethod.GET)
    public ModelAndView queryOperateLogs() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/operateLogList");
        return modelAndView;
    }
    
    /**
     * 白名单页面跳转
     * @return
     */
    @RequestMapping(value = "/whitelist", method = RequestMethod.GET)
    public ModelAndView whiteList() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsp/whiteList");
        return modelAndView;
    }





}
