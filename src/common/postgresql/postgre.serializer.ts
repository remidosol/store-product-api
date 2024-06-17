import { ClassSerializerInterceptor, PlainLiteralObject, Type } from "@nestjs/common";
import { ClassTransformOptions, plainToClass } from "class-transformer";

export function PostgreTypeOrmClassSerializerInterceptor(classToIntercept: Type): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    private changePlainObjectToClass(entity: PlainLiteralObject) {
      if (!(entity instanceof classToIntercept)) {
        return entity;
      }

      return plainToClass(classToIntercept, entity);
    }

    private prepareResponse(response: PlainLiteralObject | PlainLiteralObject[]) {
      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }

      return this.changePlainObjectToClass(response);
    }

    serialize(response: PlainLiteralObject | PlainLiteralObject[], options: ClassTransformOptions) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}
