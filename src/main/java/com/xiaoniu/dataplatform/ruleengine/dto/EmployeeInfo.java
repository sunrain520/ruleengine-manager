package com.xiaoniu.dataplatform.ruleengine.dto;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import java.io.Serializable;

/**
 * 员工信息类
 */
public class EmployeeInfo implements Serializable{

    private static final long serialVersionUID = 4020402428902094412L;

    private String DeptHier; //所属部门
    private String Email; //邮箱
    private String Mobile; //手机号
    private String Name; //姓名
    private String WorkNum; //工号

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this,ToStringStyle.SHORT_PREFIX_STYLE);
    }

    public String getDeptHier() {
        return DeptHier;
    }

    public void setDeptHier(String deptHier) {
        DeptHier = deptHier;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getMobile() {
        return Mobile;
    }

    public void setMobile(String mobile) {
        Mobile = mobile;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getWorkNum() {
        return WorkNum;
    }

    public void setWorkNum(String workNum) {
        WorkNum = workNum;
    }
}
