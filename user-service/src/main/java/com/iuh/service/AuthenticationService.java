package com.iuh.service;

import com.iuh.dto.request.AuthenticationRequest;
import com.iuh.dto.request.IntrospectRequest;
import com.iuh.dto.request.LogoutRequest;
import com.iuh.dto.request.RefreshRequest;
import com.iuh.dto.response.AuthenticationResponse;
import com.iuh.dto.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;

    AuthenticationResponse authenticate(AuthenticationRequest request);

    void logout(LogoutRequest request) throws ParseException, JOSEException;

    AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;
}
