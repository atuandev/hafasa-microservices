package com.iuh.repository.specification;

import com.iuh.entity.User;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import static com.iuh.repository.specification.SearchOperation.*;

public class UserSpecificationsBuilder {
    public final List<SpecSearchCriteria> params;

    public UserSpecificationsBuilder() {
        params = new ArrayList<>();
    }

    // API
    public UserSpecificationsBuilder with(
            final String key,
            final String operation,
            final Object value,
            final String prefix,
            final String suffix
    ) {
        return with(null, key, operation, value, prefix, suffix);
    }

    public UserSpecificationsBuilder with(
            final String orPredicate,
            final String key,
            final String operation,
            final Object value,
            final String prefix,
            final String suffix
    ) {
        SearchOperation searchOperation = SearchOperation.getSimpleOperation(operation.charAt(0));
        if (searchOperation != null) {
            if (searchOperation == EQUALITY) { // the operation may be complex operation
                final boolean startWithAsterisk = prefix != null && prefix.contains(ZERO_OR_MORE_REGEX);
                final boolean endWithAsterisk = suffix != null && suffix.contains(ZERO_OR_MORE_REGEX);

                if (startWithAsterisk && endWithAsterisk) {
                    searchOperation = CONTAINS;
                } else if (startWithAsterisk) {
                    searchOperation = ENDS_WITH;
                } else if (endWithAsterisk) {
                    searchOperation = STARTS_WITH;
                }
            }
            params.add(new SpecSearchCriteria(orPredicate, key, searchOperation, value));
        }
        return this;
    }

    public Specification<User> build() {
        if (params.isEmpty())
            return null;

        Specification<User> result = new SearchSpecification<>(params.getFirst());

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i).isOrPredicate()
                    ? Specification.where(result).or(new SearchSpecification<>(params.get(i)))
                    : Specification.where(result).and(new SearchSpecification<>(params.get(i)));
        }

        return result;
    }

    public UserSpecificationsBuilder with(SearchSpecification<User> spec) {
        params.add(spec.getCriteria());
        return this;
    }

    public UserSpecificationsBuilder with(SpecSearchCriteria criteria) {
        params.add(criteria);
        return this;
    }
}
