package org.acme;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import org.acme.dto.ProductionItemDTO;
import org.acme.dto.SuggestionResponseDTO;
import org.acme.service.SuggestionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
public class SuggestionControllerTest {

    @InjectMock
    SuggestionService suggestionService;

    @Test
    public void shouldReturnProductionSuggestion() {
        ProductionItemDTO item = new ProductionItemDTO(1L, "V8 Engine", 10, 2500.0, 25000.0);
        SuggestionResponseDTO mockResponse = new SuggestionResponseDTO(List.of(item), 1500.0);

        Mockito.when(suggestionService.calculateProduction()).thenReturn(mockResponse);

        given()
                .when().get("/suggestion")
                .then()
                .statusCode(200)
                .body("totalValue", is(1500.0F))
                .body("items.size()", is(1))
                .body("items[0].name", is("V8 Engine"));
    }
}
