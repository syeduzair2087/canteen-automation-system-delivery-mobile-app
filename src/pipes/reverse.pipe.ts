import { Pipe } from '@angular/core';

@Pipe({
    name: 'reverse'
})
export class ReversePipe {
    transform(value) {
        if (value == null) {
            return null;
        }

        return value.slice().reverse();
    }
}