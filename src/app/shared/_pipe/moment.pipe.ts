import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'fffMoment'
})
export class MomentPipe implements PipeTransform {
    transform(value: string, formatTo: string = 'DD.MM.YYYY HH:mm'): any {
        return moment(value).format(formatTo);
    }
}
