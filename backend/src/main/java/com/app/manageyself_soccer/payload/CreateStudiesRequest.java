package com.app.manageyself_soccer.payload;

import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Getter
public class CreateStudiesRequest {
    Set<String> studies = new HashSet<>();
}
