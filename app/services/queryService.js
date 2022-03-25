// includeItem = {relationName: Procedures, keyword:"",keywordFields=[],filters=[]}
export function filterBuilder({
  keyword,
  keywordFields = [],
  filters = [],
  includeFilters = [],
  checkRelationSize = [],
  filterOptions = {}, // filterOption example {limit:5,order:["name DESC","code ASC"]}
  limit,
  skipAmount,
}) {
  // create keywordCond
  const oKeywordCond = keywordBuilder(keyword, keywordFields);

  // create whereCond
  let oWhere = keywordWhereBuilder(oKeywordCond, filters, filterOptions);

  // create includeCond
  const includeCond = includeBuilder(includeFilters);
  // if (includeCond && includeCond.length > 0) {
  //   oWhere = oWhere
  //     ? { ...oWhere, include: includeCond }
  //     : { include: includeCond };
  // }
    if (includeCond && includeCond.length > 0) {
    oWhere = oWhere
      ? { ...oWhere, include: includeCond }
      : { include: includeCond };
  }

  const includeNames = includeFilters.reduce(
    (res, item) => res.concat(item.relationName),
    [],
  );

  const finalLimit = 10;

oWhere = {...oWhere}
console.log("includeNames");

console.log(includeNames);

  return {
    filter: oWhere,
    includes: includeNames,
    checkRelationSize,
    limit: limit,
    skip: skipAmount,
  };
}

function keywordBuilder(val, fields) {
  const res = { or: [] };
  const resFields = fields
    ? fields.map(item => keywordItemBuilder(val, item))
    : [];
  res.or = resFields;
  return res;
}

function keywordItemBuilder(val, field) {
  return {
    [field]: {
      ilike: `${val}%`,
    },
  };
}

function keywordWhereBuilder(keywordConds = {}, filters = [], options = {}) {
  const oCond =
    keywordConds.or.length > 0 ? filters.concat(keywordConds) : filters;
  const res = oCond.length > 0 ? { where: { and: oCond }, ...options } : null;
  return res;
}

function relationBuilder(relationName, scopeWhere, options) {
  let oRel = { relation: `${relationName}` };
  if (scopeWhere) {
    oRel.scope = scopeWhere;
  }
  if (options) {
    oRel = { ...oRel, ...options };
  }
  return oRel;
}

function includeBuilder(incFilters = []) {
  const result = incFilters.reduce((res, item) => {
    // create keywordCond
    const keywordCond = keywordBuilder(item.keyword, item.keywordFields);
    // create whereCond
    const whereCond = keywordWhereBuilder(keywordCond, item.filters);
    // create RelationItem
    const options = item.filterOptions || null;
    const relations = relationBuilder(item.relationName, whereCond, options);
    return res.concat(relations);
  }, []);
  return result;
}

export default { filterBuilder };
