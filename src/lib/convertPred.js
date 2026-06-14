function convertPreds(rows) {
  const result = {};

  rows?.forEach(r => {
    result[r.match_key] = {
      A: r.goles_pronostico_a,
      B: r.goles_pronostico_b
    };
  });

  return result;
}

export default convertPreds;