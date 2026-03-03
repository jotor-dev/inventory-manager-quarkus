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
        // 1. Criamos a ilusão de um plano de produção bem-sucedido
        ProductionItemDTO item = new ProductionItemDTO("Engrenagem de Ouro", 10, 1500.0);
        SuggestionResponseDTO mockResponse = new SuggestionResponseDTO(List.of(item), 1500.0);

        Mockito.when(suggestionService.calculateProduction()).thenReturn(mockResponse);

        // 2. O RestAssured interroga o portal
        given()
                .when().get("/suggestion")
                .then()
                .statusCode(200)
                .body("totalValue", is(1500.0F)) // Verifica o valor total da fortuna
                .body("items.size()", is(1))    // Verifica se há um item na lista
                .body("items[0].name", is("Engrenagem de Ouro"));
    }
}
