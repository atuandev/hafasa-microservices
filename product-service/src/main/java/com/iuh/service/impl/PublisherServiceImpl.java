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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class PublisherServiceImpl implements PublisherService {
    PublisherRepository publisherRepository;
    PublisherMapper publisherMapper;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Publisher save(PublisherRequest request) {
        log.info("Saving publisher with name: {}", request.getName());

        Publisher publisher = publisherMapper.toEntity(request);
        Publisher savedPublisher = publisherRepository.save(publisher);

        log.info("Publisher saved with ID: {}", savedPublisher.getId());
        return savedPublisher;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public PageResponse<Object> findAll(int pageNo, int pageSize, String sortBy, String search) {
        log.info("Fetching all publishers with search criteria: '{}', pageNo: {}, pageSize: {}, sortBy: {}",
                search, pageNo, pageSize, sortBy);

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Publisher> publishers = publisherRepository.findWithSearch(search, search, search, pageable);

        List<Publisher> items = publishers.getContent();
        log.info("Fetched {} publishers", items.size());

        return PageUtil.getPageResponse(pageable, publishers, items);
    }

    @Override
    public PageResponse<Object> findAllStatusTrue(int pageNo, int pageSize, String sortBy, String search) {
        log.info("Fetching all publishers with status 'true' and search criteria: '{}', pageNo: {}, pageSize: {}, sortBy: {}",
                search, pageNo, pageSize, sortBy);

        Pageable pageable = PageUtil.getPageable(pageNo, pageSize, sortBy);
        Page<Publisher> publishers = publisherRepository.findAllWithSearchStatusTrue(search, search, search, pageable);

        List<PublisherResponse> items = publishers.map(publisherMapper::toResponse).getContent();
        log.info("Fetched {} publishers with status 'true'", items.size());

        return PageUtil.getPageResponse(pageable, publishers, items);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Publisher findById(String id) {
        log.info("Fetching publisher by ID: {}", id);
        Publisher publisher = getPublisherById(id);
        log.info("Found publisher: {}", publisher.getName());
        return publisher;
    }

    @Override
    public Publisher findBySlug(String slug) {
        log.info("Fetching publisher by slug: {}", slug);
        Publisher publisher = publisherRepository.findBySlug(slug)
                .orElseThrow(() -> {
                    log.error("Publisher not found with slug: {}", slug);
                    return new AppException(ErrorCode.PUBLISHER_NOT_FOUND);
                });
        log.info("Found publisher: {}", publisher.getName());
        return publisher;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Publisher update(String id, PublisherRequest request) {
        log.info("Updating publisher with ID: {}", id);

        Publisher publisher = findById(id);
        publisherMapper.toUpdateEntity(publisher, request);

        Publisher updatedPublisher = publisherRepository.save(publisher);
        log.info("Publisher updated with ID: {}", updatedPublisher.getId());
        return updatedPublisher;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String id) {
        log.info("Deleting publisher with ID: {}", id);

        Publisher publisher = getPublisherById(id);
        publisherRepository.deleteById(publisher.getId());

        log.info("Publisher with ID: {} has been deleted", id);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void updateStatus(String id, boolean status) {
        log.info("Updating status for publisher with ID: {} to {}", id, status);

        Publisher publisher = getPublisherById(id);
        publisher.setStatus(status);
        publisherRepository.save(publisher);

        log.info("Publisher with ID: {} status updated to {}", id, status);
    }

    private Publisher getPublisherById(String id) {
        return publisherRepository.findById(id).orElseThrow(() -> {
            log.error("Publisher not found with ID: {}", id);
            return new AppException(ErrorCode.PUBLISHER_NOT_FOUND);
        });
    }
}
