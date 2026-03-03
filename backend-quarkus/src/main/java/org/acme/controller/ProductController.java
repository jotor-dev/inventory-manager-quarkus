package org.acme.controller;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.dto.ProductRequestDTO;
import org.acme.dto.ProductResponseDTO;
import org.acme.service.ProductService;

import java.util.List;

@Path("/product")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductController {
    @Inject
    ProductService productService;

    @GET
    public Response listAll(){
        List<ProductResponseDTO> products = productService.listAll();

        return Response.ok(products).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id){
        ProductResponseDTO product = productService.findById(id);

        if (product == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(product).build();
    }

    @POST
    public Response create(ProductRequestDTO dto){
        boolean isCreated = productService.create(dto);

        if(isCreated){
            return Response.status(Response.Status.CREATED).build();
        }

        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, ProductRequestDTO dto){
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
