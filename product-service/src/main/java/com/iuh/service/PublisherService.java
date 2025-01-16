package com.iuh.service;


import com.iuh.dto.request.PublisherRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.entity.Publisher;

public interface PublisherService {
    Publisher save(PublisherRequest request);

    PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search);

    PageResponse<Object> findAllStatusTrue(int pageNo, int pageSize, String sortBy, String search);

    Publisher findById(String id);

    Publisher findBySlug(String slug);

    Publisher update(String id, PublisherRequest request);

    void delete(String id);

    void updateStatus(String id, boolean status);
}
