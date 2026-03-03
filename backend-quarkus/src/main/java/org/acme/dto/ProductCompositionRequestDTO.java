package org.acme.dto;

public record ProductCompositionRequestDTO (Double requiredQuantity, Long productID, Long rawMaterialId){
}
