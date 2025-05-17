package com.iuh.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Random;

@Slf4j
@Component
public class OtpUtil {
    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private static final String SECRET_KEY = "hafasa_otp_secret_key"; // In production, this should be in a secure config
    private static final int OTP_LENGTH = 6;
    private static final long OTP_VALIDITY_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
    private final Random random = new SecureRandom();

    /**
     * Generates a random OTP of specified length
     * @return the generated OTP
     */
    public String generateOtp() {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    /**
     * Creates a token containing the email, OTP, and expiration time
     * @param email the email address
     * @param otp the OTP
     * @return the token
     */
    public String createToken(String email, String otp) {
        try {
            long expiryTime = Instant.now().toEpochMilli() + OTP_VALIDITY_DURATION;
            String data = email + ":" + otp + ":" + expiryTime;
            String signature = generateHmac(data);
            String token = data + ":" + signature;
            return Base64.getEncoder().encodeToString(token.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            log.error("Error creating OTP token", e);
            throw new RuntimeException("Error creating OTP token", e);
        }
    }

    /**
     * Verifies an OTP against a token
     * @param email the email address
     * @param otp the OTP to verify
     * @param token the token
     * @return true if the OTP is valid, false otherwise
     */
    public boolean verifyOtp(String email, String otp, String token) {
        try {
            String decodedToken = new String(Base64.getDecoder().decode(token), StandardCharsets.UTF_8);
            String[] parts = decodedToken.split(":");
            
            if (parts.length != 4) {
                return false;
            }
            
            String tokenEmail = parts[0];
            String tokenOtp = parts[1];
            long expiryTime = Long.parseLong(parts[2]);
            String signature = parts[3];
            
            // Verify email
            if (!email.equals(tokenEmail)) {
                return false;
            }
            
            // Verify OTP
            if (!otp.equals(tokenOtp)) {
                return false;
            }
            
            // Verify expiry
            if (Instant.now().toEpochMilli() > expiryTime) {
                return false;
            }
            
            // Verify signature
            String data = tokenEmail + ":" + tokenOtp + ":" + expiryTime;
            String expectedSignature = generateHmac(data);
            
            return signature.equals(expectedSignature);
        } catch (Exception e) {
            log.error("Error verifying OTP", e);
            return false;
        }
    }

    /**
     * Gets the expiry time from a token
     * @param token the token
     * @return the expiry time in milliseconds since epoch
     */
    public long getExpiryTimeFromToken(String token) {
        try {
            String decodedToken = new String(Base64.getDecoder().decode(token), StandardCharsets.UTF_8);
            String[] parts = decodedToken.split(":");
            
            if (parts.length != 4) {
                return 0;
            }
            
            return Long.parseLong(parts[2]);
        } catch (Exception e) {
            log.error("Error getting expiry time from token", e);
            return 0;
        }
    }

    private String generateHmac(String data) throws NoSuchAlgorithmException, InvalidKeyException {
        SecretKeySpec secretKeySpec = new SecretKeySpec(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8), 
                HMAC_ALGORITHM
        );
        Mac mac = Mac.getInstance(HMAC_ALGORITHM);
        mac.init(secretKeySpec);
        byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hmacBytes);
    }
}