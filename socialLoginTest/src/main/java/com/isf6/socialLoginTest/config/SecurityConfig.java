package com.isf6.socialLoginTest.config;

import com.isf6.socialLoginTest.api.service.OAuth2SuccessHandler;
import com.isf6.socialLoginTest.common.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import com.isf6.socialLoginTest.api.service.CustomOAuth2UserService;
import com.isf6.socialLoginTest.api.service.TokenService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final TokenService tokenService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
                        .antMatchers("/token/**").permitAll()
                            .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                        .successHandler(successHandler)
                            .userInfoEndpoint().userService(oAuth2UserService);

        http.addFilterBefore(new JwtAuthFilter(tokenService), UsernamePasswordAuthenticationFilter.class);
    }

}
