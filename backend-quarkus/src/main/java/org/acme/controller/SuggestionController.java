package org.acme.controller;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.dto.SuggestionResponseDTO;
import org.acme.service.SuggestionService;

@Path("/suggestion")
@Produces(MediaType.APPLICATION_JSON)
public class SuggestionController {
    @Inject
    SuggestionService suggestionService;

    @GET
    public Response suggestProduction(){
        SuggestionResponseDTO suggestion = suggestionService.calculateProduction();

        return Response.ok(suggestion).build();
    }
}
