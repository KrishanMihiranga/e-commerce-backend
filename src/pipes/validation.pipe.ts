import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ToNumberPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value)
        console.log(metadata)
        return Number(ToNumberPipe);
    }
}