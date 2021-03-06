import { GraphQLScalarType, GraphQLError } from 'graphql';
const GJV = require('geojson-validation');

import parseLiteral from './parseLiteral';

const validate = value => {
  if (!GJV.isBbox(value)) {
    throw new GraphQLError(`Expected GeoJSON Bbox but got: ${JSON.stringify(value)}`);
  }
  return value;
};

export default new GraphQLScalarType({
  name: 'GeoJSONBboxScalar',
  serialize: validate,
  parseValue: validate,
  parseLiteral: ast => validate(parseLiteral(ast))
});
