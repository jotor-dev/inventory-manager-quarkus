package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.acme.dto.ProductCompositionRequestDTO;
import org.acme.dto.ProductCompositionResponseDTO;
import org.acme.model.Product;
import org.acme.model.ProductComposition;
import org.acme.model.RawMaterial;

import java.util.List;

@ApplicationScoped
public class ProductCompositionService {

    public List<ProductCompositionResponseDTO> listAll() {
        return ProductComposition.listAll().stream()
                .map(entity -> ProductCompositionResponseDTO.fromEntity((ProductComposition) entity))
                .toList();
    }

    public List<ProductCompositionResponseDTO> findByProductId(Long productId) {
        List<ProductComposition> entities = ProductComposition.list("product.id", productId);

        return entities.stream()
                .map(ProductCompositionResponseDTO::fromEntity)
                .toList();
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
            Product product = Product.findById(dto.productId());
            RawMaterial rawMaterial = RawMaterial.findById(dto.rawMaterialId());

            if(product == null || rawMaterial == null) {
                return false;
            }

            ProductComposition existing = ProductComposition.find(
                    "product.id = ?1 and rawMaterial.id = ?2",
                    dto.productId(), dto.rawMaterialId()
            ).firstResult();

            if (existing != null) {
                existing.requiredQuantity += dto.requiredQuantity();
                return true;
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
        Product product = Product.findById(updatedProduct.productId());
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
