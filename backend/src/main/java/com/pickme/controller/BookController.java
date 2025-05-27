package com.pickme.controller;

import com.pickme.dto.book.BookDTO;
import com.pickme.service.BookSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookSearchService bookSearchService;
    public BookController(BookSearchService bookSearchService) {
        this.bookSearchService = bookSearchService;
    }

    @GetMapping
    public CompletableFuture<ResponseEntity<List<BookDTO>>> getSaleBookAsync(
            @RequestParam("query") String query) {
        return bookSearchService.asyncFilterSaleBooks(query)
                .thenApply(ResponseEntity::ok);
    }
}
