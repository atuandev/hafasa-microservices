package com.iuh.service.impl;

import com.iuh.dto.request.OrderCreationRequest;
import com.iuh.dto.request.OrderDetailRequest;
import com.iuh.dto.response.BookResponseAdmin;
import com.iuh.dto.response.OrderResponse;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Order;
import com.iuh.entity.OrderDetail;
import com.iuh.enums.OrderStatus;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.OrderMapper;
import com.iuh.repository.OrderRepository;
import com.iuh.repository.httpclient.BookClient;
import com.iuh.service.OrderService;
import com.iuh.util.PageUtil;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OrderServiceImpl implements OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;
    BookClient bookClient;

    @Override
    @Transactional
    public OrderResponse save(OrderCreationRequest request) {
        Order order = orderMapper.toOrder(request);

        for (OrderDetailRequest detailRequest : request.getOrderDetails()) {
            BookResponseAdmin book = bookClient.getBookDetails(detailRequest.getBookId()).getData();

            boolean isOutOfStock = book.getStock() < detailRequest.getQuantity();
            if (isOutOfStock) throw new AppException(ErrorCode.BOOK_OUT_OF_STOCK);

            // Update stock and sold
            book.setStock(book.getStock() - detailRequest.getQuantity());
            book.setSold(book.getSold() + detailRequest.getQuantity());
            bookClient.updateBookStockAndSold(book.getId(), book.getStock(), book.getSold());

            order.addOrderDetail(OrderDetail.builder()
                    .bookId(book.getId())
                    .price(detailRequest.getPrice())
                    .quantity(detailRequest.getQuantity())
                    .build());
        }

        return orderMapper.toOrderResponse(orderRepository.save(order));
    }

    @Override
    public OrderResponse findById(String id) {
        Order order = getOrderById(id);
        return orderMapper.toOrderResponse(order);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAllOrders(int pageNo, int pageSize, String sortBy) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Order> orders = orderRepository.findAll(pageable);

        List<OrderResponse> items = orders.map(orderMapper::toOrderResponse).getContent();

        return PageUtil.getPageResponse(pageable, orders, items);
    }

    @Override
    public PageResponse<Object> findAllByUserId(String userId, int pageNo, int pageSize, String sortBy) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Order> orders = orderRepository.findAllByUserId(userId, pageable);

        List<OrderResponse> items = orders.map(orderMapper::toOrderResponse).getContent();

        return PageUtil.getPageResponse(pageable, orders, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void changeStatus(String id, OrderStatus status) {
        Order order = getOrderById(id);
        order.setOrderStatus(status);
        orderRepository.save(order);
    }

    private Order getOrderById(String id) {
        return orderRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

}
