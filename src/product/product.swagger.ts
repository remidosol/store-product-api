import { ApiResponseOptions } from "@nestjs/swagger";

export const findAllResponse: ApiResponseOptions = {
  status: 200,
  content: {
    "application/json": {
      example: {
        statusCode: 200,
        data: [
          {
            id: "3712f873-097c-4df6-a3db-ad225fdf2109",
            name: "Product Name",
            description: "Product Description",
            price: 73.54,
            inventory: 255,
          },
        ],
      },
    },
  },
};

export const commonResponse: ApiResponseOptions = {
  status: 200,
  content: {
    "application/json": {
      example: {
        statusCode: 201,
        data: {
          name: "Product Name",
          description: "Product Description",
          price: 73.54,
          inventory: 255,
          id: "3712f873-097c-4df6-a3db-ad225fdf2109",
        },
      },
    },
  },
};
