package org.acme.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Product extends PanacheEntity{
    public String code;
    public String name;
    public Double price;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    public List<ProductComposition> compositions;
}
