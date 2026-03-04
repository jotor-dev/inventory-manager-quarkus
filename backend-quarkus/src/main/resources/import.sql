DELETE FROM ProductComposition;
DELETE FROM Product;
DELETE FROM RawMaterial;

INSERT INTO RawMaterial (id, code, name, stockQuantity) VALUES (1, 'RM001', 'Carbon Steel', 3000.0);
INSERT INTO RawMaterial (id, code, name, stockQuantity) VALUES (2, 'RM002', 'Special Polymer', 1000.0);
INSERT INTO RawMaterial (id, code, name, stockQuantity) VALUES (3, 'RM003', 'Control Chip', 600.0);
INSERT INTO RawMaterial (id, code, name, stockQuantity) VALUES (4, 'RM004', 'Electrolytic Copper', 200.0);

INSERT INTO Product (id, code, name, price) VALUES (10, 'P001', 'V8 Industrial Engine', 2500.0);
INSERT INTO Product (id, code, name, price) VALUES (20, 'P002', 'Digital Pressure Sensor', 450.0);
INSERT INTO Product (id, code, name, price) VALUES (30, 'P003', 'Reinforced Gear', 150.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (100, 10, 1, 50.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (101, 10, 3, 5.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (102, 10, 4, 20.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (200, 20, 3, 1.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (201, 20, 2, 2.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (300, 30, 1, 10.0);

COMMIT;
