type ContactType = {
  nome: string
  telefone: string
  ramal: number
  celular: string
  email: string
}

type AlbumType = {
  codigo: number
  nomeArquivo: string
  descricao: string
  contentType: string
  img: string
}

type ChecklistItensType = {
  nomeItem: string
  resposta: string
}

export type ChecklistType = {
  nomeGrupo: string
  itens: ChecklistItensType[]
}

export type EquipmentType = {
  idProprietarioMaquina: number
  empresa: {
    idEmpresa: number
    cnpj: number
    perfil: string
    cnpjCpfValido: false
    nomeFantasia: string
    cidade: { codCidade: number; nomeCidade: string; uf: string }
    contato: ContactType[]
    dadosFinanceiros: {
      banco: number
      agencia: number
      contaCorrente: string
      orientacoes: string
      diasVencimentoBoleto: number
      temBoletoAberto: false
    }
  }
  chassi: string
  modelo: {
    marca: { codMarca: number; nomeMarca: string }
    tipo: { codTipo: number; descricaoTipo: string }
    codModelo: number
    descricaoModelo: string
  }
  anoFabricacao: number
  horimetro: number
  corExterna: string
  origem: string
  numeroMotor: string
  garantia: string
  situacao: string
  precoRepasse: number
  precoPublico: number
  precoArremate: number
  propostaMinima: number
  valorUltimaAvaliacao: number
  destaque: string
  favorito: boolean
  album: AlbumType[]
}
