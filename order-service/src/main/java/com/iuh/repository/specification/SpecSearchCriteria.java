package com.iuh.repository.specification;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static com.iuh.repository.specification.SearchOperation.*;

@Getter
@Setter
@NoArgsConstructor
public class SpecSearchCriteria {

    private String key;
    private SearchOperation operation;
    private Object value;
    private boolean orPredicate;

    public SpecSearchCriteria(String key, SearchOperation operation, Object value) {
        super();
        this.key = key;
        this.operation = operation;
        this.value = value;
    }

    public SpecSearchCriteria(String orPredicate, String key, SearchOperation operation, Object value) {
        super();
        this.orPredicate = orPredicate != null && orPredicate.equals(OR_PREDICATE_FLAG);
        this.key = key;
        this.operation = operation;
        this.value = value;
    }

    public SpecSearchCriteria(String key, String operation, String prefix, String value, String suffix) {
        SearchOperation searchOperation = SearchOperation.getSimpleOperation(operation.charAt(0));
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

        this.key = key;
        this.operation = searchOperation;
        this.value = value;
    }

}
