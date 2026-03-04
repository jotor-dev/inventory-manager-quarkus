package org.acme;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.acme.dto.RawMaterialResponseDTO;
import org.acme.dto.RawMaterialRequestDTO;
import org.acme.service.RawMaterialService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collections;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@QuarkusTest
public class RawMaterialControllerTest {

    @InjectMock
    RawMaterialService rawMaterialService;

    @Test
    public void shouldReturnEmptyListWhenNoRawMaterialsExist(){
        Mockito.when(rawMaterialService.listAll()).thenReturn(Collections.emptyList());

        given()
                .when().get("/raw-material")
                .then()
                .statusCode(200)
                .body("size()", is(0));
    }

    @Test
    public void shouldCreateRawMaterialSuccesfully(){
        RawMaterialRequestDTO dto = new RawMaterialRequestDTO("COD-001", "Raw Material Test", 150.50);

        Mockito.when(rawMaterialService.create(any(RawMaterialRequestDTO.class))).thenReturn(true);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .when().post("/raw-material")
                .then()
                .statusCode(201);
    }

    @Test
    public void shouldReturnBadRequestWhenCreationFails(){
        RawMaterialRequestDTO dto = new RawMaterialRequestDTO("COD-002", "Raw Material Test", 0.0);

        Mockito.when(rawMaterialService.create(any(RawMaterialRequestDTO.class))).thenReturn(false);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .when().post("/raw-material")
                .then()
                .statusCode(400);
    }

    @Test
    public void shouldReturnNotFoundWhenRawMaterialDoesNotExist() {
        Long phantomId = 999L;

        Mockito.when(rawMaterialService.findById(phantomId)).thenReturn(null);

        given()
                .pathParam("id", phantomId)
                .when().get("/raw-material/{id}")
                .then()
                .statusCode(404);
    }

    @Test
    public void shouldReturnRawMaterialWhenItExists() {
        Long realId = 1L;
        RawMaterialResponseDTO expectedDto = new RawMaterialResponseDTO(realId, "COD-001", "Raw Material Test", 150.50);

        Mockito.when(rawMaterialService.findById(realId)).thenReturn(expectedDto);

        given()
                .pathParam("id", realId)
                .when().get("/raw-material/{id}")
                .then()
                .statusCode(200)
                .body("code", is("COD-001"))
                .body("name", is("Raw Material Test"));
    }

    @Test
    public void shouldUpdateRawMaterialSuccessfully() {
        Long realId = 1L;
        RawMaterialRequestDTO dto = new RawMaterialRequestDTO("COD-001", "Raw Material Test", 200.00);

        Mockito.when(rawMaterialService.update(eq(realId), any(RawMaterialRequestDTO.class))).thenReturn(true);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .pathParam("id", realId)
                .when().put("/raw-material/{id}")
                .then()
                .statusCode(200);
    }

    @Test
    public void shouldReturnNotFoundWhenUpdatingPhantom() {
        Long phantomId = 999L;
        RawMaterialRequestDTO dto = new RawMaterialRequestDTO("COD-001", "Raw Material Test", 10.0);

        Mockito.when(rawMaterialService.update(eq(phantomId), any(RawMaterialRequestDTO.class))).thenReturn(false);

        given()
                .contentType(ContentType.JSON)
                .body(dto)
                .pathParam("id", phantomId)
                .when().put("/raw-material/{id}")
                .then()
                .statusCode(404);
    }

    @Test
    public void shouldDeleteRawMaterialtSuccessfully() {
        Long realId = 1L;

        Mockito.when(rawMaterialService.delete(realId)).thenReturn(true);

        given()
                .pathParam("id", realId)
                .when().delete("/raw-material/{id}")
                .then()
                .statusCode(204);
    }

    @Test
    public void shouldReturnNotFoundWhenDeletingPhantom() {
        Long phantomId = 999L;

        Mockito.when(rawMaterialService.delete(phantomId)).thenReturn(false);

        given()
                .pathParam("id", phantomId)
                .when().delete("/raw-material/{id}")
                .then()
                .statusCode(404); // 404 NOT FOUND
    }
}
