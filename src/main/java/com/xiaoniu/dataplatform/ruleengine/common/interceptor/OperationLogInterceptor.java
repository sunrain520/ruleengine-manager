package com.xiaoniu.dataplatform.ruleengine.common.interceptor;

import com.alibaba.fastjson.JSON;
import com.xiaoniu.dataplatform.ruleengine.common.ModuleDef;
import com.xiaoniu.dataplatform.ruleengine.entity.OperateLog;
import com.xiaoniu.dataplatform.ruleengine.manager.OperateLogManager;
import com.xiaoniu.dataplatform.ruleengine.mapper.manage.OperateLogMapper;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineErrorCode;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.UnauthorizedException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.NamedThreadLocal;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * 操作日志拦截器
 *
 * @author tanhui
 * @version 1.0
 */
public class OperationLogInterceptor extends HandlerInterceptorAdapter {
    /**
     * Logger for this class
     */
    private static final Logger logger = LoggerFactory.getLogger(OperationLogInterceptor.class);

    private NamedThreadLocal<Long> startTimeThreadLocal = new NamedThreadLocal<Long>("StopWatch-StartTime");

    /**
     * 拦截器白名单
     */
    private String excludeURLs = "";


    @Autowired
    private OperateLogManager operateLogManager;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long beginTime = System.currentTimeMillis(); // 开始时间
        startTimeThreadLocal.set(beginTime);         // 线程绑定变量
        if (excludeURLs.indexOf(request.getRequestURI()) != -1) {
            return true;
        }
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        long endTime = System.currentTimeMillis();
        long beginTime = startTimeThreadLocal.get();
        long consumeTime = endTime - beginTime;
        if (consumeTime > 500) {//此处认为处理时间超过1000毫秒的请求为慢请求
            logger.warn(String.format("%s consume %d millis", request.getRequestURI(), consumeTime));
        }
        if (handler instanceof HandlerMethod) {
            HandlerMethod methodHandler = (HandlerMethod) handler;
            ModuleDef moduleDef = methodHandler.getMethod().getAnnotation(ModuleDef.class);
            if (moduleDef != null) {
                String appId = RuleUtils.getAppId();
                String method = request.getMethod();
                String url = request.getRequestURI();
                String localAddr = request.getLocalAddr();
                String remoteAddr = request.getRemoteAddr();

                String serviceName = "ruleengine-web";
                String operateModule = "";//模块
                String operate = "";  //操作
                String operator = RuleUtils.getWorkNum();  //操作人
                String data = "";
                String subModule = "";

                operateModule = moduleDef.module();
                subModule = moduleDef.subModule();
                operate = moduleDef.operate();

                OperateLog operateLog = new OperateLog();
                operateLog.setfAppId(appId);
                operateLog.setfLocalAddress(localAddr);
                operateLog.setfRemoteAddress(remoteAddr);
                operateLog.setfUrl(url);
                operateLog.setfMethod(method);
                operateLog.setfServiceName(serviceName);
                operateLog.setfModule(operateModule);
                operateLog.setfOperate(operate);
                operateLog.setfOperator(operator);
                operateLog.setfCreateTime(new Date());
                operateLog.setfUpdateTime(operateLog.getfCreateTime());

                Map parameters = request.getParameterMap();
                ObjectMapper mapper = new ObjectMapper();
                if (parameters != null) {
                    String requestParameters = mapper.writeValueAsString(parameters);
                    data = requestParameters;
                    if (StringUtils.isEmpty(subModule)) { //规则项模块具体找ruleId
                        if(operateModule.startsWith("规则项")){
                            String ruleId = request.getParameter("fRuleId");
                            if(StringUtils.isEmpty(ruleId)){
                                ruleId = request.getParameter("ruleId");
                            }
                            if (StringUtils.isNotEmpty(ruleId)) {
                                if(ruleId.contains("_")){
                                    ruleId = ruleId.split("_")[1];
                                }
                                subModule = RuleUtils.queryRuleName(ruleId);
                            }
                        }
                    }
                    logger.info("request data:{}",requestParameters);
                }
                operateLog.setfData(data);
                operateLog.setfSubModule(subModule);
                operateLogManager.saveOperateLog(operateLog);
            }
        }
    }

    @Override
    public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        super.afterConcurrentHandlingStarted(request, response, handler);
    }

    /**
     * 解析head
     *
     * @param request
     * @return
     */
    private String parseHeads(HttpServletRequest request) {
        Enumeration<String> headEnumeration = request.getHeaderNames();
        Map<String, String> headMap = new HashMap<String, String>();
        while (headEnumeration.hasMoreElements()) {
            String name = (String) headEnumeration.nextElement();
            if (!StringUtils.equals("Cookie", name)) {
                String value = request.getHeader(name);
                headMap.put(name, value);
            }
        }
        return JSON.toJSONString(headMap);
    }

    /**
     * 输出字节
     *
     * @param is
     * @param contentLen
     * @return
     */
    public static final byte[] readBytes(InputStream is, int contentLen) {
        if (contentLen > 0) {
            int readLen = 0;
            int readLengthThisTime = 0;
            byte[] message = new byte[contentLen];
            try {
                while (readLen != contentLen) {
                    readLengthThisTime = is.read(message, readLen, contentLen - readLen);
                    if (readLengthThisTime == -1) {// Should not happen.
                        break;
                    }
                    readLen += readLengthThisTime;
                }
                return message;
            } catch (IOException e) {
                logger.error("读取流异常.", e);
            }
        }
        return new byte[]{};
    }


    /**
     * excludeURLs
     *
     * @return the excludeURLs
     */
    public String getExcludeURLs() {
        return excludeURLs;
    }

    /**
     * @param excludeURLs the excludeURLs to set
     */
    public void setExcludeURLs(String excludeURLs) {
        this.excludeURLs = excludeURLs;
    }


}
