package com.pickme.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {

    private String title;
    private String author;
    private String description;

    @Override
    public String toString() {
        return "[title=" + title + ", author=" + author + "]";
    }
}
