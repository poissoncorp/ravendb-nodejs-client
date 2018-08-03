import * as stream from "readable-stream";
import { RavenCommand } from "../../Http/RavenCommand";
import { ServerNode } from "../../Http/ServerNode";
import { Topology } from "../../Http/Topology";
import { HttpRequestParameters } from "../../Primitives/Http";
import { RavenCommandResponsePipeline } from "../../Http/RavenCommandResponsePipeline";

interface ServerNodeDto {
    database: string;
    url: string;
    clusterTag?: string;
    serverRole: string;
}

interface TopologyDto {
    etag: number;
    nodes?: ServerNodeDto[];
}

export class GetDatabaseTopologyCommand extends RavenCommand<Topology> {

    public createRequest(node: ServerNode): HttpRequestParameters {
        let uri = `${node.url}/topology?name=${node.database}`;

        if (node.url.toLowerCase().indexOf(".fiddler") !== -1) {
            // we want to keep the '.fiddler' stuff there so we'll keep tracking request
            // so we are going to ask the server to respect it
            uri += "&localUrl=" + encodeURIComponent(node.url);
        }

        return { uri };
    }

    public async setResponseAsync(bodyStream: stream.Stream, fromCache: boolean): Promise<string> {
        if (!bodyStream) {
            return;
        }

        return RavenCommandResponsePipeline.create()
            .collectBody()
            .parseJsonSync()
            .streamKeyCaseTransform({ targetKeyCaseConvention: "camel" })
            .process(bodyStream)
            .then(results => {
                const rawTpl = results.result as TopologyDto;
                const nodes = rawTpl.nodes
                    ? rawTpl.nodes.map(x => Object.assign(new ServerNode(), x))
                    : null;
                this.result = new Topology(
                    rawTpl.etag,
                    nodes);
                return results.body;
            });
    }

    public get isReadRequest(): boolean {
        return true;
    }
}
