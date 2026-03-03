package org.acme.dto;

import org.acme.model.ProductComposition;

public record ProductCompositionResponseDTO (Long id, Double requiredQuantity, Long productId, Long rawMaterialId, String rawMaterialName){
    public static ProductCompositionResponseDTO fromEntity(ProductComposition product){
        return new ProductCompositionResponseDTO(product.id, product.requiredQuantity, product.product.id, product.rawMaterial.id, product.rawMaterial.name);
    }
}
