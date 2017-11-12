package com.xiaoniu.dataplatform.ruleengine.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * @author huangrongpeng
 * @date 2017年8月9日
 * @desc 用于获取spring上下文
 */
@Component
public class SpringContextUtil implements ApplicationContextAware {
	private static ApplicationContext applicationContext;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		SpringContextUtil.applicationContext = applicationContext;
	}
	
	public static ApplicationContext getApplicationContext() {
		return applicationContext ;
	}
	
	public static <T> T getBean(String name, Class<T> requiredType) throws BeansException{
		return applicationContext.getBean(name, requiredType) ;
	}
	
	public static Object getBean(String name) throws BeansException{
		return applicationContext.getBean(name);
	}
	
	public static <T> T getBean(Class<T> requiredType) throws BeansException{
		return applicationContext.getBean(requiredType);
	}
	
	public static boolean containsBean(String name) {
		return applicationContext.containsBean(name);
	}
	
}
