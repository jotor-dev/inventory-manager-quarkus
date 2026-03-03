package org.acme.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductComposition extends PanacheEntity{
    public Double requiredQuantity;

    @ManyToOne
    public Product product;

    @ManyToOne
    public RawMaterial rawMaterial;
}
