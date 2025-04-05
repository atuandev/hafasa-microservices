package com.springboot.app.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.app.dto.request.PaymentCreateLinkRequest;
import com.springboot.app.dto.response.PaymentCreateLinkResponse;
import com.springboot.app.type.CreatePaymentLinkRequestBody;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;
import vn.payos.type.PaymentLinkData;

@Controller
//@JsonIgnoreProperties(ignoreUnknown = true)
public class CheckoutController {
    private final PayOS payOS;

    public CheckoutController(PayOS payOS) {
        super();
        this.payOS = payOS;
    }

//    @RequestMapping(value = "/")
//    public String Index() {
//        return "index";
//    }
//
//    @RequestMapping(value = "/success")
//    public String Success() {
//        return "success";
//    }
//
//    @RequestMapping(value = "/cancel")
//    public String Cancel() {
//        return "cancel";
//    }


    @PostMapping(
            value = "/create-payment-link",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<PaymentCreateLinkResponse> checkout(HttpServletRequest request,@RequestBody PaymentCreateLinkRequest body) {
        try {
            // Dữ liệu nhận được
            String baseUrl = getBaseUrl(request);
            String currentTimeString = String.valueOf(new Date().getTime());
            long orderIdOS = Long.parseLong(currentTimeString.substring(Math.max(0, currentTimeString.length() - 6)));
            String orderId = body.getOrderId();
            int price = body.getPrice();

            // Mô tả đơn hàng
            String description = "Thanh toán đơn hàng" + orderId;

            // Tạo dữ liệu thanh toán
            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderIdOS)
                    .amount(price)
                    .description(description)
                    .cancelUrl(baseUrl + "/cancel")    // ✅ dùng URL có sẵn
                    .returnUrl(baseUrl + "/success")
                    .build();

            // Gọi PayOS tạo link thanh toán
            CheckoutResponseData data = payOS.createPaymentLink(paymentData);

            // Tạo đối tượng trả về
            PaymentCreateLinkResponse responseBody = new PaymentCreateLinkResponse(
                    orderIdOS,
                    orderId,
                    price,
                    data.getCheckoutUrl()
            );

            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // API hủy link thanh toán
// API hủy link thanh toán
    @PostMapping(value = "/cancel-payment-link",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> cancelPaymentLink(@RequestBody CreatePaymentLinkRequestBody body) {
        try {
            // Gọi API PayOS để hủy link thanh toán
            PaymentLinkData isCancelled = payOS.cancelPaymentLink(body.getOrderId(), "cancellationReason");
//            payOS.c

            if (isCancelled!= null && isCancelled.getStatus().equals("CANCELLED")) {
                return ResponseEntity.ok("Payment link canceled successfully.");
            } else {
                return ResponseEntity.status(500).body("Failed to cancel payment link.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred while canceling payment link.");
        }
    }

    @GetMapping("/get-order-status")
    public ResponseEntity<Map<String, Object>> getOrderStatus(@RequestBody CreatePaymentLinkRequestBody body) {
        try {
            // Gọi API của PayOS để lấy thông tin đơn hàng theo orderId
            PaymentLinkData paymentLinkData = payOS.getPaymentLinkInformation(body.getOrderId());  // Giả sử có phương thức này từ PayOS

            // Kiểm tra nếu tìm thấy dữ liệu và trả về kết quả
            if (paymentLinkData != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("orderId", body.getOrderId());
                response.put("status", paymentLinkData.getStatus());  // Lấy status từ đối tượng paymentLinkData

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body(Map.of("error", "Order not found"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Error occurred while fetching order status"));
        }
    }



    private String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        String url = scheme + "://" + serverName;
        if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") && serverPort != 443)) {
            url += ":" + serverPort;
        }
        url += contextPath;
        return url;
    }
}