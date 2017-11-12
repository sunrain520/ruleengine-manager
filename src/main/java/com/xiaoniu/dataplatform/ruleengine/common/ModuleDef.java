package com.xiaoniu.dataplatform.ruleengine.common;

import java.lang.annotation.*;

/**
 * 模块类注解
 * @author  tanhui
 * @version 1.0
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ModuleDef {
    String subModule();
    String module();
    String operate();
}
