package com.xiaoniu.dataplatform.ruleengine.utils;

import com.xiaoniu.dataplatform.ruleengine.dto.EmployeeInfo;
import com.xiaoniu.dataplatform.ruleengine.dto.RawPermissionsResp;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 一些工具类
 * Created by tanhui on 2016/11/1.
 */
public class RuleUtils{

    private static final Logger logger = LoggerFactory.getLogger(RuleUtils.class);

    private static  Map<String,String> ruleIdMap = null;

    public static String appendRuleId(String appId, String ruleId){
        String result = ruleId;
        StringBuffer sb = new StringBuffer();
        if(StringUtils.isNotEmpty(appId) && StringUtils.isNotEmpty(ruleId)&&ruleId.contains("_")==false){
            sb.append(appId).append("_").append(ruleId);
            result = sb.toString();
        }
        return result;
    }

    public static String queryRuleName(String ruleId){
        String name = "";
        if(ruleIdMap == null){
            ruleIdMap = new HashMap<String,String>();
            ruleIdMap.put("SimpleAccess","简单准入");
            ruleIdMap.put("Access","准入");
            ruleIdMap.put("AntiFraud","反欺诈");
            ruleIdMap.put("Approve","审批");
            ruleIdMap.put("ScoreCard","评分卡");
            ruleIdMap.put("CreditLimit","额度规则");
            ruleIdMap.put("PostLoan","贷后规则");
            ruleIdMap.put("PreSimpleAccess","预审批-简单准入规则");
            ruleIdMap.put("PreAccess","预审批-准入规则");
            ruleIdMap.put("PreAntiFraud","预审批-反欺诈规则");
            ruleIdMap.put("PreScoreCard","预审批-评分卡规则");
            ruleIdMap.put("PreApprove","预审批-审批规则");
            ruleIdMap.put("PreCreditLimit"," 预审批-额度规则");
        }
        name = ruleIdMap.get(ruleId);
        return name;
    }

    public static String getAppId(){
        String appId ="";
        try {
            Subject currentUser = SecurityUtils.getSubject();
            if (currentUser != null) {
                PrincipalCollection principalCollection = currentUser.getPrincipals();
                if(principalCollection !=null){
                    List<Object> principals = principalCollection.asList();
                    if (CollectionUtils.isNotEmpty(principals) && principals.size() > 2) {
                        Set<String> roles = (Set<String>) principals.get(1);
                        for (String role : roles) {
                            if(role.contains("_")){
                                role = role.replaceAll("_","-");
                            }
                            appId = role;
                            break;
                        }
                    }
                }
            }
        } catch (Exception e) {
            logger.error("getAppId fail,reason:{}",e);
        }
        return appId;
    }
    public static String getWorkNum(){
//        String workNum ="";
//        try {
//            Subject currentUser = SecurityUtils.getSubject();
//            if (currentUser != null) {
//                PrincipalCollection principalCollection = currentUser.getPrincipals();
//                List<Object> principals = principalCollection.asList();
//                if (CollectionUtils.isNotEmpty(principals) && principals.size() > 0) {
//                    EmployeeInfo employeeInfo = (EmployeeInfo) principals.get(0);
//                    workNum = employeeInfo.getWorkNum();
//                }
//            }
//        } catch (Exception e) {
//            logger.error("getWorkNum fail,reason:{}",e);
//        }
        return "xn071829";
    }
    public static String getPermissionTree(){
        String permissionTree = "";
        try {
            Subject currentUser = SecurityUtils.getSubject();
            if (currentUser != null) {
                PrincipalCollection principalCollection = currentUser.getPrincipals();
                List<Object> principals = principalCollection.asList();
                if (CollectionUtils.isNotEmpty(principals) && principals.size() > 2) {
                    RawPermissionsResp resp = (RawPermissionsResp)principals.get(2);
                    Set<String> roles = (Set<String>) principals.get(1);
                    for (String role : roles) {
                        if(role.contains("_")){
                            role = role.replaceAll("_","-");
                        }
                        resp.setAppId(role);
                        break;
                    }
                    permissionTree = resp.toString();
                }
            }
        } catch (Exception e) {
            logger.error("getPermissionTree fail,reason:{}",e);
        }
        return permissionTree;
    }
}
