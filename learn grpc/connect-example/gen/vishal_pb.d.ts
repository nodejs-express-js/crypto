import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file vishal.proto.
 */
export declare const file_vishal: GenFile;
/**
 * @generated from message connectrpc.vishal.v1.SayRequest
 */
export type SayRequest = Message<"connectrpc.vishal.v1.SayRequest"> & {
    /**
     * @generated from field: string sentence = 1;
     */
    sentence: string;
};
/**
 * Describes the message connectrpc.vishal.v1.SayRequest.
 * Use `create(SayRequestSchema)` to create a new message.
 */
export declare const SayRequestSchema: GenMessage<SayRequest>;
/**
 * @generated from message connectrpc.vishal.v1.SayResponse
 */
export type SayResponse = Message<"connectrpc.vishal.v1.SayResponse"> & {
    /**
     * @generated from field: string sentence = 1;
     */
    sentence: string;
};
/**
 * Describes the message connectrpc.vishal.v1.SayResponse.
 * Use `create(SayResponseSchema)` to create a new message.
 */
export declare const SayResponseSchema: GenMessage<SayResponse>;
/**
 * @generated from service connectrpc.vishal.v1.VishalService
 */
export declare const VishalService: GenService<{
    /**
     * @generated from rpc connectrpc.vishal.v1.VishalService.Say
     */
    say: {
        methodKind: "unary";
        input: typeof SayRequestSchema;
        output: typeof SayResponseSchema;
    };
}>;
//# sourceMappingURL=vishal_pb.d.ts.map