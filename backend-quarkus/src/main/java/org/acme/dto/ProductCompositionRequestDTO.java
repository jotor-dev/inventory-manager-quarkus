package org.acme.dto;

public record ProductCompositionRequestDTO (Double requiredQuantity, Long productId, Long rawMaterialId){
}
