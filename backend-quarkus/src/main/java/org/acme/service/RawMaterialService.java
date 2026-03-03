package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.acme.dto.RawMaterialRequestDTO;
import org.acme.dto.RawMaterialResponseDTO;
import org.acme.model.RawMaterial;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class RawMaterialService {
    public List<RawMaterialResponseDTO> listAll(){
        return RawMaterial.listAll().stream()
                .map(entity -> RawMaterialResponseDTO.fromEntity((RawMaterial) entity))
                .collect(Collectors.toList());
    }

    public RawMaterialResponseDTO findById(Long id){
        RawMaterial rawMaterial = RawMaterial.findById(id);
        if (rawMaterial == null){
            return null;
        }

        return RawMaterialResponseDTO.fromEntity(rawMaterial);
    }

    @Transactional
    public boolean create(RawMaterialRequestDTO dto){
        try{
            RawMaterial product = new RawMaterial();
            product.code = dto.code();
            product.name = dto.name();
            product.stockQuantity = dto.stockQuantity();

            product.persist();
            return product.isPersistent();
        }catch (Exception e){
            return false;
        }
    }

    @Transactional
    public boolean update(Long id, RawMaterialRequestDTO updatedProduct){
        RawMaterial result = RawMaterial.findById(id);

        if(result == null){
            return false;
        }

        result.code = updatedProduct.code();
        result.name = updatedProduct.name();
        result.stockQuantity = updatedProduct.stockQuantity();

        return true;
    }

    @Transactional
    public boolean delete(Long id){
        return RawMaterial.deleteById(id);
    }
}
