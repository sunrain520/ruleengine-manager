package com.xiaoniu.dataplatform.ruleengine.invoker;

import com.alibaba.fastjson.JSON;
import com.xiaoniu.dataplatform.ruleengine.dto.EmployeeInfo;
import com.xiaoniu.dataplatform.ruleengine.utils.HttpTookit;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleEngineResponse;
import com.xiaoniu.dataplatform.utils.PropertyUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * 员工信息invoker 获取用户详细信息
 * Created by tanhui on 2016/10/13.
 */
@Service
public class HRInvoker {

    private static Logger logger = LoggerFactory.getLogger(HRInvoker.class);
    private static final String EMPLOYEE_URL;

    static {
        EMPLOYEE_URL = PropertyUtil.getProperty("EMPLOYEE_URL");
    }

    public EmployeeInfo queryEmployByWorkNum(String workNum) {
        EmployeeInfo employeeInfo = new EmployeeInfo();
        String secret  = ""+ System.currentTimeMillis()/1000;
        secret = secret.substring(secret.length()-4);
        String url = EMPLOYEE_URL + "?memID=" + workNum + "&secret=" + secret;;
        try {
            String result = HttpTookit.doGet(url);
            if (StringUtils.isNotEmpty(result)) {
                employeeInfo = JSON.parseObject(result, EmployeeInfo.class);
            }
        } catch (Exception e) {
            employeeInfo = null;
            logger.error("HRInvoker:[queryEmployByWorkNum],failed.[workNumL{},reason:{}]", workNum,e);
        }
        return employeeInfo;
    }


}
