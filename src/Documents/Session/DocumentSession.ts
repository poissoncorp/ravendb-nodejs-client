import {IDocumentSession} from "./IDocumentSession";
import {IDocumentQuery} from "./IDocumentQuery";
import {DocumentQuery} from "./DocumentQuery";
import {Document} from '../Document';
import {IDocument, DocumentKey, IDocumentType} from '../IDocument';
import {IDocumentStore} from '../IDocumentStore';
import {RequestsExecutor} from '../../Http/Request/RequestsExecutor';
import {DocumentConventions} from '../Conventions/DocumentConventions';
import {EntityCallback, EntitiesArrayCallback} from '../../Utility/Callbacks';
import {PromiseResolve, PromiseResolver} from '../../Utility/PromiseResolver';
import * as Promise from 'bluebird'
import {TypeUtil} from "../../Utility/TypeUtil";
import {IMetadata} from "../../Database/Metadata";

export class DocumentSession implements IDocumentSession {
  protected database: string;
  protected documentStore: IDocumentStore;
  protected requestsExecutor: RequestsExecutor;
  protected sessionId: string;
  protected forceReadFromMaster: boolean;
  private _numberOfRequestsInSession: number;

  public get numberOfRequestsInSession(): number {
    return this._numberOfRequestsInSession;
  }

  public get conventions(): DocumentConventions<IDocument> {
    return this.documentStore.conventions;
  }       

  constructor (database: string, documentStore: IDocumentStore, requestsExecutor: RequestsExecutor,
     sessionId: string, forceReadFromMaster: boolean
  ) {
    this.database = database;
    this.documentStore = documentStore;
    this.requestsExecutor = requestsExecutor;
    this.sessionId = sessionId;
    this.forceReadFromMaster = forceReadFromMaster;
  }

  public create(attributes?: Object, documentType?: IDocumentType): IDocument {
    let document: IDocument = new Document(attributes);
    const conventions: DocumentConventions<IDocument> = this.documentStore.conventions;

    document['@metadata'] = conventions.buildDefaultMetadata(document, documentType);
    return document;
  }

  public load(keyOrKeys: DocumentKey | DocumentKey[], includes?: string[], callback?: EntityCallback<IDocument>
    | EntitiesArrayCallback<IDocument>
  ): Promise<IDocument> | Promise<IDocument[]> {
    const result = this.create();

    if (TypeUtil.isArray(keyOrKeys)) {
      return new Promise<IDocument[]>((resolve: PromiseResolve<IDocument[]>) =>
        PromiseResolver.resolve([result], resolve, callback)
      );
    } else {
      return new Promise<IDocument>((resolve) =>
        PromiseResolver.resolve(result, resolve, callback)
      );
    }
  }

  public delete(keyOrEntity: DocumentKey | IDocument, callback?: EntityCallback<IDocument>): Promise<IDocument> {
    const result = this.create();

    return new Promise<IDocument>((resolve: PromiseResolve<IDocument>) =>
      PromiseResolver.resolve(result, resolve, callback)
    );
  }

  public store(entity: IDocument, documentType?: IDocumentType, key?: DocumentKey, etag?: number, forceConcurrencyCheck?: boolean,
     callback?: EntityCallback<IDocument>
  ): Promise<IDocument> {
    const result = this.create();

    return new Promise<IDocument>((resolve: PromiseResolve<IDocument>) =>
      PromiseResolver.resolve(result, resolve, callback)
    );
  }

  public query(documentType?: IDocumentType, indexName?: string, usingDefaultOperator?: boolean, waitForNonStaleResults: boolean = false,
     includes?: string[], withStatistics: boolean = false
  ): IDocumentQuery {
    return new DocumentQuery(this, this.requestsExecutor, documentType);
  }

  public incrementRequestsCount(): void {

  }
}