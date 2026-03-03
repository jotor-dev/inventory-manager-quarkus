package org.acme.dto;

import org.acme.model.RawMaterial;

public record RawMaterialResponseDTO (Long id, String code, String name, Double stockQuantity){
    public static RawMaterialResponseDTO fromEntity(RawMaterial rawMaterial){
        return new RawMaterialResponseDTO(rawMaterial.id, rawMaterial.code, rawMaterial.name, rawMaterial.stockQuantity);
    }
}
