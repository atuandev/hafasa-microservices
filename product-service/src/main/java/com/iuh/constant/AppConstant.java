package com.iuh.constant;

public class AppConstant {
    public static final String SEARCH_OPERATOR = "(\\w+?)(:|<|>)(.*)";
    public static final String SEARCH_SPEC_OPERATOR = "(\\w+?)([<:>~!])(.*)(\\p{Punct}?)(\\p{Punct}?)";
    public static final String SORT_BY = "(\\w+?)(:)(.*)";

    private AppConstant() {
    }
}
