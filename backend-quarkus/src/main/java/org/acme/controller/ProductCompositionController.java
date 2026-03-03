package org.acme.controller;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.dto.ProductCompositionResponseDTO;
import org.acme.dto.ProductCompositionRequestDTO;
import org.acme.service.ProductCompositionService;

import java.util.List;

@Path("/product-composition")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductCompositionController {
    @Inject
    ProductCompositionService productService;

    @GET
    public Response listAll(){
        List<ProductCompositionResponseDTO> products = productService.listAll();
        return Response.ok(products).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id){
        ProductCompositionResponseDTO product = productService.findById(id);

        if (product == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(product).build();
    }

    @POST
    public Response create(ProductCompositionRequestDTO dto){
        boolean isCreated = productService.create(dto);

        if(isCreated){
            return Response.status(Response.Status.CREATED).build();
        }

        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, ProductCompositionRequestDTO dto){
        boolean isUpdated = productService.update(id, dto);

        if (isUpdated){
            return Response.ok().build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id){
        boolean isDeleted = productService.delete(id);

        if(isDeleted){
            return Response.noContent().build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
