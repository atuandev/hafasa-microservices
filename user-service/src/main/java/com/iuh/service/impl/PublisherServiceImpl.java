package com.iuh.service.impl;

import com.iuh.dto.request.PublisherRequest;
import com.iuh.dto.response.PageResponse;
import com.iuh.dto.response.PublisherResponse;
import com.iuh.entity.Publisher;
import com.iuh.exception.AppException;
import com.iuh.exception.ErrorCode;
import com.iuh.mapper.PublisherMapper;
import com.iuh.repository.PublisherRepository;
import com.iuh.service.PublisherService;
import com.iuh.util.PageUtil;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class PublisherServiceImpl implements PublisherService {
    PublisherRepository publisherRepository;
    PublisherMapper publisherMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Publisher save(PublisherRequest request) {
        return publisherRepository.save(publisherMapper.toEntity(request));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Publisher> publishers = publisherRepository.findWithSearch(search, search, search, pageable);

        List<Publisher> items = publishers.getContent();

        return PageUtil.getPageResponse(pageable, publishers, items);
    }

    @Override
    public PageResponse<Object> findAllStatusTrue(int pageNo, int pageSize, String sortBy, String search) {
        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);

        Page<Publisher> publishers = publisherRepository.findAllWithSearchStatusTrue(search, search, search, pageable);

        List<PublisherResponse> items = publishers.map(publisherMapper::toResponse).getContent();

        return PageUtil.getPageResponse(pageable, publishers, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Publisher findById(String id) {
        return getPublisherById(id);
    }

    @Override
    public Publisher findBySlug(String slug) {
        return publisherRepository.findBySlug(slug).orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Publisher update(String id, PublisherRequest request) {
        Publisher publisher = findById(id);
        publisherMapper.toUpdateEntity(publisher, request);
        return publisherRepository.save(publisher);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String id) {
        publisherRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void updateStatus(String id, boolean status) {
        Publisher publisher = getPublisherById(id);
        publisher.setStatus(status);
        publisherRepository.save(publisher);
    }

    private Publisher getPublisherById(String id) {
        return publisherRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PUBLISHER_NOT_FOUND));
    }
}
