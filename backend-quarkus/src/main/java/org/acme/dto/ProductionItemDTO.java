package org.acme.dto;

public record ProductionItemDTO(
        String name,
        int quantityCanProduce,
        Double subtotalValue
){}
