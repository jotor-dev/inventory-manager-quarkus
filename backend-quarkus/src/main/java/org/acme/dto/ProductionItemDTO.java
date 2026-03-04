package org.acme.dto;

public record ProductionItemDTO(
        Long productId,
        String name,
        int quantityCanProduce,
        Double unitPrice,
        Double subtotalValue
){}
