function buildScores(partidos) {

  const result = {};

  partidos.forEach(match => {

    const key =
      `${match.grupo}_${match.numero_partido}`;

    result[key] = {
      A: match.goles_real_a,
      B: match.goles_real_b
    };

  });

  return result;
}

export default buildScores;