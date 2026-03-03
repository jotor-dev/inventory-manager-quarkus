-- Povoando as Matérias-Primas (Raw Materials)
-- Usando a sequência RawMaterial_SEQ que o Hibernate criou para esta tabela
INSERT INTO RawMaterial (id, code, name, stockQuantity) VALUES (RawMaterial_SEQ.NEXTVAL, 'RM001', 'Aço Carbono', 100.0);
INSERT INTO RawMaterial (id, code, name, stockQuantity) VALUES (RawMaterial_SEQ.NEXTVAL, 'RM002', 'Polímero', 50.0);
INSERT INTO RawMaterial (id, code, name, stockQuantity) VALUES (RawMaterial_SEQ.NEXTVAL, 'RM003', 'Componente Eletrônico', 200.0);

-- Povoando os Produtos (Products)
-- Usando a sequência Product_SEQ
INSERT INTO Product (id, code, name, price) VALUES (Product_SEQ.NEXTVAL, 'P001', 'Engrenagem Industrial', 500.0);
INSERT INTO Product (id, code, name, price) VALUES (Product_SEQ.NEXTVAL, 'P002', 'Sensor de Pressão', 150.0);

-- Associando Composições (Product Composition)
-- ATENÇÃO: Verifique os IDs gerados. Se o banco recomeçou do 1, a lógica abaixo funciona.
-- Usando a sequência ProductComposition_SEQ
-- Engrenagem Industrial (ID 1) precisa de 10 de Aço (ID 1) e 2 de Polímero (ID 51 - devido ao increment by 50)
-- Dica: No Oracle/Hibernate, o ID pode saltar de 50 em 50.
-- Para testes SEED, é mais seguro usar IDs fixos no INSERT se você for ligar tabelas.

-- Exemplo simplificado usando IDs manuais para garantir a união no SEED:
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (ProductComposition_SEQ.NEXTVAL, 1, 1, 10.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, requiredQuantity) VALUES (ProductComposition_SEQ.NEXTVAL, 1, 51, 2.0);

COMMIT;