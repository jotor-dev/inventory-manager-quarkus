package org.acme.controller;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.dto.RawMaterialRequestDTO;
import org.acme.dto.RawMaterialResponseDTO;
import org.acme.service.RawMaterialService;

import java.util.List;

@Path("/raw-material")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialController {
    @Inject
    RawMaterialService rawMaterialService;

    @GET
    public Response listAll(){
        List<RawMaterialResponseDTO> rawMaterials = rawMaterialService.listAll();
        return Response.ok(rawMaterials).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id){
        RawMaterialResponseDTO rawMaterial = rawMaterialService.findById(id);

        if (rawMaterial == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(rawMaterial).build();
    }

    @POST
    public Response create(RawMaterialRequestDTO dto){
        boolean isCreated = rawMaterialService.create(dto);

        if(isCreated){
            return Response.status(Response.Status.CREATED).build();
        }

        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, RawMaterialRequestDTO dto){
        boolean isUpdated = rawMaterialService.update(id, dto);

        if (isUpdated){
            return Response.ok().build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id){
        boolean isDeleted = rawMaterialService.delete(id);

        if(isDeleted){
            return Response.noContent().build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
