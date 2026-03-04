package org.acme.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import org.acme.dto.ProductionItemDTO;
import org.acme.dto.SuggestionResponseDTO;
import org.acme.model.Product;
import org.acme.model.RawMaterial;
import org.acme.model.ProductComposition;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class SuggestionService {

    @Transactional
    public void executeProduction(Long productId, int quantityToProduce) {
        Product product = Product.findById(productId);
        if (product == null) return;

        for (ProductComposition comp : product.compositions) {
            RawMaterial material = comp.rawMaterial;
            double needed = comp.requiredQuantity * quantityToProduce;

            if (material.stockQuantity < needed) {
                throw new BadRequestException("Not enough stock for material: " + material.name);
            }

            material.stockQuantity -= needed;
            material.persist();
        }
    }

    public SuggestionResponseDTO calculateProduction() {
        List<Product> products = Product.list(
                "SELECT DISTINCT p FROM Product p " +
                        "LEFT JOIN FETCH p.compositions c " +
                        "LEFT JOIN FETCH c.rawMaterial " +
                        "ORDER BY p.price DESC"
        );

        Map<Long, Double> virtualStock = initializeVirtualStock();
        List<ProductionItemDTO> suggestions = new ArrayList<>();

        for (Product product : products) {
            int quantity = calculateSustainableQuantity(product, virtualStock);

            if (quantity > 0) {
                consumeStock(product, quantity, virtualStock);

                double subTotal = quantity * product.price;
                suggestions.add(new ProductionItemDTO(
                        product.id,
                        product.name,
                        quantity,
                        product.price,
                        subTotal
                ));
            }
        }

        double totalValue = suggestions.stream()
                .mapToDouble(ProductionItemDTO::subtotalValue)
                .sum();

        return new SuggestionResponseDTO(suggestions, totalValue);
    }

    private Map<Long, Double> initializeVirtualStock() {
        return RawMaterial.listAll().stream()
                .map(r -> (RawMaterial) r)
                .collect(Collectors.toMap(r -> r.id, r -> r.stockQuantity));
    }

    private int calculateSustainableQuantity(Product product, Map<Long, Double> virtualStock) {
        if (product.compositions == null || product.compositions.isEmpty()) return 0;

        return product.compositions.stream()
                .mapToInt(comp -> {
                    Double availableStock = virtualStock.getOrDefault(comp.rawMaterial.id, 0.0);
                    if (comp.requiredQuantity <= 0) return Integer.MAX_VALUE;

                    return (int) (availableStock / comp.requiredQuantity);
                })
                .min()
                .orElse(0);
    }

    private void consumeStock(Product product, int quantity, Map<Long, Double> virtualStock) {
        product.compositions.forEach(comp -> {
            virtualStock.computeIfPresent(comp.rawMaterial.id,
                    (id, currentStock) -> currentStock - (comp.requiredQuantity * quantity));
        });
    }
}