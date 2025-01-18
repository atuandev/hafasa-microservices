package com.iuh.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    UNCATEGORIZED(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid key message", HttpStatus.BAD_REQUEST),
    USER_EXISTS(1002, "User already exists", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1003, "User not found", HttpStatus.NOT_FOUND),
    INVALID_USERNAME(1004, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1005, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    ROLE_NOT_FOUND(1008, "Role not found", HttpStatus.NOT_FOUND),
    INVALID_PHONE(1009, "Phone number must be 10 characters", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(1010, "Invalid email", HttpStatus.BAD_REQUEST),
    INVALID_NAME(1011, "Name must not be null", HttpStatus.BAD_REQUEST),
    INVALID_ADDRESS(1012, "Address must not be null", HttpStatus.BAD_REQUEST),
    INVALID_USER_ID(1013, "User id must not be null", HttpStatus.BAD_REQUEST),
    INVALID_PHONE_FORMAT(1014, "Phone number must be in the format 0xxxxxxxxx", HttpStatus.BAD_REQUEST),
    USER_ADDRESS_NOT_FOUND(1015, "User address not found", HttpStatus.NOT_FOUND),
    INVALID_BOOK_TITLE(1016, "Title must not be null", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_DESCRIPTION(1017, "Description must not be null", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_AUTHOR(1018, "Author must not be null", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_SIZE(1019, "Size must be in the format WxH", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_PAGES(1020, "Pages must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_WEIGHT(1021, "Weight must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_PUBLISH_YEAR(1022, "Publish year must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_IMPORT_PRICE(1023, "Import price must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_PRICE(1024, "Price must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_STOCK(1025, "Stock must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_SLUG(1026, "Slug must not be null", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_SOLD(1027, "Sold must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_CATEGORY(1028, "Category must not be null", HttpStatus.BAD_REQUEST),
    INVALID_DISCOUNT_NAME(1029, "Name must not be null", HttpStatus.BAD_REQUEST),
    INVALID_DISCOUNT_CODE(1030, "Code must be in the format A-Z,0-9", HttpStatus.BAD_REQUEST),
    INVALID_DISCOUNT_PERCENT_MIN(1031, "Percent must be at least 1", HttpStatus.BAD_REQUEST),
    INVALID_DISCOUNT_PERCENT_MAX(1032, "Percent must be at most 100", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_IMAGE_URL(1033, "Url must not be null", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_FOUND(1034, "Category not found", HttpStatus.NOT_FOUND),
    PUBLISHER_NOT_FOUND(1035, "Publisher not found", HttpStatus.NOT_FOUND),
    BOOK_NOT_FOUND(1036, "Book not found", HttpStatus.NOT_FOUND),
    DISCOUNT_NOT_FOUND(1037, "Discount not found", HttpStatus.NOT_FOUND),
    REVIEW_NOT_FOUND(1401, "Review not found", HttpStatus.NOT_FOUND),
    BOOK_EXISTS(1038, "Book already exists", HttpStatus.BAD_REQUEST),
    DISCOUNT_CODE_EXISTED(1039, "Discount code already exists", HttpStatus.BAD_REQUEST),
    BOOK_OUT_OF_STOCK(1040, "Book out of stock", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(1041, "Order not found", HttpStatus.NOT_FOUND),
    INVALID_DATE_RANGE(1042, "End date must be after start date", HttpStatus.BAD_REQUEST),
    PERMISSION_ALREADY_EXISTS(1043, "Permission already exists", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_ID(1044, "Book id must not be null", HttpStatus.BAD_REQUEST),
    INVALID_RATING(1045, "Rating must be between 1 and 5", HttpStatus.BAD_REQUEST),
    INVALID_COMMENT(1046, "Comment must not be null", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN(1047, "Invalid token", HttpStatus.BAD_REQUEST),
    INCORRECT_OLD_PASSWORD(1048, "Old password is incorrect", HttpStatus.BAD_REQUEST),
    INVALID_BOOK_THUMBNAIL(1049, "Thumbnail must not be null", HttpStatus.BAD_REQUEST),
    JSON_PROCESSING_ERROR(1050, "Json processing error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_AVATAR(1051, "Avatar must not be null", HttpStatus.BAD_REQUEST),
    ;

    int code;
    String message;
    HttpStatus statusCode;
}
