class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
    ];

    this.animais = {
      "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
      "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
      "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
      "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
      "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
    };
  }

  analisaRecintos(especie, quantidade) {
    if (!this.animais[especie]) {
      return { erro: "Animal inválido", recintosViaveis: null };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida", recintosViaveis: null };
    }

    const animal = this.animais[especie];
    let recintosViaveis = [];

    for (let recinto of this.recintos) {
      let espacoOcupado = recinto.animais.reduce((sum, a) => sum + (a.quantidade * this.animais[a.especie].tamanho), 0);
      let espacoLivre = recinto.tamanho - espacoOcupado;

      if (!animal.biomas.includes(recinto.bioma)) continue;

      let espacoNecessario = quantidade * animal.tamanho;

      if (recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== especie)) {
        espacoNecessario += 1;
      }

      if (espacoLivre >= espacoNecessario) {
        if (animal.carnivoro && recinto.animais.some(a => this.animais[a.especie].carnivoro && a.especie !== especie)) continue;

        if (especie === "HIPOPOTAMO" && !recinto.bioma.includes("savana e rio")) continue;

        if (especie === "MACACO" && recinto.animais.length === 0) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`);
          continue;
        }

        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`);
      }
    }

    recintosViaveis.sort((a, b) => {
      const numeroRecintoA = parseInt(a.match(/Recinto (\d+)/)[1]);
      const numeroRecintoB = parseInt(b.match(/Recinto (\d+)/)[1]);
      return numeroRecintoA - numeroRecintoB;
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável", recintosViaveis: null };
    }

    return { erro: null, recintosViaveis };
  }
}

export { RecintosZoo } ;
