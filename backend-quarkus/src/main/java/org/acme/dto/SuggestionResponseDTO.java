package org.acme.dto;

import java.util.List;

public record SuggestionResponseDTO(
        List<ProductionItemDTO> items,
        Double totalValue){}
