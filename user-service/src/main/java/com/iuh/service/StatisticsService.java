package com.iuh.service;
import com.iuh.dto.response.BookStatisticsResponse;
import com.iuh.dto.response.StatisticsResponse;

import java.util.List;

public interface StatisticsService {
    List<StatisticsResponse> getStatisticsByYear(int year);

    List<StatisticsResponse> getAllStatistics();
    List<BookStatisticsResponse> getMostSellingBooks(int limit);
    List<BookStatisticsResponse> getMostSellingBooksByMonth(int month);
}