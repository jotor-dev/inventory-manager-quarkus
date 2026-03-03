package org.acme.dto;


import org.acme.model.Product;

public record ProductResponseDTO (Long id, String code, String name, Double price){

    public static ProductResponseDTO fromEntity(Product product){
        return new ProductResponseDTO(product.id, product.code, product.name, product.price);
    }

}
