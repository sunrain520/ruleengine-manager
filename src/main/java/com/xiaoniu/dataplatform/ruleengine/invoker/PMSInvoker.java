package com.xiaoniu.dataplatform.ruleengine.invoker;


import com.alibaba.fastjson.JSON;
import com.xiaoniu.dataplatform.ruleengine.dto.RawPermission;
import com.xiaoniu.dataplatform.ruleengine.dto.RawPermissionsResp;
import com.xiaoniu.dataplatform.ruleengine.dto.RawRole;
import com.xiaoniu.dataplatform.ruleengine.dto.RawRolesResp;
import com.xiaoniu.dataplatform.ruleengine.utils.HttpTookit;
import com.xiaoniu.dataplatform.ruleengine.utils.RuleUtils;
import com.xiaoniu.dataplatform.utils.PropertyUtil;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 权限系统invoker
 * Created by tanhui on 2016/10/13.
 */
@Service
public class PMSInvoker {

    private static Logger logger = LoggerFactory.getLogger(PMSInvoker.class);
    private static final String PMS_SERVER_URL;
    private static final String PMS_PROJ_NAME;

    static {
        PMS_SERVER_URL = PropertyUtil.getProperty("PMS_SERVER_URL");
        PMS_PROJ_NAME = PropertyUtil.getProperty("PMS_PROJ_NAME");
    }

    private String json;
    
    public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	/**
     * 获取权限树
     *
     * @param workNum
     * @return
     */
    public RawPermissionsResp getPMSTree(String workNum) {
        RawPermissionsResp resp = new RawPermissionsResp();
        try {
            String url = PMS_SERVER_URL + "auth/" + "get.htm?id=" + workNum + "&proj=" + PMS_PROJ_NAME;
//            String json = HttpTookit.doPost(url, null);
            if (StringUtils.isNotEmpty(json)) {
                resp = JSON.parseObject(json, RawPermissionsResp.class);
            }
            resp.setAppId(RuleUtils.getAppId());
        } catch (Exception e) {
            logger.error("PMSInvoker:[getPMSTree],failed.[workNumL{},reason:{}]", workNum, e);
        }
        return resp;
    }

    /**
     * 获取资源列表
     *
     * @param workNum
     * @return
     */
    public Set<String> getPermissions(String workNum) {
        Set<String> permissions = new HashSet<String>();
        try {
            String url = PMS_SERVER_URL + "auth/" + "get.htm?id=" + workNum + "&proj=" + PMS_PROJ_NAME;
//            String json = HttpTookit.doPost(url, null);
            if (StringUtils.isNotEmpty(json)) {
                RawPermissionsResp resp = JSON.parseObject(json, RawPermissionsResp.class);
                if (resp != null && "SUCCESS".equals(resp.getCode())) {
                    List<RawPermission> list = resp.getData();
                    if (CollectionUtils.isNotEmpty(list)) {
                        for (RawPermission rawPermission : list) {
                            String permUrl = rawPermission.getUrl();
                            if (StringUtils.isEmpty(permUrl)) { // 权限树根节点url
                                permUrl = "/root";
                            }
                            permissions.add(permUrl);
                        }
                    }
                }
            }
        } catch (Exception e) {
            logger.error("PMSInvoker:[getPermissions],failed.[workNumL{},reason:{}]", workNum, e);
        }
        return permissions;
    }

    /**
     * 获取角色列表
     *
     * @param workNum
     * @return
     */
    public Set<String> getRoles(String workNum) {
        Set<String> roles = new HashSet<String>();
        try {
            String url = PMS_SERVER_URL + "auth/" + "role.htm?id=" + workNum + "&proj=" + PMS_PROJ_NAME;
//            String json = HttpTookit.doPost(url, null);
            if (StringUtils.isNotEmpty(json)) {
                RawRolesResp resp = JSON.parseObject(json, RawRolesResp.class);
                if (resp != null && "SUCCESS".equals(resp.getCode())) {
                    List<RawRole> list = resp.getData();
                    if (CollectionUtils.isNotEmpty(list)) {
                        for (RawRole rawRole : list) {
                            roles.add(rawRole.getRolename());
                        }
                    }
                }
            }
        } catch (Exception e) {
            logger.error("PMSInvoker:[getRoles],failed.[workNumL{},reason:{}]", workNum, e);
        }
        return roles;
    }
}
