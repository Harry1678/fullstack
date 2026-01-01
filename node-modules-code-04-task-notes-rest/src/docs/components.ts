export const components = {
  schemas: {
    Task: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "123",
        },
        title: {
          type: "string",
          example: "Learn Swagger",
        },
        completed: {
          type: "boolean",
          example: false,
        },
      },
    },

    CreateTaskInput: {
      type: "object",
      required: ["title"],
      properties: {
        title: {
          type: "string",
          example: "Learn OpenAPI",
        },
      },
    },
  },
};
