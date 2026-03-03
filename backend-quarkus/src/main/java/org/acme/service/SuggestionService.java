package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.acme.dto.ProductionItemDTO;
import org.acme.dto.SuggestionResponseDTO;
import org.acme.model.Product;
import org.acme.model.RawMaterial;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class SuggestionService {
    public SuggestionResponseDTO calculateProduction(){
        Map<Long, Double> virtualStock = this.initializeVirtualStock();
        List<Product> productsByValue = Product.list("ORDER BY price DESC");
        List<ProductionItemDTO> itemsToProduce = new ArrayList<>();

        productsByValue.forEach(product -> {
            int quantity = this.produceUntilExhaution(product, virtualStock);
            if (quantity > 0){
                double subTotal = quantity * product.price;
                itemsToProduce.add(new ProductionItemDTO(product.name, quantity, subTotal));
            }
        });

        double totalValue = itemsToProduce.stream()
                .mapToDouble(item -> item.subtotalValue())
                .sum();

        return new SuggestionResponseDTO(itemsToProduce, totalValue);
    }

    private Map<Long, Double> initializeVirtualStock(){
        List<RawMaterial> rawMaterials = RawMaterial.listAll();
        return rawMaterials.stream()
                .collect(Collectors.toMap(
                        entity -> entity.id,
                        entity -> entity.stockQuantity,
                        (existente, substituto) -> existente,
                        HashMap::new
                ));
    }

    private int produceUntilExhaution(Product product, Map<Long, Double> virtualStock){
        if(product.compositions == null || product.compositions.isEmpty()){
            return 0;
        }

        int quantity = 0;
        while (this.canManufacture(product, virtualStock)){
            consumeIngredients(product, virtualStock);
            quantity++;
        }
        return quantity;
    }

    private boolean canManufacture(Product product, Map<Long, Double> virtualStock){
        return product.compositions.stream()
                .allMatch(comp ->
                    virtualStock.getOrDefault(comp.rawMaterial.id, 0.0) >= comp.requiredQuantity
                );
    }

    private void consumeIngredients(Product product, Map<Long, Double> virtualStock){
        product.compositions.forEach(comp -> {
            virtualStock.computeIfPresent(comp.rawMaterial.id, (id, current) -> current - comp.requiredQuantity);
        });
    }
}
