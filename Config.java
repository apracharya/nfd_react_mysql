// package com.teamfilm.mynfd.config;

// import com.teamfilm.mynfd.security.JWTAuthenticationEntryPoint;
// import com.teamfilm.mynfd.security.JWTAuthenticationFilter;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.boot.web.servlet.FilterRegistrationBean;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// @EnableMethodSecurity
// public class SecurityConfig {

//     @Autowired
//     private CustomUserDetailService customUserDetailService;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         auth.userDetailsService(this.customUserDetailService).passwordEncoder(passwordEncoder);
//     }

//     private JWTAuthenticationEntryPoint point;

//     private JWTAuthenticationFilter filter;

//     public SecurityConfig(JWTAuthenticationEntryPoint point, JWTAuthenticationFilter filter) {
//         this.point = point;
//         this.filter = filter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//         // configuration
//         http.csrf(csrf -> csrf.disable())
//                 .cors(cors -> cors.disable())
//                 .authorizeHttpRequests(auth -> auth.requestMatchers("/home/**")
//                         .authenticated()
//                         .requestMatchers("auth/login").permitAll()
//                         .requestMatchers("auth/register").permitAll()
//                         .requestMatchers("films/read/**").permitAll()
//                         .requestMatchers("films/image/**").permitAll()
//                         .requestMatchers("films/search/**").permitAll()
//                         .requestMatchers("category/read/**").permitAll()
// //                        .requestMatchers("reviews/**").permitAll()
//                         .anyRequest().authenticated())
//                 .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
//                 .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//         ;

//         http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public FilterRegistrationBean coresFilter(){
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

//         CorsConfiguration corsConfiguration = new CorsConfiguration();
//         corsConfiguration.setAllowCredentials(true);
//         corsConfiguration.addAllowedOrigin("*");
//         corsConfiguration.addAllowedHeader("Authorization");
//         corsConfiguration.addAllowedHeader("Content-Type");
//         corsConfiguration.addAllowedHeader("Accept");
//         corsConfiguration.addAllowedHeader("POST");
//         corsConfiguration.addAllowedHeader("GET");
//         corsConfiguration.addAllowedHeader("DELETE");
//         corsConfiguration.addAllowedHeader("PUT");
//         corsConfiguration.addAllowedHeader("OPTIONS");
//         corsConfiguration.setMaxAge(3600L);

//         source.registerCorsConfiguration("/**", corsConfiguration);

//         FilterRegistrationBean bean = new FilterRegistrationBean();
//         bean.setFilter(new CorsFilter(source));
//         bean.setOrder(-110);
//         return bean;
//     }

// }
