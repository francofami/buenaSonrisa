import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'muchoPoco'
})
export class MuchoPocoPipe implements PipeTransform {

  transform(numero): any {

    let retorno = "(casi nada)";

    if(numero<=10 && numero>5) {
      retorno = "(muy pocos)";
    } else if (numero>10 && numero<50) {
      retorno = "(nada mal)"
    } else if (numero>=50) {
      retorno = "(un montón)"
    }

    return numero.toString() + ' ' + retorno;
  }

}
