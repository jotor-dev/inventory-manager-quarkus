package org.acme;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.acme.dto.ProductCompositionRequestDTO;
import org.acme.dto.ProductCompositionResponseDTO;
import org.acme.service.ProductCompositionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collections;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@QuarkusTest
public class ProductCompositionControllerTest {
    @InjectMock
    ProductCompositionService productCompositionService;

    private static final String PATH = "/product-composition";

    @Test
    public void shouldReturnEmptyListWhenNoCompositionsExist(){
        Mockito.when(productCompositionService.listAll()).thenReturn(Collections.emptyList());

        given()
                .when().get(PATH)
                .then()
                .statusCode(200)
                .body("size()", is(0));
    }

    @Test
    public void shouldCreateCompositionSuccesfully(){
        ProductCompositionRequestDTO dto = new ProductCompositionRequestDTO(150.0, 1L, 2L);

        Mockito.when(productCompositionService.create(any(ProductCompositionRequestDTO.class))).thenReturn(true);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .when().post(PATH)
                .then()
                .statusCode(201);
    }

    @Test
    public void shouldReturnBadRequestWhenCreationFails(){
        ProductCompositionRequestDTO dto = new ProductCompositionRequestDTO(20.3, 1L, 2L);

        Mockito.when(productCompositionService.create(any(ProductCompositionRequestDTO.class))).thenReturn(false);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .when().post(PATH)
                .then()
                .statusCode(400);
    }

    @Test
    public void shouldReturnNotFoundWhenCompositionDoesNotExist() {
        Long phantomId = 999L;

        Mockito.when(productCompositionService.findById(phantomId)).thenReturn(null);

        given()
                .pathParam("id", phantomId)
                .when().get(PATH + "/{id}")
                .then()
                .statusCode(404);
    }

    @Test
    public void shouldReturnCompositionWhenItExists() {
        Long realId = 1L;

        ProductCompositionResponseDTO response = new ProductCompositionResponseDTO(realId, 150.0, 1L, 2L);

        Mockito.when(productCompositionService.findById(realId)).thenReturn(response);

        given()
                .pathParam("id", realId)
                .when().get(PATH + "/{id}")
                .then()
                .statusCode(200)
                .body("requiredQuantity", is(150.0F));
    }

    @Test
    public void shouldUpdateCompositionSuccessfully() {
        Long realId = 1L;
        ProductCompositionRequestDTO dto = new ProductCompositionRequestDTO(200.0, 1L, 2L);

        Mockito.when(productCompositionService.update(eq(realId), any(ProductCompositionRequestDTO.class))).thenReturn(true);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .pathParam("id", realId)
                .when().put(PATH + "/{id}")
                .then()
                .statusCode(200);
    }

    @Test
    public void shouldReturnNotFoundWhenUpdatingPhantom() {
        Long realId = 1L;
        ProductCompositionRequestDTO dto = new ProductCompositionRequestDTO(200.0, 1L, 2L);

        Mockito.when(productCompositionService.update(eq(realId), any(ProductCompositionRequestDTO.class))).thenReturn(false);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .pathParam("id", realId)
                .when().put(PATH + "/{id}")
                .then()
                .statusCode(404);
    }

    @Test
    public void shouldDeleteCompositionSuccessfully() {
        Long realId = 1L;

        Mockito.when(productCompositionService.delete(realId)).thenReturn(true);

        given()
                .pathParam("id", realId)
                .when().delete(PATH + "/{id}")
                .then()
                .statusCode(204);
    }

    @Test
    public void shouldReturnNotFoundWhenDeletingPhantom() {
        Long phantomId = 999L;

        Mockito.when(productCompositionService.delete(phantomId)).thenReturn(false);

        given()
                .pathParam("id", phantomId)
                .when().delete(PATH + "/{id}")
                .then()
                .statusCode(404); // 404 NOT FOUND
    }
}
