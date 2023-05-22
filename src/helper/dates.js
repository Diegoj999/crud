export function getDateInit() {
  let dateAct = new Date();

  // Obtener el día
  let dia = dateAct.getDate();

  // Obtener el mes (se indexa desde 0, por lo que se debe sumar 1)
  let mes = dateAct.getMonth() + 1;

  // Obtener el año
  let año = dateAct.getFullYear();

  // Obtener la hora
  let hora = dateAct.getHours();

  // Obtener los minutos
  let minutos = dateAct.getMinutes();

  return { complete: `${dia}/${mes}/${año} ${hora}:${minutos}`, day:  `${dia}/${mes}/${año}`};
}
