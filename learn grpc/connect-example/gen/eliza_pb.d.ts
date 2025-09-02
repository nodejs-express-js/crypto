import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file eliza.proto.
 */
export declare const file_eliza: GenFile;
/**
 * @generated from message connectrpc.eliza.v1.SayRequest
 */
export type SayRequest = Message<"connectrpc.eliza.v1.SayRequest"> & {
    /**
     * @generated from field: string sentence = 1;
     */
    sentence: string;
};
/**
 * Describes the message connectrpc.eliza.v1.SayRequest.
 * Use `create(SayRequestSchema)` to create a new message.
 */
export declare const SayRequestSchema: GenMessage<SayRequest>;
/**
 * @generated from message connectrpc.eliza.v1.SayResponse
 */
export type SayResponse = Message<"connectrpc.eliza.v1.SayResponse"> & {
    /**
     * @generated from field: string sentence = 1;
     */
    sentence: string;
};
/**
 * Describes the message connectrpc.eliza.v1.SayResponse.
 * Use `create(SayResponseSchema)` to create a new message.
 */
export declare const SayResponseSchema: GenMessage<SayResponse>;
/**
 * @generated from message connectrpc.eliza.v1.StreamRequest
 */
export type StreamRequest = Message<"connectrpc.eliza.v1.StreamRequest"> & {
    /**
     * @generated from field: string sentence = 1;
     */
    sentence: string;
};
/**
 * Describes the message connectrpc.eliza.v1.StreamRequest.
 * Use `create(StreamRequestSchema)` to create a new message.
 */
export declare const StreamRequestSchema: GenMessage<StreamRequest>;
/**
 * @generated from message connectrpc.eliza.v1.StreamResponse
 */
export type StreamResponse = Message<"connectrpc.eliza.v1.StreamResponse"> & {
    /**
     * @generated from field: string sentence = 1;
     */
    sentence: string;
};
/**
 * Describes the message connectrpc.eliza.v1.StreamResponse.
 * Use `create(StreamResponseSchema)` to create a new message.
 */
export declare const StreamResponseSchema: GenMessage<StreamResponse>;
/**
 * @generated from service connectrpc.eliza.v1.ElizaService
 */
export declare const ElizaService: GenService<{
    /**
     * @generated from rpc connectrpc.eliza.v1.ElizaService.Say
     */
    say: {
        methodKind: "unary";
        input: typeof SayRequestSchema;
        output: typeof SayResponseSchema;
    };
    /**
     * @generated from rpc connectrpc.eliza.v1.ElizaService.StreamResponses
     */
    streamResponses: {
        methodKind: "server_streaming";
        input: typeof StreamRequestSchema;
        output: typeof StreamResponseSchema;
    };
}>;
//# sourceMappingURL=eliza_pb.d.ts.map