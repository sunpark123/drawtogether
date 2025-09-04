package com.tjrgus.drawTogether;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true);
    }
// 특정 주소 갔을떄 세션 없으면 롤백
//    @Bean
//    public FilterRegistrationBean<SessionCheckFilter> sessionFilter() {
//        FilterRegistrationBean<SessionCheckFilter> registrationBean = new FilterRegistrationBean<>();
//        registrationBean.setFilter(new SessionCheckFilter());
//        registrationBean.addUrlPatterns("/*");
//        return registrationBean;
//    }


}