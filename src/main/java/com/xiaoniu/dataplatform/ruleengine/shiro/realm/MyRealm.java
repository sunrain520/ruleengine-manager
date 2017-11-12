package com.xiaoniu.dataplatform.ruleengine.shiro.realm;

import com.xiaoniu.dataplatform.ruleengine.dto.EmployeeInfo;
import com.xiaoniu.dataplatform.ruleengine.dto.RawPermissionsResp;
import com.xiaoniu.dataplatform.ruleengine.invoker.HRInvoker;
import com.xiaoniu.dataplatform.ruleengine.invoker.PMSInvoker;
import com.xiaoniu.dataplatform.utils.EasyStr;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cas.CasAuthenticationException;
import org.apache.shiro.cas.CasRealm;
import org.apache.shiro.cas.CasToken;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.util.CollectionUtils;
import org.apache.shiro.util.StringUtils;
import org.jasig.cas.client.authentication.AttributePrincipal;
import org.jasig.cas.client.validation.Assertion;
import org.jasig.cas.client.validation.TicketValidationException;
import org.jasig.cas.client.validation.TicketValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class MyRealm extends CasRealm {

    private static final Logger logger = LoggerFactory.getLogger(MyRealm.class);

    @Autowired
    HRInvoker hrInvoker;

    @Autowired
    PMSInvoker pmsInvoker;

    /**
     * 为当前登录的Subject授予角色和权限
     * 登录的时候调用 只执行一次
     * 获取权限信息
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        EmployeeInfo employeeInfo = (EmployeeInfo) principals.getPrimaryPrincipal();
        try {
            String workNum = employeeInfo.getWorkNum();

            Set<String> roles = pmsInvoker.getRoles(workNum);
            Set<String> permissions = pmsInvoker.getPermissions(workNum);
            info.addRoles(roles);
            info.addStringPermission("p10"); //这个权限是为获取权限树而设置
            info.addStringPermissions(permissions);

            logger.debug("####工号:{},#####授予角色：[{}],#####获得权限：[{}]", workNum,roles,permissions);
            return info;
        } catch (Exception e) {
            logger.error("[doGetAuthorizationInfo][" + EasyStr.getErrorStack(e) + "]");
        }
        return null;
    }

    /**
     * 验证当前登录的Subject
     * 认证授权的时候调用
     * 获取用户信息
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        CasToken casToken = (CasToken) token;

        if (casToken == null) {
            logger.debug("casToken is null!");
            return null;
        }

        String ticket = (String) casToken.getCredentials();
        if (!StringUtils.hasText(ticket)) {
            logger.debug("ticket has no text!");
            return null;
        }

        TicketValidator ticketValidator = ensureTicketValidator();

        try {
            Assertion casAssertion = ticketValidator.validate(ticket, getCasService());
            AttributePrincipal casPrincipal = casAssertion.getPrincipal();
            String userId = casPrincipal.getName();
            logger.debug("Validate ticket : {} in CAS server : {} to retrieve user : {}", new Object[]{ticket, getCasServerUrlPrefix(), userId});
            //检查userId的正确性
            EmployeeInfo employeeInfo = new EmployeeInfo();
            if (org.apache.commons.lang.StringUtils.isNotEmpty(userId)) {
                employeeInfo = hrInvoker.queryEmployByWorkNum(userId);
                if (employeeInfo == null) {
                    throw new TicketValidationException("非法用户");
                }
            }
            Map<String, Object> attributes = casPrincipal.getAttributes();
            casToken.setUserId(userId);
            String rememberMeAttributeName = getRememberMeAttributeName();
            String rememberMeStringValue = (String) attributes.get(rememberMeAttributeName);
            boolean isRemembered = rememberMeStringValue != null && Boolean.parseBoolean(rememberMeStringValue);
            if (isRemembered) {
                casToken.setRememberMe(true);
            }
            //这里都要从权限系统去获取后放到缓存
            Set<String> roles = pmsInvoker.getRoles(userId);
            RawPermissionsResp resp = pmsInvoker.getPMSTree(userId);

            List<Object> principals = CollectionUtils.asList(new Object[]{employeeInfo, roles, resp});
            PrincipalCollection principalCollection = new SimplePrincipalCollection(principals, getName());
            // 这里可以拿到Cas的登录账号信息,加载到对应权限体系信息放到缓存中...
            return new SimpleAuthenticationInfo(principalCollection, ticket);
        } catch (TicketValidationException e) {
            StringBuilder sb = new StringBuilder();
            sb.append("Unable to validate ticket [").append(ticket).append("]");
            logger.error(sb.toString());
            throw new CasAuthenticationException(sb.toString(), e);
        }
    }

}
