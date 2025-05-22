package com.pickme.controller;

import com.pickme.dto.book.BookDTO;
import com.pickme.service.BookSearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookSearchService bookSearchService;
    public BookController(BookSearchService bookSearchService) {
        this.bookSearchService = bookSearchService;
    }

    @GetMapping("/search")
    public List<BookDTO> searchBooks(@RequestParam String query) {
        return bookSearchService.searchBooks(query);
    }
}
