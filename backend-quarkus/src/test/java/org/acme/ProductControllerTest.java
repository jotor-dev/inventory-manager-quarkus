package org.acme;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.acme.dto.ProductRequestDTO;
import org.acme.dto.ProductResponseDTO;
import org.acme.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collections;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@QuarkusTest
public class ProductControllerTest {
    @InjectMock
    ProductService productService;

    @Test
    public void shouldReturnEmptyListWhenNoProductsExist(){
        Mockito.when(productService.listAll()).thenReturn(Collections.emptyList());

        given()
                .when().get("/product")
                .then()
                .statusCode(200)
                .body("size()", is(0));
    }

    @Test
    public void shouldCreateProductSuccesfully(){
        ProductRequestDTO dto = new ProductRequestDTO("COD-001", "Test Product", 150.50);

        Mockito.when(productService.create(any(ProductRequestDTO.class))).thenReturn(true);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .when().post("/product")
                .then()
                .statusCode(201);
    }

    @Test
    public void shouldReturnBadRequestWhenCreationFails(){
        ProductRequestDTO dto = new ProductRequestDTO("COD-002", "Test Product", 0.0);

        Mockito.when(productService.create(any(ProductRequestDTO.class))).thenReturn(false);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .when().post("/product")
                .then()
                .statusCode(400);
    }

    @Test
    public void shouldReturnNotFoundWhenProductDoesNotExist() {
        Long phantomId = 999L;

        Mockito.when(productService.findById(phantomId)).thenReturn(null);

        given()
                .pathParam("id", phantomId)
                .when().get("/product/{id}")
                .then()
                .statusCode(404);
    }

    @Test
    public void shouldReturnProductWhenItExists() {
        Long realId = 1L;
        ProductResponseDTO expectedDto = new ProductResponseDTO(realId, "COD-001", "Test Product", 150.50);

        Mockito.when(productService.findById(realId)).thenReturn(expectedDto);

        given()
                .pathParam("id", realId)
                .when().get("/product/{id}")
                .then()
                .statusCode(200)
                .body("code", is("COD-001"))
                .body("name", is("Test Product"));
    }

    @Test
    public void shouldUpdateProductSuccessfully() {
        Long realId = 1L;
        ProductRequestDTO dto = new ProductRequestDTO("COD-001", "Test Product", 200.00);

        Mockito.when(productService.update(eq(realId), any(ProductRequestDTO.class))).thenReturn(true);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .pathParam("id", realId)
                .when().put("/product/{id}")
                .then()
                .statusCode(200);
    }

    @Test
    public void shouldReturnNotFoundWhenUpdatingPhantom() {
        Long phantomId = 999L;
        ProductRequestDTO dto = new ProductRequestDTO("COD-001", "Test Product", 10.0);

        Mockito.when(productService.update(eq(phantomId), any(ProductRequestDTO.class))).thenReturn(false);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .pathParam("id", phantomId)
                .when().put("/product/{id}")
                .then()
                .statusCode(404);
    }

    @Test
    public void shouldDeleteProductSuccessfully() {
        Long realId = 1L;

        Mockito.when(productService.delete(realId)).thenReturn(true);

        given()
                .pathParam("id", realId)
                .when().delete("/product/{id}")
                .then()
                .statusCode(204);
    }

    @Test
    public void shouldReturnNotFoundWhenDeletingPhantom() {
        Long phantomId = 999L;

        Mockito.when(productService.delete(phantomId)).thenReturn(false);

        given()
                .pathParam("id", phantomId)
                .when().delete("/product/{id}")
                .then()
                .statusCode(404);
    }

}
