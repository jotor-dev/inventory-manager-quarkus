package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.acme.dto.ProductRequestDTO;
import org.acme.dto.ProductResponseDTO;
import org.acme.model.Product;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductService {
    public List<ProductResponseDTO> listAll(){
        return Product.listAll().stream()
                .map(entity -> ProductResponseDTO.fromEntity((Product) entity))
                .collect(Collectors.toList());
    }

    public ProductResponseDTO findById(Long id){
        Product product = Product.findById(id);
        if (product == null){
            return null;
        }

        return ProductResponseDTO.fromEntity(product);
    }

    @Transactional
    public boolean create(ProductRequestDTO dto){
        try{
            Product product = new Product();
            product.code = dto.code();
            product.name = dto.name();
            product.price = dto.price();

            product.persist();
            return product.isPersistent();
        }catch (Exception e){
            return false;
        }
    }

    @Transactional
    public boolean update(Long id, ProductRequestDTO updatedProduct){
        Product result = Product.findById(id);

        if(result == null){
            return false;
        }

        result.code = updatedProduct.code();
        result.name = updatedProduct.name();
        result.price = updatedProduct.price();

        return true;
    }

    @Transactional
    public boolean delete(Long id){
        Product product = Product.findById(id);
        if (product != null) {
            product.delete();
            return true;
        }
        return false;
    }
}
