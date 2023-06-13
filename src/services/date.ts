const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
]

function getMonth(d: any) {
  return months[d - 1]
}

export function formatDate(data: any) {
  const date = new Date(data)
  return `${date.getDate()} de ${getMonth(
    date.getMonth() + 1
  )} de ${date.getFullYear()} às ${date.getHours()}:${
    date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes()
  }`
}
