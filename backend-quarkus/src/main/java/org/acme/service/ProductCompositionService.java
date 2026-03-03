package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.acme.dto.ProductCompositionRequestDTO;
import org.acme.dto.ProductCompositionResponseDTO;
import org.acme.dto.ProductResponseDTO;
import org.acme.dto.RawMaterialResponseDTO;
import org.acme.model.Product;
import org.acme.model.ProductComposition;
import org.acme.model.RawMaterial;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductCompositionService {

    public List<ProductCompositionResponseDTO> listAll() {
        return ProductComposition.listAll().stream()
                .map(entity -> ProductCompositionResponseDTO.fromEntity((ProductComposition) entity))
                .collect(Collectors.toList());
    }

    public ProductCompositionResponseDTO findById(Long id){
        ProductComposition product = ProductComposition.findById(id);
        if (product == null){
            return null;
        }

        return ProductCompositionResponseDTO.fromEntity(product);
    }

    @Transactional
    public boolean create(ProductCompositionRequestDTO dto){
        try{
            Product product = Product.findById(dto.productID());
            RawMaterial rawMaterial = RawMaterial.findById(dto.rawMaterialId());

            if(product == null || rawMaterial == null) {
                return false;
            }

            ProductComposition composition = new ProductComposition();
            composition.product = product;
            composition.rawMaterial = rawMaterial;
            composition.requiredQuantity = dto.requiredQuantity();

            composition.persist();
            return composition.isPersistent();
        }catch (Exception e){
            return false;
        }
    }

    @Transactional
    public boolean update(Long id, ProductCompositionRequestDTO updatedProduct){
        ProductComposition result = ProductComposition.findById(id);
        Product product = Product.findById(updatedProduct.productID());
        RawMaterial rawMaterial = RawMaterial.findById(updatedProduct.rawMaterialId());

        if(result == null || product == null || rawMaterial == null){
            return false;
        }

        result.product = product;
        result.rawMaterial = rawMaterial;
        result.requiredQuantity = updatedProduct.requiredQuantity();

        return true;
    }

    @Transactional
    public boolean delete(Long id){
        return ProductComposition.deleteById(id);
    }
}
