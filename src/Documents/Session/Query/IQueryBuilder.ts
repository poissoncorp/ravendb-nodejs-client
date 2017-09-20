import {SpatialCriteria} from "./Spatial/SpatialCriteria";
import {OrderingType, QueryOperator, SearchOperator} from "./QueryLanguage";

//TODO uncomment this
// import {IParametrizedWhereParams} from "./WhereParams";

//TODO uncomment this
export interface IQueryBuilder {
  // rawQuery(query: string): IQueryBuilder;
  // from(indexName?: string, collectionName?: string): IQueryBuilder;
  // getProjectionFields(): string[];
  // randomOrdering(seed?: string): IQueryBuilder;
  // customSortUsing(typeName: string, descending?: boolean): IQueryBuilder;
  // include(path: string): IQueryBuilder;
  // usingDefaultOperator(operator: QueryOperator): IQueryBuilder;
  // whereEquals(params: IParametrizedWhereParams<string>): IQueryBuilder;
  // whereEquals(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  // whereNotEquals(params: IParametrizedWhereParams<string>): IQueryBuilder;
  // whereNotEquals(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  // openSubclause(): IQueryBuilder;
  // closeSubclause(): IQueryBuilder;
  // negateNext(): IQueryBuilder;
  // whereIn(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  // whereStartsWith(fieldName: string, parameterName: string): IQueryBuilder;
  // whereEndsWith(fieldName: string, parameterName: string): IQueryBuilder;
  // whereBetween(fieldName: string, fromParameterName: string, toParameterName: string, exact?: boolean): IQueryBuilder;
  // whereGreaterThan(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  // whereGreaterThanOrEqual(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  // whereLessThan(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  // whereLessThanOrEqual(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  // whereExists(fieldName: string): IQueryBuilder;
  // andAlso(): IQueryBuilder;
  // orElse(): IQueryBuilder;
  // boost(boost: number): IQueryBuilder;
  // fuzzy(fuzzy: number): IQueryBuilder;
  // proximity(proximity: number): IQueryBuilder;
  // orderBy(field: string, ordering?: OrderingType): IQueryBuilder;
  // orderByDescending(field: string, ordering?: OrderingType): IQueryBuilder;
  // orderByScore(): IQueryBuilder;
  // orderByScoreDescending(): IQueryBuilder;
  // search(fieldName: string, searchTerms: string, operator: SearchOperator): IQueryBuilder;
  // intersect(): IQueryBuilder;
  // distinct(): IQueryBuilder;
  // containsAny(fieldName: string, parameterName: string): IQueryBuilder;
  // containsAll(fieldName: string, parameterName: string): IQueryBuilder;
  // groupBy(fieldName: string, ...fieldNames: string[]): IQueryBuilder;
  // groupByKey(fieldName: string, projectedName?: string): IQueryBuilder;
  // groupBySum(fieldName: string, projectedName?: string): IQueryBuilder;
  // groupByCount(projectedName?: string): IQueryBuilder;
  // whereTrue(): IQueryBuilder;
  // spatial(fieldName: string, criteria: SpatialCriteria): IQueryBuilder;
  // orderByDistance(fieldName: string, latitude: number, longitude: number): IQueryBuilder;
  // orderByDistance(fieldName: string, shapeWkt: string): IQueryBuilder;
  // orderByDistanceDescending(fieldName: string, latitude: number, longitude: number): IQueryBuilder;
  // orderByDistanceDescending(fieldName: string, shapeWkt: string): IQueryBuilder;
}