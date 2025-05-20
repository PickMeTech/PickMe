package com.pickme.logging;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.logging.LogLevel;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("@annotation(loggable)")
    public Object logExecution (ProceedingJoinPoint joinPoint, Loggable loggable) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        long startTime = System.currentTimeMillis();

        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis() - startTime;

            if (loggable.level() != LogLevel.ERROR) {
                if (loggable.logResult()){
                    String resultStr = (result instanceof List list && list.size() > 3)
                            ? list.subList(0,3) + "...(total: " + list.size() + ")"
                            : String.valueOf(result);
                    log(loggable.level(),
                            "Method: {}, Args: {}, Result: {}, Time: {}ms",
                            methodName, Arrays.toString(args), resultStr, endTime);
                } else {
                    log(loggable.level(),
                            "Method: {}, Args: {},  Time: {}ms",
                            methodName, Arrays.toString(args), endTime);
                }
            }
            return result;
        } catch (Throwable e) {
            if(loggable.logOnException()) {
                log(LogLevel.ERROR, "Exception in {} with args {}", methodName, Arrays.toString(args), e.getMessage());
            }
            throw e;
        }
    }

    private void log(LogLevel level, String message, Object... args) {
        switch(level) {
            case ERROR:
                logger.error(message, args);
                break;
            case INFO:
                logger.info(message, args);
                break;
            case DEBUG:
                logger.debug(message, args);
                break;
        }
    }
}
