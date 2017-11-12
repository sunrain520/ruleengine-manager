package com.xiaoniu.dataplatform.ruleengine.dto;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import java.io.Serializable;

/**
 * 角色
 * Created by tanhui on 2016/10/13.
 */
public class RawRole implements Serializable{
    private static final long serialVersionUID = -1373513290392923478L;

    private String rolename;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }
}
